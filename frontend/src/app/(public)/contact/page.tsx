"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { enquiriesApi } from "@/lib/api/enquiries";

const INQUIRY_TYPES = [
  "General Inquiry",
  "Residential Cleaning",
  "Commercial / Corporate",
  "Post-Construction",
] as const;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry" as typeof INQUIRY_TYPES[number],
    message: "",
  });

  const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "256700000000";
  const whatsappNumber = rawWhatsApp.replace(/[^0-9]/g, "");

  const mutation = useMutation({
    mutationFn: enquiriesApi.createContact,
    onSuccess: () => {
      toast.success("Thank you! Your message has been sent successfully.");
      setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    },
    onError: () => {
      toast.error("Failed to send message. Please try again or chat via WhatsApp.");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formattedMessage = `[Subject: ${form.subject}]\n\n${form.message}`;
    mutation.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: formattedMessage,
    });
  };

  return (
    <main className="bg-slate-50 text-slate-800">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#073B73] via-[#09478a] to-[#042042] text-white py-16 md:py-24">
        {/* Decorative Floating Blobs */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-32 h-[450px] w-[450px] rounded-full bg-[#72B62B]/20 blur-3xl animate-pulse"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-300 backdrop-blur">
            <svg
              className="h-4 w-4 text-[#72B62B]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            Contact Nasse
          </div>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            Let's <span className="text-[#72B62B]">talk.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-slate-200 leading-relaxed">
            Book a service, ask a question, or request a custom estimate — our team usually responds within minutes.
          </p>

          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur"
          >
            <Link href="/" className="hover:text-[#72B62B] transition-colors">
              Home
            </Link>
            <span className="opacity-50">/</span>
            <span className="text-[#72B62B]">Contact</span>
          </nav>
        </div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column: Contact Channel Cards */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#72B62B]">
              Reach Out Anywhere
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
              Get in touch with us
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Choose your preferred channel below. We operate Monday to Saturday from 8:00 AM to 6:00 PM across Kampala and surrounding districts.
            </p>

            <div className="mt-8 space-y-4">
              {/* Call Us Card */}
              <a
                href="tel:+256700000000"
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#72B62B]/30 transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#073B73] text-[#72B62B] group-hover:bg-[#72B62B] group-hover:text-white transition-colors duration-300">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Call Us
                  </div>
                  <div className="font-bold text-brand-navy group-hover:text-[#72B62B] transition-colors">
                    +256 700 000 000
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:info@nassecleaning.com"
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#72B62B]/30 transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#073B73] text-[#72B62B] group-hover:bg-[#72B62B] group-hover:text-white transition-colors duration-300">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Email
                  </div>
                  <div className="font-bold text-brand-navy group-hover:text-[#72B62B] transition-colors">
                    info@nassecleaning.com
                  </div>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Nasse Cleaning Services, I would like to make an inquiry.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#25D366]/40 transition-all duration-300"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366] text-white group-hover:bg-[#20ba5a] transition-colors duration-300">
                  <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    WhatsApp Chat
                  </div>
                  <div className="font-bold text-[#25D366]">
                    Chat with us instantly
                  </div>
                </div>
              </a>

              {/* Working Hours Card */}
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-brand-navy">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Working Hours
                  </div>
                  <div className="font-bold text-brand-navy">
                    Mon to Sat · 8:00 AM to 6:00 PM
                  </div>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-slate-100">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-brand-navy">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Coverage Area
                  </div>
                  <div className="font-bold text-brand-navy">
                    Kampala, Wakiso, Mukono & Entebbe
                  </div>
                </div>
              </div>
            </div>

            {/* Same-Day Guarantee Box */}
            <div className="mt-8 rounded-3xl bg-gradient-to-r from-emerald-50 to-teal-50 p-6 border border-emerald-100 flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#72B62B] text-white font-bold">
                ⚡
              </div>
              <div>
                <h4 className="font-bold text-brand-navy">Same-Day Priority Booking</h4>
                <p className="mt-1 text-sm text-slate-600">
                  Need urgent cleaning today? Call or message our dispatch team directly on WhatsApp for priority scheduling.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Creative Contact Form */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#073B73] via-[#09478a] to-[#052952] p-6 sm:p-10 text-white shadow-2xl border border-white/10 overflow-hidden">
            {/* Background Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#72B62B]/25 blur-3xl pointer-events-none"
            />

            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Send us a message
              </h3>
              <p className="mt-1 text-sm text-slate-200">
                Tell us about your space and requirements. We'll reply shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Inquiry Type Tabs */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-300">
                    Inquiry Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {INQUIRY_TYPES.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, subject: type }))}
                        className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                          form.subject === type
                            ? "bg-[#72B62B] text-white shadow-md"
                            : "bg-white/10 text-slate-200 hover:bg-white/20"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-300 outline-none focus:border-[#72B62B] focus:bg-white/15 focus:ring-2 focus:ring-[#72B62B]/30 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-300 outline-none focus:border-[#72B62B] focus:bg-white/15 focus:ring-2 focus:ring-[#72B62B]/30 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="contact-phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-300 outline-none focus:border-[#72B62B] focus:bg-white/15 focus:ring-2 focus:ring-[#72B62B]/30 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="sr-only">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="How can Nasse help with your space? *"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-300 outline-none focus:border-[#72B62B] focus:bg-white/15 focus:ring-2 focus:ring-[#72B62B]/30 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#72B62B] px-6 py-4 font-bold text-white shadow-lg hover:bg-opacity-95 transform hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
                >
                  {mutation.isPending ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045l-4.479-10.076-9.169-2.697zm10.74 2.546l3.26 7.338 3.842-13.444-13.444 4.481 6.342 1.625z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Questions Section */}
      <section className="bg-white border-t border-slate-200 py-16">
        <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#72B62B]">
              Quick Answers
            </span>
            <h3 className="mt-2 text-3xl font-bold text-brand-navy">
              Frequently asked questions
            </h3>
            <p className="mt-2 text-slate-600">
              Have questions about booking or service response times?
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
              <h4 className="font-bold text-brand-navy">How quickly do you respond?</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Our customer team responds within minutes during working hours (8:00 AM – 6:00 PM).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
              <h4 className="font-bold text-brand-navy">Can I request a custom estimate?</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Yes! Use our <Link href="/quote" className="text-[#72B62B] font-semibold underline">Quote Request</Link> page to upload photos and details of your space.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6 bg-slate-50">
              <h4 className="font-bold text-brand-navy">Do you handle commercial spaces?</h4>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Absolutely. We serve offices, corporate facilities, and post-construction sites across Uganda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
