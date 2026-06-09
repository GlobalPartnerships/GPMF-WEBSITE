import "server-only";

import type { DictMap, DictSection } from "./types";

export type { DictSection, DictMap } from "./types";

export const locales = ["es", "en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const hasLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

const loaders: {
  [S in DictSection]: Record<Locale, () => Promise<DictMap[S]>>;
} = {
  layout: {
    es: () => import("./layout/es.json").then((m) => m.default as DictMap["layout"]),
    en: () => import("./layout/en.json").then((m) => m.default as DictMap["layout"]),
    fr: () => import("./layout/fr.json").then((m) => m.default as DictMap["layout"]),
    de: () => import("./layout/de.json").then((m) => m.default as DictMap["layout"]),
  },
  home: {
    es: () => import("./home/es.json").then((m) => m.default as DictMap["home"]),
    en: () => import("./home/en.json").then((m) => m.default as DictMap["home"]),
    fr: () => import("./home/fr.json").then((m) => m.default as DictMap["home"]),
    de: () => import("./home/de.json").then((m) => m.default as DictMap["home"]),
  },
  login: {
    es: () => import("./login/es.json").then((m) => m.default as DictMap["login"]),
    en: () => import("./login/en.json").then((m) => m.default as DictMap["login"]),
    fr: () => import("./login/fr.json").then((m) => m.default as DictMap["login"]),
    de: () => import("./login/de.json").then((m) => m.default as DictMap["login"]),
  },
  plans: {
    es: () => import("./plans/es.json").then((m) => m.default as DictMap["plans"]),
    en: () => import("./plans/en.json").then((m) => m.default as DictMap["plans"]),
    fr: () => import("./plans/fr.json").then((m) => m.default as DictMap["plans"]),
    de: () => import("./plans/de.json").then((m) => m.default as DictMap["plans"]),
  },
  dashboard: {
    es: () => Promise.all([
      import("./dashboard/user/es.json").then((m) => m.default),
      import("./dashboard/user/purchases/es.json").then((m) => m.default),
    ]).then(([base, purchases]) => ({ ...base, ...purchases }) as DictMap["dashboard"]),
    en: () => Promise.all([
      import("./dashboard/user/en.json").then((m) => m.default),
      import("./dashboard/user/purchases/en.json").then((m) => m.default),
    ]).then(([base, purchases]) => ({ ...base, ...purchases }) as DictMap["dashboard"]),
    fr: () => Promise.all([
      import("./dashboard/user/fr.json").then((m) => m.default),
      import("./dashboard/user/purchases/fr.json").then((m) => m.default),
    ]).then(([base, purchases]) => ({ ...base, ...purchases }) as DictMap["dashboard"]),
    de: () => Promise.all([
      import("./dashboard/user/de.json").then((m) => m.default),
      import("./dashboard/user/purchases/de.json").then((m) => m.default),
    ]).then(([base, purchases]) => ({ ...base, ...purchases }) as DictMap["dashboard"]),
  },
  admin: {
    es: () => Promise.all([
      import("./dashboard/admin/es.json").then((m) => m.default),
      import("./dashboard/admin/plans/es.json").then((m) => m.default),
    ]).then(([base, plans]) => ({ ...base, ...plans }) as DictMap["admin"]),
    en: () => Promise.all([
      import("./dashboard/admin/en.json").then((m) => m.default),
      import("./dashboard/admin/plans/en.json").then((m) => m.default),
    ]).then(([base, plans]) => ({ ...base, ...plans }) as DictMap["admin"]),
    fr: () => Promise.all([
      import("./dashboard/admin/fr.json").then((m) => m.default),
      import("./dashboard/admin/plans/fr.json").then((m) => m.default),
    ]).then(([base, plans]) => ({ ...base, ...plans }) as DictMap["admin"]),
    de: () => Promise.all([
      import("./dashboard/admin/de.json").then((m) => m.default),
      import("./dashboard/admin/plans/de.json").then((m) => m.default),
    ]).then(([base, plans]) => ({ ...base, ...plans }) as DictMap["admin"]),
  },
  pilars: {
    es: () => import("./pilars/es.json").then((m) => m.default as DictMap["pilars"]),
    en: () => import("./pilars/en.json").then((m) => m.default as DictMap["pilars"]),
    fr: () => import("./pilars/fr.json").then((m) => m.default as DictMap["pilars"]),
    de: () => import("./pilars/de.json").then((m) => m.default as DictMap["pilars"]),
  },
  partners: {
    es: () => import("./partners/es.json").then((m) => m.default as DictMap["partners"]),
    en: () => import("./partners/en.json").then((m) => m.default as DictMap["partners"]),
    fr: () => import("./partners/fr.json").then((m) => m.default as DictMap["partners"]),
    de: () => import("./partners/de.json").then((m) => m.default as DictMap["partners"]),
  },
  services: {
    es: () => import("./services/es.json").then((m) => m.default as DictMap["services"]),
    en: () => import("./services/en.json").then((m) => m.default as DictMap["services"]),
    fr: () => import("./services/fr.json").then((m) => m.default as DictMap["services"]),
    de: () => import("./services/de.json").then((m) => m.default as DictMap["services"]),
  },
  checkout: {
    es: () => import("./checkout/es.json").then((m) => m.default as DictMap["checkout"]),
    en: () => import("./checkout/en.json").then((m) => m.default as DictMap["checkout"]),
    fr: () => import("./checkout/fr.json").then((m) => m.default as DictMap["checkout"]),
    de: () => import("./checkout/de.json").then((m) => m.default as DictMap["checkout"]),
  },
  checkoutResult: {
    es: () => import("./checkout-result/es.json").then((m) => m.default as DictMap["checkoutResult"]),
    en: () => import("./checkout-result/en.json").then((m) => m.default as DictMap["checkoutResult"]),
    fr: () => import("./checkout-result/fr.json").then((m) => m.default as DictMap["checkoutResult"]),
    de: () => import("./checkout-result/de.json").then((m) => m.default as DictMap["checkoutResult"]),
  },
  register: {
    es: () => import("./register/es.json").then((m) => m.default as DictMap["register"]),
    en: () => import("./register/en.json").then((m) => m.default as DictMap["register"]),
    fr: () => import("./register/fr.json").then((m) => m.default as DictMap["register"]),
    de: () => import("./register/de.json").then((m) => m.default as DictMap["register"]),
  },
  diagnosis: {
    es: () => import("./diagnosis/es.json").then((m) => m.default as DictMap["diagnosis"]),
    en: () => import("./diagnosis/en.json").then((m) => m.default as DictMap["diagnosis"]),
    fr: () => import("./diagnosis/fr.json").then((m) => m.default as DictMap["diagnosis"]),
    de: () => import("./diagnosis/de.json").then((m) => m.default as DictMap["diagnosis"]),
  },
};

export async function getDictionary<S extends DictSection>(
  locale: Locale,
  section: S
): Promise<DictMap[S]> {
  return loaders[section][locale]();
}
