import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getUserDetail } from "@/lib/api/users";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import { UserInfoCard } from "@/app/components/dashboard/admin/users/detail/UserInfoCard";
import { CurrentPlanCard } from "@/app/components/dashboard/admin/users/detail/CurrentPlanCard";
import { PreviousPlansTable } from "@/app/components/dashboard/admin/users/detail/PreviousPlansTable";
import { MeetingsTable } from "@/app/components/dashboard/admin/users/detail/MeetingsTable";
import { DiagnosisPanel } from "@/app/components/dashboard/admin/users/detail/DiagnosisPanel";
import { ReportsPanel } from "@/app/components/dashboard/admin/users/detail/ReportsPanel";

type PageParams = { params: Promise<{ lang: string; id: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: `User Detail — ${dict.meta.title}`,
  };
}

export default async function AdminUserDetailPage({ params }: PageParams) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const appUser = await fetchAppUser(session);
  if (!appUser || appUser.role === "user") redirect(`/${lang}/user`);

  const dict = await getDictionary(lang as Locale, "admin");
  const headers = { Authorization: `Bearer ${session.access_token}` };

  const userDetail = await getUserDetail(headers, id);

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar dict={dict} />

        <div className="mt-6 mb-8">
          <Link
            href={`/${lang}/admin/users`}
            className="inline-flex items-center gap-1.5 text-[13px] text-surface-variant hover:text-burgundy transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Users
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <UserInfoCard user={userDetail} />
          <div className="md:col-span-2">
            <CurrentPlanCard plan={userDetail.current_plan} />
          </div>
        </div>

        {userDetail.previous_plans.length > 0 && (
          <div className="mt-8">
            <PreviousPlansTable plans={userDetail.previous_plans} />
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <DiagnosisPanel diagnosis={userDetail.diagnosis} />
          <ReportsPanel reports={userDetail.reports} />
        </div>

        <div className="mt-8">
          <MeetingsTable title="Scheduled Meetings" meetings={userDetail.scheduled_meetings} />
        </div>

        <div className="mt-8">
          <MeetingsTable title="Postponed Meetings" meetings={userDetail.postponed_meetings} />
        </div>

        <div className="mt-8">
          <MeetingsTable title="Completed Meetings" meetings={userDetail.completed_meetings} />
        </div>

        <div className="mt-8">
          <MeetingsTable title="Canceled Meetings" meetings={userDetail.canceled_meetings} />
        </div>
      </main>
    </div>
  );
}
