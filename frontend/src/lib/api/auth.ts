import { api } from "./client";
import type { AdminUser } from "@/types";

export const authApi = {
  login: async (username: string, password: string) =>
    (await api.post<{ user: AdminUser }>("/auth/login/", { username, password })).data,
  me: async () => (await api.get<AdminUser>("/auth/me/")).data,
  logout: async () => { await api.post("/auth/logout/"); },
};
