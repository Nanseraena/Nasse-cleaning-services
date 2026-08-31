import { api } from "./client";
import type { QuoteRequest } from "@/types";

export type CreateQuotePayload = Omit<QuoteRequest, "id" | "status" | "created_at">;

export const quotesApi = {
  create: async (payload: CreateQuotePayload) => (await api.post<QuoteRequest>("/quotes/", payload)).data,
  adminList: async () => (await api.get<QuoteRequest[]>("/admin/quotes/")).data,
  updateStatus: async (id: string, status: QuoteRequest["status"]) =>
    (await api.patch<QuoteRequest>(`/admin/quotes/${id}/`, { status })).data,
};
