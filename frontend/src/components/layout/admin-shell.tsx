"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAuthInitialized, selectIsAuthenticated } from "@/store/auth/selectors";
import { logoutRequested } from "@/store/auth/reducer";
export function AdminShell({children}:{children:React.ReactNode}){const path=usePathname();const router=useRouter();const dispatch=useDispatch();const initialized=useSelector(selectAuthInitialized);const ok=useSelector(selectIsAuthenticated);useEffect(()=>{if(initialized&&!ok)router.replace('/admin/login')},[initialized,ok,router]);if(!initialized||!ok)return <div className="p-8">Checking session…</div>;const nav=[['/admin','Dashboard'],['/admin/quotes','Quotes'],['/admin/corporate-enquiries','Corporate Enquiries'],['/admin/contact-messages','Contact Messages']];return <div className="min-h-screen bg-slate-50"><header className="border-b bg-white px-6 py-4"><div className="mx-auto flex max-w-7xl justify-between"><b className="text-brand-navy">Nasse Admin</b><button onClick={()=>dispatch(logoutRequested())}>Logout</button></div></header><div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-[220px_1fr]"><aside className="space-y-2">{nav.map(([href,label])=><Link key={href} className={`block rounded-xl px-4 py-3 ${path===href?'bg-brand-navy text-white':'bg-white'}`} href={href}>{label}</Link>)}</aside><section>{children}</section></div></div>}
