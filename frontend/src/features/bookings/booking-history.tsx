"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { bookingsApi } from "@/lib/api/bookings";
import { queryKeys } from "@/lib/query/keys";
import { selectAuthInitialized, selectIsAuthenticated } from "@/store/auth/selectors";
import type { BookingStatus } from "@/types";

const labels: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const colors: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-900 border border-amber-300",
  confirmed: "bg-blue-100 text-blue-900 border border-blue-300",
  in_progress: "bg-violet-100 text-violet-900 border border-violet-300",
  completed: "bg-emerald-100 text-emerald-900 border border-emerald-300",
  cancelled: "bg-slate-200 text-slate-700 border border-slate-300",
};

import { ListItemsSkeleton } from "@/components/common/loading-skeletons";

export function BookingHistory() {
  const authenticated = useSelector(selectIsAuthenticated);
  const initialized = useSelector(selectAuthInitialized);
  const params = useSearchParams();
  const client = useQueryClient();
  const created = params.get("created");

  const query = useQuery({
    queryKey: queryKeys.bookings,
    queryFn: bookingsApi.list,
    enabled: initialized && authenticated,
  });

  const cancel = useMutation({
    mutationFn: (id: string) => bookingsApi.update(id, { status: "cancelled" }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: queryKeys.bookings });
      client.invalidateQueries({ queryKey: queryKeys.myQuotes });
      toast.success("Booking cancelled successfully.");
    },
    onError: () => toast.error("Could not cancel this booking."),
  });

  if (!initialized || (authenticated && query.isLoading)) {
    return <ListItemsSkeleton count={3} />;
  }

  if (!authenticated) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-brand-navy">Sign in to see your bookings</h2>
        <p className="mt-3 text-slate-600">Your booking history is private and only available in your account.</p>
        <Link
          href="/login?next=%2Fbookings"
          className="mt-6 inline-block rounded-full bg-brand-navy px-8 py-3.5 font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-red-700">
        <p className="font-bold">We could not load your bookings.</p>
        <p className="mt-1 text-sm">Please refresh the page or try again in a few moments.</p>
      </div>
    );
  }

  const bookings = query.data ?? [];

  return (
    <div className="space-y-6">
      {created && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/90 p-6 text-emerald-950 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Booking Request Received!</h3>
            <p className="mt-1 text-sm text-emerald-900">
              Your booking has been saved as <span className="font-semibold text-amber-800">Pending</span> while our team reviews the property details. Reference:{" "}
              <span className="font-mono font-bold">{created}</span>
            </p>
          </div>
          <Link
            href="/estimates"
            className="shrink-0 rounded-full bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 transition-all text-center"
          >
            Track in Estimates →
          </Link>
        </div>
      )}

      {!bookings.length ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
            📅
          </div>
          <h2 className="mt-4 text-2xl font-bold text-brand-navy">No bookings yet</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-600">
            When you schedule a cleaning service, your appointment and its live status will appear here.
          </p>
          <Link
            href="/book"
            className="mt-6 inline-block rounded-full bg-brand-green px-7 py-3.5 font-bold text-white shadow-md hover:bg-opacity-95 transition-all"
          >
            Book a service now
          </Link>
        </div>
      ) : (
        bookings.map((booking) => (
          <article
            key={booking.id}
            className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-5">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-green">
                  {booking.reference}
                </span>
                <h2 className="mt-1 text-2xl font-bold text-brand-navy">{booking.service_name}</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${colors[booking.status]}`}>
                  {labels[booking.status]}
                </span>
              </div>
            </div>

            <div className="p-6">
              <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Scheduled Date & Time</dt>
                  <dd className="mt-1 text-sm font-semibold text-brand-navy">
                    {new Date(`${booking.service_date}T${booking.service_time}`).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Service Location</dt>
                  <dd className="mt-1 text-sm font-semibold text-brand-navy">{booking.location}</dd>
                </div>

                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Contact Number</dt>
                  <dd className="mt-1 text-sm font-semibold text-brand-navy">{booking.phone}</dd>
                </div>

                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Service Area / Zone</dt>
                  <dd className="mt-1 text-sm font-semibold text-brand-navy">
                    {booking.service_area_name || "Kampala Metropolitan"}
                  </dd>
                </div>
              </dl>

              {booking.notes && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Special Notes / Requests</p>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">{booking.notes}</p>
                </div>
              )}

              {/* Status explanation & actions */}
              {booking.status === "pending" && (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-50/80 border border-amber-200 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⏳</span>
                    <div>
                      <p className="text-sm font-bold text-amber-950">Under Review</p>
                      <p className="text-xs text-amber-800">
                        Our team is preparing your custom estimate. Once sent by the admin, you can accept or review it in Estimates.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/estimates"
                    className="rounded-full bg-brand-navy px-5 py-2 text-xs font-bold text-white hover:bg-brand-green transition-colors"
                  >
                    View in Estimates →
                  </Link>
                </div>
              )}

              {booking.status === "confirmed" && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-50/80 border border-blue-200 p-4 text-blue-950">
                  <span className="text-xl">✓</span>
                  <div>
                    <p className="text-sm font-bold">Booking Confirmed</p>
                    <p className="text-xs text-blue-800">
                      Your cleaning appointment is confirmed! Our cleaning team will arrive at the scheduled time.
                    </p>
                  </div>
                </div>
              )}

              {/* Cancellation button */}
              {["pending", "confirmed"].includes(booking.status) && (
                <div className="mt-6 flex justify-end border-t border-slate-100 pt-4">
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to cancel this booking?")) {
                        cancel.mutate(booking.id);
                      }
                    }}
                    disabled={cancel.isPending}
                    className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 disabled:opacity-50 transition-colors"
                  >
                    {cancel.isPending ? "Cancelling…" : "Cancel this booking"}
                  </button>
                </div>
              )}
            </div>
          </article>
        ))
      )}
    </div>
  );
}
