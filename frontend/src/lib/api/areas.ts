import { api } from "./client";
import type { ServiceArea } from "@/types";
export const areasApi={
 list:async()=>(await api.get<ServiceArea[]>("/service-areas/")).data,
 registerInterest:async(payload:{area_name:string;name:string;email:string;phone?:string})=>(await api.post("/area-interests/",payload)).data,
};
