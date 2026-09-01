"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { ServiceNavigation } from "./service-navigation";
import { ServicesFaq } from "./services-faq";

export function ServiceDetail({ slug }: { slug: string }) {
  const { data: service, isLoading, isError } = useQuery({ queryKey: ["services", slug], queryFn: () => servicesApi.detail(slug) });
  if (isLoading) return <div className="mx-auto max-w-6xl px-6 py-16 text-slate-600">Loading service…</div>;
  if (isError || !service) return <div className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="text-3xl font-bold text-brand-navy">Service not found</h1><Link href="/services" className="mt-6 inline-block rounded-full bg-brand-navy px-6 py-3 font-semibold text-white">View all services</Link></div>;

  return <>
    <section className="bg-slate-50"><div className="mx-auto max-w-6xl px-6 py-12"><nav className="text-sm text-slate-500"><Link href="/services" className="hover:text-brand-green">Services</Link><span className="px-2">/</span><span>{service.name}</span></nav><p className="mt-8 text-sm font-bold uppercase tracking-widest text-brand-green">{service.category.replaceAll("_", " ")}</p><h1 className="mt-2 max-w-4xl text-4xl font-bold text-brand-navy md:text-6xl">{service.name}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{service.short_description}</p></div></section>
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)] lg:items-start">
      <article><h2 className="text-3xl font-bold text-brand-navy">A cleaning plan built around your space</h2><div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">{service.description || service.short_description}</div><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Flexible scheduling", "Trained cleaning team", "Clear service requirements", "Custom quote for your space"].map((benefit) => <div key={benefit} className="flex items-center gap-3 rounded-xl bg-green-50 p-4 font-semibold text-brand-navy"><span className="grid h-7 w-7 place-items-center rounded-full bg-brand-green text-white">✓</span>{benefit}</div>)}</div><div className="mt-10 rounded-2xl bg-brand-navy p-7 text-white"><h2 className="text-2xl font-bold">Let us take cleaning off your list</h2><p className="mt-3 text-white/80">Tell us about your property and we’ll recommend the right cleaning plan.</p><Link href={`/quote?service=${service.id}`} className="mt-6 inline-block rounded-full bg-brand-green px-6 py-3 font-semibold">Request a Quote</Link></div></article>
      <ServiceNavigation activeSlug={service.slug} />
    </div>
    <ServicesFaq />
  </>;
}
