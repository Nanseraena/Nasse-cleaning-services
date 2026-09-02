"use client";
import axios from "axios";
import { FormEvent, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { bookingsApi } from "@/lib/api/bookings";
import { servicesApi } from "@/lib/api/services";
import { loginPath } from "@/lib/auth-navigation";
import { queryKeys } from "@/lib/query/keys";
import { selectAuthInitialized, selectIsAuthenticated, selectUser } from "@/store/auth/selectors";

const inputClass="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-green-100";
export function BookingForm(){
  const params=useSearchParams(),router=useRouter();
  const initialized=useSelector(selectAuthInitialized),authenticated=useSelector(selectIsAuthenticated),user=useSelector(selectUser);
  const {data:services=[],isLoading}=useQuery({queryKey:queryKeys.services,queryFn:servicesApi.list});
  const requested=params.get("service")??"";
  const [service,setService]=useState(requested),[date,setDate]=useState(""),[time,setTime]=useState(""),[location,setLocation]=useState(""),[phone,setPhone]=useState(""),[alternative,setAlternative]=useState(""),[notes,setNotes]=useState(""),[submitting,setSubmitting]=useState(false);
  const minDate=useMemo(()=>{const now=new Date();return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`},[]);
  async function submit(event:FormEvent){event.preventDefault();if(!initialized)return toast.info("Checking your session…");if(!authenticated){toast.info("Sign in to book your cleaning service.");router.push(loginPath(`/book${requested?`?service=${encodeURIComponent(requested)}`:""}`));return}setSubmitting(true);try{const booking=await bookingsApi.create({service,service_date:date,service_time:time,location,phone,alternative_contact:alternative,notes});toast.success(`Booking ${booking.reference} received`);router.push(`/bookings?created=${encodeURIComponent(booking.reference)}`)}catch(error){const data=axios.isAxiosError(error)?error.response?.data as Record<string,unknown>|undefined:undefined;const first=data&&Object.values(data).flat().find(value=>typeof value==="string");toast.error(typeof first==="string"?first:"We could not create your booking. Please review the details.")}finally{setSubmitting(false)}}
  return <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(280px,2fr)]">
    <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"><div className="grid gap-5 sm:grid-cols-2">
      <label className="text-sm font-semibold text-brand-navy sm:col-span-2">Cleaning service<select className={inputClass} value={service} onChange={e=>setService(e.target.value)} required disabled={isLoading}><option value="">Select a service</option>{services.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
      <label className="text-sm font-semibold text-brand-navy">Preferred date<input className={inputClass} type="date" min={minDate} value={date} onChange={e=>setDate(e.target.value)} required/></label>
      <label className="text-sm font-semibold text-brand-navy">Preferred time<input className={inputClass} type="time" value={time} onChange={e=>setTime(e.target.value)} required/></label>
      <label className="text-sm font-semibold text-brand-navy sm:col-span-2">Service address<input className={inputClass} autoComplete="street-address" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Street, area, city" required/></label>
      <label className="text-sm font-semibold text-brand-navy">Phone number<input className={inputClass} type="tel" autoComplete="tel" value={phone} onChange={e=>setPhone(e.target.value)} required/></label>
      <label className="text-sm font-semibold text-brand-navy">Alternative contact <span className="font-normal text-slate-400">(optional)</span><input className={inputClass} value={alternative} onChange={e=>setAlternative(e.target.value)} placeholder="Another phone or contact method"/></label>
      <label className="text-sm font-semibold text-brand-navy sm:col-span-2">Cleaning instructions <span className="font-normal text-slate-400">(optional)</span><textarea className={`${inputClass} min-h-32 resize-y`} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Rooms, stains, pets, access instructions, or special requirements"/></label>
    </div><button disabled={submitting||!initialized} className="w-full rounded-xl bg-brand-green px-6 py-3.5 font-bold text-white disabled:opacity-60">{submitting?"Sending booking…":authenticated?"Book this service":"Sign in to book"}</button></form>
    <aside className="rounded-3xl bg-brand-navy p-7 text-white lg:sticky lg:top-6"><p className="text-sm font-bold uppercase tracking-widest text-brand-green">What happens next</p><h2 className="mt-3 text-2xl font-bold">A simple, clear booking process</h2><ol className="mt-6 space-y-5 text-sm text-white/80"><li><b className="text-white">1. Submit your details.</b><br/>You’ll immediately receive a booking reference.</li><li><b className="text-white">2. We review availability.</b><br/>Our team confirms your appointment and requirements.</li><li><b className="text-white">3. Track your booking.</b><br/>See every status update from your bookings page.</li></ol>{user&&<p className="mt-7 rounded-2xl bg-white/10 p-4 text-sm">Booking as <b>{user.first_name||user.email}</b></p>}</aside>
  </div>
}
