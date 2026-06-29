import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

interface MeetingStatusBadgeProps {
  status: "scheduled" | "cancelled" | "re-scheduled" | "completed" | "in-progress";
  label: string;
}

const statusClass: Record<MeetingStatusBadgeProps["status"], string> = {
  scheduled: dashStyles.badgeConfirmed,
  "in-progress": dashStyles.badgePending,
  "re-scheduled": dashStyles.badgePending,
  completed: dashStyles.badgeFinished,
  cancelled: dashStyles.badgeCancelled,
};

export function MeetingStatusBadge({ status, label }: MeetingStatusBadgeProps) {
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] tracking-[0.06em] font-semibold ${statusClass[status]}`}
    >
      {label}
    </span>
  );
}
