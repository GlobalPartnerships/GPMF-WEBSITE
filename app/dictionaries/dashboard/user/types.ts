import type { PurchasesDict } from "./purchases/types";

export interface DashboardDict extends PurchasesDict {
  sidebarTitle: string;
  myAccount: string;
  purchases: string;
  schedule: string;
  reports: string;
  settings: string;

  welcomeMessage: string;
  profileAlt: string;

  currentPlanLabel: string;
  currentPlanTitle: string;
  nextBilling: string;
  managePlan: string;
  lastReportLabel: string;
  lastReportTitle: string;
  completedOn: string;
  downloadPdf: string;

  upcomingMeetings: string;
  scheduleNew: string;
  participant: string;
  topic: string;
  date: string;
  time: string;
  status: string;
  confirmed: string;
  pending: string;
  cancelled: string;

  noData: string;
  noPlan: string;
  noReport: string;
  noMeetings: string;

  meta: {
    title: string;
    description: string;
  };
}
