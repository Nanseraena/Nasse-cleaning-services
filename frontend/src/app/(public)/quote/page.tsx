import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/features/quotes/quote-form";

export const metadata: Metadata = {
  title: "Request an Estimate",
  description: "Request a custom cleaning estimate with photo attachments from Nasse Cleaning Services.",
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200/70">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
            Free Estimate & Quote
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-brand-navy md:text-5xl">
            Request an Estimate
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
            Share property details and photos so our team can assess the scope and provide a clear, transparent price estimate.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Suspense fallback={<p className="text-slate-500">Loading estimate form…</p>}>
          <QuoteForm mode="quote" />
        </Suspense>
      </div>
    </>
  );
}
