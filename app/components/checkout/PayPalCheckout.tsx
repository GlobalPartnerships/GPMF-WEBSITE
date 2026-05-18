"use client";

import { useRouter } from "next/navigation";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  plan_id: string;
  user_id: string;
  lang: string;
}

export function PayPalCheckout({ plan_id, user_id, lang }: PayPalCheckoutProps) {
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

  return (
    <PayPalButtons
      style={{ shape: "rect", layout: "vertical", color: "blue", label: "paypal" }}
      createOrder={async () => {
        const response = await fetch(`${API_BASE_URL}/orders/paypal`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan_id, user_id }),
        });

        const orderData = await response.json();

        if (orderData.id) return orderData.id;

        const errorDetail = orderData?.details?.[0];
        throw new Error(
          errorDetail
            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
            : JSON.stringify(orderData)
        );
      }}
      onApprove={async (data, actions) => {
        const response = await fetch(`${API_BASE_URL}/orders/paypal/${data.orderID}/capture`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const orderData = await response.json();
        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          return actions.restart();
        }

        if (errorDetail) {
          router.push(`/${lang}/checkout/failed`);
          return;
        }

        router.push(`/${lang}/checkout/success?orderId=${orderData.db_order_id}`);
      }}
      onError={() => {
        router.push(`/${lang}/checkout/failed`);
      }}
    />
  );
}
