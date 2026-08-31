import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/providers/app-providers";

export const metadata: Metadata = {
  title: { default: "Nasse Cleaning Services", template: "%s | Nasse" },
  description: "Residential, commercial, post-construction and facility cleaning services.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppProviders>{children}</AppProviders></body></html>;
}
