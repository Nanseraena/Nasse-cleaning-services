"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      await authApi.requestPasswordReset(email);
      toast.success("Check your email for a password reset link");
      router.push(`/forgot-password/email-sent?email=${encodeURIComponent(email)}`);
    } catch {
      toast.error("Could not send the reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
    <form onSubmit={submit} className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-sm">
      <div className="text-center"><h1 className="text-3xl font-bold text-brand-navy">Forgot your password?</h1><p className="mt-3 text-slate-600">Enter the email linked to your account and we’ll send you a secure reset link.</p></div>
      <label className="block text-sm font-medium">Email<input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-brand-green" /></label>
      <button disabled={loading} className="w-full rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Sending…" : "Send reset link"}</button>
      <p className="text-center text-sm text-slate-600">Remember your password? <Link href="/login" className="font-semibold text-brand-green">Sign in</Link></p>
    </form>
  </main>;
}
