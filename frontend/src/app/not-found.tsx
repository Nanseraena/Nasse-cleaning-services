import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fbfcf9] text-brand-ink flex flex-col justify-between">
      {/* Top Navbar Header */}
      <header className="border-b bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" aria-label="Nasse Cleaning Services home" className="flex items-center">
            <Image
              src="/assests/Nasse_Cleaning_Services_Logo.svg"
              alt="Nasse Cleaning Services"
              width={1508}
              height={993}
              priority
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </Link>
          <Link
            href="/book"
            className="rounded-full bg-brand-green px-5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-opacity-95 transition-all"
          >
            Book a Service
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Container */}
      <section className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-green border border-green-200/60 mb-6">
          <span>✦</span> Page Not Found · Error 404
        </div>

        <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-navy leading-tight">
          This space is sparkling clean, but the page was not found.
        </h1>

        <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
          The link you followed may be broken, expired, or the page has been moved. Let us guide you back to our active services.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-brand-navy px-8 py-4 font-bold text-white shadow-md hover:bg-brand-green transition-all duration-300"
          >
            Return to Homepage
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-slate-300 bg-white px-8 py-4 font-bold text-brand-navy hover:border-brand-green hover:text-brand-green transition-all duration-300 shadow-sm"
          >
            Explore All Services →
          </Link>
        </div>

        {/* Helpful Shortcut Cards */}
        <div className="mt-16 w-full max-w-3xl grid gap-4 sm:grid-cols-3 text-left">
          <Link
            href="/book"
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-green hover:shadow-md transition-all"
          >
            <span className="text-2xl">📅</span>
            <h2 className="mt-3 text-base font-bold text-brand-navy group-hover:text-brand-green">
              Book Cleaning
            </h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Schedule residential or commercial cleaning appointment.
            </p>
          </Link>

          <Link
            href="/areas"
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-green hover:shadow-md transition-all"
          >
            <span className="text-2xl">📍</span>
            <h2 className="mt-3 text-base font-bold text-brand-navy group-hover:text-brand-green">
              Coverage Areas
            </h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Check districts and neighborhoods we serve across Uganda.
            </p>
          </Link>

          <Link
            href="/contact"
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-brand-green hover:shadow-md transition-all"
          >
            <span className="text-2xl">💬</span>
            <h2 className="mt-3 text-base font-bold text-brand-navy group-hover:text-brand-green">
              Contact Support
            </h2>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              Need assistance? Chat directly on WhatsApp or call our team.
            </p>
          </Link>
        </div>
      </section>

      {/* Footer minimal bar */}
      <footer className="border-t border-slate-200/70 bg-white py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Nasse Cleaning Services Ltd. All rights reserved.</p>
      </footer>
    </main>
  );
}
