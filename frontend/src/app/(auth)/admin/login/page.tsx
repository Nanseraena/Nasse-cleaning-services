"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { authApi } from "@/lib/api/auth";
import { setSession } from "@/store/auth/reducer";
export default function AdminLoginPage(){const[username,setUsername]=useState("");const[password,setPassword]=useState("");const[loading,setLoading]=useState(false);const router=useRouter();const dispatch=useDispatch();async function submit(e:FormEvent){e.preventDefault();setLoading(true);try{const{user}=await authApi.login(username,password);dispatch(setSession(user));router.replace('/admin')}catch{toast.error('Invalid credentials')}finally{setLoading(false)}}return <main className="grid min-h-screen place-items-center bg-slate-50 px-6"><form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow"><h1 className="text-2xl font-bold text-brand-navy">Nasse Admin</h1><input className="w-full rounded-xl border px-4 py-3" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required/><input className="w-full rounded-xl border px-4 py-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="w-full rounded-xl bg-brand-navy px-4 py-3 text-white">{loading?'Signing in…':'Sign in'}</button></form></main>}
