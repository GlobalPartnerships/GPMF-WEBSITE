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

export interface ApiSummaryMeeting {
  id: string;
  title: string | null;
  date: string;
  duration_minutes: number;
  status: MeetingApiStatus;
  google_meet_url: string | null;
  is_additional: boolean;
}

export interface ApiPurchasedPlanSummary {
  id: string;
  plan_id: string;
  plan_name: string;
  status: string;
  meetings_included: number;
  meetings_used: number;
  meetings_left: number;
  starts_at: string;
}

export interface ApiMeetingSummary {
  purchased_plan: ApiPurchasedPlanSummary;
  meetings_by_status: {
    scheduled: ApiSummaryMeeting[];
    completed: ApiSummaryMeeting[];
    cancelled: ApiSummaryMeeting[];
    "re-scheduled": ApiSummaryMeeting[];
    "in-progress": ApiSummaryMeeting[];
  };
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

export async function fetchMeetingSummary(
  userId: string,
  headers: Record<string, string>
): Promise<ApiMeetingSummary[]> {
  try {
    return await apiGet<ApiMeetingSummary[]>(
      `/meetings/summary/user/${userId}`,
      { headers, next: { revalidate: 0 } }
    );
  } catch {
    return [];
  }
}

interface MeetingItemMapped {
  id: string;
  topic: string;
  date: string;
  time: string;
  status: MeetingApiStatus;
  meetingUrl: string | null;
  isAdditional: boolean;
}

function mapApiMeetingToItem(m: ApiSummaryMeeting): MeetingItemMapped {
  const [datePart, timePart] = m.date.split("T");
  return {
    id: m.id,
    topic: m.title ?? "",
    date: datePart,
    time: timePart?.slice(0, 5) ?? "",
    status: m.status,
    meetingUrl: m.google_meet_url,
    isAdditional: m.is_additional,
  };
}

export function mapSummaryToPlans(summaries: ApiMeetingSummary[]) {
  return summaries.map((s) => {
    const byStatus = s.meetings_by_status;

    const upcoming = [
      ...byStatus.scheduled,
      ...byStatus["re-scheduled"],
      ...byStatus["in-progress"],
    ].map(mapApiMeetingToItem);

    const finished = byStatus.completed.map(mapApiMeetingToItem);
    const cancelled = byStatus.cancelled.map(mapApiMeetingToItem);

    const totalMeetings = upcoming.length + finished.length + cancelled.length;

    return {
      id: s.purchased_plan.id,
      name: s.purchased_plan.plan_name,
      totalMeetings,
      used: finished.length + cancelled.length,
      left: upcoming.length,
      planMeetings: s.purchased_plan.meetings_included,
      planUsed: s.purchased_plan.meetings_used,
      planLeft: s.purchased_plan.meetings_left,
      meetings: { upcoming, finished, cancelled },
    };
  });
}
