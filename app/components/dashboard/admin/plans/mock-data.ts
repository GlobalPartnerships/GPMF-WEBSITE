import type { Plan, MostBoughtPlanData } from "./types";

export const mockStandardPlans: Plan[] = [
  {
    id: "std-1",
    title: "Essentials",
    subtitle: "Perfect for individuals starting their journey with basic features",
    price: "$49",
    type: "standard",
  },
  {
    id: "std-2",
    title: "Professional",
    subtitle: "Best for growing teams with advanced collaboration tools",
    price: "$129",
    type: "standard",
  },
  {
    id: "std-3",
    title: "Enterprise",
    subtitle: "Full-featured plan for large organizations with premium support",
    price: "$299",
    type: "standard",
  },
  {
    id: "std-4",
    title: "Executive",
    subtitle: "White-glove service with dedicated account management",
    price: "$599",
    type: "standard",
  },
];

export const mockCustomPlans: Plan[] = [
  {
    id: "cst-1",
    title: "Corporate Wellness",
    subtitle: "Tailored wellness program for corporate teams of 50+",
    price: "$2,500",
    type: "custom",
  },
  {
    id: "cst-2",
    title: "Agency Bundle",
    subtitle: "Multi-client management for consulting agencies",
    price: "$1,800",
    type: "custom",
  },
];

export const mockMostBoughtPlan: MostBoughtPlanData = {
  id: "std-2",
  title: "Professional",
  subtitle: "Best for growing teams with advanced collaboration tools",
  price: "$129",
  details: [
    "12 one-on-one sessions per month",
    "Priority scheduling with 24h notice",
    "Access to group workshops (unlimited)",
    "Personalized progress tracking dashboard",
    "Email & chat support within 4 hours",
    "Monthly performance review report",
  ],
  stats: {
    earnings: "$100,000",
    sold: 140,
    conversionRate: "1/9",
    inCart: 20,
  },
};
