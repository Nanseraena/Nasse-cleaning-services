import type { Metadata } from "next";
import { UgandaServiceMap } from "@/features/areas/uganda-service-map";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description: "Explore Nasse Cleaning Services coverage across Uganda and select your service district.",
};

export default function AreasPage() {
  return <UgandaServiceMap />;
}
