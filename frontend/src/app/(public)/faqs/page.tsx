import type { Metadata } from "next";
import { FaqExplorer } from "@/features/faqs/faq-explorer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers about Nasse cleaning services, booking, preparing your space, service changes, and account access.",
};

export default function FaqsPage() {
  return <FaqExplorer />;
}
