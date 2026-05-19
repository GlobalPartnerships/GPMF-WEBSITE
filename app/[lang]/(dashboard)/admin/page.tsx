import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import { StatCard } from "@/app/components/dashboard/admin/StatCard";
import { PurchasesTable } from "@/app/components/dashboard/admin/PurchasesTable";
import { TrafficChart } from "@/app/components/dashboard/admin/TrafficChart";
import { RegisteredUsersCard } from "@/app/components/dashboard/admin/RegisteredUsersCard";
import { TrafficBreakdown } from "@/app/components/dashboard/admin/TrafficBreakdown";
import { AdminMeetingsTable } from "@/app/components/dashboard/admin/AdminMeetingsTable";
import type { Purchase } from "@/app/components/dashboard/admin/PurchasesTable";
import type { AdminMeeting } from "@/app/components/dashboard/admin/AdminMeetingsTable";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

const mockPurchases: Purchase[] = [
  {
    id: "1",
    customerName: "Sarah Henderson",
    customerInitials: "SH",
    plan: "Professional",
    meetings: "12 sessions",
    date: "May 5, 2026",
    amount: "$129.00",
    status: "completed",
  },
  {
    id: "2",
    customerName: "Marcus Reed",
    customerInitials: "MR",
    plan: "Enterprise",
    meetings: "Unlimited",
    date: "May 4, 2026",
    amount: "$299.00",
    status: "completed",
  },
  {
    id: "3",
    customerName: "Ana Lucia Torres",
    customerInitials: "AL",
    plan: "Essentials",
    meetings: "4 sessions",
    date: "May 3, 2026",
    amount: "$49.00",
    status: "pending",
  },
  {
    id: "4",
    customerName: "James Kowalski",
    customerInitials: "JK",
    plan: "Professional",
    meetings: "12 sessions",
    date: "May 2, 2026",
    amount: "$129.00",
    status: "completed",
  },
];

const mockMeetings: AdminMeeting[] = [
  {
    id: "1",
    participantName: "James Smith",
    participantInitials: "JS",
    topic: "Q4 Sales Review",
    date: "Oct 24, 2026",
    time: "10:30 AM",
    status: "confirmed",
  },
  {
    id: "2",
    participantName: "Elena Lopez",
    participantInitials: "EL",
    topic: "Vendor Onboarding",
    date: "Oct 25, 2026",
    time: "02:00 PM",
    status: "pending",
  },
  {
    id: "3",
    participantName: "David Wang",
    participantInitials: "DW",
    topic: "Platform Migration Sync",
    date: "Oct 25, 2026",
    time: "04:45 PM",
    status: "confirmed",
  },
];

export default async function AdminDashboardPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user || user.role === "user") redirect(`/${lang}/user`);

  const dict = await getDictionary(lang as Locale, "admin");

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar dict={dict} />

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          <StatCard
            label={dict.totalEarnings}
            value="$428,290"
            trend={{ value: "12%", direction: "up" }}
            subtitle={dict.vsLastPeriod}
            icon="earnings"
          />
          <StatCard
            label={dict.salesThisYear}
            value="18,420"
            trend={{ value: "8.4%", direction: "up" }}
            subtitle={dict.growthSinceJan}
            icon="year"
          />
          <StatCard
            label={dict.salesThisMonth}
            value="2,841"
            trend={{ value: "2.1%", direction: "down" }}
            subtitle={dict.target}
            icon="month"
          />
          <StatCard
            label={dict.salesThisWeek}
            value="612"
            trend={{ value: "15%", direction: "up" }}
            subtitle={dict.activeWeek}
            icon="week"
          />
        </div>

        {/* Latest Purchases */}
        <div className="mt-8">
          <PurchasesTable dict={dict} purchases={mockPurchases} />
        </div>

        {/* Traffic Analytics + Users/Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-8">
            <TrafficChart dict={dict} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <RegisteredUsersCard
              dict={dict}
              count="124.5k"
              goalPercent={78}
            />
            <TrafficBreakdown
              dict={dict}
              data={{
                dailyUnique: "12,402",
                weeklyAverage: "86,910",
                monthlyTotal: "348,221",
              }}
            />
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="mt-8">
          <AdminMeetingsTable dict={dict} meetings={mockMeetings} />
        </div>
      </main>
    </div>
  );
}
