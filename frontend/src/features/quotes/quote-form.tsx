"use client";
import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { quotesApi } from "@/lib/api/quotes";
import { servicesApi } from "@/lib/api/services";
import { queryKeys } from "@/lib/query/keys";

const input = "w-full rounded-xl border px-4 py-3 outline-none focus:border-brand-green";

export function QuoteForm() {
  const services = useQuery({ queryKey: queryKeys.services, queryFn: servicesApi.list });
  const [form, setForm] = useState({ service: "", full_name: "", email: "", phone: "", location: "", property_type: "", approximate_size: "", preferred_date: "", frequency: "ONE_TIME", notes: "" });
  const mutation = useMutation({ mutationFn: quotesApi.create, onSuccess: () => { toast.success("Quote request received"); setForm({ ...form, full_name: "", email: "", phone: "", notes: "" }); }, onError: () => toast.error("Could not submit your request") });
  const set = (key: keyof typeof form, value: string) => setForm((p) => ({ ...p, [key]: value }));
  const submit = (e: FormEvent) => { e.preventDefault(); mutation.mutate({ ...form, service: form.service || null, preferred_date: form.preferred_date || null }); };
  return <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
    <select className={input} value={form.service} onChange={(e) => set("service", e.target.value)}><option value="">Select service</option>{services.data?.map((s) => <option value={s.id} key={s.id}>{s.name}</option>)}</select>
    <input className={input} placeholder="Full name" required value={form.full_name} onChange={(e) => set("full_name", e.target.value)} />
    <input className={input} type="email" placeholder="Email" required value={form.email} onChange={(e) => set("email", e.target.value)} />
    <input className={input} placeholder="Phone" required value={form.phone} onChange={(e) => set("phone", e.target.value)} />
    <input className={input} placeholder="Location" required value={form.location} onChange={(e) => set("location", e.target.value)} />
    <input className={input} placeholder="Property / facility type" value={form.property_type} onChange={(e) => set("property_type", e.target.value)} />
    <input className={input} placeholder="Approximate size" value={form.approximate_size} onChange={(e) => set("approximate_size", e.target.value)} />
    <input className={input} type="date" value={form.preferred_date} onChange={(e) => set("preferred_date", e.target.value)} />
    <select className={input} value={form.frequency} onChange={(e) => set("frequency", e.target.value)}><option value="ONE_TIME">One-time</option><option value="WEEKLY">Weekly</option><option value="BIWEEKLY">Bi-weekly</option><option value="MONTHLY">Monthly</option></select>
    <textarea className={`${input} md:col-span-2`} rows={5} placeholder="Tell us about the space and cleaning required" value={form.notes} onChange={(e) => set("notes", e.target.value)} />
    <button disabled={mutation.isPending} className="rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white md:col-span-2">{mutation.isPending ? "Sending…" : "Request Quote"}</button>
  </form>;
}
