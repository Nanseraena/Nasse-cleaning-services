import { api } from "./client";
import type { Booking, BookingStatus } from "@/types";

export type BookingInput = { service: string; service_date: string; service_time: string; location: string; phone: string; alternative_contact?: string; notes?: string };
export const bookingsApi = {
  list: async () => (await api.get<Booking[]>("/bookings/")).data,
  create: async (input: BookingInput) => (await api.post<Booking>("/bookings/", input)).data,
  update: async (id: string, input: Partial<BookingInput> & { status?: "cancelled" }) => (await api.patch<Booking>(`/bookings/${id}/`, input)).data,
  adminList: async () => (await api.get<Booking[]>("/admin/bookings/")).data,
  adminUpdate: async (id: string, status: BookingStatus) => (await api.patch<Booking>(`/admin/bookings/${id}/`, { status })).data,
};
