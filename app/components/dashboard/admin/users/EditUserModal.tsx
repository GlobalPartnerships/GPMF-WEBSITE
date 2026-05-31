"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ModalOverlay } from "@/app/components/shared/ModalOverlay";
import { updateUserAction } from "@/app/[lang]/(dashboard)/admin/users/actions";
import type { User } from "./types";
import type { Role } from "../invitations/types";

interface EditUserModalProps {
  user: User;
  roles: Role[];
  onClose: () => void;
}

export function EditUserModal({ user, roles, onClose }: EditUserModalProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [roleId, setRoleId] = useState(user.role_id);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await updateUserAction(user.id, {
        name,
        email,
        phone: phone || null,
        role_id: roleId,
      });
      if (result.success) {
        toast.success("User updated successfully");
        onClose();
      } else {
        toast.error(result.error ?? "Failed to update user");
      }
    });
  }

  const inputClass =
    "w-full px-3 py-2 text-[14px] border border-outline/30 rounded-lg bg-background text-foreground focus:outline-none focus:border-burgundy transition-colors";
  const labelClass = "block text-[13px] font-medium text-foreground mb-1";

  return (
    <ModalOverlay onClose={onClose}>
      <h2 className="text-lg font-semibold text-foreground mb-6">Edit User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Role</label>
          <select
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            className={inputClass}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="px-4 py-2 text-[13px] font-medium text-foreground border border-outline rounded-lg hover:bg-surface transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-[13px] font-medium text-white bg-burgundy rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
}
