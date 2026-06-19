import type { PurchasedPlan } from "@/app/components/dashboard/admin/users/detail/types";
import type { DashboardDict } from "@/app/dictionaries/dashboard/user/types";
import { PurchaseCard } from "./PurchaseCard";
import { EmptyState } from "@/app/components/dashboard/user/EmptyState";
import { EmptySlot } from "@/app/components/dashboard/user/EmptySlot";

export function PurchasesGrid({ purchases, dict }: PurchasesGridProps) {
  if (purchases.length === 0) {
    return <EmptyState message={dict.noPurchases} icon="document" />;
  }

  const emptySlotLabel = dict.emptySlot ?? "Empty slot";

  const smCols = 2;
  const lgCols = 3;
  const smEmpty = Math.max(0, smCols - purchases.length);
  const lgExtra = Math.max(0, lgCols - purchases.length) - smEmpty;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {purchases.map((purchase) => (
        <PurchaseCard key={purchase.id} purchase={purchase} dict={dict} />
      ))}
      {Array.from({ length: smEmpty }, (_, i) => (
        <div key={`empty-sm-${i}`} className="hidden sm:flex min-h-0 w-full">
          <EmptySlot label={emptySlotLabel} />
        </div>
      ))}
      {Array.from({ length: lgExtra }, (_, i) => (
        <div key={`empty-lg-${i}`} className="hidden lg:flex min-h-0 w-full">
          <EmptySlot label={emptySlotLabel} />
        </div>
      ))}
    </div>
  );
}
