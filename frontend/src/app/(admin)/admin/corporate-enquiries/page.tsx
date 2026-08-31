"use client";
import { useQuery } from "@tanstack/react-query";
import { enquiriesApi } from "@/lib/api/enquiries";
import { queryKeys } from "@/lib/query/keys";
export default function CorporateEnquiriesPage(){const q=useQuery({queryKey:queryKeys.corporateEnquiries,queryFn:enquiriesApi.adminCorporate});return <div><h1 className="mb-6 text-3xl font-bold text-brand-navy">Corporate Enquiries</h1><pre className="overflow-auto rounded-2xl bg-white p-5 text-xs">{JSON.stringify(q.data??[],null,2)}</pre></div>}
