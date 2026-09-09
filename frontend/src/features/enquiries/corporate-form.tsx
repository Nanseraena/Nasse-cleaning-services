"use client";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { enquiriesApi } from "@/lib/api/enquiries";
import { FormattedDateInput } from "@/components/common/formatted-date-input";
import { LocationAutocomplete } from "@/components/common/location-autocomplete";
import { RichTextEditor } from "@/components/common/rich-text-editor";
const cls="w-full rounded-xl border px-4 py-3 outline-none focus:border-brand-green";
export function CorporateForm(){
 const [f,setF]=useState({company_name:"",contact_name:"",email:"",phone:"",facility_type:"",location:"",approximate_size:"",frequency:"",preferred_start_date:"",requirements:""});
 const m=useMutation({mutationFn:enquiriesApi.createCorporate,onSuccess:()=>toast.success("Corporate enquiry received"),onError:()=>toast.error("Could not submit enquiry")});
 const set=(k:keyof typeof f,v:string)=>setF(p=>({...p,[k]:v}));
 const submit=(e:FormEvent)=>{e.preventDefault();m.mutate({...f,preferred_start_date:f.preferred_start_date||null});};
 return <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">{([['company_name','Company name'],['contact_name','Contact person'],['email','Business email'],['phone','Phone'],['facility_type','Facility type'],['approximate_size','Approximate size'],['frequency','Cleaning frequency']] as const).map(([k,p])=><input key={k} className={cls} placeholder={p} required={['company_name','contact_name','email','phone'].includes(k)} value={f[k]} onChange={e=>set(k,e.target.value)}/>)}<LocationAutocomplete label="Facility location" value={f.location} onChange={value=>set('location',value)}/><FormattedDateInput label="Preferred start date" value={f.preferred_start_date} onChange={value=>set('preferred_start_date',value)}/><RichTextEditor className="md:col-span-2" label="Requirements" placeholder="Describe your facility and cleaning requirements" value={f.requirements} onChange={value=>set('requirements',value)} minHeight="140px"/><button className="rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white md:col-span-2">Send Corporate Enquiry</button></form>;
}
