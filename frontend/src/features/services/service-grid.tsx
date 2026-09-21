"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { queryKeys } from "@/lib/query/keys";
import type { Service } from "@/types";

const SERVICE_IMAGES: Record<string, string> = {
  "house-cleaning": "/images/house-cleaning.jpeg",
  "deep-cleaning": "/images/deep-cleaning.jpeg",
  "move-in-move-out-cleaning": "/images/Post-Move cleaning.jpeg",
  "post-move-cleaning": "/images/Post-Move cleaning.jpeg",
  "apartment-condo-cleaning": "/images/home-cleaning.png",
  "office-cleaning": "/images/office-cleaning.jpeg",
  "commercial-cleaning": "/images/Medical Office Cleaning.jpeg",
  "post-construction-cleaning": "/images/post-construction.jpeg",
  "facility-care": "/images/about-workspace-reset.png",
};

function getServiceImage(service: { slug: string; name: string; category?: string }): string {
  if (SERVICE_IMAGES[service.slug]) {
    return SERVICE_IMAGES[service.slug];
  }
  const nameLower = service.name.toLowerCase();
  if (nameLower.includes("post-construction") || nameLower.includes("construction")) {
    return "/images/post-construction.jpeg";
  }
  if (nameLower.includes("deep")) {
    return "/images/deep-cleaning.jpeg";
  }
  if (nameLower.includes("move") || nameLower.includes("relocation")) {
    return "/images/Post-Move cleaning.jpeg";
  }
  if (nameLower.includes("office")) {
    return "/images/office-cleaning.jpeg";
  }
  if (nameLower.includes("commercial") || nameLower.includes("medical") || nameLower.includes("corporate")) {
    return "/images/Medical Office Cleaning.jpeg";
  }
  if (nameLower.includes("apartment") || nameLower.includes("condo")) {
    return "/images/home-cleaning.png";
  }
  if (nameLower.includes("facility") || nameLower.includes("maintenance")) {
    return "/images/about-workspace-reset.png";
  }
  return "/images/house-cleaning.jpeg";
}

export function ServiceGrid() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: queryKeys.services,
    queryFn: servicesApi.list,
  });

  if (isLoading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="animate-pulse rounded-3xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="aspect-[16/10] w-full rounded-2xl bg-slate-200" />
            <div className="mt-5 h-4 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-6 w-3/4 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-full rounded bg-slate-200" />
            <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        <p className="font-bold">Could not load cleaning services.</p>
        <p className="mt-1 text-sm text-red-600">Please check your internet connection or try again shortly.</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center text-slate-600">
        <p className="text-lg font-semibold">No cleaning services are currently listed.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((service: Service) => {
        const imageSrc = getServiceImage(service);
        return (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-xl"
          >
            <div>
              {/* Service Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={imageSrc}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category Badge overlay */}
                <span className="absolute top-3 left-3 rounded-full bg-brand-navy/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-300 backdrop-blur-sm shadow-sm">
                  {service.category.replaceAll("_", " ")}
                </span>
              </div>

              {/* Service Details */}
              <div className="px-2 pt-5">
                <h2 className="text-2xl font-bold tracking-tight text-brand-navy transition-colors duration-200 group-hover:text-brand-green">
                  {service.name}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {service.short_description}
                </p>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 px-2 pt-4 text-sm font-bold text-brand-green">
              <span>View Service Details</span>
              <span className="text-lg transition-transform duration-200 group-hover:translate-x-1.5">
                →
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
