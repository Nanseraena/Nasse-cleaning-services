export type Service = {
  id: string;
  name: string;
  slug: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "POST_CONSTRUCTION" | "FACILITY_CARE";
  short_description: string;
  description: string;
  is_active: boolean;
};

export type QuoteRequest = {
  id: string;
  service: string | null;
  full_name: string;
  email: string;
  phone: string;
  location: string;
  property_type: string;
  approximate_size: string;
  preferred_date: string | null;
  frequency: string;
  notes: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "ACCEPTED" | "DECLINED";
  created_at: string;
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
