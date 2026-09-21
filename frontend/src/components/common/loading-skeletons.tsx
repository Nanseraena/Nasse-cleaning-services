import React from "react";

export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-slate-200/80 ${className}`}
      {...props}
    />
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4 py-8">
      <Skeleton className="h-4 w-32 rounded-full" />
      <Skeleton className="h-10 w-3/4 max-w-lg rounded-xl" />
      <Skeleton className="h-5 w-full max-w-2xl rounded-lg" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8">
      <div className="sm:col-span-2 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="sm:col-span-2 space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
      <div className="sm:col-span-2 space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-28 w-full rounded-xl" />
      </div>
      <Skeleton className="h-14 w-full rounded-xl sm:col-span-2" />
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-4 shadow-sm"
        >
          <div className="space-y-4">
            <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
            <div className="space-y-2 px-2">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-5/6 rounded" />
            </div>
          </div>
          <div className="mt-6 border-t border-slate-100 px-2 pt-4 flex justify-between items-center">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-6 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListItemsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5"
        >
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="border-b bg-slate-50 p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-slate-100 p-4 space-y-4">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 pt-3 items-center">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-5 flex-1 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServiceDetailSkeleton() {
  return (
    <div className="space-y-12">
      <div className="bg-slate-50 border-b border-slate-200/70 py-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.2fr_.8fr] items-center">
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-3/4 max-w-md rounded-xl" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-5/6 rounded" />
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-12 w-36 rounded-full" />
              <Skeleton className="h-12 w-36 rounded-full" />
            </div>
          </div>
          <Skeleton className="aspect-[16/10] w-full rounded-3xl" />
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[3fr_1.2fr]">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <div className="grid gap-4 sm:grid-cols-2 pt-4">
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
          </div>
        </div>
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    </div>
  );
}
