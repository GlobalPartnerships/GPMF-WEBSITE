export interface MeetingsDict {
  meetingsTitle: string;
  meetingsSubtitle: string;

  availableMeetings: string;
  totalPlanMeetings: string;
  usedLabel: string;
  leftLabel: string;
  meetingsLeftLabel: string;
  meetingsUsedLabel: string;

  upcomingSection: string;
  finishedSection: string;
  cancelledSection: string;

  scheduleButton: string;
  scheduleModalTitle: string;
  topicLabel: string;
  dateLabel: string;
  timeLabel: string;
  topicPlaceholder: string;
  submitSchedule: string;
  cancelSchedule: string;

  meetingLinkLabel: string;
  calendarLabel: string;
  joinMeeting: string;
  viewInCalendar: string;
  noLink: string;

  noUpcoming: string;
  noFinished: string;
  noCancelled: string;

  finished: string;

  additionalLabel: string;
  additionalYes: string;
  additionalNo: string;

  planSuffix: string;

  meetingsMeta: {
    title: string;
    description: string;
  };
}
