import { Suspense } from "react";
import Link from "next/link";
import { CustomerEstimates } from "@/features/quotes/customer-estimates";
export default function EstimatesPage(){return <div className="mx-auto max-w-5xl px-6 py-14"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-brand-green">Your account</p><h1 className="mt-2 text-4xl font-bold">Cleaning estimates</h1></div><Link href="/book" className="rounded-full bg-brand-green px-5 py-2.5 font-semibold text-white">New request</Link></div><Suspense fallback={<p>Loading estimates…</p>}><CustomerEstimates/></Suspense></div>}
