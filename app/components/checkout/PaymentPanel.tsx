"use client";

import { useState } from "react";
import type { CheckoutDict } from "@/app/dictionaries/checkout/types";
import tabStyles from "@/app/components/shared/tabs.module.css";
import styles from "./checkout.module.css";
import { PayPalProvider } from "./PayPalProvider";
import { PayPalCheckout } from "./PayPalCheckout";

interface PaymentPanelProps {
  dict: CheckoutDict;
  plan_id: string;
  user_id: string;
  clientId: string;
}

export function PaymentPanel({ dict, plan_id, user_id, clientId }: PaymentPanelProps) {
  const [method, setMethod] = useState<"card" | "paypal">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-4">
        {dict.paymentMethod.label}
      </p>

      <div className="inline-flex items-center bg-warmgray rounded-[2px] p-1 gap-1 mb-8">
        {(["card", "paypal"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className={`${tabStyles.tabBtn} px-6 py-3 text-[11px] uppercase tracking-[0.22em] font-medium rounded-[2px] ${
              method === tab ? tabStyles.active : "text-surface-variant"
            }`}
            onClick={() => setMethod(tab)}
          >
            {dict.paymentMethod[tab]}
          </button>
        ))}
      </div>

      {method === "card" ? (
        <div className="space-y-4">
          <div className={styles.inputWrapper}>
            <label className={styles.label}>{dict.form.cardNumber}</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={19}
              placeholder="1234 1234 1234 1234"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.row}>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{dict.form.expiration}</label>
              <input
                type="text"
                maxLength={7}
                placeholder="MM / YY"
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{dict.form.securityCode}</label>
              <input
                type="password"
                maxLength={4}
                placeholder="CVC"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>
      ) : (
        <PayPalProvider clientId={clientId}>
          <PayPalCheckout plan_id={plan_id} user_id={user_id} />
        </PayPalProvider>
      )}
    </div>
  );
}
