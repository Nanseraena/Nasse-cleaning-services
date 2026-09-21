import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { BookingHistory } from "@/features/bookings/booking-history";
import { ListItemsSkeleton } from "@/components/common/loading-skeletons";

export const metadata: Metadata = {
  title: "Your Bookings",
  description: "View and manage your scheduled cleaning appointments with Nasse Cleaning Services.",
};

export default function BookingsPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-green">Your account</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-brand-navy">Your Bookings</h1>
        </div>
        <Link
          href="/book"
          className="rounded-full bg-brand-green px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
        >
          + Book New Service
        </Link>
      </div>

      <Suspense fallback={<ListItemsSkeleton count={3} />}>
        <BookingHistory />
      </Suspense>
    </div>
  );
}
