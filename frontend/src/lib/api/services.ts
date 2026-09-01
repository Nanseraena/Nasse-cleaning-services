import { api } from "./client";
import type { Service } from "@/types";

export const servicesApi = {
  list: async () => (await api.get<Service[]>("/services/")).data,
  detail: async (slug: string) => (await api.get<Service>(`/services/${slug}/`)).data,
};
