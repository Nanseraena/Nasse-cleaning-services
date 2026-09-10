import { Suspense } from "react";
import { CorporateForm } from "@/features/enquiries/corporate-form";

export default function CorporatePage() {
  return (
    <>
      {/* Header Banner */}
      <section className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-green">
            Commercial & Corporate Cleaning
          </p>
          <h1 className="mt-2 text-4xl font-bold text-brand-navy md:text-5xl">
            Commercial cleaning enquiry
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            For offices, commercial facilities, property managers, institutions, and contract cleaning. Share your facility details and property photos to get a tailored proposal.
          </p>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <Suspense fallback={<p className="text-slate-500">Loading corporate form…</p>}>
          <CorporateForm />
        </Suspense>
      </div>
    </>
  );
}
