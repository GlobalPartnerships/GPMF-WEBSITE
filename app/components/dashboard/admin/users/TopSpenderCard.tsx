import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { EmptyState } from "@/app/components/EmptyState";
import type { TopSpenderResponse } from "./types";

function CrownIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface TopSpenderCardProps {
  data: TopSpenderResponse | null;
}

export function TopSpenderCard({ data }: TopSpenderCardProps) {
  if (!data) {
    return (
      <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
            Top Spender
          </span>
          <span className="text-burgundy/60"><CrownIcon /></span>
        </div>
        <EmptyState
          width={36}
          title="No data"
          message="No completed orders found yet"
        />
      </div>
    );
  }

  const { user, total_spent, order_count, currency } = data;
  const initials = getInitials(user.name);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(total_spent);

  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
          Top Spender
        </span>
        <span className="text-burgundy/60"><CrownIcon /></span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        {user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
            <span className="text-[12px] font-bold text-burgundy">{initials}</span>
          </div>
        )}
        <div>
          <p className="text-[14px] font-medium text-foreground">{user.name}</p>
          <p className="text-[12px] text-surface-variant">{user.email}</p>
        </div>
      </div>
      <div className="flex items-end gap-2.5">
        <span className="font-serif text-[28px] font-bold leading-tight tracking-[-0.02em]">
          {formatted}
        </span>
      </div>
      <p className="text-surface-variant text-[13px] mt-1.5">
        {order_count} order{order_count !== 1 ? "s" : ""} completed
      </p>
    </div>
  );
}
