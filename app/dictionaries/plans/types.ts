export interface PlanFeature {
  text: string;
}

export interface Plan {
  icon: string;
  name: string;
  description: string;
  price: string;
  priceSuffix: string;
  cta: string;
  inheritLabel?: string;
  features: PlanFeature[];
  featured?: boolean;
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
  enterprise: Plan[];
  custom: Plan[];
  meta: {
    title: string;
    description: string;
  };
}
