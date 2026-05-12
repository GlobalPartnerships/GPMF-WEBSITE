"use client";

import { InlineSvg } from "@/app/components/dashboard/admin/plans/svg-upload/InlineSvg";
import styles from "./PlanIcon.module.css";

interface PlanIconProps {
  iconUrl: string | null;
}

function FallbackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

export function PlanIcon({ iconUrl }: PlanIconProps) {
  return (
    <div className={`${styles.icon} mb-6 text-burgundy`}>
      {iconUrl ? (
        <InlineSvg url={iconUrl} className="w-8 h-8" />
      ) : (
        <FallbackIcon />
      )}
    </div>
  );
}
