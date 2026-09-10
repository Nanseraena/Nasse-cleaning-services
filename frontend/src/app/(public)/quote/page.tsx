import { Suspense } from "react";
import { QuoteForm } from "@/features/quotes/quote-form";
export default function QuotePage() { return <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-10 md:py-14"><h1 className="text-4xl font-bold text-brand-navy">Request an Estimate</h1><p className="mb-8 mt-3 text-slate-600">Share property details and photos so our team can price the work accurately.</p><Suspense fallback={<p>Loading request form…</p>}><QuoteForm /></Suspense></div>; }

