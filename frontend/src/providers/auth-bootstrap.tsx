"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authApi } from "@/lib/api/auth";
import { clearSession, setSession } from "@/store/auth/reducer";

export function AuthBootstrap() {
  const dispatch = useDispatch();
  useEffect(() => {
    authApi.me().then((user) => dispatch(setSession(user))).catch(() => dispatch(clearSession()));
  }, [dispatch]);
  return null;
}
