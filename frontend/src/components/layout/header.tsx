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
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" aria-label="Nasse Cleaning Services home">
          <Image
            src="/assests/Nasse_Cleaning_Services_Logo.svg"
            alt="Nasse Cleaning Services"
            width={1508}
            height={993}
            priority
            className="h-14 w-auto"
          />
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <ServicesMenu /><Link href="/faqs">FAQs</Link><Link href="/corporate">Corporate</Link><Link href="/contact">Contact</Link>
          <Link href="/book" onClick={(event) => { if (!requireAuthentication()) event.preventDefault(); }} className="rounded-full bg-brand-green px-4 py-2 text-white">Book now</Link>
          {initialized && (authenticated && user ? (
            <UserAccountControl user={user} />
          ) : (
            <Link href="/login" className="text-brand-navy">Sign in</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
