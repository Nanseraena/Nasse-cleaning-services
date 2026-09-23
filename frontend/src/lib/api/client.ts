import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const ACCESS_TOKEN_KEY = "nasse_access_token";
const REFRESH_TOKEN_KEY = "nasse_refresh_token";

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setAuthTokens(access?: string, refresh?: string) {
  if (typeof window === "undefined") return;
  if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
}

export function clearAuthTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshPromise: Promise<void> | null = null;

async function refreshSession() {
  if (!refreshPromise) {
    const refreshToken = getRefreshToken();
    refreshPromise = api
      .post<{ ok: boolean; access?: string; refresh?: string }>(
        "/auth/refresh/",
        refreshToken ? { refresh: refreshToken } : {}
      )
      .then((res) => {
        if (res.data?.access) {
          setAuthTokens(res.data.access, res.data.refresh);
        }
      })
      .catch((err) => {
        clearAuthTokens();
        throw err;
      })
      .finally(() => {
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
        const newToken = getAccessToken();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(config);
      } catch {
        // Fall through to the original error.
      }
    }

    return Promise.reject(error);
  },
);
