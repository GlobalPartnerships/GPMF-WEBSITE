"use client";

import { useState, useEffect, useTransition } from "react";
import type { ModalState, BillingType } from "../types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import type { CloudinaryImage } from "../svg-upload/types";
import {
  createPlanAction,
  updatePlanAction,
  getBillingTypesAction,
  getPlanSvgsAction,
} from "@/app/[lang]/(dashboard)/admin/plans/actions";
import { ModalOverlay } from "./ModalOverlay";
import { ModalHeader } from "./ModalHeader";
import { IconPicker } from "../IconPicker";
import { FeatureList } from "./FeatureList";
import type { FormState } from "./types";

interface PlanModalProps {
  state: ModalState;
  dict: Pick<AdminDict, "plansModal">;
  onClose: () => void;
}

function buildInitialForm(state: ModalState): FormState {
  if (state.mode === "edit" && state.plan) {
    return {
      name: state.plan.name,
      subtitle: state.plan.subtitle,
      description: state.plan.description,
      price: String(state.plan.base_price),
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
    billingTypeId: "",
    iconUrl: null,
    iconSearch: "",
    features: [],
    newFeature: "",
  };
}

export function PlanModal({ state, dict, onClose }: PlanModalProps) {
  const [form, setForm] = useState<FormState>(() => buildInitialForm(state));
  const [selectedPlanType, setSelectedPlanType] = useState<"standard" | "custom">(state.planType);
  const [billingTypes, setBillingTypes] = useState<BillingType[]>([]);
  const [loadingBilling, setLoadingBilling] = useState(true);
  const [svgAssets, setSvgAssets] = useState<CloudinaryImage[]>([]);
  const [svgAssetsLoading, setSvgAssetsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const m = dict.plansModal;

  useEffect(() => {
    setLoadingBilling(true);
    getBillingTypesAction().then((res) => {
      if (res.success && res.data) {
        setBillingTypes(res.data);
        setForm((f) => ({
          ...f,
          billingTypeId: f.billingTypeId || res.data![0]?.id || "",
        }));
      }
      setLoadingBilling(false);
    });

    setSvgAssetsLoading(true);
    getPlanSvgsAction().then((res) => {
      if (res.success && res.data) {
        setSvgAssets(res.data);
      }
      setSvgAssetsLoading(false);
    });
  }, []);

  useEffect(() => {
    setForm(buildInitialForm(state));
    setSelectedPlanType(state.planType);
    setError(null);
  }, [state]);

  const modalTitle =
    state.mode === "edit"
      ? selectedPlanType === "custom" ? m.editCustom : m.editStandard
      : state.allowPlanTypeSelection
        ? m.createPlan
        : selectedPlanType === "custom" ? m.createCustom : m.createStandard;

  function addFeature() {
    const trimmed = form.newFeature.trim();
    if (!trimmed) return;
    setForm((f) => ({ ...f, features: [...f.features, trimmed], newFeature: "" }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const price = parseFloat(form.price);
    if (isNaN(price) || price < 0) {
      setError("Price must be a valid positive number");
      return;
    }

    if (!form.iconUrl) {
      setError("Please select an icon for this plan");
      return;
    }

    startTransition(async () => {
      const payload = {
        name: form.name,
        subtitle: form.subtitle,
        description: form.description,
        base_price: price,
        currency: "USD",
        category: selectedPlanType,
        billing_type_id: form.billingTypeId,
        icon_url: form.iconUrl!,
      } as const;

      const result =
        state.mode === "edit" && state.plan
          ? await updatePlanAction(state.plan.id, payload, form.features)
          : await createPlanAction(payload, form.features);

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
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
              onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
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
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
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
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
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
                onChange={(e) => setForm((f) => ({ ...f, billingTypeId: e.target.value }))}
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
            onSelect={(url) => setForm((f) => ({ ...f, iconUrl: url }))}
            onSearchChange={(v) => setForm((f) => ({ ...f, iconSearch: v }))}
            onClear={() => setForm((f) => ({ ...f, iconUrl: null }))}
          />

          <FeatureList
            features={form.features}
            newFeature={form.newFeature}
            label={m.labelIncludes}
            addLabel={m.addFeature}
            placeholder={m.newFeaturePlaceholder}
            onAdd={addFeature}
            onRemove={(i) =>
              setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }))
            }
            onChange={(i, v) => {
              const updated = [...form.features];
              updated[i] = v;
              setForm((f) => ({ ...f, features: updated }));
            }}
            onNewFeatureChange={(v) => setForm((f) => ({ ...f, newFeature: v }))}
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
