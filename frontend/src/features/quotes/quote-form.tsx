"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { FormattedDateInput } from "@/components/common/formatted-date-input";
import { MultiPhotoUpload } from "@/components/common/multi-photo-upload";
import { SearchableSelect } from "@/components/common/searchable-select";
import { FormattedNumberInput } from "@/components/common/formatted-number-input";
import { LocationAutocomplete } from "@/components/common/location-autocomplete";
import { RichTextEditor } from "@/components/common/rich-text-editor";
import { quotesApi } from "@/lib/api/quotes";
import { servicesApi } from "@/lib/api/services";
import { areasApi } from "@/lib/api/areas";
import { loginPath } from "@/lib/auth-navigation";
import { queryKeys } from "@/lib/query/keys";
import { selectAuthInitialized, selectIsAuthenticated, selectUser } from "@/store/auth/selectors";

const input =
  "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-green-100 bg-white";

interface QuoteFormProps {
  mode?: "book" | "quote";
}

export function QuoteForm({ mode }: QuoteFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const client = useQueryClient();
  const user = useSelector(selectUser);
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);

  const isBookMode = mode ? mode === "book" : !pathname.includes("/quote");

  const services = useQuery({ queryKey: queryKeys.services, queryFn: servicesApi.list });
  const areas = useQuery({ queryKey: queryKeys.serviceAreas, queryFn: areasApi.list });

  const [form, setForm] = useState({
    service: params.get("service") ?? "",
    service_area: "",
    full_name: "",
    email: "",
    phone: "",
    location: "",
    property_type: "Apartment",
    bedrooms: "",
    bathrooms: "",
    preferred_date: "",
    preferred_time: "",
    notes: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);

  const minDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    if (user) {
      setForm((current) => ({
        ...current,
        full_name: [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username,
        email: user.email,
      }));
    }
  }, [user]);

  useEffect(() => {
    const slug = params.get("area");
    const match = areas.data?.find((area) => area.slug === slug);
    if (match) {
      setForm((current) => ({ ...current, service_area: match.id }));
    }
  }, [areas.data, params]);

  const set = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const mutation = useMutation({
    mutationFn: quotesApi.create,
    onSuccess: (quote) => {
      client.invalidateQueries({ queryKey: queryKeys.myQuotes });
      client.invalidateQueries({ queryKey: queryKeys.bookings });

      if (isBookMode) {
        toast.success(`Booking request received! Reference: ${quote.reference}`);
        router.push(`/bookings?created=${encodeURIComponent(quote.reference)}`);
      } else {
        toast.success(`Estimate request received! Reference: ${quote.reference}`);
        router.push(`/estimates?created=${encodeURIComponent(quote.reference)}`);
      }
    },
    onError: () => {
      toast.error("Could not submit your request. Please check all details and try again.");
    },
  });

  const selectedArea = areas.data?.find((area) => area.id === form.service_area);

  const returnParams = new URLSearchParams();
  if (form.service) returnParams.set("service", form.service);
  if (params.get("area")) returnParams.set("area", params.get("area")!);
  const returnPath = `${isBookMode ? "/book" : "/quote"}${returnParams.size ? `?${returnParams}` : ""}`;

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!authenticated) {
      router.push(loginPath(returnPath));
      return;
    }
    mutation.mutate({
      ...form,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      photos,
    });
  }

  if (!initialized) {
    return <p className="text-slate-500">Checking your session…</p>;
  }

  if (!authenticated) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-brand-navy">
          {isBookMode ? "Sign in before booking a service" : "Sign in before requesting an estimate"}
        </h2>
        <p className="mt-3 text-slate-600">
          Create an account if you are new so you can track your live booking and estimates. We’ll bring you back here afterward.
        </p>
        <button
          onClick={() => router.push(loginPath(returnPath))}
          className="mt-6 rounded-full bg-brand-navy px-8 py-3.5 font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
        >
          Sign in or create account
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8"
    >
      <SearchableSelect
        className="sm:col-span-2"
        label="Cleaning service"
        required
        placeholder="Choose a service"
        value={form.service}
        onChange={(value) => set("service", value)}
        options={(services.data ?? []).map((service) => ({
          value: service.id,
          label: service.name,
        }))}
      />

      <div className="sm:col-span-2">
        <SearchableSelect
          label="Service area"
          required
          placeholder="Choose a district"
          value={form.service_area}
          onChange={(value) => set("service_area", value)}
          options={(areas.data ?? []).map((area) => ({
            value: area.id,
            label: `${area.name} — ${area.status.replaceAll("_", " ")}`,
          }))}
        />
        {selectedArea && selectedArea.status !== "active" && (
          <p className="mt-2 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
            We do not currently operate in this area. You can leave your details on the Areas We Serve page and we’ll notify you when service becomes available.
          </p>
        )}
      </div>

      <label className="text-sm font-semibold text-brand-navy">
        Full name <span className="text-red-500">*</span>
        <input
          className={input}
          required
          value={form.full_name}
          onChange={(e) => set("full_name", e.target.value)}
        />
      </label>

      <label className="text-sm font-semibold text-brand-navy">
        Email <span className="text-red-500">*</span>
        <input
          className={input}
          type="email"
          required
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
        />
      </label>

      <label className="text-sm font-semibold text-brand-navy">
        Phone number <span className="text-red-500">*</span>
        <input
          className={input}
          type="tel"
          required
          placeholder="+256 700 000 000"
          value={form.phone}
          onChange={(e) => set("phone", e.target.value)}
        />
      </label>

      <LocationAutocomplete
        label="Service location / Address"
        required
        value={form.location}
        onChange={(value) => set("location", value)}
        placeholder="Start typing, for example Ntinda, Kampala…"
      />

      <SearchableSelect
        label="Property type"
        value={form.property_type}
        onChange={(value) => set("property_type", value)}
        options={[
          "Apartment",
          "Residential House",
          "Office / Workplace",
          "Commercial Facility",
          "Post-Construction Site",
          "Other",
        ].map((value) => ({ value, label: value }))}
      />

      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm font-semibold text-brand-navy">
          Bedrooms
          <FormattedNumberInput
            className={input}
            min={0}
            max={100}
            value={form.bedrooms}
            onValueChange={(value) => set("bedrooms", value ? String(value) : "")}
          />
        </label>
        <label className="text-sm font-semibold text-brand-navy">
          Bathrooms
          <FormattedNumberInput
            className={input}
            min={0}
            max={100}
            value={form.bathrooms}
            onValueChange={(value) => set("bathrooms", value ? String(value) : "")}
          />
        </label>
      </div>

      <FormattedDateInput
        label="Preferred service date"
        min={minDate}
        required
        value={form.preferred_date}
        onChange={(value) => set("preferred_date", value)}
      />

      <label className="text-sm font-semibold text-brand-navy">
        Preferred start time <span className="text-red-500">*</span>
        <input
          className={input}
          type="time"
          required
          value={form.preferred_time}
          onChange={(e) => set("preferred_time", e.target.value)}
        />
      </label>

      <MultiPhotoUpload files={photos} onChange={setPhotos} />

      <RichTextEditor
        className="sm:col-span-2"
        label="Special instructions / notes"
        placeholder="Tell us about priority areas, stubborn stains, pets, building access, or specific requirements..."
        value={form.notes}
        onChange={(value) => set("notes", value)}
        minHeight="130px"
      />

      <button
        disabled={mutation.isPending}
        className="rounded-xl bg-brand-green px-6 py-4 font-bold text-white shadow-md hover:bg-opacity-95 transition-all disabled:opacity-60 sm:col-span-2"
      >
        {mutation.isPending
          ? "Processing and submitting…"
          : isBookMode
          ? "Confirm Booking Request"
          : "Request Cleaning Estimate"}
      </button>
    </form>
  );
}
