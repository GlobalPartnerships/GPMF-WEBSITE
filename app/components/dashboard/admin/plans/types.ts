export type ModalMode = "create" | "edit";

export interface ModalState {
  mode: ModalMode;
  planType: PlanResponse["category"];
  plan?: PlanResponse;
  allowPlanTypeSelection?: boolean;
}

export interface MostBoughtPlanData {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  details: string[];
  stats: {
    earnings: string;
    sold: number;
    conversionRate: string;
    inCart: number;
  };
}

// API Response Types
export interface BillingType {
  id: string;
  name: string;
  description: string;
}

export interface PlanFeature {
  id: string;
  item: string;
  plan_id: string;
}

export interface PlanResponse {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  base_price: number;
  meetings_per_month: number;
  category: "standard" | "custom";
  billing_type_id: string;
  billing_type: BillingType;
  is_active: boolean;
  created_at: string;
  icon_url: string | null;
  features: PlanFeature[];
}

export type PlansListResponse = PlanResponse[];

// Mutation Payloads
export interface CreatePlanPayload {
  name: string;
  subtitle: string;
  description: string;
  base_price: number;
  meetings_per_month: number;
  category: "standard" | "custom";
  billing_type_id: string;
  icon_url: string;
}

export interface UpdatePlanPayload {
  name?: string;
  subtitle?: string;
  description?: string;
  base_price?: number;
  meetings_per_month?: number;
  category?: "standard" | "custom";
  billing_type_id?: string;
  is_active?: boolean;
  icon_url?: string;
}

export interface ActionResult<T = PlanResponse> {
  success: boolean;
  data?: T;
  error?: string;
}
