import type { MeetingItem, MeetingStatus } from "./types";
import { MeetingStatusBadge } from "@/app/components/dashboard/user/MeetingStatusBadge";

interface MeetingRowProps {
  meeting: MeetingItem;
  statusLabels: Record<MeetingStatus, string>;
  linkLabels: { joinMeeting: string; noLink: string };
  additionalLabels: { yes: string; no: string };
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function LinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  );
}

export function MeetingRow({ meeting, statusLabels, linkLabels, additionalLabels }: MeetingRowProps) {
  return (
    <tr className="transition-colors hover:bg-burgundy/[0.02]">
      <td className="py-3 px-5 text-[14px] text-surface-variant">{meeting.topic}</td>
      <td className="py-3 px-5 text-[14px] tabular-nums text-surface-variant">{formatDate(meeting.date)}</td>
      <td className="py-3 px-5 text-[14px] tabular-nums text-foreground">{meeting.time}</td>
      <td className="py-3 px-5">
        <MeetingStatusBadge status={meeting.status} label={statusLabels[meeting.status]} />
      </td>
      <td className="py-3 px-5">
        <span className={`text-[12px] font-medium ${meeting.isAdditional ? "text-burgundy" : "text-surface-variant/60"}`}>
          {meeting.isAdditional ? additionalLabels.yes : additionalLabels.no}
        </span>
      </td>
      <td className="py-3 px-5">
        {meeting.meetingUrl ? (
          <a
            href={meeting.meetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-burgundy hover:text-burgundy-dark transition-colors"
          >
            <LinkIcon />
            {linkLabels.joinMeeting}
          </a>
        ) : (
          <span className="text-[12px] text-surface-variant/40">{linkLabels.noLink}</span>
        )}
      </td>
    </tr>
  );
}
