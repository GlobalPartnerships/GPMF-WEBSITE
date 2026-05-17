export interface CheckoutDict {
  title: string;
  backToPlans: string;
  paymentMethod: {
    label: string;
    card: string;
    paypal: string;
    paypalComingSoon: string;
  };
  form: {
    cardNumber: string;
    expiration: string;
    securityCode: string;
  };
  topFeatures: string;
  pricing: {
    subscriptionPrice: string;
    estimatedTax: string;
    dueToday: string;
  };
  completePurchase: string;
  legal: string;
  meta: {
    title: string;
    description: string;
  };
}
