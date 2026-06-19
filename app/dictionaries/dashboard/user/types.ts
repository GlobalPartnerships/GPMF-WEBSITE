import type { PurchasesDict } from "./purchases/types";
import type { MeetingsDict } from "./meetings/types";

export interface DashboardDict extends PurchasesDict, MeetingsDict {
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
  meetingsLeft: string;
  featuresLabel: string;
  lastReportLabel: string;
  lastReportTitle: string;
  completedOn: string;
  downloadPdf: string;
  viewReport: string;
  reportTitle: string;
  reportDescription: string;

  upcomingMeetings: string;
  scheduleNew: string;
  participant: string;
  topic: string;
  date: string;
  time: string;
  status: string;
  scheduled: string;
  inProgress: string;
  rescheduled: string;
  completed: string;
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
