import { api } from "./client";
import type { AdminUser } from "@/types";

export const authApi = {
  login: async (identifier: string, password: string) =>
    (await api.post<{ user: AdminUser }>("/auth/login/", { identifier, password })).data,
  signup: async (full_name: string, email: string, password: string) =>
    (await api.post<{ user: AdminUser }>("/auth/signup/", { full_name, email, password })).data,
  requestPasswordReset: async (email: string) =>
    (await api.post<{ detail: string }>("/auth/forgot-password/", { email })).data,
  verifyPasswordResetToken: async (token: string) =>
    (await api.post<{ valid: boolean }>("/auth/verify-reset-token/", { token })).data,
  resetPassword: async (token: string, new_password: string) =>
    (await api.post<{ detail: string }>("/auth/reset-password/", { token, new_password })).data,
  me: async () => (await api.get<AdminUser>("/auth/me/")).data,
  logout: async () => { await api.post("/auth/logout/"); },
};
