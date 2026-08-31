"use client";
import { useQuery } from "@tanstack/react-query";
import { enquiriesApi } from "@/lib/api/enquiries";
import { queryKeys } from "@/lib/query/keys";
export default function ContactMessagesPage(){const q=useQuery({queryKey:queryKeys.contactMessages,queryFn:enquiriesApi.adminContacts});return <div><h1 className="mb-6 text-3xl font-bold text-brand-navy">Contact Messages</h1><pre className="overflow-auto rounded-2xl bg-white p-5 text-xs">{JSON.stringify(q.data??[],null,2)}</pre></div>}
