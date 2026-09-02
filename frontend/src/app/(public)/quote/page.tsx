import { Suspense } from "react";
import { QuoteForm } from "@/features/quotes/quote-form";
export default function QuotePage() { return <div className="mx-auto max-w-5xl px-6 py-16"><h1 className="text-4xl font-bold text-brand-navy">Request an Estimate</h1><p className="mb-8 mt-3 text-slate-600">Share property details and photos so our team can price the work accurately.</p><Suspense fallback={<p>Loading request form…</p>}><QuoteForm /></Suspense></div>; }
