import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import { DataTable } from "@/app/components/shared/DataTable";
import type { ColumnDef } from "@/app/components/shared/types";

export interface Purchase {
  id: string;
  customerName: string;
  customerInitials: string;
  plan: string;
  meetings: string;
  date: string;
  amount: string;
  status: "completed" | "pending";
}

interface PurchasesTableProps {
  dict: Pick<
    AdminDict,
    | "latestPurchases"
    | "latestPurchasesSubtitle"
    | "viewAllOrders"
    | "customer"
    | "plan"
    | "meetingsCount"
    | "date"
    | "amount"
    | "status"
    | "completed"
    | "pending"
  >;
  purchases: Purchase[];
}

function StatusBadge({
  status,
  dict,
}: {
  status: Purchase["status"];
  dict: Pick<AdminDict, "completed" | "pending">;
}) {
  const label = status === "completed" ? dict.completed : dict.pending;
  const badgeClass = status === "completed" ? dashStyles.badgeConfirmed : dashStyles.badgePending;

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${badgeClass}`}
    >
      {label}
    </span>
  );
}

function CustomerCell({ name, initials }: { name: string; initials: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-burgundy/10 flex-shrink-0 flex items-center justify-center">
        <span className="text-[11px] font-bold text-burgundy">{initials}</span>
      </div>
      <span className="text-[14px] font-medium text-foreground">{name}</span>
    </div>
  );
}

export function PurchasesTable({ dict, purchases }: PurchasesTableProps) {
  const columns: ColumnDef<Purchase>[] = [
    {
      key: "customer",
      label: dict.customer,
      render: (row) => (
        <CustomerCell name={row.customerName} initials={row.customerInitials} />
      ),
    },
    { key: "plan", label: dict.plan, className: "text-[14px]" },
    { key: "meetings", label: dict.meetingsCount, className: "text-[14px] font-medium" },
    { key: "date", label: dict.date, className: "text-[14px] text-surface-variant" },
    { key: "amount", label: dict.amount, className: "text-[14px] font-semibold" },
    {
      key: "status",
      label: dict.status,
      render: (row) => <StatusBadge status={row.status} dict={dict} />,
    },
  ];

  return (
    <DataTable<Purchase>
      title={dict.latestPurchases}
      subtitle={dict.latestPurchasesSubtitle}
      actionLabel={dict.viewAllOrders}
      columns={columns}
      data={purchases}
      keyExtractor={(row) => row.id}
    />
  );
}
