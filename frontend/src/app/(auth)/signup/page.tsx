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

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);
  const destination = safeNextPath(searchParams.get("next"));
  const strongPassword = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);

  useEffect(() => {
    if (initialized && authenticated) router.replace(destination);
  }, [authenticated, destination, initialized, router]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!strongPassword) return toast.error("Use 8+ characters with uppercase, lowercase, a number, and a special character");
    if (password !== confirmPassword) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      const { user } = await authApi.signup(fullName, email, password);
      dispatch(setSession(user));
      toast.success("Your account is ready");
      router.replace(destination);
    } catch {
      toast.error("Could not create the account. The email may already be registered.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
    <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm">
      <div><h1 className="text-3xl font-bold text-brand-navy">Create an account</h1><p className="mt-2 text-slate-600">Your account keeps your service requests connected to you.</p></div>
      <label className="block text-sm font-medium">Full name<input className={`${inputClass} mt-2`} autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></label>
      <label className="block text-sm font-medium">Email<input className={`${inputClass} mt-2`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
      <label className="block text-sm font-medium">Password
        <span className="relative mt-2 block">
          <input className={`${inputClass} pr-12`} type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500 hover:text-brand-navy" aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
            <EyeIcon hidden={showPassword} />
          </button>
        </span>
      </label>
      <p className={`text-xs ${password && !strongPassword ? "text-red-600" : "text-slate-500"}`}>At least 8 characters, including uppercase, lowercase, a number, and a special character.</p>
      <label className="block text-sm font-medium">Confirm password
        <span className="relative mt-2 block">
          <input className={`${inputClass} pr-12`} type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="button" onClick={() => setShowConfirmPassword((visible) => !visible)} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500 hover:text-brand-navy" aria-label={showConfirmPassword ? "Hide password" : "Show password"} aria-pressed={showConfirmPassword}>
            <EyeIcon hidden={showConfirmPassword} />
          </button>
        </span>
      </label>
      <button disabled={loading} className="w-full rounded-xl bg-brand-green px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Creating account…" : "Sign up"}</button>
      <p className="text-center text-sm text-slate-600">Already registered? <Link className="font-semibold text-brand-navy" href={`/login?next=${encodeURIComponent(destination)}`}>Sign in</Link></p>
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

export default function SignupPage() {
  return <Suspense fallback={<main className="grid min-h-screen place-items-center">Loading…</main>}><SignupForm /></Suspense>;
}
