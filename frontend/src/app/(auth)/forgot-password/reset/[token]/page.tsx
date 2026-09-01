"use client";

import { FormEvent, use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";

const inputClass = "w-full rounded-xl border px-4 py-3 pr-12 outline-none focus:border-brand-green";

export default function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [validating, setValidating] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const strongPassword = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password);

  useEffect(() => {
    authApi.verifyPasswordResetToken(token).then(() => setValidToken(true)).catch(() => setValidToken(false)).finally(() => setValidating(false));
  }, [token]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!strongPassword) return toast.error("Use 8+ characters with uppercase, lowercase, a number, and a special character");
    if (password !== confirmation) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      await authApi.resetPassword(token, password);
      router.replace("/forgot-password/success");
    } catch {
      toast.error("This reset link is invalid or expired");
      setValidToken(false);
    } finally {
      setLoading(false);
    }
  }

  if (validating) return <main className="grid min-h-screen place-items-center">Validating your reset link…</main>;
  if (!validToken) return <main className="grid min-h-screen place-items-center bg-slate-50 px-6"><section className="max-w-md text-center"><h1 className="text-3xl font-bold text-brand-navy">Invalid or expired link</h1><p className="mt-3 text-slate-600">Request a new link to reset your password.</p><button onClick={() => router.push("/forgot-password")} className="mt-6 rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white">Request new link</button></section></main>;

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-6 py-12">
    <form onSubmit={submit} className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm">
      <div className="text-center"><h1 className="text-3xl font-bold text-brand-navy">Create a new password</h1><p className="mt-3 text-slate-600">Choose a secure password for your account.</p></div>
      <PasswordField label="New password" value={password} onChange={setPassword} visible={showPassword} onToggle={() => setShowPassword((value) => !value)} />
      <p className={`text-xs ${password && !strongPassword ? "text-red-600" : "text-slate-500"}`}>At least 8 characters, including uppercase, lowercase, a number, and a special character.</p>
      <PasswordField label="Confirm new password" value={confirmation} onChange={setConfirmation} visible={showConfirmation} onToggle={() => setShowConfirmation((value) => !value)} />
      {confirmation && password !== confirmation && <p className="text-xs text-red-600">Passwords do not match.</p>}
      <button disabled={loading || !strongPassword || password !== confirmation} className="w-full rounded-xl bg-brand-green px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Resetting…" : "Reset password"}</button>
    </form>
  </main>;
}

function PasswordField({ label, value, onChange, visible, onToggle }: { label: string; value: string; onChange: (value: string) => void; visible: boolean; onToggle: () => void }) {
  return <label className="block text-sm font-medium">{label}<span className="relative mt-2 block"><input required type={visible ? "text" : "password"} autoComplete="new-password" value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} /><button type="button" onClick={onToggle} aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`} aria-pressed={visible} className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-500"><EyeIcon hidden={visible} /></button></span></label>;
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" />{hidden && <path strokeLinecap="round" d="m4 4 16 16" />}</svg>;
}
