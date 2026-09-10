"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAuthInitialized, selectIsAuthenticated, selectUser } from "@/store/auth/selectors";
import { UserAccountControl } from "@/components/auth/user-account-control";
import { ServicesMenu } from "@/components/layout/services-menu";
import { useAuthenticatedAction } from "@/lib/use-authenticated-action";

export function Header() {
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const { requireAuthentication } = useAuthenticatedAction("/book");
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <Link href="/" aria-label="Nasse Cleaning Services home" className="flex items-center shrink-0">
          <Image
            src="/assests/Nasse_Cleaning_Services_Logo.svg"
            alt="Nasse Cleaning Services"
            width={1508}
            height={993}
            priority
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium">
          <ServicesMenu />
          <Link href="/about" className="hover:text-brand-green transition-colors">About Us</Link>
          <Link href="/areas" className="hover:text-brand-green transition-colors">Areas We Serve</Link>
          <Link href="/faqs" className="hover:text-brand-green transition-colors">FAQs</Link>
          <Link href="/contact" className="hover:text-brand-green transition-colors">Contact</Link>
          <Link
            href="/book"
            onClick={(event) => { if (!requireAuthentication()) event.preventDefault(); }}
            className="rounded-full bg-brand-green px-5 py-2 text-white font-semibold shadow-sm hover:bg-opacity-95 transition-all"
          >
            Book now
          </Link>
          {initialized && authenticated && user && <UserAccountControl user={user} />}
        </nav>
      </div>
    </header>
  );
}

