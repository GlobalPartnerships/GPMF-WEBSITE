import type { PlanWithMeetings } from "./types";

export const MOCK_PLANS_DATA: PlanWithMeetings[] = [
  {
    id: "basic",
    name: "Basic",
    totalMeetings: 9,
    used: 4,
    left: 5,
    planMeetings: 4,
    planUsed: 1,
    planLeft: 3,
    meetings: {
      upcoming: [
        { id: "1", participant: "Carlos Reyes", initials: "CR", topic: "Q2 Strategy Review", date: "2026-07-20", time: "10:00", status: "confirmed", meetingUrl: "https://meet.google.com/abc-defg-hij", calendarUrl: "https://calendar.google.com/calendar/event?eid=abc123" },
        { id: "2", participant: "Ana Fernández", initials: "AF", topic: "Financial Audit Follow-up", date: "2026-07-22", time: "15:30", status: "pending", meetingUrl: null, calendarUrl: null },
        { id: "3", participant: "Luis Mora", initials: "LM", topic: "Onboarding Session", date: "2026-06-28", time: "09:00", status: "confirmed", meetingUrl: "https://meet.google.com/klm-nopq-rst", calendarUrl: "https://calendar.google.com/calendar/event?eid=def456" },
      ],
      finished: [
        { id: "4", participant: "Elena Torres", initials: "ET", topic: "Editorial Review Q1", date: "2026-05-10", time: "11:00", status: "finished", meetingUrl: "https://meet.google.com/uvw-xyza-bcd", calendarUrl: "https://calendar.google.com/calendar/event?eid=ghi789" },
      ],
      cancelled: [
        { id: "5", participant: "David Wang", initials: "DW", topic: "Platform Migration Sync", date: "2026-03-05", time: "16:45", status: "cancelled", meetingUrl: null, calendarUrl: null },
      ],
    },
  },
  {
    id: "professional",
    name: "Professional",
    totalMeetings: 20,
    used: 6,
    left: 14,
    planMeetings: 12,
    planUsed: 4,
    planLeft: 8,
    meetings: {
      upcoming: [
        { id: "101", participant: "James Smith", initials: "JS", topic: "Vendor Onboarding", date: "2026-07-18", time: "14:00", status: "confirmed", meetingUrl: "https://meet.google.com/efg-hijk-lmn", calendarUrl: "https://calendar.google.com/calendar/event?eid=jkl012" },
        { id: "102", participant: "Sarah Henderson", initials: "SH", topic: "Budget Alignment Call", date: "2026-07-25", time: "10:30", status: "pending", meetingUrl: null, calendarUrl: "https://calendar.google.com/calendar/event?eid=mno345" },
      ],
      finished: [
        { id: "103", participant: "Marcus Reed", initials: "MR", topic: "Enterprise Rollout Sync", date: "2026-04-12", time: "16:00", status: "finished", meetingUrl: "https://meet.google.com/opq-rstu-vwx", calendarUrl: "https://calendar.google.com/calendar/event?eid=pqr678" },
        { id: "104", participant: "Ana Lucia Torres", initials: "AL", topic: "Rights & Distribution Review", date: "2026-03-28", time: "11:00", status: "finished", meetingUrl: "https://meet.google.com/yza-bcde-fgh", calendarUrl: "https://calendar.google.com/calendar/event?eid=stu901" },
      ],
      cancelled: [
        { id: "105", participant: "David Wang", initials: "DW", topic: "API Integration Check-in", date: "2026-04-02", time: "09:30", status: "cancelled", meetingUrl: null, calendarUrl: null },
      ],
    },
  },
];
