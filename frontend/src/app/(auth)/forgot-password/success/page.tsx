import Link from "next/link";

export default function PasswordResetSuccessPage() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
    <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-700"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" /></svg></span>
      <h1 className="mt-5 text-3xl font-bold text-brand-navy">Password updated</h1>
      <p className="mt-3 text-slate-600">Your password has been changed. You can now sign in with your new password.</p>
      <Link href="/login" className="mt-7 block rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white">Sign in now</Link>
    </section>
  </main>;
}
