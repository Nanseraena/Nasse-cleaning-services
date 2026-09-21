import type { Metadata } from "next";
import { Suspense } from "react";
import { QuoteForm } from "@/features/quotes/quote-form";

export const metadata: Metadata = {
  title: "Book a Cleaning Service",
  description: "Schedule your professional cleaning service with Nasse Cleaning Services in Uganda.",
};

export default function BookPage() {
  return (
    <>
      <section className="bg-slate-50 border-b border-slate-200/70">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">
            Direct Service Booking
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-brand-navy md:text-5xl">
            Book a Cleaning Service
          </h1>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-slate-600">
            Select your preferred cleaning schedule, service area, and property details. Your booking will appear immediately in your account as <strong>Pending</strong> while our team reviews the scope and estimate.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Suspense fallback={<p className="text-slate-500">Loading booking form…</p>}>
          <QuoteForm mode="book" />
        </Suspense>
      </div>
    </>
  );
}
