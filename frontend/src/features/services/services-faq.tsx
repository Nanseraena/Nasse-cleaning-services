"use client";

import { useState } from "react";

const questions = [
  { question: "How often can I schedule a cleaning service?", answer: "Choose a one-time, weekly, bi-weekly, or monthly schedule. We’ll help you select a frequency that fits your space, routine, and budget." },
  { question: "How much will my cleaning service cost?", answer: "Pricing depends on the service, property size, condition, location, and cleaning frequency. Request a quote and our team will provide an estimate based on your needs." },
  { question: "Can I customize what the cleaning team handles?", answer: "Yes. Tell us which rooms, surfaces, or priority areas need attention when requesting your quote, and we’ll shape the service around those requirements." },
  { question: "Do you provide cleaning supplies and equipment?", answer: "Our team can arrive with the supplies and equipment needed for the agreed service. Let us know about delicate surfaces, allergies, or product preferences in advance." },
];

export function ServicesFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <section className="mx-auto max-w-4xl px-6 py-16">
    <div className="text-center"><p className="text-sm font-bold uppercase tracking-widest text-brand-green">Helpful answers</p><h2 className="mt-2 text-3xl font-bold text-brand-navy">Cleaning Services FAQ</h2></div>
    <div className="mt-8 border-t border-slate-200">{questions.map((item, index) => {
      const open = openIndex === index;
      const panelId = `service-faq-${index}`;
      return <div key={item.question} className="border-b border-slate-200"><button type="button" onClick={() => setOpenIndex(open ? null : index)} aria-expanded={open} aria-controls={panelId} className="flex w-full items-center justify-between gap-6 py-5 text-left font-bold text-brand-navy"><span>{item.question}</span><span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 text-xl text-brand-green">{open ? "−" : "+"}</span></button>{open && <div id={panelId} className="pb-6 pr-12 leading-7 text-slate-600">{item.answer}</div>}</div>;
    })}</div>
  </section>;
}
