import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getUsers, getTopSpender, getLatestUser, getUsersByPeriod } from "@/lib/api/users";
import { getInvitations } from "@/lib/api/invitations";
import { getRoles } from "@/lib/api/roles";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import { TopSpenderCard } from "@/app/components/dashboard/admin/users/TopSpenderCard";
import { LatestUserCard } from "@/app/components/dashboard/admin/users/LatestUserCard";
import { MonthlyRegistrationsCard } from "@/app/components/dashboard/admin/users/MonthlyRegistrationsCard";
import { UsersTable } from "@/app/components/dashboard/admin/users/UsersTable";
import { InvitationsTable } from "@/app/components/dashboard/admin/invitations/InvitationsTable";
import type { TopSpenderResponse, LatestUserResponse } from "@/app/components/dashboard/admin/users/types";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: `Users — ${dict.meta.title}`,
  };
}

function getCurrentMonthRange(): { from: string; to: string } {
  const now = new Date();
  const dayAfterTomorrow = new Date(now);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  return {
    from: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-01`,
    to: fmt(dayAfterTomorrow),
  };
}

function getMonthLabel(): string {
  return new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default async function AdminUsersPage({ params }: PageParams) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user || user.role === "user") redirect(`/${lang}/user`);

  const dict = await getDictionary(lang as Locale, "admin");
  const headers = { Authorization: `Bearer ${session.access_token}` };
  const monthRange = getCurrentMonthRange();

  let topSpender: TopSpenderResponse | null = null;
  let latestUser: LatestUserResponse | null = null;
  let monthlyTotal = 0;

  const [usersRes, topSpenderRes, latestUserRes, monthlyRes, invitationsRes, rolesRes] = await Promise.allSettled([
    getUsers(headers),
    getTopSpender(headers),
    getLatestUser(headers),
    getUsersByPeriod(headers, monthRange),
    getInvitations(headers),
    getRoles(headers),
  ]);

  const users = usersRes.status === "fulfilled" ? usersRes.value.data : [];
  if (topSpenderRes.status === "fulfilled") topSpender = topSpenderRes.value;
  if (latestUserRes.status === "fulfilled") latestUser = latestUserRes.value;
  if (monthlyRes.status === "fulfilled") monthlyTotal = monthlyRes.value.meta.total;
  const invitations = invitationsRes.status === "fulfilled" ? invitationsRes.value : [];
  const roles = rolesRes.status === "fulfilled" ? rolesRes.value : [];

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar dict={dict} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <TopSpenderCard data={topSpender} lang={lang} />
          <LatestUserCard data={latestUser} lang={lang} />
          <MonthlyRegistrationsCard total={monthlyTotal} monthLabel={getMonthLabel()} />
        </div>

        <div className="mt-8">
          <UsersTable users={users} lang={lang} roles={roles} />
        </div>

        <div className="mt-8">
          <InvitationsTable
            invitations={invitations}
            roles={roles}
            isAdmin={user.role === "admin"}
          />
        </div>
      </main>
    </div>
  );
}
