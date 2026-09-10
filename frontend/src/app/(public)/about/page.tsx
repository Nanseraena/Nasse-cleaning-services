import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Meet Nasse Cleaning Services and discover the care, detail, and dependability behind every space we reset.",
};

const beliefs = [
  ["01", "Details matter.", "The corners, the surfaces, and the places people normally overlook."],
  ["02", "Your space deserves respect.", "Home, office, or construction site — we treat the space like it's ours."],
  ["03", "Reliable means showing up.", "Great cleaning only matters when you can depend on the people doing it."],
  ["04", "Clean should feel different.", "We want you to notice the difference the moment you walk back in."],
];

const spaces = [
  ["01", "Homes", "From everyday upkeep to the deep clean you've been putting off."],
  ["02", "Workplaces", "Clean, comfortable spaces for teams, visitors, and customers."],
  ["03", "After Construction", "We handle what's left behind so your new space feels ready to use."],
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
  return (
    <main className="overflow-hidden bg-[#fbfcf9] text-brand-ink">

      {/* ── Hero & Our Story ── */}
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">

          {/* Left: headline + story copy */}
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[.92] tracking-[-0.05em] text-brand-navy">
              We don't just clean spaces.{" "}
              <span className="text-brand-green">We reset them.</span>
            </h1>

            <div className="mt-8 space-y-4">
              <p className="text-base leading-relaxed text-slate-600">
                Founded with a mission to elevate property care across Uganda, Nasse Cleaning Services
                grew from a dedication to pristine living into a premier full-service provider.
              </p>
              <p className="text-base leading-relaxed text-slate-600">
                From residential estates to commercial towers and post-construction handovers, our
                certified cleaning specialists combine eco-friendly products, modern equipment, and
                meticulous standards to deliver flawless resets every single time.
              </p>
              <p className="text-base leading-relaxed text-slate-600">
                Maintaining a clean space shouldn't become another burden in your day — we bring
                dependable, professional cleaning to homes, workplaces, and spaces that need a fresh start.
              </p>
            </div>

            <p className="mt-8 text-4xl font-semibold leading-[.95] tracking-[-0.05em] text-brand-navy md:text-5xl">
              Your Mess,<br />Our Magic. <span className="text-brand-green">✦</span>
            </p>
          </div>

          {/* Right: hero image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-slate-200 shadow-md">
            <Image
              src="/images/about-home-reset.png"
              alt="A calm, freshly reset contemporary living room"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute bottom-5 right-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-wider backdrop-blur shadow-sm">
              Space, restored
            </div>
          </div>
        </div>
      </section>

      {/* ── Standards / Beliefs ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">What clean means to us</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-brand-navy md:text-5xl whitespace-nowrap">
              The standards behind every reset.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map(([number, title, copy]) => (
              <div
                key={number}
                className="rounded-3xl bg-[#fbfcf9] p-6 border border-slate-200/80 flex flex-col"
              >
                <span className="font-mono text-sm font-bold text-brand-green">{number}</span>
                <h3 className="mt-3 text-xl font-bold text-brand-navy">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-width Image Banner ── */}
      <section className="relative min-h-[500px] overflow-hidden bg-brand-navy md:min-h-[600px]">
        <Image
          src="/images/about-workspace-reset.png"
          alt="A professional cleaner making a final check in a freshly prepared workplace"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061a2d]/95 via-[#061a2d]/55 to-transparent" />
        <div className="relative mx-auto flex min-h-[500px] max-w-[1400px] items-center px-4 sm:px-6 lg:px-8 py-16 text-white md:min-h-[600px]">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-300">Spaces, ready for life</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[.96] tracking-[-0.05em] md:text-6xl">
              Homes.<br />Workplaces.<br />New beginnings.
            </h2>
            <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-slate-200">
              We take care of the mess so you can enjoy the space.
            </p>
          </div>
        </div>
      </section>

      {/* ── Care That Fits the Space ── */}
      <section className="bg-[#fbfcf9] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16 items-start">

            {/* Left: image + explore link */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-slate-200 shadow-md">
                <Image
                  src="/images/care-fits-space.jpg"
                  alt="A spotless, freshly reset open-plan office space"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Made for real spaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-brand-navy md:text-4xl">
                  Care that fits the space.
                </h2>
                <Link
                  href="/services"
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-bold text-white text-sm hover:bg-brand-green transition-all duration-300"
                >
                  Explore all services <Arrow />
                </Link>
              </div>
            </div>

            {/* Right: space list */}
            <div className="border-t border-brand-ink/20">
              {spaces.map(([number, title, copy]) => (
                <Link
                  href="/services"
                  key={number}
                  className="group grid items-center gap-4 border-b border-brand-ink/20 py-7 transition-colors hover:bg-white sm:grid-cols-[4rem_1fr_1.5fr_auto]"
                >
                  <span className="font-mono text-sm text-brand-green">{number}</span>
                  <h3 className="text-2xl font-semibold text-brand-navy md:text-3xl">{title}</h3>
                  <p className="text-base leading-7 text-slate-600">{copy}</p>
                  <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Thoughtful Process ── */}
      <section className="bg-[#edf3e8] py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            Cleaning, without the guesswork
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-brand-navy md:text-5xl">
            A thoughtful process from first look to final reset.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, title, copy]) => (
              <div
                key={number}
                className="group relative flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#edf3e8] text-sm font-bold text-brand-green font-mono">
                      {number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Step {number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-xl font-bold leading-snug text-brand-navy group-hover:text-brand-green transition-colors">
                    {title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {copy}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-green">
                  <span>Phase {number}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Ready when you are</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.05em] text-brand-navy md:text-6xl">
            A cleaner space is closer than you think.
          </h2>
          <p className="mt-4 text-lg text-slate-500">Your Mess, Our Magic.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/book" className="rounded-full bg-brand-navy px-8 py-4 font-bold text-white shadow-md hover:bg-brand-green transition-all duration-300">
              Book a cleaning
            </Link>
            <Link href="/quote" className="rounded-full border border-slate-300 bg-white px-8 py-4 font-bold text-brand-navy hover:border-brand-green hover:text-brand-green transition-all duration-300">
              Get a quote
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
