import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import type { User } from "../types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface UserInfoCardProps {
  user: User;
}

export function UserInfoCard({ user }: UserInfoCardProps) {
  const initials = getInitials(user.name);

  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
        User Profile
      </span>

      <div className="flex flex-col items-center mt-5">
        {user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center">
            <span className="text-[20px] font-bold text-burgundy">{initials}</span>
          </div>
        )}

        <h2 className="mt-4 text-[18px] font-serif font-semibold text-foreground">
          {user.name}
        </h2>

        {user.role && (
          <span
            className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${dashStyles.badgeConfirmed}`}
          >
            {user.role}
          </span>
        )}
      </div>

      <dl className="mt-6 space-y-3 text-[13px]">
        <div className="flex justify-between">
          <dt className="text-surface-variant">Email</dt>
          <dd className="text-foreground font-medium">{user.email}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-surface-variant">Phone</dt>
          <dd className="text-foreground font-medium">{user.phone ?? "—"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-surface-variant">Member since</dt>
          <dd className="text-foreground font-medium">
            {user.created_at ? formatDate(user.created_at) : "—"}
          </dd>
        </div>
      </dl>
    </div>
  );
}
