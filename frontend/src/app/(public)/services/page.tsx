import type { Metadata } from "next";
import { ServiceGrid } from "@/features/services/service-grid";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description: "Explore Nasse Cleaning Services: residential house cleaning, deep cleaning, commercial office care, and post-construction cleaning in Uganda.",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#fbfcf9] text-brand-ink min-h-screen">
      {/* Services Hero Section */}
      <section className="bg-slate-50/80 border-b border-slate-200/70">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            Tailored property care
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
            Our Cleaning Services
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
            From scheduled home maintenance and deep cleans to corporate facilities and post-construction handovers, select a service below to explore our detailed cleaning scope and get an instant quote.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <ServiceGrid />
      </section>
    </main>
  );
}
