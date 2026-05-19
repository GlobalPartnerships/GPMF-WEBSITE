import type { MostBoughtPlanData } from "./types";

export const mockMostBoughtPlan: MostBoughtPlanData = {
  id: "mock-plan-1",
  title: "Pro Plan",
  subtitle: "Most popular choice for growing businesses",
  price: "$99/mo",
  details: [
    "Unlimited projects",
    "Priority support",
    "Advanced analytics",
    "Custom integrations",
  ],
  stats: {
    earnings: "$12,400",
    sold: 124,
    conversionRate: "3.2%",
    inCart: 18,
  },
};
