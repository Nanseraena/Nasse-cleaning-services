import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Meet Nasse Cleaning Services and discover the care, detail, and dependability behind every space we reset.",
};

const beliefs = [
  ["01", "Details matter.", "The corners, the surfaces, and the places people normally overlook."],
  ["02", "Your space deserves respect.", "Home, office, or construction site—we treat the space like it’s ours."],
  ["03", "Reliable means showing up.", "Great cleaning only matters when you can depend on the people doing it."],
  ["04", "Clean should feel different.", "We want you to notice the difference the moment you walk back in."],
];

const spaces = [
  ["01", "Homes", "From everyday upkeep to the deep clean you’ve been putting off."],
  ["02", "Workplaces", "Clean, comfortable spaces for teams, visitors, and customers."],
  ["03", "After Construction", "We handle what’s left behind so your new space feels ready to use."],
  ["04", "Facility Care", "Dependable ongoing cleaning for spaces that need consistent attention."],
];

const process = [
  ["01", "Tell us what you need.", "Choose a service and share the details that make your space unique."],
  ["02", "Show us your space.", "Add up to five photos so we can understand the job before we arrive."],
  ["03", "Get your quote.", "Our team reviews your request and sends a clear estimate for approval."],
  ["04", "We make the magic happen.", "Accept your quote, confirm the time, and leave the reset to us."],
];

function Arrow() {
  return <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span>;
}

export default function AboutPage() {
  return <main className="overflow-hidden bg-[#fbfcf9] text-brand-ink">
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 md:pb-28 md:pt-16">
      <div className="flex items-center justify-between border-t border-brand-ink/20 pt-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        <span>About Nasse</span><span>01 — Our story</span>
      </div>
      <div className="mt-12 grid items-end gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div className="pb-2">
          <h1 className="max-w-3xl text-[clamp(3.7rem,8vw,7.5rem)] font-semibold leading-[.86] tracking-[-0.065em] text-brand-navy">We don’t just clean spaces. <span className="text-brand-green">We reset them.</span></h1>
          <p className="mt-9 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">Nasse exists to make clean, comfortable spaces easier to come home to, work in, and enjoy.</p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-200">
          <Image src="/images/about-home-reset.png" alt="A calm, freshly reset contemporary living room" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          <div className="absolute bottom-5 right-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur">Space, restored</div>
        </div>
      </div>
    </section>

    <section className="border-y border-brand-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[2fr_3fr]">
        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Our story</p><p className="mt-14 max-w-sm text-5xl font-semibold leading-[.95] tracking-[-0.05em] text-brand-navy md:text-7xl">Your Mess,<br/>Our Magic. <span className="text-brand-green">✦</span></p></div>
        <div className="lg:pt-12"><h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] text-brand-navy md:text-6xl">Cleaning should feel effortless.</h2><div className="mt-9 grid gap-6 text-lg leading-8 text-slate-600 md:grid-cols-2"><p>Nasse was created around a simple belief: maintaining a clean space shouldn’t become another burden in your day.</p><p>We bring dependable, professional cleaning to homes, workplaces, and spaces that need a fresh start.</p></div></div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">What clean means to us</p><h2 className="mt-5 max-w-sm text-4xl font-semibold tracking-[-0.04em] text-brand-navy md:text-5xl">The standards behind every reset.</h2></div><div className="border-t border-brand-ink/20">{beliefs.map(([number,title,copy])=><article key={number} className="grid gap-3 border-b border-brand-ink/20 py-7 sm:grid-cols-[4rem_1fr_1.25fr] sm:gap-6"><span className="font-mono text-sm text-brand-green">{number}</span><h3 className="text-2xl font-semibold text-brand-navy">{title}</h3><p className="leading-7 text-slate-600">{copy}</p></article>)}</div></div>
    </section>

    <section className="relative min-h-[600px] overflow-hidden bg-brand-navy md:min-h-[720px]">
      <Image src="/images/about-workspace-reset.png" alt="A professional cleaner making a final check in a freshly prepared workplace" fill sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061a2d]/95 via-[#061a2d]/55 to-transparent" />
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-5 py-24 text-white sm:px-8 md:min-h-[720px]"><div className="max-w-xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-green-300">Spaces, ready for life</p><h2 className="mt-5 text-5xl font-semibold leading-[.96] tracking-[-0.05em] md:text-7xl">Homes.<br/>Workplaces.<br/>New beginnings.</h2><p className="mt-7 max-w-md text-lg leading-8 text-slate-200">We take care of the mess so you can enjoy the space.</p></div></div>
    </section>

    <section className="bg-white"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Made for real spaces</p><h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-brand-navy md:text-6xl">Care that fits the space.</h2></div><Link href="/services" className="group flex items-center gap-3 font-bold text-brand-navy">Explore all services <Arrow/></Link></div><div className="mt-14 border-t border-brand-ink/20">{spaces.map(([number,title,copy])=><Link href="/services" key={number} className="group grid items-center gap-4 border-b border-brand-ink/20 py-7 transition-colors hover:bg-[#f6f9f2] sm:grid-cols-[4rem_1fr_1.5fr_auto]"><span className="font-mono text-sm text-brand-green">{number}</span><h3 className="text-2xl font-semibold text-brand-navy md:text-3xl">{title}</h3><p className="max-w-lg leading-7 text-slate-600">{copy}</p><Arrow/></Link>)}</div></div></section>

    <section className="bg-[#edf3e8]"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32"><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Cleaning, without the guesswork</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-brand-navy md:text-6xl">A thoughtful process from first look to final reset.</h2><div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-brand-navy/15 sm:grid-cols-2 lg:grid-cols-4">{process.map(([number,title,copy])=><article key={number} className="min-h-72 bg-[#edf3e8] p-7"><span className="font-mono text-sm font-bold text-brand-green">{number}</span><h3 className="mt-16 text-2xl font-semibold leading-tight text-brand-navy">{title}</h3><p className="mt-4 leading-7 text-slate-600">{copy}</p></article>)}</div></div></section>

    <section className="bg-white px-5 py-24 sm:px-8 md:py-36"><div className="mx-auto max-w-6xl border-y border-brand-ink/20 py-20 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Ready when you are</p><h2 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-0.05em] text-brand-navy md:text-7xl">A cleaner space is closer than you think.</h2><p className="mt-6 text-xl text-slate-500">Your Mess, Our Magic.</p><div className="mt-9 flex flex-wrap justify-center gap-3"><Link href="/book" className="rounded-full bg-brand-navy px-7 py-3.5 font-bold text-white">Book a cleaning</Link><Link href="/quote" className="rounded-full border border-brand-ink/25 px-7 py-3.5 font-bold text-brand-navy">Get a quote</Link></div></div></section>
  </main>;
}
