"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useId, useRef, useState } from "react";

type DatePart = "day" | "month" | "year";

type FormattedDateInputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  min?: string;
  max?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

function splitIso(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? { year: match[1], month: match[2], day: match[3] } : { year: "", month: "", day: "" };
}

function validIso(day: string, month: string, year: string, min?: string, max?: string) {
  if (day.length !== 2 || month.length !== 2 || year.length !== 4) return "";
  const numericDay = Number(day), numericMonth = Number(month), numericYear = Number(year);
  const date = new Date(numericYear, numericMonth - 1, numericDay);
  if (date.getFullYear() !== numericYear || date.getMonth() !== numericMonth - 1 || date.getDate() !== numericDay) return "";
  const iso = `${year}-${month}-${day}`;
  return (min && iso < min) || (max && iso > max) ? "" : iso;
}

export function FormattedDateInput({ value, onChange, label, id, min, max, required=false, disabled=false, className="" }: FormattedDateInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const initial = splitIso(value);
  const [day, setDay] = useState(initial.day), [month, setMonth] = useState(initial.month), [year, setYear] = useState(initial.year);
  const [invalid, setInvalid] = useState(false);
  const dayRef = useRef<HTMLInputElement>(null), monthRef = useRef<HTMLInputElement>(null), yearRef = useRef<HTMLInputElement>(null);
  const localChangeRef = useRef(false);

  useEffect(() => {
    if (localChangeRef.current) { localChangeRef.current = false; return; }
    const parts = splitIso(value);
    setDay(parts.day); setMonth(parts.month); setYear(parts.year); setInvalid(false);
  }, [value]);

  const commit = (nextDay: string, nextMonth: string, nextYear: string) => {
    if (!nextDay && !nextMonth && !nextYear) { setInvalid(false); if (value) { localChangeRef.current=true; onChange(""); } return; }
    const iso = validIso(nextDay, nextMonth, nextYear, min, max);
    setInvalid(nextDay.length === 2 && nextMonth.length === 2 && nextYear.length === 4 && !iso);
    if (iso) { setInvalid(false); if (iso !== value) { localChangeRef.current=true; onChange(iso); } }
    else if (value) { localChangeRef.current=true; onChange(""); }
  };

  const update = (part: DatePart, raw: string) => {
    const limit = part === "year" ? 4 : 2;
    const next = raw.replace(/\D/g, "").slice(0, limit);
    const values = { day, month, year, [part]: next };
    if (part === "day") setDay(next); else if (part === "month") setMonth(next); else setYear(next);
    if (next.length === limit) (part === "day" ? monthRef : part === "month" ? yearRef : { current: null }).current?.focus();
    commit(values.day, values.month, values.year);
  };

  const handleBackspace = (event: KeyboardEvent<HTMLInputElement>, part: DatePart) => {
    if (event.key !== "Backspace" || event.currentTarget.value || event.currentTarget.selectionStart !== 0) return;
    if (part === "month") dayRef.current?.focus();
    if (part === "year") monthRef.current?.focus();
  };

  const selectCalendarDate = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.value;
    if (!selected) return;
    const parts = splitIso(selected);
    setDay(parts.day); setMonth(parts.month); setYear(parts.year); setInvalid(false); if (selected !== value) { localChangeRef.current=true; onChange(selected); }
  };

  return <div className={className}>
    {label && <label htmlFor={`${inputId}-day`} className="block text-sm font-semibold text-brand-navy">{label}{required && <span className="text-red-500"> *</span>}</label>}
    <div className={`mt-2 flex w-full items-center rounded-xl border bg-white px-3 py-2 transition focus-within:border-brand-green focus-within:ring-2 focus-within:ring-green-100 ${invalid ? "border-red-400" : "border-slate-300"} ${disabled ? "bg-slate-100 opacity-60" : ""}`}>
      <input ref={dayRef} id={`${inputId}-day`} inputMode="numeric" aria-label={`${label ?? "Date"} day`} placeholder="DD" value={day} disabled={disabled} onChange={event=>update("day",event.target.value)} onKeyDown={event=>handleBackspace(event,"day")} className="w-8 bg-transparent text-center outline-none placeholder:text-slate-400"/>
      <span aria-hidden="true" className="px-1 text-slate-400">/</span>
      <input ref={monthRef} inputMode="numeric" aria-label={`${label ?? "Date"} month`} placeholder="MM" value={month} disabled={disabled} onChange={event=>update("month",event.target.value)} onKeyDown={event=>handleBackspace(event,"month")} className="w-8 bg-transparent text-center outline-none placeholder:text-slate-400"/>
      <span aria-hidden="true" className="px-1 text-slate-400">/</span>
      <input ref={yearRef} inputMode="numeric" aria-label={`${label ?? "Date"} year`} placeholder="YYYY" value={year} disabled={disabled} onChange={event=>update("year",event.target.value)} onKeyDown={event=>handleBackspace(event,"year")} className="w-12 bg-transparent text-center outline-none placeholder:text-slate-400"/>
      <span className="relative ml-auto grid h-8 w-8 place-items-center text-slate-500">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><rect x="3" y="5" width="18" height="16" rx="2"/><path strokeLinecap="round" d="M8 3v4m8-4v4M3 10h18"/></svg>
        <input type="date" aria-label={`Choose ${label?.toLowerCase() ?? "date"} from calendar`} value={value} min={min} max={max} required={required} disabled={disabled} onChange={selectCalendarDate} className="absolute inset-0 h-full w-full cursor-pointer opacity-0"/>
      </span>
    </div>
    {invalid && <p role="alert" className="mt-1 text-xs text-red-600">Enter a valid date{min ? ` on or after ${splitIso(min).day}/${splitIso(min).month}/${splitIso(min).year}` : ""}.</p>}
  </div>;
}
