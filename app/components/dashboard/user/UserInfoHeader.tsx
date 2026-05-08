import Image from "next/image";
import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";

interface UserInfoHeaderProps {
  dict: Pick<DashboardDict, "welcomeMessage" | "profileAlt">;
  user: {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  } | null;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function UserInfoHeader({ dict, user }: UserInfoHeaderProps) {
  const displayName = user?.name ?? "—";
  const initials = user ? getInitials(user.name) : "?";

  return (
    <div className="flex items-center gap-6 pb-8 border-b border-outline/15">
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {user?.avatarUrl ? (
          <Image
            src={user.avatarUrl}
            alt={dict.profileAlt}
            width={72}
            height={72}
            className="w-[72px] h-[72px] rounded-full object-cover ring-2 ring-outline/20"
          />
        ) : (
          <div className="w-[72px] h-[72px] rounded-full bg-burgundy/10 ring-2 ring-outline/20 flex items-center justify-center">
            <span className="font-serif text-[22px] text-burgundy font-medium">{initials}</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <span className="tick text-[10px] tracking-[0.28em] uppercase text-burgundy font-semibold">
          {dict.welcomeMessage}
        </span>
        <h2 className="font-serif text-[28px] leading-[1.1] tracking-[-0.01em] text-foreground mt-1">
          {displayName}
        </h2>
        {user && (
          <div className="flex flex-col gap-0.5 mt-1">
            <span className="text-[13px] text-surface-variant">{user.email}</span>
            <span className="text-[13px] text-outline">{user.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
