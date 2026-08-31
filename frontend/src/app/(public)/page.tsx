import Link from "next/link";
export default function HomePage() {
  return (
    <section className="mx-auto grid min-h-[70vh] max-w-6xl place-items-center px-6 py-20 text-center">
      <div className="max-w-3xl">
        <p className="mb-4 font-semibold uppercase tracking-[0.25em] text-brand-green">Professional cleaning for every space</p>
        <h1 className="text-5xl font-bold leading-tight text-brand-navy md:text-7xl">Your Mess, <span className="text-brand-green">Our Magic.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">Residential, commercial, post-construction and facility care—handled with consistent standards and attention to detail.</p>
        <div className="mt-8 flex justify-center gap-4"><Link className="rounded-full bg-brand-navy px-6 py-3 text-white" href="/quote">Request a Quote</Link><Link className="rounded-full border px-6 py-3" href="/services">Explore Services</Link></div>
      </div>
    </section>
  );
}
