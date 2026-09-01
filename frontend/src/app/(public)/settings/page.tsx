"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { loginPath } from "@/lib/auth-navigation";
import { selectAuthInitialized, selectIsAuthenticated, selectUser } from "@/store/auth/selectors";

export default function SettingsPage() {
  const router = useRouter();
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (initialized && !authenticated) router.replace(loginPath("/settings"));
  }, [authenticated, initialized, router]);

  if (!initialized || !authenticated || !user) return <div className="mx-auto max-w-3xl px-6 py-16 text-slate-600">Checking your session…</div>;

  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email;
  return <div className="mx-auto max-w-3xl px-6 py-16">
    <h1 className="text-4xl font-bold text-brand-navy">Settings</h1>
    <p className="mt-3 text-slate-600">Manage your Nasse account details.</p>
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-4">
        <span className="relative h-20 w-20 overflow-hidden rounded-full bg-slate-200">
          <Image src={user.profile_picture || "/images/profile-placeholder.png"} alt={`${displayName}'s profile picture`} fill sizes="80px" className="object-cover" />
        </span>
        <div><h2 className="text-xl font-bold text-brand-navy">{displayName}</h2><p className="text-slate-500">{user.email}</p></div>
      </div>
    </section>
  </div>;
}
