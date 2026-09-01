"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { safeNextPath } from "@/lib/auth-navigation";
import { setSession } from "@/store/auth/reducer";
import { selectAuthInitialized, selectIsAuthenticated } from "@/store/auth/selectors";

const inputClass = "w-full rounded-xl border px-4 py-3 outline-none focus:border-brand-green";

function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);
  const destination = safeNextPath(searchParams.get("next"));

  useEffect(() => {
    if (initialized && authenticated) router.replace(destination);
  }, [authenticated, destination, initialized, router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      const { user } = await authApi.login(identifier, password);
      dispatch(setSession(user));
      router.replace(destination);
    } catch {
      toast.error("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  }

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
    <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm">
      <div><h1 className="text-3xl font-bold text-brand-navy">Welcome back</h1><p className="mt-2 text-slate-600">Sign in to continue with your request.</p></div>
      <label className="block text-sm font-medium">Email<input className={`${inputClass} mt-2`} type="email" autoComplete="email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required /></label>
      <label className="block text-sm font-medium">Password
        <span className="relative mt-2 block">
          <input className={`${inputClass} pr-12`} type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500 hover:text-brand-navy" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
            <EyeIcon hidden={showPassword} />
          </button>
        </span>
      </label>
      <div className="text-right"><Link href="/forgot-password" className="text-sm font-semibold text-brand-green hover:underline">Forgot password?</Link></div>
      <button disabled={loading} className="w-full rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button>
      <p className="text-center text-sm text-slate-600">New to Nasse? <Link className="font-semibold text-brand-green" href={`/signup?next=${encodeURIComponent(destination)}`}>Create an account</Link></p>
      <p className="text-center text-sm"><Link href="/" className="text-slate-500">Continue browsing</Link></p>
    </form>
  </main>;
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
    <circle cx="12" cy="12" r="2.5" />
    {hidden && <path strokeLinecap="round" d="m4 4 16 16" />}
  </svg>;
}

export default function LoginPage() {
  return <Suspense fallback={<main className="grid min-h-screen place-items-center">Loading…</main>}><LoginForm /></Suspense>;
}
