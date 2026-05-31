import Link from "next/link";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import type { LatestUserResponse } from "./types";

function UserPlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface LatestUserCardProps {
  data: LatestUserResponse | null;
  lang: string;
}

export function LatestUserCard({ data, lang }: LatestUserCardProps) {
  if (!data) {
    return (
      <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
            Latest User
          </span>
          <span className="text-surface-variant/40"><UserPlusIcon /></span>
        </div>
        <p className="text-surface-variant text-[14px]">No users registered</p>
      </div>
    );
  }

  const initials = getInitials(data.name);

  return (
    <Link href={`/${lang}/admin/users/${data.id}`} className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6 block transition-shadow hover:shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
          Latest User
        </span>
        <span className="text-surface-variant/40"><UserPlusIcon /></span>
      </div>
      <div className="flex items-center gap-3 mb-3">
        {data.profile_image_url ? (
          <img
            src={data.profile_image_url}
            alt={data.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center">
            <span className="text-[12px] font-bold text-burgundy">{initials}</span>
          </div>
        )}
        <div>
          <p className="text-[14px] font-medium text-foreground">{data.name}</p>
          <p className="text-[12px] text-surface-variant">{data.email}</p>
        </div>
      </div>
      {data.role && (
        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${dashStyles.badgeConfirmed} mb-2`}>
          {data.role}
        </span>
      )}
      <p className="text-surface-variant text-[13px] mt-1">
        Joined {formatDate(data.created_at)}
      </p>
    </Link>
  );
}
