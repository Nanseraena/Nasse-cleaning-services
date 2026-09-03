import { api } from "./client";
import type { QuoteRequest } from "@/types";

export type CreateQuotePayload = {
  service: string; service_area: string; full_name: string; email: string; phone: string; location: string;
  property_type: string; bedrooms?: number; bathrooms?: number; preferred_date: string;
  preferred_time: string; notes?: string; photos?: File[];
};

export const quotesApi = {
  create: async (payload: CreateQuotePayload) => {
    const form = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === "photos") (value as File[] | undefined)?.forEach((file) => form.append("photo_uploads", file));
      else if (value !== undefined && value !== null) form.append(key, String(value));
    });
    return (await api.post<QuoteRequest>("/quotes/", form, { headers: { "Content-Type": "multipart/form-data" } })).data;
  },
  myList: async () => (await api.get<QuoteRequest[]>("/my-quotes/")).data,
  respond: async (id: string, decision: "accept" | "decline") => (await api.post(`/my-quotes/${id}/respond/`, { decision })).data,
  adminList: async () => (await api.get<QuoteRequest[]>("/admin/quotes/")).data,
  update: async (id: string, payload: Partial<Pick<QuoteRequest, "status" | "estimated_price" | "admin_notes" | "preferred_date" | "preferred_time">>) =>
    (await api.patch<QuoteRequest>(`/admin/quotes/${id}/`, payload)).data,
};
