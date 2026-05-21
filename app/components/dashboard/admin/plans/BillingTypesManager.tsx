"use client";

import { useEffect, useState, useTransition } from "react";
import {
  getBillingTypesAction,
  createBillingTypeAction,
  updateBillingTypeAction,
  deleteBillingTypeAction,
} from "@/app/[lang]/(dashboard)/admin/plans/actions";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import type { BillingType } from "./types";

type ModalState =
  | { mode: "create" }
  | { mode: "edit"; billingType: BillingType };

export function BillingTypesManager() {
  const [billingTypes, setBillingTypes] = useState<BillingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getBillingTypesAction().then((res) => {
      if (res.success && res.data) setBillingTypes(res.data);
      setLoading(false);
    });
  }, []);

  function openCreate() {
    setForm({ name: "", description: "" });
    setError(null);
    setModalState({ mode: "create" });
  }

  function openEdit(bt: BillingType) {
    setForm({ name: bt.name, description: bt.description });
    setError(null);
    setModalState({ mode: "edit", billingType: bt });
  }

  function closeModal() {
    setModalState(null);
    setError(null);
  }

  function handleDelete(bt: BillingType) {
    if (!confirm(`Delete billing type "${bt.name}"? This may affect existing plans.`)) return;
    startTransition(async () => {
      const result = await deleteBillingTypeAction(bt.id);
      if (result.success) {
        setBillingTypes((prev) => prev.filter((t) => t.id !== bt.id));
      } else {
        alert(result.error ?? "Failed to delete billing type");
      }
    });
  }

  function handleSubmit() {
    if (!form.name.trim() || !form.description.trim()) {
      setError("Name and description are required.");
      return;
    }
    startTransition(async () => {
      const result =
        modalState?.mode === "edit"
          ? await updateBillingTypeAction(modalState.billingType.id, form)
          : await createBillingTypeAction(form);

      if (result.success && result.data) {
        if (modalState?.mode === "edit") {
          setBillingTypes((prev) =>
            prev.map((t) => (t.id === result.data!.id ? result.data! : t))
          );
        } else {
          setBillingTypes((prev) => [...prev, result.data!]);
        }
        closeModal();
      } else {
        setError(result.error ?? "Something went wrong");
      }
    });
  }

  return (
    <div className="rounded-xl border border-outline/10 bg-white p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
          Billing Types
        </h3>
        <button
          onClick={openCreate}
          className="flex items-center gap-1.5 text-[11px] font-medium text-burgundy border border-burgundy/30 rounded-sm px-3 py-1.5 hover:bg-burgundy/5 transition-colors"
        >
          <span className="text-base leading-none">+</span>
          Add Type
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-9 rounded-sm bg-warmgray/40 animate-pulse" />
          ))}
        </div>
      ) : billingTypes.length === 0 ? (
        <p className="text-[11px] text-surface-variant/40 text-center py-8">
          No billing types yet. Add one to get started.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline/10">
                <th className="text-left pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant pr-6">
                  Name
                </th>
                <th className="text-left pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
                  Description
                </th>
                <th className="pb-2 w-[1%]" />
              </tr>
            </thead>
            <tbody>
              {billingTypes.map((bt) => (
                <tr
                  key={bt.id}
                  className="border-b border-outline/5 hover:bg-warmgray/30 transition-colors group"
                >
                  <td className="py-3 pr-6 font-medium text-foreground text-[13px] whitespace-nowrap">
                    {bt.name}
                  </td>
                  <td className="py-3 text-[12px] text-surface-variant">
                    {bt.description}
                  </td>
                  <td className="py-3 pl-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(bt)}
                        className="text-[11px] border border-outline/20 rounded-sm px-2 py-0.5 text-surface-variant hover:border-burgundy/30 hover:text-burgundy transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bt)}
                        disabled={isPending}
                        className="text-[11px] border border-red-200 rounded-sm px-2 py-0.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalState && (
        <ModalOverlay onClose={isPending ? () => {} : closeModal}>
          <h2 className="font-serif text-xl text-foreground mb-6">
            {modalState.mode === "create" ? "New Billing Type" : "Edit Billing Type"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                disabled={isPending}
                placeholder="e.g. Monthly"
                className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant mb-1.5">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                disabled={isPending}
                rows={3}
                placeholder="e.g. Billed every month"
                className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors resize-none disabled:opacity-50"
              />
            </div>

            {error && (
              <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full bg-burgundy text-white font-serif text-base py-3.5 rounded-sm hover:bg-burgundy-dark transition-all whisper-shadow uppercase tracking-wider disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}
