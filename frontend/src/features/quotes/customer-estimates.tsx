"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { quotesApi } from "@/lib/api/quotes";
import { queryKeys } from "@/lib/query/keys";
import { selectAuthInitialized, selectIsAuthenticated } from "@/store/auth/selectors";
import { RichTextContent } from "@/components/common/rich-text-content";

const statusLabel = {
  NEW: "Under Review",
  CONTACTED: "Being Reviewed",
  QUOTED: "Estimate Ready",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
} as const;

const statusColor = {
  NEW: "bg-amber-100 text-amber-900 border border-amber-300",
  CONTACTED: "bg-blue-100 text-blue-900 border border-blue-300",
  QUOTED: "bg-emerald-100 text-emerald-900 border border-emerald-300",
  ACCEPTED: "bg-green-100 text-green-900 border border-green-300",
  DECLINED: "bg-slate-200 text-slate-700 border border-slate-300",
} as const;

const money = (value: string) =>
  new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(Number(value));

import { ListItemsSkeleton } from "@/components/common/loading-skeletons";

export function CustomerEstimates() {
  const initialized = useSelector(selectAuthInitialized);
  const authenticated = useSelector(selectIsAuthenticated);
  const params = useSearchParams();
  const client = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.myQuotes,
    queryFn: quotesApi.myList,
    enabled: initialized && authenticated,
  });

  const respond = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: "accept" | "decline" }) =>
      quotesApi.respond(id, decision),
    onSuccess: (_, variables) => {
      client.invalidateQueries({ queryKey: queryKeys.myQuotes });
      client.invalidateQueries({ queryKey: queryKeys.bookings });
      toast.success(
        variables.decision === "accept"
          ? "Estimate accepted — your booking is now Confirmed!"
          : "Estimate declined."
      );
    },
    onError: () => toast.error("We could not update this estimate."),
  });

  if (!initialized || (authenticated && query.isLoading)) {
    return <ListItemsSkeleton count={3} />;
  }

  if (!authenticated) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-brand-navy">Sign in to view your estimates</h2>
        <p className="mt-3 text-slate-600">Your estimates and quotes are private to your account.</p>
        <Link
          href="/login?next=%2Festimates"
          className="mt-6 inline-block rounded-full bg-brand-navy px-8 py-3.5 font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const quotes = query.data ?? [];

  return (
    <div className="space-y-6">
      {params.get("created") && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/90 p-6 text-emerald-950 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Estimate Request #{params.get("created")}</h3>
            <p className="mt-1 text-sm text-emerald-900">
              We are reviewing your property details and will post your price estimate here. You can also view your live pending appointment in Bookings.
            </p>
          </div>
          <Link
            href="/bookings"
            className="shrink-0 rounded-full bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 transition-all text-center"
          >
            View Bookings →
          </Link>
        </div>
      )}

      {quotes.map((quote) => (
        <article
          key={quote.id}
          className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-green">
                {quote.reference}
              </span>
              <h2 className="mt-1 text-2xl font-bold text-brand-navy">{quote.service_name}</h2>
            </div>
            <span
              className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${statusColor[quote.status]}`}
            >
              {statusLabel[quote.status]}
            </span>
          </div>

          <div className="p-6">
            <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Property</dt>
                <dd className="mt-1 text-sm font-semibold text-brand-navy">
                  {quote.bedrooms ? `${quote.bedrooms}-bedroom ` : ""}
                  {quote.property_type}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</dt>
                <dd className="mt-1 text-sm font-semibold text-brand-navy">{quote.location}</dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Preferred Schedule</dt>
                <dd className="mt-1 text-sm font-semibold text-brand-navy">
                  {quote.preferred_date} · {quote.preferred_time?.slice(0, 5)}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Photos</dt>
                <dd className="mt-1 text-sm font-semibold text-brand-navy">
                  {quote.photos.length ? `${quote.photos.length} uploaded` : "None"}
                </dd>
              </div>
            </dl>

            {quote.photos.length > 0 && (
              <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
                {quote.photos.map((photo) => (
                  <a
                    key={photo.id}
                    href={photo.file}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 overflow-hidden rounded-xl border border-slate-200 transition-transform hover:scale-105"
                  >
                    <img
                      src={photo.file}
                      alt={photo.original_name}
                      className="h-24 w-28 object-cover"
                    />
                  </a>
                ))}
              </div>
            )}

            {quote.notes && (
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Special Notes / Requests</p>
                <RichTextContent html={quote.notes} className="mt-1 text-sm text-slate-700 leading-relaxed" />
              </div>
            )}

            {quote.status === "NEW" && (
              <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-amber-50/80 border border-amber-200 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⏳</span>
                  <p className="text-sm font-medium text-amber-900">
                    We are assessing your property details and will publish your estimate shortly. Your appointment is pending.
                  </p>
                </div>
                <Link
                  href="/bookings"
                  className="shrink-0 text-xs font-bold uppercase tracking-wider text-amber-950 underline hover:text-brand-green"
                >
                  View in Bookings →
                </Link>
              </div>
            )}

            {quote.status === "QUOTED" && (
              <div className="mt-6 rounded-2xl border-2 border-brand-green bg-green-50/40 p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-green">
                  Your Nasse Cleaning Estimate
                </p>
                <p className="mt-2 text-4xl font-extrabold text-brand-navy">
                  {money(quote.estimated_price!)}
                </p>
                {quote.admin_notes && (
                  <div className="mt-3 text-sm text-slate-700">
                    <RichTextContent html={quote.admin_notes} />
                  </div>
                )}
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    disabled={respond.isPending}
                    onClick={() => respond.mutate({ id: quote.id, decision: "accept" })}
                    className="rounded-full bg-brand-green px-7 py-3 font-bold text-white shadow-md hover:bg-opacity-95 transition-all disabled:opacity-50"
                  >
                    Accept Quote & Confirm Booking
                  </button>
                  <button
                    disabled={respond.isPending}
                    onClick={() => respond.mutate({ id: quote.id, decision: "decline" })}
                    className="rounded-full border border-red-300 bg-white px-7 py-3 font-bold text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                  >
                    Decline
                  </button>
                </div>
              </div>
            )}

            {quote.status === "ACCEPTED" && (
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-950">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold">✓</span>
                  <span className="text-sm font-semibold">
                    Quote Accepted · Booking status is Confirmed!
                  </span>
                </div>
                <Link
                  href="/bookings"
                  className="rounded-full bg-brand-navy px-5 py-2 text-xs font-bold text-white hover:bg-brand-green transition-colors"
                >
                  View Live Booking →
                </Link>
              </div>
            )}
          </div>
        </article>
      ))}

      {!quotes.length && (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
            📋
          </div>
          <h2 className="mt-4 text-2xl font-bold text-brand-navy">No estimate requests yet</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-600">
            Request an estimate for your house, office, or facility cleaning to receive custom pricing.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-block rounded-full bg-brand-green px-7 py-3.5 font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
          >
            Book a service
          </Link>
        </div>
      )}
    </div>
  );
}
