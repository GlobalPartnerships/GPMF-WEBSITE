"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalProviderProps {
  clientId: string;
  children: React.ReactNode;
}

export function PayPalProvider({ clientId, children }: PayPalProviderProps) {
  return (
    <PayPalScriptProvider
      options={{ clientId: clientId, "client-id": clientId, currency: "USD", components: "buttons" }}
    >
      {children}
    </PayPalScriptProvider>
  );
}
