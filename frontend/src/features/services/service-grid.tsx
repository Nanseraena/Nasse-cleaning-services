"use client";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { queryKeys } from "@/lib/query/keys";

export function ServiceGrid() {
  const { data = [], isLoading, isError } = useQuery({ queryKey: queryKeys.services, queryFn: servicesApi.list });
  if (isLoading) return <p>Loading services…</p>;
  if (isError) return <p>Could not load services.</p>;
  return <div className="grid gap-6 md:grid-cols-2">{data.map((service) => <article key={service.id} className="rounded-2xl border p-6"><p className="text-xs font-semibold text-brand-green">{service.category.replaceAll("_", " ")}</p><h2 className="mt-2 text-2xl font-bold text-brand-navy">{service.name}</h2><p className="mt-3 text-slate-600">{service.short_description}</p></article>)}</div>;
}
