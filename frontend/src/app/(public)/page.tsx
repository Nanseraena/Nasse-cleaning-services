import Link from "next/link";
export default function HomePage() {
  return (
    <section className="mx-auto grid min-h-[70vh] w-full max-w-[1400px] place-items-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
      <div className="max-w-3xl">
        <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-brand-green">Professional cleaning for every space</p>
        <h1 className="text-5xl font-bold leading-tight text-brand-navy md:text-7xl">Your Mess, <span className="text-brand-green">Our Magic.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">Residential, commercial, post-construction and facility care—handled with consistent standards and attention to detail.</p>
        <div className="mt-8 flex justify-center gap-4"><Link className="rounded-full bg-brand-navy px-6 py-3 font-semibold text-white hover:bg-opacity-90 transition" href="/quote">Request a Quote</Link><Link className="rounded-full border border-slate-300 px-6 py-3 font-semibold hover:border-slate-400 transition" href="/services">Explore Services</Link></div>
      </div>
    </section>
  );
}

