import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

const statusMap: Record<string, string> = {
  pending: dashStyles.badgePending,
  accepted: dashStyles.badgeConfirmed,
  expired: dashStyles.badgeCancelled,
  cancelled: dashStyles.badgeCancelled,
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const badgeClass = statusMap[status] ?? dashStyles.badgePending;

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${badgeClass}`}
    >
      {status}
    </span>
  );
}
