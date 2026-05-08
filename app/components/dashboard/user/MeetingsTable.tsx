import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";
import { EmptyState } from "./EmptyState";
import { MeetingStatusBadge } from "./MeetingStatusBadge";

export interface Meeting {
  id: string;
  participantName: string;
  participantAvatarUrl?: string;
  topic: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
}

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
    | "confirmed"
    | "pending"
    | "cancelled"
    | "noMeetings"
  >;
  meetings: Meeting[] | null;
  lang: string;
}

function ParticipantAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string;
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

function statusLabel(
  status: Meeting["status"],
  dict: Pick<DashboardDict, "confirmed" | "pending" | "cancelled">
): string {
  if (status === "confirmed") return dict.confirmed;
  if (status === "pending") return dict.pending;
  return dict.cancelled;
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
                        name={meeting.participantName}
                        avatarUrl={meeting.participantAvatarUrl}
                      />
                      <span className="text-foreground font-medium">{meeting.participantName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-surface-variant">{meeting.topic}</td>
                  <td className="px-4 py-3 text-surface-variant">{meeting.date}</td>
                  <td className="px-4 py-3 text-surface-variant">{meeting.time}</td>
                  <td className="px-4 py-3">
                    <MeetingStatusBadge
                      status={meeting.status}
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
