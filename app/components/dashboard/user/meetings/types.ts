export type MeetingStatus = "confirmed" | "pending" | "cancelled" | "finished";

export interface MeetingItem {
  id: string;
  participant: string;
  initials: string;
  topic: string;
  date: string;
  time: string;
  status: MeetingStatus;
  meetingUrl: string | null;
  calendarUrl: string | null;
}

export interface PlanWithMeetings {
  id: string;
  name: string;
  totalMeetings: number;
  used: number;
  left: number;
  planMeetings: number;
  planUsed: number;
  planLeft: number;
  meetings: {
    upcoming: MeetingItem[];
    finished: MeetingItem[];
    cancelled: MeetingItem[];
  };
}

export interface ScheduleFormState {
  topic: string;
  date: string;
  time: string;
}
