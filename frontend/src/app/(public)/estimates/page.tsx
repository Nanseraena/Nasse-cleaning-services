import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { CustomerEstimates } from "@/features/quotes/customer-estimates";
import { ListItemsSkeleton } from "@/components/common/loading-skeletons";

export const metadata: Metadata = {
  title: "Cleaning Estimates & Quotes",
  description: "View and accept price estimates for your requested cleaning services.",
};

export default function EstimatesPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand-navy">Estimates & Quotes</h1>
        </div>
        <Link
          href="/quote"
          className="rounded-full bg-brand-green px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
        >
          + Request New Estimate
        </Link>
      </div>

      <Suspense fallback={<ListItemsSkeleton count={3} />}>
        <CustomerEstimates />
      </Suspense>
    </div>
  );
}
