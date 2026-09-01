"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Category = "All" | "Booking" | "Services" | "Preparing" | "Changes" | "Account";
type Faq = { category: Exclude<Category, "All">; question: string; answer: string };

const categories: Category[] = ["All", "Booking", "Services", "Preparing", "Changes", "Account"];
const faqs: Faq[] = [
  { category: "Booking", question: "How do I request a cleaning service?", answer: "Choose Request a Quote, select the service you are interested in, and tell us about your property. A Nasse team member will review the details and contact you to confirm the scope, schedule, and estimate." },
  { category: "Booking", question: "Why do I need an account before submitting a request?", answer: "Browsing is open to everyone. We ask you to sign in only when creating a quote, corporate enquiry, or contact message so your personal information and requests remain connected to your account." },
  { category: "Booking", question: "How is my cleaning price calculated?", answer: "Quotes consider the selected service, property type, size, condition, location, cleaning frequency, and any special requirements. This lets us provide a price based on the work your space actually needs." },
  { category: "Booking", question: "Can I choose recurring or one-time cleaning?", answer: "Yes. You can request a one-time, weekly, bi-weekly, or monthly clean. If you are unsure, describe your routine and we will help you choose a practical schedule." },
  { category: "Services", question: "Which types of spaces does Nasse clean?", answer: "Our catalogue covers homes, apartments and condos, offices, commercial premises, post-construction spaces, move-in and move-out cleaning, deep cleaning, and ongoing facility care." },
  { category: "Services", question: "Can the cleaning plan be customized?", answer: "Yes. Use the notes section of your request to identify priority rooms, surfaces, access requirements, or areas that need special attention. We will confirm what can be included before the service begins." },
  { category: "Services", question: "Does Nasse provide cleaning supplies and equipment?", answer: "Our team can bring the supplies and equipment agreed for the job. Tell us beforehand about allergies, delicate materials, restricted products, or site-specific safety requirements." },
  { category: "Services", question: "Do you handle commercial and corporate contracts?", answer: "Yes. The corporate enquiry form collects details about your company, facility, approximate size, preferred frequency, and expected start date so we can discuss an appropriate service plan." },
  { category: "Preparing", question: "How should I prepare before the cleaning team arrives?", answer: "Secure valuables, remove personal clutter where practical, provide clear access instructions, and tell us about fragile items or areas that should not be entered. This helps the team focus on cleaning efficiently." },
  { category: "Preparing", question: "What should I do about pets or security systems?", answer: "Let us know about pets and arrange a safe space for them during the visit. If the property has controlled entry or an alarm, provide access instructions securely when the booking is confirmed." },
  { category: "Preparing", question: "Do I need to be present during the service?", answer: "Not always. Attendance and access arrangements depend on the property and agreed service. We will confirm the safest handover and access process with you beforehand." },
  { category: "Changes", question: "How do I reschedule or cancel a cleaning?", answer: "Contact Nasse as soon as you know your plans have changed. Provide the booking details and preferred alternative dates so the team can confirm availability and explain any applicable terms." },
  { category: "Changes", question: "Can I add rooms or extra work to an existing request?", answer: "Yes, provided the change is confirmed before the visit. Extra areas may affect the time, equipment, staffing, and quoted price, so contact us early enough to update the service scope." },
  { category: "Changes", question: "What if I am unhappy with an area that was cleaned?", answer: "Contact us promptly with the service details and a clear description of the concern. We will review it with the team and agree on the appropriate next step." },
  { category: "Account", question: "I forgot my password. How do I regain access?", answer: "Select Forgot password on the sign-in page. We will email a secure, time-limited reset link to the address connected to your account. The link can only be used once." },
  { category: "Account", question: "How is my personal information protected?", answer: "Authentication tokens are stored in HttpOnly cookies rather than browser storage. Personal-data submissions require authentication, and password-reset responses do not reveal whether an email address has an account." },
];

export function FaqExplorer() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0].question);
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return faqs.filter((faq) => (category === "All" || faq.category === category) && (!normalized || `${faq.question} ${faq.answer}`.toLowerCase().includes(normalized)));
  }, [category, query]);

  return <>
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-green/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-6 py-20 text-center"><p className="text-sm font-bold uppercase tracking-[0.25em] text-green-300">Nasse Help Centre</p><h1 className="mt-4 text-4xl font-bold md:text-6xl">Frequently asked questions</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">Quick, practical answers about booking, preparing your space, changing a service, and managing your account.</p><label className="relative mx-auto mt-9 block max-w-2xl"><span className="sr-only">Search frequently asked questions</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="m20 20-4-4" /></svg><input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setOpenQuestion(null); }} placeholder="Search questions, services, or account help…" className="w-full rounded-full border-0 bg-white py-4 pl-14 pr-6 text-brand-navy shadow-xl outline-none ring-brand-green focus:ring-4" /></label></div>
    </section>
    <section className="mx-auto max-w-5xl px-6 py-14">
      <div className="flex flex-wrap justify-center gap-2" aria-label="FAQ categories">{categories.map((item) => <button key={item} type="button" onClick={() => { setCategory(item); setOpenQuestion(null); }} aria-pressed={category === item} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${category === item ? "bg-brand-green text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{item}</button>)}</div>
      <div className="mt-10 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-brand-green">{category === "All" ? "All topics" : category}</p><h2 className="mt-1 text-3xl font-bold text-brand-navy">Answers you can act on</h2></div><p aria-live="polite" className="text-sm text-slate-500">{results.length} {results.length === 1 ? "answer" : "answers"}</p></div>
      {results.length ? <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{results.map((faq) => {
        const open = openQuestion === faq.question;
        const id = `faq-${faqs.indexOf(faq)}`;
        return <article key={faq.question} className="border-b border-slate-200 last:border-0"><button type="button" onClick={() => setOpenQuestion(open ? null : faq.question)} aria-expanded={open} aria-controls={id} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8"><span><span className="mb-1 block text-xs font-bold uppercase tracking-widest text-brand-green">{faq.category}</span><strong className="text-lg text-brand-navy">{faq.question}</strong></span><span aria-hidden="true" className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${open ? "rotate-45 bg-brand-green text-white" : "bg-slate-100 text-brand-navy"}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path strokeLinecap="round" d="M12 5v14M5 12h14" /></svg></span></button>{open && <div id={id} className="px-6 pb-6 leading-7 text-slate-600 md:px-8 md:pr-24">{faq.answer}</div>}</article>;
      })}</div> : <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center"><h3 className="text-xl font-bold text-brand-navy">No matching questions</h3><p className="mt-2 text-slate-600">Try a different search or ask our team directly.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-5 rounded-full bg-brand-navy px-5 py-2.5 font-semibold text-white">Clear search</button></div>}
    </section>
    <section className="mx-auto max-w-5xl px-6 pb-20"><div className="grid overflow-hidden rounded-3xl bg-green-50 md:grid-cols-[1.3fr_1fr]"><div className="p-8 md:p-10"><p className="text-sm font-bold uppercase tracking-widest text-brand-green">Still need help?</p><h2 className="mt-2 text-3xl font-bold text-brand-navy">Let’s talk about your space</h2><p className="mt-4 max-w-xl leading-7 text-slate-600">Our team can answer questions that are specific to your property, schedule, or cleaning requirements.</p></div><div className="flex flex-col justify-center gap-3 bg-brand-green p-8"><Link href="/contact" className="rounded-full bg-white px-6 py-3 text-center font-bold text-brand-navy">Contact Nasse</Link><Link href="/quote" className="rounded-full border border-white/70 px-6 py-3 text-center font-bold text-white">Request a Quote</Link></div></div></section>
  </>;
}
