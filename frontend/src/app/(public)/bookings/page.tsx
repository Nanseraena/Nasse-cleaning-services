import { Suspense } from "react";
import Link from "next/link";
import { BookingHistory } from "@/features/bookings/booking-history";
export default function BookingsPage(){return <div className="mx-auto max-w-5xl px-6 py-14"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-brand-green">Your account</p><h1 className="mt-2 text-4xl font-bold text-brand-navy">Your bookings</h1></div><Link href="/book" className="rounded-full bg-brand-green px-5 py-2.5 font-semibold text-white">New booking</Link></div><Suspense fallback={<p>Loading bookings…</p>}><BookingHistory/></Suspense></div>}
