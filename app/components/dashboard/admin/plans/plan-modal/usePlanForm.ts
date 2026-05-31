"use client";

import { useState, useEffect } from "react";
import type { ModalState } from "../types";
import type { FormState } from "./types";

function buildInitialForm(state: ModalState): FormState {
  if (state.mode === "edit" && state.plan) {
    return {
      name: state.plan.name,
      subtitle: state.plan.subtitle,
      description: state.plan.description,
      price: String(state.plan.base_price),
      monthlyMeetings: String(state.plan.meetings_per_month),
      billingTypeId: state.plan.billing_type_id,
      iconUrl: state.plan.icon_url ?? null,
      iconSearch: "",
      features: state.plan.features.map((f) => f.item),
      newFeature: "",
    };
  }
  return {
    name: "",
    subtitle: "",
    description: "",
    price: "",
    monthlyMeetings: "",
    billingTypeId: "",
    iconUrl: null,
    iconSearch: "",
    features: [],
    newFeature: "",
  };
}

export function usePlanForm(state: ModalState) {
  const [form, setForm] = useState<FormState>(() => buildInitialForm(state));
  const [selectedPlanType, setSelectedPlanType] = useState<"standard" | "custom">(state.planType);

  useEffect(() => {
    setForm(buildInitialForm(state));
    setSelectedPlanType(state.planType);
  }, [state]);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setDefaultBillingType(id: string) {
    setForm((f) => ({ ...f, billingTypeId: f.billingTypeId || id }));
  }

  function addFeature() {
    const trimmed = form.newFeature.trim();
    if (!trimmed) return;
    setForm((f) => ({ ...f, features: [...f.features, trimmed], newFeature: "" }));
  }

  function removeFeature(index: number) {
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== index) }));
  }

  function updateFeature(index: number, value: string) {
    setForm((f) => {
      const updated = [...f.features];
      updated[index] = value;
      return { ...f, features: updated };
    });
  }

  return {
    form,
    selectedPlanType,
    setSelectedPlanType,
    setField,
    setDefaultBillingType,
    addFeature,
    removeFeature,
    updateFeature,
  };
}
