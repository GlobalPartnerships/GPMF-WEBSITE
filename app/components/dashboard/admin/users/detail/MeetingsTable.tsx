import { DataTable } from "@/app/components/shared/DataTable";
import type { ColumnDef } from "@/app/components/shared/types";
import type { Meeting } from "./types";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case "scheduled":
      return dashStyles.badgePending;
    case "completed":
      return dashStyles.badgeConfirmed;
    case "cancelled":
      return dashStyles.badgeCancelled;
    case "re-scheduled":
      return dashStyles.badgePending;
    default:
      return dashStyles.badgePending;
  }
}

const columns: ColumnDef<Meeting>[] = [
  {
    key: "title",
    label: "Title",
    render: (row) => (
      <span className="font-medium text-foreground">{row.title}</span>
    ),
  },
  {
    key: "date",
    label: "Date",
    render: (row) => formatDate(row.date),
  },
  {
    key: "time",
    label: "Time",
    render: (row) => formatTime(row.date),
  },
  {
    key: "duration",
    label: "Duration",
    render: (row) => `${row.duration_minutes} min`,
  },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${statusBadgeClass(row.status)}`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "meet",
    label: "Meet",
    render: (row) =>
      row.google_meet_url ? (
        <a
          href={row.google_meet_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-burgundy hover:underline text-[12px]"
        >
          Join
        </a>
      ) : (
        <span className="text-surface-variant/50">—</span>
      ),
  },
];

interface MeetingsTableProps {
  title: string;
  meetings: Meeting[];
}

export function MeetingsTable({ title, meetings }: MeetingsTableProps) {
  if (meetings.length === 0) {
    return (
      <section className={`${dashStyles.card} whisper-shadow bg-white rounded-sm overflow-hidden`}>
        <div className="p-6 border-b border-outline/8">
          <h3 className="font-serif text-[22px] font-semibold text-burgundy">{title}</h3>
        </div>
        <div className="p-6 text-center py-10">
          <p className="text-surface-variant text-[13px]">No meetings found</p>
        </div>
      </section>
    );
  }

  return (
    <DataTable
      title={title}
      subtitle={`${meetings.length} meeting${meetings.length > 1 ? "s" : ""}`}
      columns={columns}
      data={meetings}
      keyExtractor={(row) => row.id}
    />
  );
}
