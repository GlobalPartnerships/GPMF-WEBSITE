import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { Sidebar } from "@/app/components/dashboard/user/Sidebar";
import { UserInfoHeader } from "@/app/components/dashboard/user/UserInfoHeader";
import { MeetingsPageClient } from "@/app/components/dashboard/user/meetings/MeetingsPageClient";
import { fetchMeetingSummary, mapSummaryToPlans } from "@/lib/api/meetings";

type PageParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "dashboard");
  return {
    title: dict.meetingsMeta.title,
    description: dict.meetingsMeta.description,
  };
}

export default async function UserMeetingsPage({ params }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const user = await fetchAppUser(session);
  if (!user) redirect(`/${lang}/login`);
  if (user.role === "admin" || user.role === "moderator") redirect(`/${lang}/admin`);

  const [dict, plans] = await Promise.all([
    getDictionary(lang as Locale, "dashboard"),
    fetchMeetingSummary(session.user.id, { Authorization: `Bearer ${session.access_token}` }).then(mapSummaryToPlans),
  ]);

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <Sidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <UserInfoHeader
          dict={dict}
          user={{
            name: user.name,
            email: user.email,
            phone: user.phone ?? "",
            avatarUrl: user.profile_image_url ?? undefined,
          }}
        />

        <div className="mt-8">
          <div className="mb-8">
            <h1 className="font-serif text-[28px] text-foreground">
              {dict.meetingsTitle}
            </h1>
            <p className="text-[13px] text-surface-variant mt-1">
              {dict.meetingsSubtitle}
            </p>
          </div>

          <MeetingsPageClient initialPlans={plans} dict={dict} />
        </div>
      </main>
    </div>
  );
}
