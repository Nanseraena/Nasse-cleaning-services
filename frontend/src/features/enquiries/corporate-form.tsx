"use client";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { enquiriesApi } from "@/lib/api/enquiries";
const cls="w-full rounded-xl border px-4 py-3 outline-none focus:border-brand-green";
export function CorporateForm(){
 const [f,setF]=useState({company_name:"",contact_name:"",email:"",phone:"",facility_type:"",location:"",approximate_size:"",frequency:"",preferred_start_date:"",requirements:""});
 const m=useMutation({mutationFn:enquiriesApi.createCorporate,onSuccess:()=>toast.success("Corporate enquiry received"),onError:()=>toast.error("Could not submit enquiry")});
 const set=(k:keyof typeof f,v:string)=>setF(p=>({...p,[k]:v}));
 const submit=(e:FormEvent)=>{e.preventDefault();m.mutate({...f,preferred_start_date:f.preferred_start_date||null});};
 return <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">{([['company_name','Company name'],['contact_name','Contact person'],['email','Business email'],['phone','Phone'],['facility_type','Facility type'],['location','Location'],['approximate_size','Approximate size'],['frequency','Cleaning frequency']] as const).map(([k,p])=><input key={k} className={cls} placeholder={p} required={['company_name','contact_name','email','phone'].includes(k)} value={f[k]} onChange={e=>set(k,e.target.value)}/>)}<input className={cls} type="date" value={f.preferred_start_date} onChange={e=>set('preferred_start_date',e.target.value)}/><textarea className={`${cls} md:col-span-2`} rows={5} placeholder="Requirements" value={f.requirements} onChange={e=>set('requirements',e.target.value)}/><button className="rounded-xl bg-brand-navy px-5 py-3 font-semibold text-white md:col-span-2">Send Corporate Enquiry</button></form>;
}
