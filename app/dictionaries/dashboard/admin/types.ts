export interface AdminDict {
  sidebarTitle: string;
  sidebarSubtitle: string;
  dashboard: string;
  sales: string;
  plans: string;
  traffic: string;
  meetings: string;
  reports: string;
  users: string;
  settings: string;

  searchPlaceholder: string;
  downloadReports: string;

  totalEarnings: string;
  salesThisYear: string;
  salesThisMonth: string;
  salesThisWeek: string;
  vsLastPeriod: string;
  growthSinceJan: string;
  target: string;
  activeWeek: string;

  latestPurchases: string;
  latestPurchasesSubtitle: string;
  viewAllOrders: string;
  customer: string;
  plan: string;
  meetingsCount: string;
  date: string;
  amount: string;
  status: string;
  completed: string;
  pending: string;
  failed: string;
  provider: string;
  salesSubtitle: string;
  noOrdersTitle: string;
  noOrdersMessage: string;

  trafficAnalytics: string;
  trafficAnalyticsSubtitle: string;
  daily: string;
  weekly: string;
  monthly: string;

  registeredUsers: string;
  quarterlyGoal: string;

  trafficBreakdown: string;
  dailyUnique: string;
  weeklyAverage: string;
  monthlyTotal: string;
  viewSources: string;

  upcomingMeetings: string;
  upcomingMeetingsSubtitle: string;
  manageCalendar: string;
  participant: string;
  topic: string;
  time: string;
  confirmed: string;
  cancelled: string;

  plansTitle: string;
  standardPlans: string;
  customPlans: string;
  mostBoughtPlan: string;
  newPlan: string;
  stats: string;
  edit: string;
  details: string;
  earnings: string;
  sold: string;
  conversionRate: string;
  inCartRightNow: string;
  searchPlans: string;
  downloadReport: string;
  noPlansYet: string;
  noStandardPlansMessage: string;
  noCustomPlansMessage: string;

  meta: {
    title: string;
    description: string;
  };
  plansMeta: {
    title: string;
    description: string;
  };
  plansModal: {
    editStandard: string;
    editCustom: string;
    createStandard: string;
    createCustom: string;
    labelTitle: string;
    labelSubtitle: string;
    labelPlanType: string;
    labelPrice: string;
    labelIcon: string;
    labelIncludes: string;
    searchIcon: string;
    uploadSvg: string;
    deleteIcon: string;
    addFeature: string;
    newFeaturePlaceholder: string;
    titlePlaceholder: string;
    subtitlePlaceholder: string;
    pricePlaceholder: string;
    saveChanges: string;
    createPlan: string;
  };
  salesMeta: {
    title: string;
    description: string;
  };
  svgManager: {
    title: string;
    uploadButton: string;
    dragText: string;
    uploading: string;
    uploadSuccess: string;
    uploadError: string;
    deleteConfirm: string;
    emptyState: string;
    invalidFile: string;
  };
}
