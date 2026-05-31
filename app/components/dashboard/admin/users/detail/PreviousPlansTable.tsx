import { DataTable } from "@/app/components/shared/DataTable";
import type { ColumnDef } from "@/app/components/shared/types";
import type { PurchasedPlan } from "./types";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case "active":
      return dashStyles.badgeConfirmed;
    case "completed":
      return dashStyles.badgePending;
    case "cancelled":
      return dashStyles.badgeCancelled;
    default:
      return dashStyles.badgePending;
  }
}

const columns: ColumnDef<PurchasedPlan>[] = [
  {
    key: "plan_name",
    label: "Plan",
    render: (row) => row.plan?.name ?? row.order?.plan?.name ?? "—",
  },
  {
    key: "price",
    label: "Price",
    render: (row) =>
      row.order ? formatCurrency(row.order.total_price, row.order.currency) : "—",
  },
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <span
        className={`px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${statusBadgeClass(row.status)}`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "meetings",
    label: "Meetings",
    render: (row) => `${row.meetings_used}/${row.meetings_included}`,
  },
  {
    key: "starts_at",
    label: "Started",
    render: (row) => formatDate(row.starts_at),
  },
];

interface PreviousPlansTableProps {
  plans: PurchasedPlan[];
}

export function PreviousPlansTable({ plans }: PreviousPlansTableProps) {
  if (plans.length === 0) {
    return null;
  }

  return (
    <DataTable
      title="Previous Plans"
      subtitle={`${plans.length} past subscription${plans.length > 1 ? "s" : ""}`}
      columns={columns}
      data={plans}
      keyExtractor={(row) => row.id}
    />
  );
}
