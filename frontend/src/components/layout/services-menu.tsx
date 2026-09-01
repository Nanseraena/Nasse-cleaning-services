"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { queryKeys } from "@/lib/query/keys";

export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { data: services = [], isLoading, isError } = useQuery({ queryKey: queryKeys.services, queryFn: servicesApi.list });

  useEffect(() => {
    if (!open) return;
    const onOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return <div ref={containerRef} className="relative">
    <div className="flex items-center">
      <Link href="/services" className="py-3">Services</Link>
      <button ref={triggerRef} type="button" onClick={() => setOpen((value) => !value)} aria-haspopup="menu" aria-expanded={open} aria-label="Show cleaning services" className="ml-1 grid h-8 w-6 place-items-center text-slate-500">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
      </button>
    </div>
    {open && <div role="menu" className="absolute left-0 top-full z-40 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
      <Link role="menuitem" href="/services" onClick={() => setOpen(false)} className="flex items-center justify-between rounded-xl bg-brand-navy px-4 py-3 font-bold text-white"><span>All Cleaning Services</span><span aria-hidden="true">→</span></Link>
      <div className="mt-2 max-h-96 overflow-y-auto">
        {isLoading && <p className="px-4 py-3 text-slate-500">Loading services…</p>}
        {isError && <p className="px-4 py-3 text-sm text-red-600">Services could not be loaded. Please try again.</p>}
        {!isLoading && !isError && services.length === 0 && <p className="px-4 py-3 text-sm text-slate-500">No services are available yet.</p>}
        {!isLoading && !isError && services.map((service) => <Link role="menuitem" key={service.id} href={`/services/${service.slug}`} onClick={() => setOpen(false)} className="group flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-slate-700 hover:bg-green-50 hover:text-brand-green"><span><strong className="block">{service.name}</strong><small className="mt-0.5 block font-normal uppercase tracking-wide text-slate-400">{service.category.replaceAll("_", " ")}</small></span><span aria-hidden="true" className="transition group-hover:translate-x-1">→</span></Link>)}
      </div>
    </div>}
  </div>;
}
