"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { SearchableSelect } from "@/components/common/searchable-select";
import { areasApi } from "@/lib/api/areas";
import { queryKeys } from "@/lib/query/keys";
import type { ServiceArea } from "@/types";

type Position = [number, number];
type DistrictFeature = {
  type: "Feature";
  properties: { name: string; slug: string };
  geometry: { type: "Polygon"; coordinates: Position[][] } | { type: "MultiPolygon"; coordinates: Position[][][] };
};
type DistrictCollection = { type: "FeatureCollection"; features: DistrictFeature[] };

const WIDTH = 620;
const HEIGHT = 680;
const BOUNDS = { minLon: 29.45, maxLon: 35.05, minLat: -1.5, maxLat: 4.3 };
const inputClass = "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-green-100";

function point([longitude, latitude]: Position) {
  const x = ((longitude - BOUNDS.minLon) / (BOUNDS.maxLon - BOUNDS.minLon)) * WIDTH;
  const y = ((BOUNDS.maxLat - latitude) / (BOUNDS.maxLat - BOUNDS.minLat)) * HEIGHT;
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}

function ringPath(ring: Position[]) {
  return ring.length ? `M${ring.map(point).join("L")}Z` : "";
}

function districtPath(feature: DistrictFeature) {
  return feature.geometry.type === "Polygon"
    ? feature.geometry.coordinates.map(ringPath).join("")
    : feature.geometry.coordinates.flatMap((polygon) => polygon.map(ringPath)).join("");
}

function areaColor(area?: ServiceArea) {
  if (area?.status === "active") return "#24945e";
  if (area?.status === "coming_soon") return "#f5b942";
  return "#d7e0e5";
}

function formatCharge(charge?: string) {
  const value = Number(charge ?? 0);
  return value ? `UGX ${value.toLocaleString("en-UG")}` : "No additional transport charge";
}

export function UgandaServiceMap() {
  const areas = useQuery({ queryKey: queryKeys.serviceAreas, queryFn: areasApi.list });
  const [districts, setDistricts] = useState<DistrictFeature[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("kampala");
  const [interest, setInterest] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetch("/data/uganda-districts.geojson")
      .then((response) => {
        if (!response.ok) throw new Error("Map data could not be loaded");
        return response.json() as Promise<DistrictCollection>;
      })
      .then((data) => setDistricts(data.features))
      .catch(() => toast.error("The Uganda district map could not be loaded."));
  }, []);

  const areasBySlug = useMemo(() => new Map((areas.data ?? []).map((area) => [area.slug, area])), [areas.data]);
  const selectedDistrict = districts.find((district) => district.properties.slug === selectedSlug);
  const selectedArea = areasBySlug.get(selectedSlug);
  const selectedName = selectedDistrict?.properties.name ?? selectedArea?.name ?? "Select a district";
  const active = selectedArea?.status === "active";
  const options = districts
    .map((district) => ({ value: district.properties.slug, label: district.properties.name }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const notifyMutation = useMutation({
    mutationFn: () => areasApi.registerInterest({ area_name: selectedName, ...interest }),
    onSuccess: () => {
      toast.success(`Thanks — we’ll let you know when ${selectedName} becomes available.`);
      setInterest({ name: "", email: "", phone: "" });
    },
    onError: () => toast.error("We could not save your details. Please try again."),
  });

  function submitInterest(event: FormEvent) {
    event.preventDefault();
    notifyMutation.mutate();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-green">Coverage across Uganda</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">Find cleaning services near you</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">Explore our current and upcoming service areas. Choose your district to see availability and carry it straight into your estimate request.</p>
      </div>

      <div className="mt-10 grid gap-7 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.65fr)]">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-3 shadow-sm sm:p-6">
          <div className="mb-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <SearchableSelect label="Search for your district" value={selectedSlug} onChange={setSelectedSlug} options={options} searchPlaceholder="Type a district name…" />
            <div className="flex flex-wrap gap-3 pb-3 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-brand-green" />Active</span>
              <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-amber-400" />Coming soon</span>
              <span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded-full bg-slate-300" />Unavailable</span>
            </div>
          </div>
          <div className="mx-auto max-w-xl" aria-label="Interactive map of service coverage in Uganda">
            {!districts.length ? <div className="grid min-h-[420px] place-items-center text-slate-500">Loading district map…</div> : (
              <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="img" className="h-auto w-full drop-shadow-sm">
                <title>Nasse service areas by Uganda district</title>
                {districts.map((district) => {
                  const slug = district.properties.slug;
                  const area = areasBySlug.get(slug);
                  const selected = slug === selectedSlug;
                  return <path key={slug} d={districtPath(district)} fill={areaColor(area)} stroke={selected ? "#12263A" : "#ffffff"} strokeWidth={selected ? 3.5 : 1.2} className="cursor-pointer transition hover:brightness-90 focus:outline-none" tabIndex={0} role="button" aria-label={`${district.properties.name}: ${area?.status.replaceAll("_", " ") ?? "not currently available"}`} onClick={() => setSelectedSlug(slug)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedSlug(slug); }} />;
                })}
              </svg>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">Select a district on the map or use the searchable list above.</p>
        </div>

        <aside aria-live="polite" className="self-start rounded-3xl bg-brand-navy p-6 text-white shadow-lg md:p-8 lg:sticky lg:top-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-green-300">Selected area</p>
          <h2 className="mt-2 text-3xl font-bold">{selectedName}</h2>
          {active ? <>
            <span className="mt-4 inline-flex rounded-full bg-green-400/20 px-3 py-1 text-sm font-bold text-green-200">Available now</span>
            <p className="mt-5 leading-7 text-slate-200">{selectedArea.description || `Nasse currently provides cleaning services throughout ${selectedName}.`}</p>
            <div className="mt-5 rounded-2xl bg-white/10 p-4"><p className="text-xs uppercase tracking-wider text-slate-300">Area transport fee</p><p className="mt-1 font-bold">{formatCharge(selectedArea.transport_charge)}</p></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link href={`/book?area=${encodeURIComponent(selectedArea.slug)}`} className="rounded-full bg-brand-green px-5 py-3 text-center font-bold text-white">Book a service</Link>
              <Link href={`/quote?area=${encodeURIComponent(selectedArea.slug)}`} className="rounded-full border border-white/40 px-5 py-3 text-center font-bold text-white hover:bg-white/10">Request a quote</Link>
            </div>
          </> : <>
            <span className={`mt-4 inline-flex rounded-full px-3 py-1 text-sm font-bold ${selectedArea?.status === "coming_soon" ? "bg-amber-400/20 text-amber-200" : "bg-white/10 text-slate-200"}`}>{selectedArea?.status === "coming_soon" ? "Coming soon" : "Not currently available"}</span>
            <p className="mt-5 leading-7 text-slate-200">We do not currently operate in this area. You can leave your details and we’ll notify you when service becomes available.</p>
            <form onSubmit={submitInterest} className="mt-6 space-y-3">
              <input aria-label="Your name" required placeholder="Your name" className={inputClass + " text-slate-900"} value={interest.name} onChange={(event) => setInterest((current) => ({ ...current, name: event.target.value }))} />
              <input aria-label="Email address" required type="email" placeholder="Email address" className={inputClass + " text-slate-900"} value={interest.email} onChange={(event) => setInterest((current) => ({ ...current, email: event.target.value }))} />
              <input aria-label="Phone number" type="tel" placeholder="Phone number (optional)" className={inputClass + " text-slate-900"} value={interest.phone} onChange={(event) => setInterest((current) => ({ ...current, phone: event.target.value }))} />
              <button disabled={notifyMutation.isPending} className="w-full rounded-full bg-brand-green px-5 py-3 font-bold text-white disabled:opacity-60">{notifyMutation.isPending ? "Saving…" : "Notify me"}</button>
            </form>
          </>}
        </aside>
      </div>
      <p className="mt-5 text-xs text-slate-400">District boundaries: geoBoundaries-derived Uganda administrative data, made available under CC0.</p>
    </section>
  );
}
