import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { DataTable } from "@/app/components/shared/DataTable";
import { EmptyState } from "@/app/components/EmptyState";
import type { ColumnDef } from "@/app/components/shared/types";
import type { Order, OrderStatus } from "./types";
import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CustomerCell({ order }: { order: Order }) {
  if (!order.user) return <span className="text-surface-variant text-[13px]">—</span>;

  const initials = getInitials(order.user.name);
  return (
    <div className="flex items-center gap-3">
      {order.user.profile_image_url ? (
        <img
          src={order.user.profile_image_url}
          alt={order.user.name}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-burgundy/10 flex-shrink-0 flex items-center justify-center">
          <span className="text-[11px] font-bold text-burgundy">{initials}</span>
        </div>
      )}
      <span className="text-[14px] font-medium text-foreground">{order.user.name}</span>
    </div>
  );
}

function StatusBadge({ status, dict }: { status: OrderStatus; dict: AdminDict }) {
  const badgeClass =
    status === "completed"
      ? dashStyles.badgeConfirmed
      : status === "pending"
        ? dashStyles.badgePending
        : dashStyles.badgeCancelled;

  const label: Record<OrderStatus, string> = {
    completed: dict.completed,
    pending: dict.pending,
    failed: dict.failed,
  };

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${badgeClass}`}
    >
      {label[status]}
    </span>
  );
}

interface SalesTableProps {
  orders: Order[];
  dict: AdminDict;
}

export function SalesTable({ orders, dict }: SalesTableProps) {
  if (orders.length === 0) {
    return (
      <EmptyState
        title={dict.noOrdersTitle}
        message={dict.noOrdersMessage}
      />
    );
  }

  const columns: ColumnDef<Order>[] = [
    {
      key: "customer",
      label: dict.customer,
      render: (row) => <CustomerCell order={row} />,
    },
    {
      key: "plan",
      label: dict.plan,
      className: "text-[14px]",
      render: (row) => <span>{row.plan?.name ?? "—"}</span>,
    },
    {
      key: "amount",
      label: dict.amount,
      className: "text-[14px] font-medium",
      render: (row) => (
        <span>
          {row.total_price != null
            ? `${row.currency} ${row.total_price.toFixed(2)}`
            : "—"}
        </span>
      ),
    },
    {
      key: "date",
      label: dict.date,
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
      key: "status",
      label: dict.status,
      render: (row) => <StatusBadge status={row.status} dict={dict} />,
    },
    {
      key: "provider",
      label: dict.provider,
      className: "text-[13px] text-surface-variant capitalize",
      render: (row) => <span>{row.payment_provider_name ?? "—"}</span>,
    },
  ];

  return (
    <DataTable<Order>
      title={dict.sales}
      subtitle={dict.salesSubtitle}
      columns={columns}
      data={orders}
      keyExtractor={(row) => row.id}
    />
  );
}
