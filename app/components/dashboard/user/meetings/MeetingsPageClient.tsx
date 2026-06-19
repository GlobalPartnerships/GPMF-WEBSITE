"use client";

import { useState, useCallback } from "react";
import type { PlanWithMeetings, ScheduleFormState } from "./types";
import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";
import { PlanMeetingsCard } from "./PlanMeetingsCard";
import { ScheduleModal } from "./ScheduleModal";
import { EmptyState } from "@/app/components/dashboard/user/EmptyState";

interface MeetingsPageClientProps {
  initialPlans: PlanWithMeetings[];
  dict: DashboardDict;
}

export function MeetingsPageClient({ initialPlans, dict }: MeetingsPageClientProps) {
  const [plans, setPlans] = useState(initialPlans);
  const [modalOpen, setModalOpen] = useState(false);
  const [schedulingPlanId, setSchedulingPlanId] = useState<string | null>(null);

  const handleOpenSchedule = useCallback((planId: string) => {
    setSchedulingPlanId(planId);
    setModalOpen(true);
  }, []);

  const handleSchedule = useCallback((form: ScheduleFormState) => {
    if (!schedulingPlanId) return;

    const newMeeting = {
      id: String(Date.now()),
      participant: "—",
      initials: "—",
      topic: form.topic,
      date: form.date,
      time: form.time,
      status: "pending" as const,
      meetingUrl: null,
      calendarUrl: null,
      isAdditional: false,
    };

    setPlans((prev) =>
      prev.map((p) =>
        p.id === schedulingPlanId
          ? { ...p, meetings: { ...p.meetings, upcoming: [newMeeting, ...p.meetings.upcoming] } }
          : p
      )
    );
  }, [schedulingPlanId]);

  if (plans.length === 0) {
    return <EmptyState message={dict.noMeetings} icon="calendar" />;
  }

  return (
    <>
      <div className="w-full">
        {plans.map((plan) => (
          <PlanMeetingsCard key={plan.id} plan={plan} dict={dict} onSchedule={handleOpenSchedule} />
        ))}
      </div>

      <ScheduleModal
        open={modalOpen}
        dict={dict}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSchedule}
      />
    </>
  );
}
