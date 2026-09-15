import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  description: "Meet Nasse Cleaning Services and discover the care, detail, and dependability behind every space we reset.",
};

const beliefs = [
  {
    title: "Details matter.",
    copy: "The corners, the surfaces, and the places people normally overlook.",
    image: "/images/standard-spray-bottle.png",
    alt: "Professional surface spray bottle with fine cleaning mist",
  },
  {
    title: "Your space deserves respect.",
    copy: "Home, office, or construction site — we treat the space like it's ours.",
    image: "/images/standard-scrub-brush.png",
    alt: "Handcrafted natural bristle scrub brush",
  },
  {
    title: "Reliable means showing up.",
    copy: "Great cleaning only matters when you can depend on the people doing it.",
    image: "/images/standard-soap-bucket.png",
    alt: "Polished stainless cleaning bucket with foaming soap lather and sponges",
  },
  {
    title: "Clean should feel different.",
    copy: "We want you to notice the difference the moment you walk back in.",
    image: "/images/standard-microfiber.png",
    alt: "Neatly stacked microfiber cleaning towels with streak-free cleaner",
  },
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
      <section className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-10 pb-14 md:pt-14 md:pb-20">
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
      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">What clean means to us</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-brand-navy md:text-5xl">
              The standards behind every reset.
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map(({ title, copy, image, alt }, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center px-2 group"
              >
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold leading-snug text-brand-navy">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-width Image Banner ── */}
      <section className="relative min-h-[420px] overflow-hidden bg-brand-navy md:min-h-[540px]">
        <Image
          src="/images/about-workspace-reset.png"
          alt="A professional cleaner making a final check in a freshly prepared workplace"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061a2d]/95 via-[#061a2d]/55 to-transparent" />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1400px] items-center px-4 sm:px-6 lg:px-8 py-12 text-white md:min-h-[540px]">
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
      <section className="bg-[#fbfcf9] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">

          {/* Section header: Heading left, Explore right */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Made for real spaces</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-brand-navy md:text-5xl">
                Care that fits the space.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-bold text-white text-sm hover:bg-brand-green transition-all duration-300 w-fit"
            >
              Explore all services <Arrow />
            </Link>
          </div>

          {/* Image + space list side by side with matched heights */}
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14 items-stretch">

            {/* Left: image matching the height of the right list */}
            <div className="relative min-h-[360px] h-full w-full overflow-hidden rounded-[2rem] bg-slate-200 shadow-md">
              <Image
                src="/images/care-fits-space.jpg"
                alt="A spotless, freshly reset open-plan office space"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Right: space list */}
            <div className="flex flex-col justify-between border-t border-brand-ink/20">
              {spaces.map(([number, title, copy]) => (
                <Link
                  href="/services"
                  key={number}
                  className="group grid items-center gap-4 border-b border-brand-ink/20 py-6 transition-colors hover:bg-white sm:grid-cols-[4rem_1fr_1.5fr_auto]"
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
      <section className="bg-[#edf3e8] py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            Cleaning, without the guesswork
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-brand-navy md:text-5xl">
            A thoughtful process from first look to final reset.
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map(([number, title, copy]) => (
              <div
                key={number}
                className="group relative flex flex-col rounded-3xl bg-white pt-10 pb-7 px-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Floating circle at top center */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-white font-mono shadow-md">
                  {number}
                </div>

                <h3 className="mt-2 text-xl font-bold leading-snug text-brand-navy text-center group-hover:text-brand-green transition-colors">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 text-center">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="bg-white py-14 md:py-20">
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
