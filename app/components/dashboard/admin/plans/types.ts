export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  type: "standard" | "custom";
  includes?: string[];
  iconId?: string;
}

export type ModalMode = "create" | "edit";

export interface ModalState {
  mode: ModalMode;
  planType: Plan["type"];
  plan?: Plan;
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
