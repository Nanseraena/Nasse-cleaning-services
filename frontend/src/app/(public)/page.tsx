import type { Metadata } from "next";
import { HomeLanding } from "@/features/home/home";

export const metadata: Metadata = {
  title: "Nasse Cleaning Services | Professional Cleaning Across Uganda",
  description:
    "Uganda's premier cleaning specialists. Residential deep cleans, routine housekeeping, office janitorial care, and post-construction handovers with our Detail-Clean Rotation System®.",
};

export default function HomePage() {
  return <HomeLanding />;
}
