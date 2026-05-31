"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import { deleteUserAction } from "@/app/[lang]/(dashboard)/admin/users/actions";
import type { User } from "./types";

interface DeleteUserModalProps {
  user: User;
  onClose: () => void;
}

export function DeleteUserModal({ user, onClose }: DeleteUserModalProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteUserAction(user.id);
      if (result.success) {
        toast.success("User deleted successfully");
        onClose();
      } else {
        toast.error(result.error ?? "Failed to delete user");
      }
    });
  }

  return (
    <ModalOverlay onClose={onClose}>
      <h2 className="text-lg font-semibold text-foreground mb-2">Delete User</h2>
      <p className="text-[14px] text-surface-variant mb-6">
        Are you sure you want to delete <strong>{user.name}</strong> ({user.email})? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={isPending}
          className="px-4 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-4 py-2 text-[13px] font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </ModalOverlay>
  );
}
