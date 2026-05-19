import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { Sidebar } from "@/app/components/dashboard/user/Sidebar";
import { UserInfoHeader } from "@/app/components/dashboard/user/UserInfoHeader";
import { SummaryCard } from "@/app/components/dashboard/user/SummaryCard";
import { MeetingsTable } from "@/app/components/dashboard/user/MeetingsTable";
import { EmptyState } from "@/app/components/dashboard/user/EmptyState";
import type { Meeting } from "@/app/components/dashboard/user/MeetingsTable";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "dashboard");
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

const mockPlan = null as {
  title: string;
  nextBilling: string;
} | null;

const mockReport = null as {
  title: string;
  completedOn: string;
} | null;

const mockMeetings: Meeting[] = [
  {
    id: "1",
    participantName: "Carlos Reyes",
    topic: "Q2 Strategy Review",
    date: "2026-05-12",
    time: "10:00",
    status: "confirmed",
  },
  {
    id: "2",
    participantName: "Ana Fernández",
    topic: "Financial Audit Follow-up",
    date: "2026-05-14",
    time: "15:30",
    status: "pending",
  },
  {
    id: "3",
    participantName: "Luis Mora",
    topic: "Onboarding Session",
    date: "2026-05-09",
    time: "09:00",
    status: "cancelled",
  },
];

// --- Page ---

export default async function UserDashboardPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user) redirect(`/${lang}/login`);

  const dict = await getDictionary(lang as Locale, "dashboard");

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <Sidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        {/* User info header */}
        <UserInfoHeader
          dict={dict}
          user={{
            name: user.name,
            email: user.email,
            phone: user.phone ?? undefined,
            avatarUrl: user.profile_image_url ?? undefined,
          }}
        />

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          {/* Current plan card */}
          <SummaryCard
            label={dict.currentPlanLabel}
            icon="star"
            action={{ label: dict.managePlan, href: `/${lang}/plans` }}
          >
            {mockPlan ? (
              <div className="flex flex-col gap-1">
                <p className="font-serif text-[22px] text-foreground leading-tight">
                  {mockPlan.title}
                </p>
                <p className="text-[12px] text-surface-variant mt-1">
                  {dict.nextBilling}{" "}
                  <span className="text-foreground font-medium">{mockPlan.nextBilling}</span>
                </p>
              </div>
            ) : (
              <EmptyState message={dict.noPlan} icon="plan" />
            )}
          </SummaryCard>

          {/* Last report card */}
          <SummaryCard
            label={dict.lastReportLabel}
            icon="chart"
            action={mockReport ? { label: dict.downloadPdf } : undefined}
          >
            {mockReport ? (
              <div className="flex flex-col gap-1">
                <p className="font-serif text-[22px] text-foreground leading-tight">
                  {mockReport.title}
                </p>
                <p className="text-[12px] text-surface-variant mt-1">
                  {dict.completedOn}{" "}
                  <span className="text-foreground font-medium">{mockReport.completedOn}</span>
                </p>
              </div>
            ) : (
              <EmptyState message={dict.noReport} icon="document" />
            )}
          </SummaryCard>
        </div>

        {/* Meetings */}
        <div className="mt-10">
          <MeetingsTable dict={dict} meetings={mockMeetings} lang={lang} />
        </div>
      </main>
    </div>
  );
}
