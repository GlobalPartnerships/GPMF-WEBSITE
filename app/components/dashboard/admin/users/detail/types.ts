import type { User } from "../types";

export interface BillingType {
  id: string;
  name: string;
  description: string;
}

export interface PlanFeature {
  id: string;
  plan_id: string;
  item: string;
}

export interface Plan {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  category: string;
  base_price: number;
  is_active: boolean;
  created_at: string;
  icon_url: string | null;
  meetings_per_month: number;
  billing_type_id: string;
  billing_type: BillingType;
  features: PlanFeature[];
}

export interface Order {
  id: string;
  user_id: string;
  plan_id: string;
  status: string;
  total_price: number;
  currency: string;
  created_at: string;
  payment_provider_name: string;
  provider_order_id: string;
  provider_capture_id: string;
  receipt_url: string | null;
  plan: Plan;
  user: User;
}

export interface PurchasedPlan {
  id: string;
  user_id: string;
  order_id: string;
  plan_id: string;
  status: string;
  meetings_included: number;
  meetings_used: number;
  meetings_left: number;
  starts_at: string;
  updated_at: string;
  user: User | null;
  order: Order | null;
  plan: Plan | null;
}

export interface MeetingAttendee {
  id: string;
  meeting_id: string;
  user_id: string;
  added_at: string;
  user: User;
}

export interface Meeting {
  id: string;
  purchased_plan_id: string;
  created_by: string;
  google_meet_url: string | null;
  google_event_id: string | null;
  google_calendar_id: string | null;
  date: string;
  duration_minutes: number;
  title: string;
  description: string | null;
  status: string;
  is_additional: boolean;
  created_at: string;
  updated_at: string;
  purchased_plan: PurchasedPlan | null;
  creator: User;
  attendees: MeetingAttendee[];
}

export interface UserDetailResponse extends User {
  current_plan: PurchasedPlan | null;
  previous_plans: PurchasedPlan[];
  scheduled_meetings: Meeting[];
  canceled_meetings: Meeting[];
  postponed_meetings: Meeting[];
  completed_meetings: Meeting[];
  diagnosis: unknown[];
  reports: unknown[];
}
