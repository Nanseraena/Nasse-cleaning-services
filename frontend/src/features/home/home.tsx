"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { areasApi } from "@/lib/api/areas";
import { queryKeys } from "@/lib/query/keys";

// ── Types & Data ──

// Clean vector illustrations matching the exact style of The Cleaning Authority card icons
function HouseIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
      <rect x="18" y="32" width="44" height="34" rx="2" fill="#BAE6FD" />
      <polygon points="40,12 12,34 68,34" fill="#0284C7" />
      <rect x="52" y="18" width="8" height="12" fill="#0369A1" />
      <rect x="34" y="44" width="12" height="22" rx="1" fill="#FDE047" />
      <rect x="22" y="38" width="9" height="9" rx="1" fill="#FFFFFF" />
      <rect x="49" y="38" width="9" height="9" rx="1" fill="#FFFFFF" />
      <circle cx="12" cy="62" r="8" fill="#86EFAC" />
      <circle cx="68" cy="62" r="8" fill="#86EFAC" />
    </svg>
  );
}

function ApartmentIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
      <rect x="16" y="24" width="28" height="42" rx="2" fill="#0284C7" />
      <rect x="38" y="14" width="28" height="52" rx="2" fill="#38BDF8" />
      {/* Windows Building 1 */}
      <rect x="20" y="28" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="28" y="28" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="20" y="36" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="28" y="36" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="20" y="44" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="28" y="44" width="5" height="5" rx="1" fill="#FFFFFF" />
      {/* Windows Building 2 */}
      <rect x="43" y="18" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="51" y="18" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="43" y="26" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="51" y="26" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="43" y="34" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="51" y="34" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="43" y="42" width="5" height="5" rx="1" fill="#FFFFFF" />
      <rect x="51" y="42" width="5" height="5" rx="1" fill="#FFFFFF" />
      <circle cx="70" cy="62" r="6" fill="#86EFAC" />
    </svg>
  );
}

function MoveTruckIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
      <rect x="12" y="24" width="38" height="32" rx="3" fill="#0284C7" />
      <path d="M50 32H64L70 42V56H50V32Z" fill="#38BDF8" />
      <rect x="53" y="35" width="9" height="8" rx="1" fill="#FFFFFF" />
      <circle cx="25" cy="58" r="7" fill="#0F172A" />
      <circle cx="25" cy="58" r="3.5" fill="#38BDF8" />
      <circle cx="60" cy="58" r="7" fill="#0F172A" />
      <circle cx="60" cy="58" r="3.5" fill="#38BDF8" />
    </svg>
  );
}

function CleaningBucketIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
      <path d="M22 34L26 62C26 64 28 66 31 66H49C52 66 54 64 54 62L58 34H22Z" fill="#0284C7" />
      {/* Spray bottle */}
      <rect x="25" y="16" width="9" height="18" rx="2" fill="#BAE6FD" />
      <rect x="27" y="11" width="5" height="5" fill="#0284C7" />
      <path d="M24 13H35L33 16H26L24 13Z" fill="#0369A1" />
      {/* Brush / Mop head */}
      <rect x="42" y="12" width="5" height="22" rx="1" fill="#FDE047" />
      <rect x="40" y="8" width="9" height="4" rx="1" fill="#86EFAC" />
      {/* Yellow Cloth hanging */}
      <path d="M30 34C30 34 32 46 36 48C40 50 42 42 42 34H30Z" fill="#FACC15" />
      {/* Bubbles */}
      <circle cx="50" cy="20" r="3" fill="#BAE6FD" />
      <circle cx="56" cy="26" r="4.5" fill="#BAE6FD" />
    </svg>
  );
}

function OfficeBuildingIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
      <rect x="20" y="16" width="40" height="50" rx="3" fill="#0369A1" />
      <rect x="26" y="22" width="8" height="6" rx="1" fill="#BAE6FD" />
      <rect x="38" y="22" width="8" height="6" rx="1" fill="#BAE6FD" />
      <rect x="50" y="22" width="4" height="6" rx="1" fill="#BAE6FD" />
      <rect x="26" y="32" width="8" height="6" rx="1" fill="#BAE6FD" />
      <rect x="38" y="32" width="8" height="6" rx="1" fill="#BAE6FD" />
      <rect x="50" y="32" width="4" height="6" rx="1" fill="#BAE6FD" />
      <rect x="26" y="42" width="8" height="6" rx="1" fill="#BAE6FD" />
      <rect x="38" y="42" width="8" height="6" rx="1" fill="#BAE6FD" />
      <rect x="50" y="42" width="4" height="6" rx="1" fill="#BAE6FD" />
      <rect x="34" y="52" width="12" height="14" rx="1" fill="#FFFFFF" />
    </svg>
  );
}

function ConstructionIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16" fill="none">
      {/* Hard hat */}
      <path d="M22 42C22 28 30 22 40 22C50 22 58 28 58 42H22Z" fill="#FBBF24" />
      <rect x="18" y="42" width="44" height="6" rx="2" fill="#D97706" />
      <rect x="37" y="20" width="6" height="22" fill="#D97706" />
      {/* Sparkles */}
      <polygon points="64,18 66,23 71,25 66,27 64,32 62,27 57,25 62,23" fill="#38BDF8" />
      <polygon points="18,22 19,26 23,27 19,28 18,32 17,28 13,27 17,26" fill="#38BDF8" />
    </svg>
  );
}

const SERVICES_WE_OFFER = [
  {
    title: "House Cleaning & Sanitizing",
    slug: "house-cleaning",
    description: "Our unique Detail-Clean Rotation System® ensures that your home is cleaned to the highest standard.",
    renderIcon: HouseIcon,
  },
  {
    title: "Apartment Cleaning & Sanitizing",
    slug: "apartment-condo-cleaning",
    description: "Our thorough apartment cleaning services never miss the little details in your space!",
    renderIcon: ApartmentIcon,
  },
  {
    title: "Move In / Move Out Cleaning",
    slug: "post-move-cleaning",
    description: "Moving can be messy but our cleaning professionals ensure a spotless clean.",
    renderIcon: MoveTruckIcon,
  },
  {
    title: "One-Time Cleaning Services",
    slug: "deep-cleaning",
    description: "We proudly offer customizable one-time cleaning programs to suit your needs.",
    renderIcon: CleaningBucketIcon,
  },
  {
    title: "Office & Commercial Cleaning",
    slug: "office-cleaning",
    description: "Keep your workplace spotless, sanitized, and inspiring for both employees and clients.",
    renderIcon: OfficeBuildingIcon,
  },
  {
    title: "Post-Construction Handover",
    slug: "post-construction-cleaning",
    description: "Heavy-duty removal of silica dust, paint residue, and debris ready for fresh handover.",
    renderIcon: ConstructionIcon,
  },
];

// Zones shown in the interactive "Explore What We Clean in Each Zone" showcase.
// Swap the `image` paths for real assets when available.
const ZONES = [
  {
    id: "kitchen",
    name: "Kitchen",
    image: "/images/zone-kitchen.png",
    badge: "Deep Clean Zone",
    tagline: "Grease, grime, and limescale don't stand a chance in our rotation.",
    deepCleanHighlights: [
      "Interior appliance detailing (oven, fridge, microwave)",
      "Cabinet fronts & handles degreased",
      "Backsplash and grout scrubbed",
      "Range hood and filter cleaned",
    ],
    routineHighlights: [
      "Counters & sink wiped and sanitized",
      "Stovetop cleaned",
      "Floors swept and mopped",
      "Trash emptied",
    ],
  },
  {
    id: "bathrooms",
    name: "Bathrooms",
    image: "/images/zone-bathrooms.png",
    badge: "Deep Clean Zone",
    tagline: "Hospital-grade sanitation for every tile, tap, and tub.",
    deepCleanHighlights: [
      "Grout and tile deep-scrubbed",
      "Shower door tracks & glass descaled",
      "Behind-toilet and base detailing",
      "Exhaust fan and vents dusted",
    ],
    routineHighlights: [
      "Toilet, sink & shower sanitized",
      "Mirrors polished",
      "Floors mopped",
      "Towels refreshed and folded",
    ],
  },
  {
    id: "living",
    name: "Living Areas",
    image: "/images/zone-living.png",
    badge: "Deep Clean Zone",
    tagline: "Baseboards, corners, and hidden dust — nowhere to hide.",
    deepCleanHighlights: [
      "Baseboards and door frames wiped",
      "High dusting (light fixtures, ceiling fans)",
      "Under-furniture vacuuming",
      "Upholstery and cushions freshened",
    ],
    routineHighlights: [
      "Surfaces dusted",
      "Floors vacuumed/mopped",
      "Cushions straightened",
      "Cobwebs cleared",
    ],
  },
  {
    id: "bedrooms",
    name: "Bedrooms",
    image: "/images/zone-bedrooms.png",
    badge: "Deep Clean Zone",
    tagline: "A reset space for real rest.",
    deepCleanHighlights: [
      "Under-bed vacuuming",
      "Baseboards and window sills wiped",
      "Closet fronts organized and dusted",
      "Mattress edges vacuumed",
    ],
    routineHighlights: [
      "Bed made / linens straightened",
      "Surfaces dusted",
      "Floors vacuumed",
      "Trash emptied",
    ],
  },
];

const REVIEWS = [
  {
    quote: "Nasse completely transformed our 4-bedroom house in Kololo before our family gathering. The team was punctual, respectful, and every single bathroom smelled like a 5-star hotel. Outstanding work!",
    author: "Grace M.",
    location: "Kololo, Kampala",
    service: "Residential Deep Clean",
    rating: 5,
  },
  {
    quote: "Managing our corporate head office cleaning used to be a constant headache until we contracted Nasse. Their daily team is thorough, professional, and our workspaces are always pristine before 7:30 AM.",
    author: "David K.",
    location: "Nakasero, Kampala",
    service: "Corporate Office Cleaning",
    rating: 5,
  },
  {
    quote: "We used their post-construction service after renovating our bungalow in Wakiso. The amount of fine cement dust they removed was unbelievable. Worth every single shilling.",
    author: "Sarah N.",
    location: "Kira, Wakiso",
    service: "Post-Construction Handover",
    rating: 5,
  },
];

const FAQS = [
  {
    q: "How does the Nasse Detail-Clean Rotation System work?",
    a: "During our first two visits, we perform an intensive deep clean across your entire property. Visit 1 deeply cleans your kitchen and bathrooms while thoroughly cleaning the rest of the home. Visit 2 deeply cleans your living and sleeping zones. After that, we put your home on a continuous rotation where one key zone receives a deep detail clean on every visit while the rest of your home receives our comprehensive standard clean.",
  },
  {
    q: "Do I need to supply detergents, cloths, or cleaning equipment?",
    a: "Not at all! Our professional teams arrive fully equipped with commercial-grade vacuums, microfibers, scrubbers, steams, and eco-friendly, hospital-grade cleaning solutions. If you have specific preferred detergents for specialized floors or finishes, we are happy to accommodate them.",
  },
  {
    q: "Are your cleaning specialists background-checked and trained?",
    a: "Yes, 100%. Every Nasse cleaning specialist undergoes rigorous vetting, identity verification, reference checks, and comprehensive onboarding on modern cleaning standards, surface care, and customer privacy.",
  },
  {
    q: "What is your 24-Hour Satisfaction Guarantee?",
    a: "We stand behind the quality of our work. If you inspect your space and find any area that does not meet your expectations, simply contact us within 24 hours and our team will return to re-clean the specific area at zero extra cost.",
  },
  {
    q: "How quickly can I get an estimate or book an appointment?",
    a: "You can book directly online or submit an estimate request in under 2 minutes. You can even upload property photos so our team can provide an exact price within hours.",
  },
  {
    q: "Which areas in Uganda do you currently serve?",
    a: "We currently provide active direct service across Kampala (Central, Nakawa, Makindye, Kawempe, Rubaga), Wakiso (Kira, Nansana, Entebbe, Namugongo), and Mukono, with expanding coverage across Greater Uganda.",
  },
];

export function HomeLanding() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>(ZONES[0].id);
  const servicesRowRef = useRef<HTMLDivElement>(null);

  // Quick estimator form state
  const [quickService, setQuickService] = useState("Residential Deep Cleaning");
  const [quickArea, setQuickArea] = useState("");
  const [quickBedrooms, setQuickBedrooms] = useState("3");

  const { data: areas = [] } = useQuery({
    queryKey: queryKeys.serviceAreas,
    queryFn: areasApi.list,
  });

  const currentZone = ZONES.find((z) => z.id === selectedZone) ?? ZONES[0];

  function handleQuickEstimate(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickService) params.set("serviceName", quickService);
    if (quickArea) params.set("area", quickArea);
    if (quickBedrooms) params.set("bedrooms", quickBedrooms);
    router.push(`/quote?${params.toString()}`);
  }

  function handleQuickBook(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (quickService) params.set("serviceName", quickService);
    if (quickArea) params.set("area", quickArea);
    if (quickBedrooms) params.set("bedrooms", quickBedrooms);
    router.push(`/book?${params.toString()}`);
  }

  const scrollServices = (direction: "left" | "right") => {
    if (servicesRowRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      servicesRowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#fbfcf9] text-brand-ink selection:bg-brand-green selection:text-white">

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f4f7f1]/60 to-[#fbfcf9] pt-10 pb-16 md:pt-16 md:pb-24">
        {/* Background decorative ambient orbs */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-brand-green/10 blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-brand-navy/5 blur-3xl" />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-green border border-green-200">
                <span>✦</span> Uganda’s Premier Precision Cleaning
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] text-brand-navy leading-[1.04]">
                Life’s too full to spend it cleaning.{" "}
                <span className="text-brand-green">Let us handle the reset.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg sm:text-xl text-slate-600 leading-relaxed">
                Enjoy more free time while certified professionals transform your home or workplace. 
                Powered by our signature <strong className="text-brand-navy font-semibold">Detail-Clean Rotation System</strong>, eco-friendly formulas, and a 100% satisfaction guarantee.
              </p>

              {/* Quick Estimator Card */}
              <div className="mt-8 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-navy mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                  Instant Booking & Free Estimate Launcher
                </p>

                <form className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Service Type</label>
                    <select
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-brand-navy outline-none focus:border-brand-green focus:bg-white transition"
                      value={quickService}
                      onChange={(e) => setQuickService(e.target.value)}
                    >
                      <option>Residential Deep Cleaning</option>
                      <option>Routine Home Cleaning</option>
                      <option>Move-In / Move-Out Clean</option>
                      <option>Office & Commercial</option>
                      <option>Post-Construction Reset</option>
                      <option>Facility Care</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">District / Area</label>
                    <select
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-brand-navy outline-none focus:border-brand-green focus:bg-white transition"
                      value={quickArea}
                      onChange={(e) => setQuickArea(e.target.value)}
                    >
                      <option value="">Select your location</option>
                      <option value="kampala">Kampala (Active)</option>
                      <option value="wakiso">Wakiso (Active)</option>
                      <option value="mukono">Mukono (Active)</option>
                      <option value="entebbe">Entebbe (Active)</option>
                      <option value="jinja">Jinja (Coming soon)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Bedrooms / Size</label>
                    <select
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-brand-navy outline-none focus:border-brand-green focus:bg-white transition"
                      value={quickBedrooms}
                      onChange={(e) => setQuickBedrooms(e.target.value)}
                    >
                      <option value="1">1 Bedroom / Studio</option>
                      <option value="2">2 Bedrooms</option>
                      <option value="3">3 Bedrooms</option>
                      <option value="4">4 Bedrooms</option>
                      <option value="5">5+ Bedrooms / Large House</option>
                      <option value="commercial">Commercial Space</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3 mt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleQuickBook}
                      className="flex-1 rounded-full bg-brand-green px-6 py-3.5 font-bold text-white shadow-md hover:bg-opacity-95 hover:shadow-lg transition-all text-center"
                    >
                      Book Online Now →
                    </button>
                    <button
                      type="button"
                      onClick={handleQuickEstimate}
                      className="flex-1 rounded-full bg-brand-navy px-6 py-3.5 font-bold text-white shadow-md hover:bg-opacity-90 hover:shadow-lg transition-all text-center"
                    >
                      Get Free Price Estimate
                    </button>
                  </div>
                </form>
              </div>

              {/* Direct call badge */}
              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-brand-green font-bold">✓</span> No hidden fees
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-brand-green font-bold">✓</span> All supplies included
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <span className="text-brand-green font-bold">✓</span> Same-day quotes
                </span>
              </div>
            </div>

            {/* Right Hero Image Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-2xl">
                <Image
                  src="/images/about-home-reset.png"
                  alt="Spotlessly clean modern living room by Nasse Cleaning Services"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />

                {/* Floating Trust Card Top Left */}
                <div className="absolute top-6 left-6 rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur border border-slate-100 max-w-[200px]">
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    {"★★★★★"}
                  </div>
                  <p className="mt-1 text-xs font-bold text-brand-navy">2,500+ Spaces Reset</p>
                  <p className="text-[10px] text-slate-500">Across Kampala & Wakiso</p>
                </div>

                {/* Floating Badge Bottom Right */}
                <div className="absolute bottom-6 right-6 rounded-2xl bg-brand-navy/95 p-4 shadow-xl backdrop-blur text-white max-w-[220px]">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-brand-green p-1.5 text-xs text-white">✓</span>
                    <span className="text-xs font-bold uppercase tracking-wider">100% Guaranteed</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-200 leading-snug">
                    Not completely thrilled? We’ll re-clean within 24h for free.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ── 4. PROFESSIONAL CLEANING SERVICES WE OFFER (SCROLLABLE ROW WITH RIGHT ARROW) ── */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1e293b]">
                Professional Cleaning Services We Offer
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center md:justify-end gap-3">
              <button
                onClick={() => scrollServices("left")}
                aria-label="Scroll left"
                className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-brand-green hover:bg-green-50 hover:text-brand-green transition-all"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollServices("right")}
                aria-label="Scroll right"
                className="grid h-11 w-11 place-items-center rounded-full bg-brand-navy text-white shadow-md hover:bg-brand-green hover:scale-105 transition-all"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Carousel Row */}
          <div
            ref={servicesRowRef}
            className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {SERVICES_WE_OFFER.map((service, idx) => {
              const IconComponent = service.renderIcon;
              return (
                <div
                  key={idx}
                  className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[350px] shrink-0 snap-start flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm hover:shadow-xl hover:border-brand-green/40 transition-all duration-300"
                >
                  <div>
                    {/* Illustrated Icon Graphic */}
                    <div className="mb-6 flex justify-start">
                      <div className="grid h-20 w-20 place-items-center rounded-2xl bg-sky-50/60 p-2 border border-sky-100/80">
                        <IconComponent />
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0284C7] leading-snug">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed min-h-[64px]">
                      {service.description}
                    </p>
                  </div>

                  {/* Learn More link */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-brand-green hover:underline"
                    >
                      LEARN MORE
                      <span className="text-sm font-bold">→</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 5. THREE STEPS TO A SPOTLESS SPACE (HOW IT WORKS) ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fbf5] via-white to-[#fbfcf9] py-20 md:py-28 border-y border-slate-200/70">
        
        {/* Soft background ambient gradient glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[800px] rounded-full bg-amber-100/30 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          
          {/* Pill Tag & Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0284C7] border border-blue-200/70">
              <span className="h-2 w-2 rounded-full bg-[#0284C7]" />
              HOW IT WORKS
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.04em] text-brand-navy">
              Three steps to a{" "}
              <span className="italic font-serif text-amber-500 font-normal">spotless</span>{" "}
              space.
            </h2>
          </div>

          {/* 3 Step Visual Flow with Interconnected Line */}
          <div className="relative grid gap-12 md:grid-cols-3 md:gap-8 items-start">
            
            {/* Desktop Connecting Line behind circles */}
            <div className="hidden md:block absolute top-[110px] left-[16%] right-[16%] h-[2.5px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 -z-0" />

            {/* ── STEP 01 ── */}
            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Outer Dashed Orbit Container */}
              <div className="relative flex h-[220px] w-[220px] items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white/70 backdrop-blur shadow-md">
                
                {/* Inner glowing circle */}
                <div className="flex h-[175px] w-[175px] items-center justify-center rounded-full bg-gradient-to-br from-amber-100/90 via-amber-50/70 to-yellow-100/80 shadow-inner">
                  {/* Central center dot */}
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-amber-400 shadow-sm" />
                </div>

                {/* Top Right Step Badge */}
                <div className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-[#0284C7] px-3.5 py-1 text-[11px] font-black tracking-wider text-white shadow-md">
                  STEP 01
                </div>

                {/* Bottom Icon Badge */}
                <div className="absolute -bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-brand-navy shadow-lg border-2 border-white">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.68 1 1 0 01-.24 1.02l-2.23 2.09z" />
                  </svg>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-8 text-2xl font-bold text-brand-navy">
                Book a session
              </h3>
              <p className="mt-2.5 max-w-xs text-sm sm:text-base text-slate-600 leading-relaxed">
                Tell us what you need, takes under a minute online or on WhatsApp.
              </p>
            </div>

            {/* ── STEP 02 ── */}
            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Outer Dashed Orbit Container */}
              <div className="relative flex h-[220px] w-[220px] items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white shadow-lg">
                
                {/* Inner Image circle of expert cleaner */}
                <div className="relative h-[175px] w-[175px] overflow-hidden rounded-full border border-slate-200 shadow-inner">
                  <Image
                    src="/images/about-workspace-reset.png"
                    alt="Professional vetted cleaner arriving with equipment"
                    fill
                    sizes="175px"
                    className="object-cover object-center"
                  />
                  {/* Central center dot */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-white bg-amber-400 shadow-sm" />
                  </div>
                </div>

                {/* Top Right Step Badge */}
                <div className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-[#0284C7] px-3.5 py-1 text-[11px] font-black tracking-wider text-white shadow-md">
                  STEP 02
                </div>

                {/* Bottom Icon Badge */}
                <div className="absolute -bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-brand-navy shadow-lg border-2 border-white">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" />
                  </svg>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-8 text-2xl font-bold text-brand-navy">
                Get an expert cleaner
              </h3>
              <p className="mt-2.5 max-w-xs text-sm sm:text-base text-slate-600 leading-relaxed">
                Our vetted crew arrives on time with eco-friendly gear.
              </p>
            </div>

            {/* ── STEP 03 ── */}
            <div className="relative z-10 flex flex-col items-center text-center">
              
              {/* Outer Dashed Orbit Container */}
              <div className="relative flex h-[220px] w-[220px] items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white/70 backdrop-blur shadow-md">
                
                {/* Inner glowing circle */}
                <div className="flex h-[175px] w-[175px] items-center justify-center rounded-full bg-gradient-to-br from-amber-100/90 via-amber-50/70 to-yellow-100/80 shadow-inner">
                  {/* Central center dot */}
                  <div className="h-3 w-3 rounded-full border-2 border-white bg-amber-400 shadow-sm" />
                </div>

                {/* Top Right Step Badge */}
                <div className="absolute top-2 right-2 flex items-center justify-center rounded-full bg-[#0284C7] px-3.5 py-1 text-[11px] font-black tracking-wider text-white shadow-md">
                  STEP 03
                </div>

                {/* Bottom Icon Badge */}
                <div className="absolute -bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-brand-navy shadow-lg border-2 border-white">
                  <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-8 text-2xl font-bold text-brand-navy">
                Relax & enjoy
              </h3>
              <p className="mt-2.5 max-w-xs text-sm sm:text-base text-slate-600 leading-relaxed">
                Come home to a spotless, fresh space, every single time.
              </p>
            </div>

          </div>

          {/* Quick CTA button underneath the 3 steps */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/book"
              className="rounded-full bg-brand-green px-8 py-4 font-bold text-white shadow-lg hover:bg-opacity-95 hover:scale-105 transition-all text-sm sm:text-base"
            >
              Start Your 3-Step Reset Now →
            </Link>
          </div>

        </div>
      </section>

      {/* ── 6. WHY CHOOSE NASSE ── */}
      <section className="py-16 md:py-24 bg-[#fbfcf9]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">The Professional Difference</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-brand-navy">
              Why Homeowners & Businesses Trust Nasse
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col items-start">
              <div className="h-12 w-12 rounded-2xl bg-green-50 grid place-items-center text-2xl mb-5">
                🌿
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Eco-Responsible Cleaning</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                We use non-toxic, biodegradable chemicals that protect your family, pets, and indoor air quality without sacrificing deep cleaning power.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col items-start">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 grid place-items-center text-2xl mb-5">
                🔒
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Vetted & Supervised Teams</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Every cleaner is identity-verified, reference-checked, uniformed, and supervised to ensure total security and unmatched craftsmanship.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col items-start">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 grid place-items-center text-2xl mb-5">
                ⏱️
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Flexible Scheduling</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Weekly, bi-weekly, monthly, or one-off emergency cleans. Easily reschedule, modify preferences, or book online in minutes.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-7 border border-slate-200/80 shadow-sm flex flex-col items-start">
              <div className="h-12 w-12 rounded-2xl bg-purple-50 grid place-items-center text-2xl mb-5">
                🎯
              </div>
              <h3 className="text-lg font-bold text-brand-navy">100% Clean Guarantee</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Your satisfaction is non-negotiable. If you notice any missed spot, we return within 24 hours to re-clean it completely free of charge.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. COVERAGE AREA CHECKER ── */}
      <section className="bg-white py-14 border-y border-slate-200/80">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-green">Active Regional Service</span>
              <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-brand-navy">
                Serving Kampala, Wakiso, Mukono & Greater Uganda
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Check our interactive coverage map to see active response zones, travel charges, or register interest for upcoming expansion districts.
              </p>
            </div>
            <Link
              href="/areas"
              className="shrink-0 rounded-full bg-brand-navy px-7 py-3.5 font-bold text-white text-sm shadow hover:bg-brand-green transition-all"
            >
              Check Coverage Map →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. CUSTOMER TESTIMONIALS ── */}
      <section className="py-16 md:py-24 bg-[#f8fbf5]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Real Customer Stories</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.04em] text-brand-navy">
              Loved by Homeowners and Facility Managers
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {REVIEWS.map((rev, i) => (
              <div
                key={i}
                className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-400 text-sm">
                    {"★".repeat(rev.rating)}
                  </div>
                  <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed italic">
                    “{rev.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-brand-navy text-sm">{rev.author}</h4>
                    <p className="text-xs text-slate-500">{rev.location}</p>
                  </div>
                  <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-semibold text-brand-green">
                    {rev.service}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 9. FREQUENTLY ASKED QUESTIONS ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">Got Questions?</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-slate-600">Everything you need to know about our service standards.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-brand-navy hover:text-brand-green transition-colors"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <span className="ml-4 text-xl text-brand-green">{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


    </div>
  );
}