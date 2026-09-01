"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function EmailSentContent() {
  const email = useSearchParams().get("email");
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
    <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg></span>
      <h1 className="mt-5 text-3xl font-bold text-brand-navy">Email sent</h1>
      <p className="mt-3 text-slate-600">If an account exists for {email ? <strong>{email}</strong> : "that email address"}, you’ll receive a password reset link shortly.</p>
      <p className="mt-3 text-sm text-slate-500">Check your spam folder if you don’t see it. The link expires after 15 minutes.</p>
      <div className="mt-7 grid gap-3"><Link href="/login" className="rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white">Back to sign in</Link><Link href="/forgot-password" className="rounded-xl border px-5 py-3 font-semibold text-slate-700">Try another email</Link></div>
    </section>
  </main>;
}

export default function EmailSentPage() {
  return <Suspense fallback={<main className="grid min-h-screen place-items-center">Loading…</main>}><EmailSentContent /></Suspense>;
}
