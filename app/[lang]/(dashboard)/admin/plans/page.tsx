import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import { PlansManagerClient } from "@/app/components/dashboard/admin/plans/PlansManagerClient";
import {
  mockStandardPlans,
  mockCustomPlans,
  mockMostBoughtPlan,
} from "@/app/components/dashboard/admin/plans/mock-data";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: dict.plansMeta.title,
    description: dict.plansMeta.description,
  };
}

export default async function AdminPlansPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale, "admin");

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar
          dict={dict}
          title={dict.plansTitle}
          searchPlaceholder={dict.searchPlans}
          actionLabel={dict.downloadReport}
        />

        <PlansManagerClient
          standardPlans={mockStandardPlans}
          customPlans={mockCustomPlans}
          mostBoughtPlan={mockMostBoughtPlan}
          dict={dict}
        />
      </main>
    </div>
  );
}
