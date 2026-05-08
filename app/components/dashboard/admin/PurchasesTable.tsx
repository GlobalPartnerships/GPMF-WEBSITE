import type { AdminDict } from "@/app/dictionaries/dashboard/admin/types";

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

function statusLabel(status: Purchase["status"], dict: Pick<AdminDict, "completed" | "pending">): string {
  return status === "completed" ? dict.completed : dict.pending;
}

function statusClass(status: Purchase["status"]): string {
  return status === "completed" ? "badge-confirmed" : "badge-pending";
}

export function PurchasesTable({ dict, purchases }: PurchasesTableProps) {
  return (
    <section className="dash-card whisper-shadow bg-white rounded-sm overflow-hidden">
      <div className="p-6 border-b border-outline/8 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-[22px] font-semibold text-burgundy">
            {dict.latestPurchases}
          </h3>
          <p className="text-surface-variant text-[13px] mt-0.5">
            {dict.latestPurchasesSubtitle}
          </p>
        </div>
        <button className="px-5 py-2.5 border border-outline/15 rounded-sm text-[11px] uppercase tracking-[0.18em] font-medium text-surface-variant hover:border-burgundy/30 hover:text-burgundy transition-all">
          {dict.viewAllOrders}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-outline/8 bg-warmgray/50">
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.customer}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.plan}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.meetingsCount}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.date}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.amount}
              </th>
              <th className="text-left px-6 py-3 text-[10px] tracking-[0.10em] uppercase text-surface-variant font-semibold">
                {dict.status}
              </th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, i) => (
              <tr
                key={purchase.id}
                className={`border-b border-outline/5 hover:bg-warmgray/30 transition-colors ${
                  i === purchases.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-burgundy/10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-[11px] font-bold text-burgundy">
                        {purchase.customerInitials}
                      </span>
                    </div>
                    <span className="text-[14px] font-medium text-foreground">
                      {purchase.customerName}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-6 text-[14px]">{purchase.plan}</td>
                <td className="py-3.5 px-6 text-[14px] font-medium">{purchase.meetings}</td>
                <td className="py-3.5 px-6 text-[14px] text-surface-variant">{purchase.date}</td>
                <td className="py-3.5 px-6 text-[14px] font-semibold">{purchase.amount}</td>
                <td className="py-3.5 px-6">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${statusClass(purchase.status)}`}
                  >
                    {statusLabel(purchase.status, dict)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
