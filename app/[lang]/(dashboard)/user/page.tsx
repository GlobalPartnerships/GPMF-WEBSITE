import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { fetchLatestReport } from "@/lib/api/reports";
import { fetchLatestActivePlan } from "@/lib/api/purchased-plans";
import { fetchUpcomingMeetings } from "@/lib/api/meetings";
import { Sidebar } from "@/app/components/dashboard/user/Sidebar";
import { UserInfoHeader } from "@/app/components/dashboard/user/UserInfoHeader";
import { CurrentPlanCard } from "@/app/components/dashboard/user/CurrentPlanCard";
import { LastReportCard } from "@/app/components/dashboard/user/LastReportCard";
import { MeetingsTable } from "@/app/components/dashboard/user/MeetingsTable";

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

// --- Page ---

export default async function UserDashboardPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user) redirect(`/${lang}/login`);
  if (user.role === "admin" || user.role === "moderator") redirect(`/${lang}/admin`);

  const authHeaders = { Authorization: `Bearer ${session.access_token}` };
  const [latestReport, activePlan, upcomingMeetings] = await Promise.all([
    fetchLatestReport(session.user.id, authHeaders),
    fetchLatestActivePlan(session.user.id, authHeaders),
    fetchUpcomingMeetings(session.user.id, authHeaders),
  ]);

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
          <CurrentPlanCard purchasedPlan={activePlan} dict={dict} lang={lang} />

          {/* Last report card */}
          <LastReportCard report={latestReport} dict={dict} />
        </div>

        {/* Meetings */}
        <div className="mt-10">
          <MeetingsTable dict={dict} meetings={upcomingMeetings} lang={lang} />
        </div>
      </main>
    </div>
  );
}
