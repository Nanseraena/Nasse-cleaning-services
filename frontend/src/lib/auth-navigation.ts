export function safeNextPath(value: string | null, fallback = "/") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/login") || value.startsWith("/signup")) return fallback;
  return value;
}

export function loginPath(nextPath: string) {
  return `/login?next=${encodeURIComponent(nextPath)}`;
}
