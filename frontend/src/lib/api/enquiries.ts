import { api } from "./client";

export type CorporateEnquiryPayload = {
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  facility_type: string;
  location: string;
  approximate_size: string;
  frequency: string;
  preferred_start_date: string | null;
  requirements: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const enquiriesApi = {
  createCorporate: async (payload: CorporateEnquiryPayload) =>
    (await api.post("/corporate-enquiries/", payload)).data,
  createContact: async (payload: ContactPayload) => (await api.post("/contact-messages/", payload)).data,
  adminCorporate: async () => (await api.get("/admin/corporate-enquiries/")).data,
  adminContacts: async () => (await api.get("/admin/contact-messages/")).data,
};
