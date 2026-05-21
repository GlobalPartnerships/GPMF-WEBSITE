"use client";

import { useTransition } from "react";
import { deleteInvitationAction } from "@/app/[lang]/(dashboard)/admin/users/actions";

interface DeleteButtonProps {
  invitationId: string;
  email: string;
}

export function DeleteButton({ invitationId, email }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Cancel invitation for "${email}"?`)) return;
    startTransition(async () => {
      const result = await deleteInvitationAction(invitationId);
      if (!result.success) {
        alert(result.error ?? "Failed to cancel invitation");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-[11px] text-surface-variant hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "..." : "Cancel"}
    </button>
  );
}
