"use client";

import { useState, useCallback } from "react";
import type { ScheduleFormState } from "./types";

const INITIAL_STATE: ScheduleFormState = {
  topic: "",
  date: "",
  time: "10:00",
};

export function useScheduleForm() {
  const [form, setForm] = useState<ScheduleFormState>(INITIAL_STATE);

  const setField = useCallback(<K extends keyof ScheduleFormState>(key: K, value: ScheduleFormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setForm(INITIAL_STATE);
  }, []);

  return { form, setField, reset };
}
