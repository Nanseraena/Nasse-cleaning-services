"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { queryKeys } from "@/lib/query/keys";

export function ServiceNavigation({ activeSlug }: { activeSlug?: string }) {
  const { data, isLoading } = useQuery({ queryKey: queryKeys.services, queryFn: servicesApi.list });
  return <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-6">
    <Link href="/services" className="block bg-brand-navy px-5 py-5 text-xl font-bold text-white">Our Cleaning Services</Link>
    <nav aria-label="Cleaning services">
      {isLoading ? <p className="px-5 py-4 text-sm text-slate-500">Loading services…</p> : data?.map((service) => <Link key={service.id} href={`/services/${service.slug}`} aria-current={activeSlug === service.slug ? "page" : undefined} className={`group flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 text-sm font-semibold transition last:border-0 ${activeSlug === service.slug ? "bg-green-50 text-brand-green" : "text-slate-700 hover:bg-slate-50 hover:text-brand-green"}`}><span>{service.name}</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"><path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" /></svg></Link>)}
    </nav>
    <div className="bg-green-50 p-5"><p className="font-bold text-brand-navy">Ready for a cleaner space?</p><Link href="/quote" className="mt-3 block rounded-full bg-brand-green px-4 py-2.5 text-center text-sm font-semibold text-white">Request a Quote</Link></div>
  </aside>;
}
