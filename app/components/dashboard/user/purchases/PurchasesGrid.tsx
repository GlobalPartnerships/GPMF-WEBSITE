import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";
import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";
import { PurchaseCard } from "./PurchaseCard";
import { EmptyState } from "@/app/components/dashboard/user/EmptyState";

interface PurchasesGridProps {
  purchases: PurchasedPlan[];
  dict: DashboardDict;
}

export function PurchasesGrid({ purchases, dict }: PurchasesGridProps) {
  if (purchases.length === 0) {
    return <EmptyState message={dict.noPurchases} icon="document" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {purchases.map((purchase) => (
        <PurchaseCard key={purchase.id} purchase={purchase} dict={dict} />
      ))}
    </div>
  );
}
