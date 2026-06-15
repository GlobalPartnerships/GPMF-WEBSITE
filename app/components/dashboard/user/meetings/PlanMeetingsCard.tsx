import type { PlanWithMeetings, MeetingStatus, MeetingItem } from "./types";
import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { QuotaBar } from "./QuotaBar";
import { CollapsibleSection } from "./CollapsibleSection";
import { MeetingRow } from "./MeetingRow";

interface PlanMeetingsCardProps {
  plan: PlanWithMeetings;
  dict: DashboardDict;
  onSchedule: (planId: string) => void;
}

function UpcomingIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function FinishedIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function CancelledIcon() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function MeetingTableHeader({ dict }: { dict: Pick<DashboardDict, "participant" | "topic" | "date" | "time" | "status" | "meetingLinkLabel" | "calendarLabel"> }) {
  const thClass = "text-left text-[11px] tracking-[0.10em] uppercase font-semibold text-surface-variant py-3 px-5";
  return (
    <thead className="bg-background/60">
      <tr>
        <th className={thClass}>{dict.participant}</th>
        <th className={thClass}>{dict.topic}</th>
        <th className={thClass}>{dict.date}</th>
        <th className={thClass}>{dict.time}</th>
        <th className={thClass}>{dict.status}</th>
        <th className={thClass}>{dict.meetingLinkLabel}</th>
        <th className={thClass}>{dict.calendarLabel}</th>
      </tr>
    </thead>
  );
}

function MeetingsList({
  meetings,
  emptyMessage,
  dict,
  statusLabels,
  linkLabels,
}: {
  meetings: MeetingItem[];
  emptyMessage: string;
  dict: Pick<DashboardDict, "participant" | "topic" | "date" | "time" | "status" | "meetingLinkLabel" | "calendarLabel">;
  statusLabels: Record<MeetingStatus, string>;
  linkLabels: { joinMeeting: string; viewInCalendar: string; noLink: string };
}) {
  if (meetings.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-[13px] text-surface-variant/60 italic">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <MeetingTableHeader dict={dict} />
        <tbody className="divide-y divide-foreground/5">
          {meetings.map((m) => (
            <MeetingRow key={m.id} meeting={m} statusLabels={statusLabels} linkLabels={linkLabels} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PlanMeetingsCard({ plan, dict, onSchedule }: PlanMeetingsCardProps) {
  const statusLabels: Record<MeetingStatus, string> = {
    confirmed: dict.confirmed,
    pending: dict.pending,
    cancelled: dict.cancelled,
    finished: dict.finished,
  };

  const linkLabels = {
    joinMeeting: dict.joinMeeting,
    viewInCalendar: dict.viewInCalendar,
    noLink: dict.noLink,
  };

  const canSchedule = plan.left > 0;

  return (
    <div className={`${dashStyles.card} bg-white rounded-sm overflow-hidden mb-6`}>
      <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/8">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-burgundy" />
          <h2 className="font-serif text-[22px] font-semibold text-burgundy">
            {plan.name} {dict.planSuffix}
          </h2>
        </div>
        {canSchedule && (
          <button
            type="button"
            onClick={() => onSchedule(plan.id)}
            className="bg-burgundy text-white px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] rounded-sm font-medium flex items-center gap-2 hover:bg-burgundy-dark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            {dict.scheduleButton}
          </button>
        )}
      </div>

      <div className="pt-6">
        <QuotaBar
          dict={dict}
          totalMeetings={plan.totalMeetings}
          used={plan.used}
          left={plan.left}
          planMeetings={plan.planMeetings}
          planUsed={plan.planUsed}
          planLeft={plan.planLeft}
        />
      </div>

      <div className="px-6 pb-6 flex flex-col gap-3">
        <CollapsibleSection
          title={dict.upcomingSection}
          icon={<UpcomingIcon />}
          count={plan.meetings.upcoming.length}
          defaultOpen
        >
          <MeetingsList meetings={plan.meetings.upcoming} emptyMessage={dict.noUpcoming} dict={dict} statusLabels={statusLabels} linkLabels={linkLabels} />
        </CollapsibleSection>

        <CollapsibleSection
          title={dict.finishedSection}
          icon={<FinishedIcon />}
          count={plan.meetings.finished.length}
        >
          <MeetingsList meetings={plan.meetings.finished} emptyMessage={dict.noFinished} dict={dict} statusLabels={statusLabels} linkLabels={linkLabels} />
        </CollapsibleSection>

        <CollapsibleSection
          title={dict.cancelledSection}
          icon={<CancelledIcon />}
          count={plan.meetings.cancelled.length}
        >
          <MeetingsList meetings={plan.meetings.cancelled} emptyMessage={dict.noCancelled} dict={dict} statusLabels={statusLabels} linkLabels={linkLabels} />
        </CollapsibleSection>
      </div>
    </div>
  );
}
