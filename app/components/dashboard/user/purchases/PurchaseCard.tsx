import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";
import type { PurchasesDict } from "@/app/dictionaries/dashboard/user/purchases/types";
import { PurchaseStatusBadge } from "./PurchaseStatusBadge";
import { formatPrice } from "@/lib/utils/format";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface PurchaseCardProps {
  purchase: PurchasedPlan;
  dict: PurchasesDict;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function capitalize(str: string | null): string {
  if (!str) return "—";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ReceiptIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}

export function PurchaseCard({ purchase, dict }: PurchaseCardProps) {
  const plan = purchase.plan;
  const order = purchase.order;
  const meetingsPercent =
    purchase.meetings_included > 0
      ? (purchase.meetings_used / purchase.meetings_included) * 100
      : 0;

  return (
    <div className={`${dashStyles.card} bg-white rounded-sm p-6 flex flex-col gap-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          {plan?.icon_url && (
            <img src={plan.icon_url} alt="" className="w-8 h-8 flex-shrink-0" />
          )}
          <div className="min-w-0">
            <h3 className="font-serif text-[18px] text-foreground leading-tight truncate">
              {plan?.name ?? "—"}
            </h3>
            {plan?.subtitle && (
              <p className="text-[12px] text-surface-variant mt-0.5 truncate">
                {plan.subtitle}
              </p>
            )}
          </div>
        </div>
        <PurchaseStatusBadge status={purchase.status} labels={dict} />
      </div>

      {/* Meetings progress */}
      <div>
        <div className="flex items-center justify-between text-[12px] mb-1.5">
          <span className="text-surface-variant font-medium">{dict.meetingsLabel}</span>
          <span className="text-foreground font-medium">
            {purchase.meetings_used} / {purchase.meetings_included}
          </span>
        </div>
        <div className="h-2 rounded-full bg-warmgray/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-burgundy transition-all duration-300"
            style={{ width: `${meetingsPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-surface-variant mt-1">
          <span>{purchase.meetings_used} {dict.meetingsUsed}</span>
          <span>{purchase.meetings_left} {dict.meetingsLeft}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[13px]">
        <div>
          <span className="text-surface-variant">{dict.priceLabel}</span>
          <p className="text-foreground font-medium mt-0.5">
            {order?.total_price != null ? formatPrice(order.total_price) : "—"}
          </p>
        </div>
        <div>
          <span className="text-surface-variant">{dict.dateLabel}</span>
          <p className="text-foreground font-medium mt-0.5">
            {formatDate(purchase.starts_at)}
          </p>
        </div>
        <div>
          <span className="text-surface-variant">{dict.providerLabel}</span>
          <p className="text-foreground font-medium mt-0.5">
            {capitalize(order?.payment_provider_name ?? null)}
          </p>
        </div>
        <div>
          <span className="text-surface-variant">{dict.billingTypeLabel}</span>
          <p className="text-foreground font-medium mt-0.5">
            {plan?.billing_type?.name ?? "—"}
          </p>
        </div>
      </div>

      {plan?.features && plan.features.length > 0 && (
        <div className="border-t border-outline/10 pt-3">
          <span className="text-[11px] text-surface-variant uppercase tracking-wider font-semibold">
            {dict.featuresLabel}
          </span>
          <ul className="mt-1.5 flex flex-col gap-1">
            {plan.features.map((f) => (
              <li key={f.id} className="text-[12px] text-foreground flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-burgundy flex-shrink-0" />
                {f.item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-outline/10">
        {order?.receipt_url && (
          <a
            href={order.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-white bg-burgundy rounded-sm hover:bg-burgundy/90 transition-colors"
          >
            <ReceiptIcon />
            {dict.viewReceipt}
          </a>
        )}
        <button
          disabled
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-foreground border border-outline/30 rounded-sm cursor-not-allowed opacity-50"
        >
          <EyeIcon />
          {dict.viewPlan}
        </button>
        <button
          disabled
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-foreground border border-outline/30 rounded-sm cursor-not-allowed opacity-50"
        >
          <CalendarIcon />
          {dict.scheduleMeeting}
        </button>
      </div>
    </div>
  );
}
