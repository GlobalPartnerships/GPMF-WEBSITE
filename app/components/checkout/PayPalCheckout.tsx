"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalCheckoutProps {
  planId: string;
  userId: string;
}

type Status = "idle" | "success" | "error";

export function PayPalCheckout({ planId, userId }: PayPalCheckoutProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api/v1";

  return (
    <div>
      <PayPalButtons
        style={{ shape: "rect", layout: "vertical", color: "gold", label: "paypal" }}
        createOrder={async () => {
          const response = await fetch("/api/v1/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planId, userId }),
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
          const response = await fetch(`/api/v1/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });

          const orderData = await response.json();
          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            return actions.restart();
          }

          if (errorDetail) {
            setStatus("error");
            setMessage(`${errorDetail.description} (${orderData.debug_id})`);
            return;
          }

          const transaction = orderData.purchase_units?.[0]?.payments?.captures?.[0];
          setStatus("success");
          setMessage(`Payment confirmed. Transaction ID: ${transaction?.id}`);
        }}
        onError={() => {
          setStatus("error");
          setMessage("Something went wrong. Please try again.");
        }}
      />

      {status !== "idle" && (
        <p
          className={`text-[12px] mt-3 text-center ${
            status === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
