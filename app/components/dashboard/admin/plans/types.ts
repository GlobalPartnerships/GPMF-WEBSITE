export interface Plan {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  type: "standard" | "custom";
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
