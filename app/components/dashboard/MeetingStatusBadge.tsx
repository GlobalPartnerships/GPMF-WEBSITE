interface MeetingStatusBadgeProps {
  status: "confirmed" | "pending" | "cancelled";
  label: string;
}

const statusClass: Record<MeetingStatusBadgeProps["status"], string> = {
  confirmed: "badge-confirmed",
  pending: "badge-pending",
  cancelled: "badge-cancelled",
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
