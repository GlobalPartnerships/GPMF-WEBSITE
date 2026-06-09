import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getReports } from "@/lib/api/reports";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import { ReportsTable } from "@/app/components/dashboard/admin/reports/ReportsTable";
import { ReportsFilterBar } from "@/app/components/dashboard/admin/reports/ReportsFilterBar";
import type { ReportsFilters } from "@/app/components/dashboard/admin/reports/types";

type PageParams = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: `Reports — ${dict.meta.title}`,
  };
}

export default async function AdminReportsPage({ params, searchParams }: PageParams) {
  const { lang } = await params;
  const sp = await searchParams;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user || user.role === "user") redirect(`/${lang}/user`);

  const dict = await getDictionary(lang as Locale, "admin");
  const headers = { Authorization: `Bearer ${session.access_token}` };

  const filters: ReportsFilters = {
    user_id: typeof sp.user_id === "string" ? sp.user_id : undefined,
    user_email: typeof sp.user_email === "string" ? sp.user_email : undefined,
    title: typeof sp.title === "string" ? sp.title : undefined,
    file_name: typeof sp.file_name === "string" ? sp.file_name : undefined,
    file_type: typeof sp.file_type === "string" ? sp.file_type : undefined,
  };

  const hasFilters = Boolean(filters.user_id || filters.user_email || filters.title || filters.file_name || filters.file_type);

  const [reportsRes] = await Promise.allSettled([
    getReports(headers, 1, 100, filters),
  ]);

  const reports = reportsRes.status === "fulfilled" ? reportsRes.value.data : [];

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar dict={dict} />

        <div className="mt-8">
          <Suspense>
            <ReportsFilterBar />
          </Suspense>
        </div>

        <div className="mt-6">
          <ReportsTable reports={reports} lang={lang} hasFilters={hasFilters} />
        </div>
      </main>
    </div>
  );
}
