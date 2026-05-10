"use client";

import { useState, useEffect, useRef } from "react";
import type { ModalState } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";

interface PlanModalProps {
  state: ModalState;
  dict: Pick<AdminDict, "plansModal">;
  onClose: () => void;
}

interface FormState {
  title: string;
  subtitle: string;
  price: string;
  iconId: string | null;
  iconSearch: string;
  features: string[];
  newFeature: string;
}

const PLAN_ICONS = [
  { id: "package", label: "package", path: "m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" },
  { id: "star", label: "star", path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" },
  { id: "shield", label: "shield", path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { id: "zap", label: "zap", path: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" },
  { id: "heart", label: "heart", path: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
  { id: "users", label: "users", path: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  { id: "trending", label: "trending", path: "M22 7 13.5 15.5l-5-5L2 17M22 7h-7M22 7v7" },
  { id: "briefcase", label: "briefcase", path: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
  { id: "award", label: "award", path: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm0 0v2m-3 4h6" },
  { id: "globe", label: "globe", path: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" },
];

function buildInitialForm(state: ModalState): FormState {
  if (state.mode === "edit" && state.plan) {
    return {
      title: state.plan.title,
      subtitle: state.plan.subtitle,
      price: state.plan.price,
      iconId: state.plan.iconId ?? null,
      iconSearch: "",
      features: state.plan.includes ?? [],
      newFeature: "",
    };
  }
  return { title: "", subtitle: "", price: "", iconId: null, iconSearch: "", features: [], newFeature: "" };
}

export function PlanModal({ state, dict, onClose }: PlanModalProps) {
  const [form, setForm] = useState<FormState>(() => buildInitialForm(state));
  const overlayRef = useRef<HTMLDivElement>(null);
  const m = dict.plansModal;

  useEffect(() => {
    setForm(buildInitialForm(state));
  }, [state]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const modalTitle =
    state.mode === "edit"
      ? state.planType === "custom" ? m.editCustom : m.editStandard
      : state.planType === "custom" ? m.createCustom : m.createStandard;

  const filteredIcons = PLAN_ICONS.filter((icon) =>
    icon.label.toLowerCase().includes(form.iconSearch.toLowerCase())
  );

  function addFeature() {
    const trimmed = form.newFeature.trim();
    if (!trimmed) return;
    setForm((f) => ({ ...f, features: [...f.features, trimmed], newFeature: "" }));
  }

  function removeFeature(index: number) {
    setForm((f) => ({ ...f, features: f.features.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Future: API integration
    onClose();
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl whisper-shadow border border-outline/10 p-8 m-4 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-surface-variant/50 hover:text-burgundy transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-6">
          <header>
            <h2 className="font-serif text-xl font-bold text-burgundy uppercase tracking-tight">
              {modalTitle}
            </h2>
            {state.mode === "edit" && state.plan && (
              <h3 className="text-[13px] text-surface-variant mt-1">{state.plan.title}</h3>
            )}
          </header>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {m.labelTitle}
              </label>
              <input
                className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                placeholder={m.titlePlaceholder}
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {m.labelSubtitle}
              </label>
              <input
                className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                placeholder={m.subtitlePlaceholder}
                value={form.subtitle}
                onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))}
              />
            </div>

            {/* Plan type + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                  {m.labelPlanType}
                </label>
                <input
                  className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm bg-warmgray text-surface-variant focus:outline-none cursor-default"
                  value={state.planType === "custom" ? "Custom" : "Standard"}
                  readOnly
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                  {m.labelPrice}
                </label>
                <input
                  className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                  placeholder={m.pricePlaceholder}
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                />
              </div>
            </div>

            {/* Icon picker */}
            <div className="space-y-3">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {m.labelIcon}
              </label>
              <div className="relative">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  className="w-full pl-9 pr-4 py-2 border border-outline/15 rounded-sm text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                  placeholder={m.searchIcon}
                  value={form.iconSearch}
                  onChange={(e) => setForm((f) => ({ ...f, iconSearch: e.target.value }))}
                />
              </div>
              <div className="border border-outline/10 rounded-sm p-3 bg-warmgray">
                <div className="grid grid-cols-8 gap-2 max-h-24 overflow-y-auto hide-scrollbar">
                  {filteredIcons.map((icon) => {
                    const selected = form.iconId === icon.id;
                    return (
                      <button
                        key={icon.id}
                        type="button"
                        title={icon.label}
                        onClick={() => setForm((f) => ({ ...f, iconId: icon.id }))}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                          selected
                            ? "border-2 border-burgundy text-burgundy bg-white"
                            : "border-outline/20 text-surface-variant/50 bg-white hover:border-burgundy/40 hover:text-burgundy"
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={icon.path} />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex-1 py-2 border-2 border-dashed border-outline/20 rounded-sm text-[10px] font-medium text-surface-variant hover:border-burgundy/40 hover:text-burgundy transition-colors uppercase tracking-wider"
                >
                  {m.uploadSvg}
                </button>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, iconId: null }))}
                  className="px-4 py-2 border border-outline/15 rounded-sm text-[10px] font-medium text-surface-variant/60 hover:text-red-500 hover:border-red-200 transition-colors uppercase tracking-wider"
                >
                  {m.deleteIcon}
                </button>
              </div>
            </div>

            {/* Includes */}
            <div className="space-y-3">
              <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                {m.labelIncludes}
              </label>
              <div className="space-y-2">
                {form.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      className="flex-1 border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                      value={feature}
                      onChange={(e) => {
                        const updated = [...form.features];
                        updated[index] = e.target.value;
                        setForm((f) => ({ ...f, features: updated }));
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-surface-variant/40 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
                    placeholder={m.newFeaturePlaceholder}
                    value={form.newFeature}
                    onChange={(e) => setForm((f) => ({ ...f, newFeature: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-charcoal text-white text-xs font-medium rounded-sm hover:bg-black transition-colors flex-shrink-0"
                  >
                    {m.addFeature}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-burgundy text-white font-serif text-base py-3.5 rounded-sm hover:bg-burgundy-dark transition-all whisper-shadow uppercase tracking-wider"
              >
                {state.mode === "edit" ? m.saveChanges : m.createPlan}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
