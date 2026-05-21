"use client";

import { useState, useTransition } from "react";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import { ModalHeader } from "./ModalHeader";
import { createInvitationAction } from "@/app/[lang]/(dashboard)/admin/users/actions";
import type { Role } from "../types";

interface InviteModalProps {
  roles: Role[];
  onClose: () => void;
}

export function InviteModal({ roles, onClose }: InviteModalProps) {
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState(roles[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createInvitationAction({ email, role_id: roleId });
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
        <ModalHeader title="Invite User" onClose={onClose} />

        {error && (
          <div className="rounded-sm border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
              Role
            </label>
            <select
              className="w-full border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors bg-white"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              required
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-burgundy text-white font-serif text-base py-3.5 rounded-sm hover:bg-burgundy-dark transition-all whisper-shadow uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}
