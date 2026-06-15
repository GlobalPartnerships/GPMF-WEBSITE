import type { MeetingItem, MeetingStatus } from "./types";
import { MeetingStatusBadge } from "@/app/components/dashboard/user/MeetingStatusBadge";

interface MeetingRowProps {
  meeting: MeetingItem;
  statusLabels: Record<MeetingStatus, string>;
  linkLabels: { joinMeeting: string; viewInCalendar: string; noLink: string };
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

function CalendarIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

export function MeetingRow({ meeting, statusLabels, linkLabels }: MeetingRowProps) {
  return (
    <tr className="transition-colors hover:bg-burgundy/[0.02]">
      <td className="py-3 px-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy font-bold text-[10px] flex-shrink-0">
            {meeting.initials}
          </div>
          <span className="text-[14px] font-medium text-foreground">{meeting.participant}</span>
        </div>
      </td>
      <td className="py-3 px-5 text-[14px] text-surface-variant">{meeting.topic}</td>
      <td className="py-3 px-5 text-[14px] tabular-nums text-surface-variant">{formatDate(meeting.date)}</td>
      <td className="py-3 px-5 text-[14px] tabular-nums text-foreground">{meeting.time}</td>
      <td className="py-3 px-5">
        <MeetingStatusBadge status={meeting.status} label={statusLabels[meeting.status]} />
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
      <td className="py-3 px-5">
        {meeting.calendarUrl ? (
          <a
            href={meeting.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium text-burgundy hover:text-burgundy-dark transition-colors"
          >
            <CalendarIcon />
            {linkLabels.viewInCalendar}
          </a>
        ) : (
          <span className="text-[12px] text-surface-variant/40">{linkLabels.noLink}</span>
        )}
      </td>
    </tr>
  );
}
