"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { ServiceDetailSkeleton } from "@/components/common/loading-skeletons";
import { RichTextContent } from "@/components/common/rich-text-content";
import { ServiceNavigation } from "./service-navigation";
import { ServicesFaq } from "./services-faq";

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

export function ServiceDetail({ slug }: { slug: string }) {
  const {
    data: service,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services", slug],
    queryFn: () => servicesApi.detail(slug),
  });

  if (isLoading) {
    return <ServiceDetailSkeleton />;
  }

  if (isError || !service) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-brand-navy">Service not found</h1>
        <p className="mt-3 text-slate-600">The requested cleaning service could not be found.</p>
        <Link
          href="/services"
          className="mt-6 inline-block rounded-full bg-brand-navy px-6 py-3 font-semibold text-white hover:bg-brand-green transition-colors"
        >
          View all services
        </Link>
      </div>
    );
  }

  const imageSrc = getServiceImage(service);

  return (
    <>
      {/* Service Header Banner */}
      <section className="bg-slate-50 border-b border-slate-200/70">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <nav className="text-sm font-medium text-slate-500">
            <Link href="/services" className="hover:text-brand-green transition-colors">
              Services
            </Link>
            <span className="px-2">/</span>
            <span className="text-brand-navy">{service.name}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
                {service.category.replaceAll("_", " ")}
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
                {service.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                {service.short_description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/book?service=${service.id}`}
                  className="rounded-full bg-brand-green px-7 py-3.5 font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
                >
                  Book this service
                </Link>
                <Link
                  href={`/quote?service=${service.id}`}
                  className="rounded-full border border-slate-300 bg-white px-7 py-3.5 font-bold text-brand-navy hover:border-brand-green hover:text-brand-green transition-all"
                >
                  Request a Quote
                </Link>
              </div>
            </div>

            {/* Service Featured Photo */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-200 shadow-md">
              <Image
                src={imageSrc}
                alt={service.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-6 lg:px-8 py-14 lg:grid-cols-[minmax(0,3fr)_minmax(280px,1.2fr)] lg:items-start">
        <article>
          <h2 className="text-3xl font-bold text-brand-navy">
            A cleaning plan built around your space
          </h2>
          <RichTextContent
            html={service.description || service.short_description}
            className="mt-5 text-base leading-8 text-slate-600"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Flexible scheduling & recurring plans",
              "Trained, vetted cleaning team",
              "Clear checklists & quality guarantees",
              "Custom transparent estimate for your space",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-2xl bg-green-50/80 p-4 font-semibold text-brand-navy border border-green-100"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-green text-xs font-bold text-white">
                  ✓
                </span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl bg-brand-navy p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold">Let us take cleaning off your list</h3>
            <p className="mt-3 text-slate-200 leading-relaxed">
              Tell us about your property and we’ll recommend the right cleaning schedule and team.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={`/book?service=${service.id}`}
                className="rounded-full bg-brand-green px-6 py-3 font-bold text-white hover:bg-opacity-95 transition-all"
              >
                Book this service
              </Link>
              <Link
                href={`/quote?service=${service.id}`}
                className="rounded-full border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10 transition-all"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </article>

        <ServiceNavigation activeSlug={service.slug} />
      </div>

      <ServicesFaq />
    </>
  );
}
