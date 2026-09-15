"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuthInitialized, selectIsAuthenticated, selectUser } from "@/store/auth/selectors";
import { UserAccountControl } from "@/components/auth/user-account-control";
import { ServicesMenu } from "@/components/layout/services-menu";
import { useAuthenticatedAction } from "@/lib/use-authenticated-action";
import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api/services";
import { queryKeys } from "@/lib/query/keys";

export function Header() {
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { requireAuthentication } = useAuthenticatedAction("/book");
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { data: services = [] } = useQuery({
    queryKey: queryKeys.services,
    queryFn: servicesApi.list,
  });

  // Close mobile menu whenever navigation occurs
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link href="/" aria-label="Nasse Cleaning Services home" className="flex items-center shrink-0">
          <Image
            src="/assests/Nasse_Cleaning_Services_Logo.svg"
            alt="Nasse Cleaning Services"
            width={1508}
            height={993}
            priority
            className="h-9 sm:h-11 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation (visible on lg screens and up) */}
        <nav className="hidden lg:flex items-center gap-x-6 text-sm font-medium">
          <ServicesMenu />
          <Link href="/about" className="hover:text-brand-green transition-colors">
            About Us
          </Link>
          <Link href="/areas" className="hover:text-brand-green transition-colors">
            Areas We Serve
          </Link>
          <Link href="/faqs" className="hover:text-brand-green transition-colors">
            FAQs
          </Link>
          <Link href="/contact" className="hover:text-brand-green transition-colors">
            Contact
          </Link>
          <Link
            href="/book"
            onClick={(event) => {
              if (!requireAuthentication()) event.preventDefault();
            }}
            className="rounded-full bg-brand-green px-5 py-2 text-white font-semibold shadow-sm hover:bg-opacity-95 transition-all"
          >
            Book now
          </Link>
          {initialized && authenticated && user && <UserAccountControl user={user} />}
        </nav>

        {/* Mobile / Tablet Actions (visible below lg: 1024px) */}
        <div className="flex lg:hidden items-center gap-2 sm:gap-3">
          {/* Quick Book Now button for easy conversion */}
          <Link
            href="/book"
            onClick={(event) => {
              if (!requireAuthentication()) event.preventDefault();
            }}
            className="rounded-full bg-brand-green px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white font-semibold shadow-sm hover:bg-opacity-95 transition-all"
          >
            Book
          </Link>

          {initialized && authenticated && user && (
            <div className="scale-90 sm:scale-100 origin-right">
              <UserAccountControl user={user} />
            </div>
          )}

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-slate-100 hover:text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-green/30 transition-colors"
          >
            {mobileMenuOpen ? (
              // X close icon
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger lines icon
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer (animates down from sticky header) */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden border-t border-slate-200/80 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-5 space-y-2">
            {/* Services Expandable Item */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-base font-semibold text-brand-navy hover:text-brand-green transition-colors"
              >
                <span>Services</span>
                <svg
                  className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-brand-green" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="mt-1 space-y-1 border-t border-slate-200/60 pt-2 pb-1 pl-2">
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-bold text-brand-green hover:bg-green-50 transition-colors"
                  >
                    <span>All Cleaning Services</span>
                    <span>→</span>
                  </Link>
                  {services.length > 0 ? (
                    services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-brand-navy transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))
                  ) : (
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-xs text-slate-500"
                    >
                      View services directory
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-green transition-colors"
            >
              About Us
            </Link>

            <Link
              href="/areas"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-green transition-colors"
            >
              Areas We Serve
            </Link>

            <Link
              href="/faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-green transition-colors"
            >
              FAQs
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-green transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/corporate"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-4 py-2.5 text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-green transition-colors"
            >
              Commercial Cleaning
            </Link>

            {/* Action CTA inside dropdown */}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/book"
                onClick={(event) => {
                  setMobileMenuOpen(false);
                  if (!requireAuthentication()) event.preventDefault();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-green py-3 text-center text-sm font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
              >
                Book a Cleaning Now
              </Link>
              <Link
                href="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-2.5 text-center text-sm font-semibold text-brand-navy hover:bg-slate-50 transition-all"
              >
                Request a Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
