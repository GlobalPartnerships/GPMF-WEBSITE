import Link from "next/link";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { DataTable } from "@/app/components/shared/DataTable";
import type { ColumnDef } from "@/app/components/shared/types";
import type { User } from "./types";

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
}

export function UsersTable({ users, lang }: UsersTableProps) {
  const columns: ColumnDef<User>[] = [
    {
      key: "name",
      label: "User",
      render: (row) => <AvatarCell user={row} />,
    },
    { key: "email", label: "Email", className: "text-[14px]" },
    {
      key: "phone",
      label: "Phone",
      className: "text-[14px] text-surface-variant",
      render: (row) => <span>{row.phone ?? "—"}</span>,
    },
    {
      key: "role",
      label: "Role",
      render: (row) => <RoleBadge role={row.role} />,
    },
    {
      key: "created_at",
      label: "Joined",
      className: "text-[13px] text-surface-variant",
      render: (row) => (
        <span>
          {row.created_at
            ? new Date(row.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (row) => (
        <Link
          href={`/${lang}/admin/users/${row.id}`}
          className="text-[12px] text-burgundy hover:underline font-medium"
        >
          View
        </Link>
      ),
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
