export interface PlanCardData {
  id: string;
  category: "standard" | "custom";
  name: string;
  subtitle: string;
  price: string;
  priceNote: string;
  features: string[];
}

export interface PlansDict {
  eyebrow: string;
  headlinePart1: string;
  headlineAccent: string;
  subtitle: string;
  tabs: {
    enterprise: string;
    custom: string;
  };
  sideText: {
    line1: string;
    line2: string;
  };
  cta: string;
  emptyState: {
    standard: string;
    custom: string;
  };
  plans: PlanCardData[];
  meta: {
    title: string;
    description: string;
  };
}
