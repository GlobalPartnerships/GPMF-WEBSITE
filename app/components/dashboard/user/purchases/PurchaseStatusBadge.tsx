import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

type PurchasedPlanStatus = "active" | "expired" | "cancelled";

interface PurchaseStatusBadgeProps {
  status: string;
  labels: {
    statusActive: string;
    statusExpired: string;
    statusCancelled: string;
  };
}

const statusStyleMap: Record<PurchasedPlanStatus, string> = {
  active: dashStyles.badgeConfirmed,
  expired: dashStyles.badgeCancelled,
  cancelled: dashStyles.badgeCancelled,
};

const statusLabelMap: Record<PurchasedPlanStatus, keyof PurchaseStatusBadgeProps["labels"]> = {
  active: "statusActive",
  expired: "statusExpired",
  cancelled: "statusCancelled",
};

export function PurchaseStatusBadge({ status, labels }: PurchaseStatusBadgeProps) {
  const key = status as PurchasedPlanStatus;
  const style = statusStyleMap[key] ?? dashStyles.badgePending;
  const label = statusLabelMap[key] ? labels[statusLabelMap[key]] : status;

  return (
    <span
      className={`${style} inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide`}
    >
      {label}
    </span>
  );
}
