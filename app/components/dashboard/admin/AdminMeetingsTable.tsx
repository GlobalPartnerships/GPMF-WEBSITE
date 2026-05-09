import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

export interface AdminMeeting {
  id: string;
  participantName: string;
  participantInitials: string;
  topic: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface AdminMeetingsTableProps {
  dict: Pick<
    AdminDict,
    | "upcomingMeetings"
    | "upcomingMeetingsSubtitle"
    | "manageCalendar"
    | "participant"
    | "topic"
    | "date"
    | "time"
    | "status"
    | "confirmed"
    | "pending"
    | "cancelled"
  >;
  meetings: AdminMeeting[];
}

function statusLabel(
  status: AdminMeeting["status"],
  dict: Pick<AdminDict, "confirmed" | "pending" | "cancelled">
): string {
  if (status === "confirmed") return dict.confirmed;
  if (status === "pending") return dict.pending;
  return dict.cancelled;
}

function statusBadgeClass(status: AdminMeeting["status"]): string {
  if (status === "confirmed") return dashStyles.badgeConfirmed;
  if (status === "pending") return dashStyles.badgePending;
  return dashStyles.badgeCancelled;
}

export function AdminMeetingsTable({ dict, meetings }: AdminMeetingsTableProps) {
  return (
    <section className={`${dashStyles.card} whisper-shadow bg-white rounded-sm overflow-hidden`}>
      <div className="p-6 border-b border-outline/8 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-[22px] font-semibold text-burgundy">
            {dict.upcomingMeetings}
          </h3>
          <p className="text-surface-variant text-[13px] mt-0.5">
            {dict.upcomingMeetingsSubtitle}
          </p>
        </div>
        <button className="px-5 py-2.5 border border-outline/15 rounded-sm text-[11px] uppercase tracking-[0.18em] font-medium text-surface-variant hover:border-burgundy/30 hover:text-burgundy transition-all">
          {dict.manageCalendar}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-outline/8 bg-warmgray/50">
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.participant}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.topic}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.date}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.time}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.status}
              </th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, i) => (
              <tr
                key={meeting.id}
                className={`border-b border-outline/5 hover:bg-warmgray/30 transition-colors ${
                  i === meetings.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-burgundy/10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-burgundy">
                        {meeting.participantInitials}
                      </span>
                    </div>
                    <span className="text-[14px] font-medium text-foreground">
                      {meeting.participantName}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-6 text-[14px]">{meeting.topic}</td>
                <td className="py-3.5 px-6 text-[14px] tabular-nums text-surface-variant">
                  {meeting.date}
                </td>
                <td className="py-3.5 px-6 text-[14px] tabular-nums">{meeting.time}</td>
                <td className="py-3.5 px-6">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${statusBadgeClass(meeting.status)}`}
                  >
                    {statusLabel(meeting.status, dict)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
