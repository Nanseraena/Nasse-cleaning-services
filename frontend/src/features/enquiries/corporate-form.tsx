"use client";

import { FormEvent, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { enquiriesApi } from "@/lib/api/enquiries";
import { FormattedDateInput } from "@/components/common/formatted-date-input";
import { LocationAutocomplete } from "@/components/common/location-autocomplete";
import { MultiPhotoUpload } from "@/components/common/multi-photo-upload";
import { RichTextEditor } from "@/components/common/rich-text-editor";

const inputStyle =
  "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-green-100 bg-white";

const FACILITY_TYPES = [
  "Office / Corporate Headquarters",
  "Retail Shop / Commercial Store",
  "School / Educational Institution",
  "Hotel / Hospitality & Restaurant",
  "Medical Clinic / Healthcare Facility",
  "Warehouse / Industrial Facility",
  "Residential Complex / Apartment Building",
  "Post-Construction Commercial Site",
  "Other Commercial Facility",
];

const FREQUENCY_OPTIONS = [
  "Daily Contract Cleaning",
  "Weekly Contract Cleaning",
  "Bi-weekly Contract Cleaning",
  "Monthly Maintenance Cleaning",
  "One-time Deep Commercial Clean",
];

export function CorporateForm() {
  const [form, setForm] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    facility_type: "Office / Corporate Headquarters",
    location: "",
    approximate_size: "",
    frequency: "Daily Contract Cleaning",
    preferred_start_date: "",
    requirements: "",
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const minDate = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  }, []);

  const setField = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const mutation = useMutation({
    mutationFn: enquiriesApi.createCorporate,
    onSuccess: () => {
      toast.success("Thank you! Your corporate cleaning enquiry has been submitted.");
      setForm({
        company_name: "",
        contact_name: "",
        email: "",
        phone: "",
        facility_type: "Office / Corporate Headquarters",
        location: "",
        approximate_size: "",
        frequency: "Daily Contract Cleaning",
        preferred_start_date: "",
        requirements: "",
      });
      setPhotos([]);
    },
    onError: () => {
      toast.error("Could not submit corporate enquiry. Please check your details and try again.");
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Attach photo names/summary to requirements if photos are uploaded
    let finalRequirements = form.requirements;
    if (photos.length > 0) {
      const photoNames = photos.map((p) => p.name).join(", ");
      finalRequirements = `${form.requirements}\n\n[Attached Property Photos: ${photos.length} files (${photoNames})]`.trim();
    }

    mutation.mutate({
      ...form,
      preferred_start_date: form.preferred_start_date || null,
      requirements: finalRequirements,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8"
    >
      {/* Company Name */}
      <label className="text-sm font-semibold text-brand-navy">
        Company / Organization name <span className="text-red-500">*</span>
        <input
          className={inputStyle}
          required
          placeholder="e.g. Acme Corporation Uganda"
          value={form.company_name}
          onChange={(e) => setField("company_name", e.target.value)}
        />
      </label>

      {/* Contact Person */}
      <label className="text-sm font-semibold text-brand-navy">
        Contact person <span className="text-red-500">*</span>
        <input
          className={inputStyle}
          required
          placeholder="e.g. Sarah Namubiru (Operations Manager)"
          value={form.contact_name}
          onChange={(e) => setField("contact_name", e.target.value)}
        />
      </label>

      {/* Business Email */}
      <label className="text-sm font-semibold text-brand-navy">
        Business email <span className="text-red-500">*</span>
        <input
          className={inputStyle}
          type="email"
          required
          placeholder="e.g. sarah@acme.co.ug"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </label>

      {/* Phone Number */}
      <label className="text-sm font-semibold text-brand-navy">
        Phone number <span className="text-red-500">*</span>
        <input
          className={inputStyle}
          type="tel"
          required
          placeholder="e.g. +256 700 000 000"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </label>

      {/* Facility Type Native Select Dropdown */}
      <label className="text-sm font-semibold text-brand-navy">
        Facility type
        <select
          className={inputStyle}
          value={form.facility_type}
          onChange={(e) => setField("facility_type", e.target.value)}
        >
          {FACILITY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      {/* Location Autocomplete */}
      <LocationAutocomplete
        label="Facility location"
        value={form.location}
        onChange={(val) => setField("location", val)}
        placeholder="Start typing, for example Nakasero..."
      />

      {/* Approximate Size */}
      <label className="text-sm font-semibold text-brand-navy">
        Approximate size (sq. meters / floors)
        <input
          className={inputStyle}
          placeholder="e.g. 500 sq. m / 3 floors"
          value={form.approximate_size}
          onChange={(e) => setField("approximate_size", e.target.value)}
        />
      </label>

      {/* Cleaning Frequency Native Select Dropdown */}
      <label className="text-sm font-semibold text-brand-navy">
        Preferred cleaning frequency
        <select
          className={inputStyle}
          value={form.frequency}
          onChange={(e) => setField("frequency", e.target.value)}
        >
          {FREQUENCY_OPTIONS.map((freq) => (
            <option key={freq} value={freq}>
              {freq}
            </option>
          ))}
        </select>
      </label>

      {/* Preferred Start Date */}
      <FormattedDateInput
        label="Preferred start date"
        min={minDate}
        value={form.preferred_start_date}
        onChange={(val) => setField("preferred_start_date", val)}
      />

      {/* Blank space to balance grid layout on sm/md */}
      <div className="hidden sm:block" />

      {/* Property Photos Upload Component */}
      <MultiPhotoUpload files={photos} onChange={setPhotos} />

      {/* Requirements Rich Text Editor */}
      <RichTextEditor
        className="sm:col-span-2"
        label="Cleaning requirements & details"
        placeholder="Describe your facility, special security access, preferred shifts, equipment needs, or specific cleaning requirements..."
        value={form.requirements}
        onChange={(val) => setField("requirements", val)}
        minHeight="140px"
      />

      {/* Submit CTA Button */}
      <button
        disabled={mutation.isPending}
        className="rounded-xl bg-brand-green px-6 py-3.5 font-bold text-white shadow-sm hover:bg-opacity-95 transition-all disabled:opacity-60 sm:col-span-2"
      >
        {mutation.isPending ? "Submitting enquiry…" : "Send Corporate Enquiry"}
      </button>
    </form>
  );
}
