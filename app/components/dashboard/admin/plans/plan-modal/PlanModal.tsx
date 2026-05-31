"use client";

import { useState, useTransition } from "react";
import type { ModalState } from "../types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import { ModalHeader } from "./ModalHeader";
import { IconPicker } from "../IconPicker";
import { FeatureList } from "./FeatureList";
import { usePlanForm } from "./usePlanForm";
import { usePlanData } from "./usePlanData";
import { validatePlanForm } from "./validation";
import { submitPlan } from "./submitPlan";

interface PlanModalProps {
  state: ModalState;
  dict: Pick<AdminDict, "plansModal">;
  onClose: () => void;
}

export function PlanModal({ state, dict, onClose }: PlanModalProps) {
  const {
    form,
    selectedPlanType,
    setSelectedPlanType,
    setField,
    setDefaultBillingType,
    addFeature,
    removeFeature,
    updateFeature,
  } = usePlanForm(state);

  const { billingTypes, loadingBilling, svgAssets, svgAssetsLoading } =
    usePlanData(setDefaultBillingType);

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const m = dict.plansModal;

  const modalTitle =
    state.mode === "edit"
      ? selectedPlanType === "custom" ? m.editCustom : m.editStandard
      : state.allowPlanTypeSelection
        ? m.createPlan
        : selectedPlanType === "custom" ? m.createCustom : m.createStandard;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validatePlanForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    startTransition(async () => {
      const result = await submitPlan(form, selectedPlanType, state);
      if (result.success) {
        onClose();
      } else {
        setError(result.error ?? "Something went wrong");
      }
    });
  }

  return (
    <ModalOverlay onClose={onClose}>
      <div className="space-y-6">
        <ModalHeader
          title={modalTitle}
          subtitle={state.mode === "edit" && state.plan ? state.plan.name : undefined}
          onClose={onClose}
        />

        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
              {m.labelTitle}
            </label>
            <input
              className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
              placeholder={m.titlePlaceholder}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
              {m.labelSubtitle}
            </label>
            <input
              className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
              placeholder={m.subtitlePlaceholder}
              value={form.subtitle}
              onChange={(e) => setField("subtitle", e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
              Description
            </label>
            <textarea
              className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors resize-none"
              rows={3}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {m.labelPlanType}
              </label>
              {state.allowPlanTypeSelection ? (
                <select
                  className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors bg-white"
                  value={selectedPlanType}
                  onChange={(e) => setSelectedPlanType(e.target.value as "standard" | "custom")}
                >
                  <option value="standard">Standard</option>
                  <option value="custom">Custom</option>
                </select>
              ) : (
                <input
                  className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm bg-warmgray text-surface-variant focus:outline-none cursor-default"
                  value={selectedPlanType === "custom" ? "Custom" : "Standard"}
                  readOnly
                />
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {m.labelPrice}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                placeholder={m.pricePlaceholder}
                value={form.price}
                onChange={(e) => setField("price", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                Monthly meetings
              </label>
              <input
                type="number"
                step="1"
                min="1"
                className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                placeholder="e.g. 4"
                value={form.monthlyMeetings}
                onChange={(e) => setField("monthlyMeetings", e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                Billing
              </label>
              <select
                className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                value={form.billingTypeId}
                onChange={(e) => setField("billingTypeId", e.target.value)}
                disabled={loadingBilling}
                required
              >
                {loadingBilling ? (
                  <option value="">Loading...</option>
                ) : (
                  billingTypes.map((bt) => (
                    <option key={bt.id} value={bt.id} title={bt.description}>
                      {bt.name}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          <IconPicker
            assets={svgAssets}
            isLoading={svgAssetsLoading}
            selectedUrl={form.iconUrl}
            searchValue={form.iconSearch}
            label={m.labelIcon}
            searchPlaceholder={m.searchIcon}
            uploadLabel={m.uploadSvg}
            deleteLabel={m.deleteIcon}
            onSelect={(url) => setField("iconUrl", url)}
            onSearchChange={(v) => setField("iconSearch", v)}
            onClear={() => setField("iconUrl", null)}
          />

          <FeatureList
            features={form.features}
            newFeature={form.newFeature}
            label={m.labelIncludes}
            addLabel={m.addFeature}
            placeholder={m.newFeaturePlaceholder}
            onAdd={addFeature}
            onRemove={removeFeature}
            onChange={updateFeature}
            onNewFeatureChange={(v) => setField("newFeature", v)}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-burgundy text-white font-serif text-base py-3.5 rounded-sm hover:bg-burgundy-dark transition-all whisper-shadow uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending
                ? "Saving..."
                : state.mode === "edit" ? m.saveChanges : m.createPlan}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}
