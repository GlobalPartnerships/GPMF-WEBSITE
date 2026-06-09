import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fetchAppUser } from "@/lib/api/user";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { getOrderById } from "@/lib/api/orders";
import { AdminSidebar } from "@/app/components/dashboard/admin/AdminSidebar";
import { AdminTopBar } from "@/app/components/dashboard/admin/AdminTopBar";
import dashStyles from "@/app/components/dashboard/shared/dashboard.module.css";
import type { ReactNode } from "react";
import type { Order, OrderStatus } from "@/app/components/dashboard/admin/sales/types";

type PageParams = { params: Promise<{ lang: string; id: string }> };

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "admin");
  return {
    title: `Order Detail — ${dict.meta.title}`,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function StatusBadge({ status }: { status: OrderStatus }) {
  const badgeClass =
    status === "completed"
      ? dashStyles.badgeConfirmed
      : status === "pending"
        ? dashStyles.badgePending
        : dashStyles.badgeCancelled;

  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${badgeClass}`}
    >
      {status}
    </span>
  );
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <dt className="text-surface-variant text-[13px] shrink-0">{label}</dt>
      <dd className="text-foreground font-medium text-[13px] text-right break-all">{value}</dd>
    </div>
  );
}

function CustomerCard({ order }: { order: Order }) {
  if (!order.user) return null;
  const { user } = order;
  const initials = getInitials(user.name);

  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
        Customer
      </span>

      <div className="flex flex-col items-center mt-5">
        {user.profile_image_url ? (
          <img
            src={user.profile_image_url}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-burgundy/10 flex items-center justify-center">
            <span className="text-[20px] font-bold text-burgundy">{initials}</span>
          </div>
        )}

        <h2 className="mt-4 text-[18px] font-serif font-semibold text-foreground">{user.name}</h2>

        <span
          className={`mt-2 inline-block px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.06em] uppercase font-semibold ${dashStyles.badgeConfirmed}`}
        >
          {user.role}
        </span>
      </div>

      <dl className="mt-6 space-y-3">
        <InfoRow label="Email" value={user.email} />
        <InfoRow label="Phone" value={user.phone ?? "—"} />
        <InfoRow label="Member since" value={formatDate(user.created_at)} />
      </dl>
    </div>
  );
}

function PlanCard({ order }: { order: Order }) {
  if (!order.plan) return null;
  const { plan } = order;

  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
        Plan
      </span>

      <div className="flex items-center gap-4 mt-5">
        {plan.icon_url && (
          <img src={plan.icon_url} alt={plan.name} className="w-12 h-12 object-contain shrink-0" />
        )}
        <div>
          <h3 className="text-[18px] font-serif font-semibold text-foreground">{plan.name}</h3>
          <p className="text-[13px] text-surface-variant mt-0.5">{plan.subtitle}</p>
        </div>
      </div>

      <p className="mt-4 text-[13px] text-foreground/70 leading-relaxed">{plan.description}</p>

      <dl className="mt-5 space-y-3">
        <InfoRow label="Category" value={plan.category} />
        <InfoRow label="Billing type" value={plan.billing_type.name} />
        <InfoRow
          label="Base price"
          value={`${order.currency} ${plan.base_price.toFixed(2)}`}
        />
        <InfoRow label="Meetings / month" value={plan.meetings_per_month} />
        <InfoRow label="Active" value={plan.is_active ? "Yes" : "No"} />
      </dl>

      {plan.features.length > 0 && (
        <div className="mt-5">
          <p className="text-[11px] tracking-[0.1em] uppercase text-surface-variant font-semibold mb-3">
            Features
          </p>
          <ul className="space-y-1.5">
            {plan.features.map((f) => (
              <li key={f.id} className="flex items-center gap-2 text-[13px] text-foreground/80">
                <span className="w-1.5 h-1.5 rounded-full bg-burgundy shrink-0" />
                {f.item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function PaymentCard({ order }: { order: Order }) {
  return (
    <div className={`${dashStyles.card} whisper-shadow bg-white rounded-sm p-6`}>
      <span className="text-[11px] tracking-[0.12em] uppercase text-surface-variant font-semibold">
        Payment
      </span>

      <dl className="mt-5 space-y-3">
        <InfoRow label="Order ID" value={<span className="font-mono text-[12px]">{order.id}</span>} />
        <InfoRow label="Status" value={<StatusBadge status={order.status} />} />
        <InfoRow
          label="Total"
          value={
            order.total_price != null
              ? `${order.currency} ${order.total_price.toFixed(2)}`
              : "—"
          }
        />
        <InfoRow label="Provider" value={<span className="capitalize">{order.payment_provider_name ?? "—"}</span>} />
        <InfoRow
          label="Provider order ID"
          value={
            <span className="font-mono text-[12px]">{order.provider_order_id ?? "—"}</span>
          }
        />
        <InfoRow
          label="Capture ID"
          value={
            <span className="font-mono text-[12px]">{order.provider_capture_id ?? "—"}</span>
          }
        />
        <InfoRow
          label="Date"
          value={order.created_at ? formatDate(order.created_at) : "—"}
        />
      </dl>

      {order.receipt_url && (
        <div className="mt-6 flex items-center gap-3">
          <a
            href={order.receipt_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium border border-outline rounded-full text-foreground/70 hover:text-burgundy hover:border-burgundy/40 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            View receipt
          </a>
          <a
            href={order.receipt_url}
            download={`receipt-${order.id}.pdf`}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium border border-outline rounded-full text-foreground/70 hover:text-burgundy hover:border-burgundy/40 transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5523 3.44772 13 4 13H11C11.5523 13 12 12.5523 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1046 12.1046 14 11 14H4C2.89543 14 2 13.1046 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            Download
          </a>
        </div>
      )}
    </div>
  );
}

export default async function AdminOrderDetailPage({ params }: PageParams) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect(`/${lang}/login`);

  const appUser = await fetchAppUser(session);
  if (!appUser || appUser.role === "user") redirect(`/${lang}/user`);

  const dict = await getDictionary(lang as Locale, "admin");
  const headers = { Authorization: `Bearer ${session.access_token}` };

  const order = await getOrderById(headers, id);

  return (
    <div className="min-h-screen pt-[88px] flex bg-background">
      <AdminSidebar dict={dict} lang={lang} />

      <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
        <AdminTopBar dict={dict} />

        <div className="mt-6 mb-8">
          <Link
            href={`/${lang}/admin/sales`}
            className="inline-flex items-center gap-1.5 text-[13px] text-surface-variant hover:text-burgundy transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Back to Sales
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <CustomerCard order={order} />
          <div className="md:col-span-2 grid grid-cols-1 gap-5">
            <PaymentCard order={order} />
            <PlanCard order={order} />
          </div>
        </div>
      </main>
    </div>
  );
}
