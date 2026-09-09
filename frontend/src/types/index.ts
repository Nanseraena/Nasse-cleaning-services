export type Service = {
  id: string;
  name: string;
  slug: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "POST_CONSTRUCTION" | "FACILITY_CARE";
  short_description: string;
  description: string;
  is_active: boolean;
};
export type ServiceAreaStatus = "active" | "inactive" | "coming_soon";
export type ServiceArea = { id:string; name:string; slug:string; status:ServiceAreaStatus; description:string; transport_charge:string };

export type QuoteRequest = {
  id: string;
  reference: string;
  user: number;
  service: string | null;
  service_name: string;
  service_area: string;
  service_area_name: string;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  property_type: string;
  approximate_size: string;
  bedrooms: number | null;
  bathrooms: number | null;
  preferred_date: string | null;
  preferred_time: string | null;
  frequency: string;
  notes: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "ACCEPTED" | "DECLINED";
  estimated_price: string | null;
  admin_notes: string;
  photos: { id: string; file: string; original_name: string; created_at: string }[];
  booking_id: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  profile_picture?: string | null;
};

export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
export type Booking = {
  id: string; reference: string; quote: string | null; quote_reference: string | null; customer: number; customer_name: string; customer_email: string;
  service: string; service_name: string; service_area: string | null; service_area_name: string | null; service_date: string; service_time: string;
  location: string; phone: string; alternative_contact: string; notes: string;
  status: BookingStatus; created_at: string; updated_at: string;
};
