import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshPromise: Promise<void> | null = null;

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = api.post("/auth/refresh/").then(() => undefined).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryConfig | undefined;
    const url = config?.url ?? "";
    const isAuthEndpoint = url.includes("/auth/login/") || url.includes("/auth/refresh/");

    if (error.response?.status === 401 && config && !config._retry && !isAuthEndpoint) {
      config._retry = true;
      try {
        await refreshSession();
        return api(config);
      } catch {
        // Fall through to the original error.
      }
    }

    return Promise.reject(error);
  },
);
