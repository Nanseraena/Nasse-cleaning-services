import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-brand-navy">Nasse<span className="text-brand-green">.</span></Link>
        <nav className="flex gap-5 text-sm font-medium">
          <Link href="/services">Services</Link><Link href="/corporate">Corporate</Link><Link href="/contact">Contact</Link>
          <Link href="/quote" className="rounded-full bg-brand-green px-4 py-2 text-white">Get a Quote</Link>
        </nav>
      </div>
    </header>
  );
}
