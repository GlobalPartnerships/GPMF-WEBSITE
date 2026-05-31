"use client";

import { toast } from "sonner";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { DataTable } from "@/app/components/shared/DataTable";
import { ActionsCell } from "./ActionsCell";
import type { ColumnDef } from "@/app/components/shared/types";
import type { User } from "./types";
import type { Role } from "../invitations/types";

function CopyIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function CopyableCell({ value, label, children }: { value: string; label: string; children: React.ReactNode }) {
  function handleCopy() {
    navigator.clipboard.writeText(value);
    toast(`${label} copied`);
  }

  return (
    <div className="group/copy flex items-center gap-2">
      {children}
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover/copy:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity cursor-pointer"
        aria-label={`Copy ${label}`}
      >
        <CopyIcon />
      </button>
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function AvatarCell({ user }: { user: User }) {
  const initials = getInitials(user.name);
  return (
    <div className="flex items-center gap-3">
      {user.profile_image_url ? (
        <img
          src={user.profile_image_url}
          alt={user.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-burgundy/10 flex-shrink-0 flex items-center justify-center">
          <span className="text-[11px] font-bold text-burgundy">{initials}</span>
        </div>
      )}
      <span className="text-[14px] font-medium text-foreground">{user.name}</span>
    </div>
  );
}

function RoleBadge({ role }: { role: string | null }) {
  if (!role) return <span className="text-surface-variant text-[13px]">—</span>;

  const badgeClass =
    role === "admin"
      ? dashStyles.badgeCancelled
      : role === "moderator"
        ? dashStyles.badgePending
        : dashStyles.badgeConfirmed;

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${badgeClass}`}
    >
      {role}
    </span>
  );
}

interface UsersTableProps {
  users: User[];
  lang: string;
  roles: Role[];
}

export function UsersTable({ users, lang, roles }: UsersTableProps) {
  const columns: ColumnDef<User>[] = [
    {
      key: "id",
      label: "ID",
      className: "text-[13px] text-surface-variant font-mono",
      render: (row) => (
        <CopyableCell value={row.id} label="ID">
          <span>...{row.id.slice(-4)}</span>
        </CopyableCell>
      ),
    },
    {
      key: "name",
      label: "User",
      render: (row) => (
        <CopyableCell value={row.name} label="Name">
          <AvatarCell user={row} />
        </CopyableCell>
      ),
    },
    {
      key: "email",
      label: "Email",
      className: "text-[14px]",
      render: (row) => (
        <CopyableCell value={row.email} label="Email">
          <span>{row.email}</span>
        </CopyableCell>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      className: "text-[14px] text-surface-variant",
      render: (row) => (
        <CopyableCell value={row.phone ?? ""} label="Phone">
          <span>{row.phone ?? "—"}</span>
        </CopyableCell>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <CopyableCell value={row.role ?? ""} label="Role">
          <RoleBadge role={row.role} />
        </CopyableCell>
      ),
    },
    {
      key: "created_at",
      label: "Joined",
      className: "text-[13px] text-surface-variant",
      render: (row) => {
        const formatted = row.created_at
          ? new Date(row.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "—";
        return (
          <CopyableCell value={formatted} label="Joined date">
            <span>{formatted}</span>
          </CopyableCell>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => <ActionsCell user={row} lang={lang} roles={roles} />,
    },
  ];

  return (
    <DataTable<User>
      title="Users"
      subtitle="All registered users"
      columns={columns}
      data={users}
      keyExtractor={(row) => row.id}
    />
  );
}
