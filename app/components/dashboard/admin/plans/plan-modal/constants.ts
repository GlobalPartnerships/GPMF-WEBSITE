export interface PlanIcon {
  id: string;
  label: string;
  path: string;
}

export const PLAN_ICONS: PlanIcon[] = [
  { id: "package", label: "package", path: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" },
  { id: "star", label: "star", path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { id: "shield", label: "shield", path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { id: "zap", label: "zap", path: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" },
  { id: "heart", label: "heart", path: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
  { id: "users", label: "users", path: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  { id: "trending", label: "trending", path: "M22 7 13.5 15.5l-5-5L2 17M22 7h-7M22 7v7" },
  { id: "briefcase", label: "briefcase", path: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
  { id: "award", label: "award", path: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 0v2m-3 4h6" },
  { id: "globe", label: "globe", path: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" },
];
