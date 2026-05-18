export interface CheckoutResultDict {
  success: {
    welcomeMessage: string;
    planLabel: string;
    orderLabel: string;
    paymentProviderLabel: string;
    contactMessage: string;
    goToPurchases: string;
    goToServices: string;
    sideText: { line1: string; line2: string };
    meta: { title: string; description: string };
  };
  failed: {
    errorTitle: string;
    errorMessage: string;
    backToPlans: string;
    sideText: { line1: string; line2: string };
    meta: { title: string; description: string };
  };
}
