import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";
import type { ApiMeeting, MeetingApiStatus } from "@/lib/api/meetings";
import { EmptyState } from "./EmptyState";
import { MeetingStatusBadge } from "./MeetingStatusBadge";

interface MeetingsTableProps {
  dict: Pick<
    DashboardDict,
    | "upcomingMeetings"
    | "scheduleNew"
    | "participant"
    | "topic"
    | "date"
    | "time"
    | "status"
    | "scheduled"
    | "inProgress"
    | "rescheduled"
    | "completed"
    | "cancelled"
    | "noMeetings"
  >;
  meetings: ApiMeeting[] | null;
  lang: string;
}

function ParticipantAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string | null;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full object-cover ring-1 ring-outline/20 flex-shrink-0"
      />
    );
  }

  return (
    <div className="w-8 h-8 rounded-full bg-burgundy/10 flex-shrink-0 flex items-center justify-center">
      <span className="text-[11px] font-semibold text-burgundy">{initials}</span>
    </div>
  );
}

const statusBadgeMap: Record<MeetingApiStatus, "confirmed" | "pending" | "cancelled" | "finished"> = {
  scheduled: "confirmed",
  "in-progress": "pending",
  "re-scheduled": "pending",
  completed: "finished",
  cancelled: "cancelled",
};

function statusLabel(
  status: MeetingApiStatus,
  dict: Pick<DashboardDict, "scheduled" | "inProgress" | "rescheduled" | "completed" | "cancelled">
): string {
  const map: Record<MeetingApiStatus, string> = {
    scheduled: dict.scheduled,
    "in-progress": dict.inProgress,
    "re-scheduled": dict.rescheduled,
    completed: dict.completed,
    cancelled: dict.cancelled,
  };
  return map[status];
}

function formatMeetingDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatMeetingTime(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function getCreatorName(meeting: ApiMeeting): string {
  return meeting.creator?.name ?? meeting.creator?.email ?? "—";
}

export function MeetingsTable({ dict, meetings, lang }: MeetingsTableProps) {
  const isEmpty = !meetings || meetings.length === 0;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-serif text-[20px] text-foreground">{dict.upcomingMeetings}</h3>
        <a
          href={`/${lang}/user/schedule`}
          className="text-[11px] tracking-[0.18em] uppercase font-semibold text-burgundy hover:text-burgundy-dark transition-colors"
        >
          {dict.scheduleNew}
        </a>
      </div>

      {isEmpty ? (
        <EmptyState message={dict.noMeetings} icon="calendar" />
      ) : (
        <div className="overflow-x-auto rounded-sm border border-outline/12">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-outline/12 bg-warmgray/50">
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-surface-variant font-semibold">
                  {dict.participant}
                </th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-surface-variant font-semibold">
                  {dict.topic}
                </th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-surface-variant font-semibold">
                  {dict.date}
                </th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-surface-variant font-semibold">
                  {dict.time}
                </th>
                <th className="text-left px-4 py-3 text-[10px] tracking-[0.18em] uppercase text-surface-variant font-semibold">
                  {dict.status}
                </th>
              </tr>
            </thead>
            <tbody>
              {meetings!.map((meeting, i) => (
                <tr
                  key={meeting.id}
                  className={`border-b border-outline/8 hover:bg-warmgray/30 transition-colors ${
                    i === meetings!.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <ParticipantAvatar
                        name={getCreatorName(meeting)}
                        avatarUrl={meeting.creator?.profile_image_url}
                      />
                      <span className="text-foreground font-medium">{getCreatorName(meeting)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-surface-variant">{meeting.title ?? "—"}</td>
                  <td className="px-4 py-3 text-surface-variant">{formatMeetingDate(meeting.date)}</td>
                  <td className="px-4 py-3 text-surface-variant">{formatMeetingTime(meeting.date)}</td>
                  <td className="px-4 py-3">
                    <MeetingStatusBadge
                      status={statusBadgeMap[meeting.status]}
                      label={statusLabel(meeting.status, dict)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
