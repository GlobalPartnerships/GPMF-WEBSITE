"use client";

import { useState } from "react";
import { DataTable } from "@/app/components/shared/DataTable";
import { EmptyState } from "@/app/components/EmptyState";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import type { ColumnDef } from "@/app/components/shared/types";
import { StatusBadge } from "./StatusBadge";
import { DeleteButton } from "./DeleteButton";
import { InviteModal } from "./invite-modal/InviteModal";
import type { Invitation, Role } from "./types";

interface InvitationsTableProps {
  invitations: Invitation[];
  roles: Role[];
  isAdmin: boolean;
}

export function InvitationsTable({ invitations, roles, isAdmin }: InvitationsTableProps) {
  const [showModal, setShowModal] = useState(false);

  const columns: ColumnDef<Invitation>[] = [
    {
      key: "email",
      label: "Email",
      className: "text-[14px] font-medium text-foreground",
    },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span className="text-[13px] text-surface-variant capitalize">
          {row.role ?? "—"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "created_at",
      label: "Invited",
      className: "text-[13px] text-surface-variant",
      render: (row) => (
        <span>
          {new Date(row.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    ...(isAdmin
      ? [
          {
            key: "actions" as const,
            label: "",
            render: (row: Invitation) =>
              row.status === "accepted" ? null : (
                <DeleteButton invitationId={row.id} email={row.email} />
              ),
          },
        ]
      : []),
  ];

  if (invitations.length === 0) {
    return (
      <>
        <section className={`${dashStyles.card} whisper-shadow bg-white rounded-sm overflow-hidden`}>
          <div className="p-6 border-b border-outline/8 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-[22px] font-semibold text-burgundy">
                Invitations
              </h3>
              <p className="text-surface-variant text-[13px] mt-0.5">
                Pending and past invitations
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2.5 border border-outline/15 rounded-sm text-[11px] uppercase tracking-[0.18em] font-medium text-surface-variant hover:border-burgundy/30 hover:text-burgundy transition-all"
              >
                + Invite
              </button>
            )}
          </div>
          <EmptyState
            title="No invitations"
            message="No invitations have been sent yet. Click '+ Invite' to send one."
          />
        </section>

        {showModal && (
          <InviteModal roles={roles} onClose={() => setShowModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <DataTable<Invitation>
        title="Invitations"
        subtitle="Pending and past invitations"
        actionLabel={isAdmin ? "+ Invite" : undefined}
        onActionClick={isAdmin ? () => setShowModal(true) : undefined}
        columns={columns}
        data={invitations}
        keyExtractor={(row) => row.id}
      />

      {showModal && (
        <InviteModal roles={roles} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
