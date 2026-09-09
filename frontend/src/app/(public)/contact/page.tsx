"use client";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { enquiriesApi } from "@/lib/api/enquiries";
import { RichTextEditor } from "@/components/common/rich-text-editor";
export default function ContactPage(){const[f,setF]=useState({name:"",email:"",phone:"",message:""});const m=useMutation({mutationFn:enquiriesApi.createContact,onSuccess:()=>toast.success("Message sent")});const submit=(e:FormEvent)=>{e.preventDefault();m.mutate(f)};return <div className="mx-auto max-w-2xl px-6 py-16"><h1 className="mb-8 text-4xl font-bold text-brand-navy">Contact Nasse</h1><form onSubmit={submit} className="grid gap-4">{([['name','Name'],['email','Email'],['phone','Phone']] as const).map(([k,p])=><input className="rounded-xl border px-4 py-3" required key={k} placeholder={p} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/>)}<RichTextEditor label="Message" required placeholder="How can we help?" value={f.message} onChange={message=>setF({...f,message})} minHeight="170px"/><button className="rounded-xl bg-brand-green px-5 py-3 font-semibold text-white">Send Message</button></form></div>}
