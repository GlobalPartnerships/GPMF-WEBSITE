export type MeetingStatus = "scheduled" | "cancelled" | "re-scheduled" | "completed" | "in-progress";

export interface MeetingItem {
  id: string;
  topic: string;
  date: string;
  time: string;
  status: MeetingStatus;
  meetingUrl: string | null;
  isAdditional: boolean;
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
