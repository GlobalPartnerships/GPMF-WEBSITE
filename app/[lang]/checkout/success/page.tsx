import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "@/app/dictionaries";
import { RevealObserver } from "@/app/components/home/RevealObserver";
import { DecoElements } from "@/app/components/plans/DecoElements";
import { SideText } from "@/app/components/plans/SideText";

type PageParams = {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ orderId?: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale, "checkoutResult");
  return {
    title: dict.success.meta.title,
    description: dict.success.meta.description,
  };
}

async function getOrder(orderId: string) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";
  const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export default async function CheckoutSuccessPage({ params, searchParams }: PageParams) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { orderId } = await searchParams;

  const [dict, order] = await Promise.all([
    getDictionary(lang as Locale, "checkoutResult"),
    orderId ? getOrder(orderId) : Promise.resolve(null),
  ]);

  const t = dict.success;

  const userName = order?.user?.name ?? "";
  const planName = order?.plan?.name ?? "";
  const displayOrderId = order?.id ?? orderId ?? "";

  return (
    <>
      <RevealObserver />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <section className="pt-32 pb-32 min-h-screen relative overflow-hidden flex items-center">
        <SideText line1={t.sideText.line1} line2={t.sideText.line2} />
        <DecoElements />

        <div className="max-w-xl mx-auto px-6 text-center reveal">
          <div className="mb-8 flex justify-center">
            <span
              className="material-symbols-outlined text-burgundy"
              style={{ fontSize: 72 }}
            >
              check_circle
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
            {t.welcomeMessage.replace("{{name}}", userName)}
          </h1>

          <div className="mt-6 space-y-2 text-sm text-foreground/70">
            <p>
              <span className="font-medium text-foreground">
                {t.planLabel}:
              </span>{" "}
              {planName}
            </p>
            <p>
              <span className="font-medium text-foreground">
                {t.orderLabel}:
              </span>{" "}
              {displayOrderId}
            </p>
            {order?.payment_provider_name && (
              <p>
                <span className="font-medium text-foreground">
                  {t.paymentProviderLabel}:
                </span>{" "}
                {order.payment_provider_name}
              </p>
            )}
          </div>

          <p className="mt-8 text-sm text-foreground/60 max-w-md mx-auto leading-relaxed">
            {t.contactMessage}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled
              className="btn-sweep bg-burgundy/50 text-white py-4 px-8 text-[12px] uppercase tracking-[0.22em] rounded-[2px] cursor-not-allowed opacity-60"
            >
              <span>{t.goToPurchases}</span>
            </button>

            <Link
              href={`/${lang}/services`}
              className="btn-sweep bg-burgundy text-white py-4 px-8 text-[12px] uppercase tracking-[0.22em] rounded-[2px] text-center"
            >
              <span>{t.goToServices}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
