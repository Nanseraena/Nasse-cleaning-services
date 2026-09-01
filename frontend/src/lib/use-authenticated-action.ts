"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { loginPath } from "@/lib/auth-navigation";
import { selectAuthInitialized, selectIsAuthenticated } from "@/store/auth/selectors";

export function useAuthenticatedAction(returnPath: string) {
  const router = useRouter();
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);

  const requireAuthentication = () => {
    if (initialized && authenticated) return true;
    toast.info(initialized ? "Sign in to continue" : "Checking your session…");
    if (initialized) router.push(loginPath(returnPath));
    return false;
  };

  const handleActionError = (error: unknown, fallbackMessage: string) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      toast.info("Your session expired. Sign in to continue.");
      router.push(loginPath(returnPath));
      return;
    }
    toast.error(fallbackMessage);
  };

  return { requireAuthentication, handleActionError };
}
