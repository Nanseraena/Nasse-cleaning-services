"use client";
import { FormEvent,useEffect,useMemo,useState } from "react";
import { useMutation,useQuery } from "@tanstack/react-query";
import { useRouter,useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { FormattedDateInput } from "@/components/common/formatted-date-input";
import { MultiPhotoUpload } from "@/components/common/multi-photo-upload";
import { SearchableSelect } from "@/components/common/searchable-select";
import { FormattedNumberInput } from "@/components/common/formatted-number-input";
import { quotesApi } from "@/lib/api/quotes";
import { servicesApi } from "@/lib/api/services";
import { loginPath } from "@/lib/auth-navigation";
import { queryKeys } from "@/lib/query/keys";
import { selectAuthInitialized,selectIsAuthenticated,selectUser } from "@/store/auth/selectors";
const input="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-green-100";
export function QuoteForm(){
 const router=useRouter(),params=useSearchParams(),user=useSelector(selectUser),initialized=useSelector(selectAuthInitialized),authenticated=useSelector(selectIsAuthenticated);const services=useQuery({queryKey:queryKeys.services,queryFn:servicesApi.list});
 const [form,setForm]=useState({service:params.get("service")??"",full_name:"",email:"",phone:"",location:"",property_type:"Apartment",bedrooms:"",bathrooms:"",preferred_date:"",preferred_time:"",notes:""}),[photos,setPhotos]=useState<File[]>([]);
 const minDate=useMemo(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`},[]);
 useEffect(()=>{if(user)setForm(current=>({...current,full_name:[user.first_name,user.last_name].filter(Boolean).join(" ")||user.username,email:user.email}))},[user]);
 const set=(key:keyof typeof form,value:string)=>setForm(current=>({...current,[key]:value}));
 const mutation=useMutation({mutationFn:quotesApi.create,onSuccess:quote=>{toast.success(`Estimate request ${quote.reference} received`);router.push(`/estimates?created=${encodeURIComponent(quote.reference)}`)},onError:()=>toast.error("Could not submit your estimate request. Check the details and photos.")});
 function submit(event:FormEvent){event.preventDefault();if(!authenticated){router.push(loginPath(`/book${form.service?`?service=${encodeURIComponent(form.service)}`:""}`));return}mutation.mutate({...form,bedrooms:form.bedrooms?Number(form.bedrooms):undefined,bathrooms:form.bathrooms?Number(form.bathrooms):undefined,photos})}
 if(!initialized)return <p>Checking your session…</p>;
 if(!authenticated)return <div className="rounded-3xl border bg-white p-10 text-center"><h2 className="text-2xl font-bold text-brand-navy">Sign in before requesting an estimate</h2><p className="mt-3 text-slate-600">Create an account if you are new. We’ll bring you back here afterward.</p><button onClick={()=>router.push(loginPath("/book"))} className="mt-6 rounded-full bg-brand-navy px-6 py-3 font-semibold text-white">Sign in or create account</button></div>;
 return <form onSubmit={submit} className="grid gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 md:p-8">
  <SearchableSelect className="sm:col-span-2" label="Cleaning service" required placeholder="Choose a service" value={form.service} onChange={value=>set("service",value)} options={(services.data??[]).map(service=>({value:service.id,label:service.name}))}/>
  <label className="text-sm font-semibold">Full name<input className={input} required value={form.full_name} onChange={e=>set("full_name",e.target.value)}/></label><label className="text-sm font-semibold">Email<input className={input} type="email" required value={form.email} onChange={e=>set("email",e.target.value)}/></label>
  <label className="text-sm font-semibold">Phone<input className={input} type="tel" required value={form.phone} onChange={e=>set("phone",e.target.value)}/></label><label className="text-sm font-semibold">Location<input className={input} required placeholder="Ntinda, Kampala" value={form.location} onChange={e=>set("location",e.target.value)}/></label>
  <SearchableSelect label="Property type" value={form.property_type} onChange={value=>set("property_type",value)} options={["Apartment","House","Office","Commercial facility","Post-construction site","Other"].map(value=>({value,label:value}))}/>
  <div className="grid grid-cols-2 gap-3"><label className="text-sm font-semibold">Bedrooms<FormattedNumberInput className={input} min={0} max={100} value={form.bedrooms} onValueChange={value=>set("bedrooms",value?String(value):"")}/></label><label className="text-sm font-semibold">Bathrooms<FormattedNumberInput className={input} min={0} max={100} value={form.bathrooms} onValueChange={value=>set("bathrooms",value?String(value):"")}/></label></div>
  <FormattedDateInput label="Preferred date" min={minDate} required value={form.preferred_date} onChange={value=>set("preferred_date",value)}/><label className="text-sm font-semibold">Preferred time<input className={input} type="time" required value={form.preferred_time} onChange={e=>set("preferred_time",e.target.value)}/></label>
  <MultiPhotoUpload files={photos} onChange={setPhotos}/><label className="text-sm font-semibold sm:col-span-2">Additional notes<textarea className={`${input} min-h-32 resize-y`} placeholder="Tell us about stains, grease buildup, pets, access, or specific cleaning needs" value={form.notes} onChange={e=>set("notes",e.target.value)}/></label>
  <button disabled={mutation.isPending} className="rounded-xl bg-brand-green px-6 py-3.5 font-bold text-white disabled:opacity-60 sm:col-span-2">{mutation.isPending?"Uploading and submitting…":"Request estimate"}</button>
 </form>
}
