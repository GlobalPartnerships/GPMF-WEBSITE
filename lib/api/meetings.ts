import "server-only";

import { apiGet } from "./client";

export type MeetingApiStatus =
  | "scheduled"
  | "cancelled"
  | "re-scheduled"
  | "completed"
  | "in-progress";

export interface MeetingAttendee {
  id: string;
  meeting_id: string;
  user_id: string;
  added_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    profile_image_url?: string | null;
  } | null;
}

export interface ApiMeeting {
  id: string;
  purchased_plan_id: string | null;
  created_by: string;
  google_meet_url: string | null;
  google_event_id: string | null;
  google_calendar_id: string | null;
  date: string;
  duration_minutes: number;
  title: string | null;
  description: string | null;
  status: MeetingApiStatus;
  is_additional: boolean;
  created_at: string;
  updated_at: string;
  purchased_plan: Record<string, unknown> | null;
  creator: {
    id: string;
    name: string;
    email: string;
    profile_image_url?: string | null;
  } | null;
  attendees: MeetingAttendee[];
}

export async function fetchUpcomingMeetings(
  userId: string,
  headers: Record<string, string>
): Promise<ApiMeeting[]> {
  try {
    return await apiGet<ApiMeeting[]>(
      `/meetings?user_id=${userId}&status=scheduled`,
      { headers, next: { revalidate: 0 } }
    );
  } catch {
    return [];
  }
}
