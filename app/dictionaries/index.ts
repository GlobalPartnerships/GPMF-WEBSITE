import "server-only";

import type { DictMap, DictSection } from "./types";

export type { DictSection, DictMap } from "./types";
export type { LayoutDict } from "./layout/types";
export type { HomeDict } from "./home/types";
export type { PlansDict, PlanCardData } from "./plans/types";
export type { PilarsDict } from "./pilars/types";
export type { PartnersDict } from "./partners/types";
export type { ServicesDict } from "./services/types";
export type { DiagnosisDict } from "./diagnosis/types";

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
  plans: {
    es: () => Promise.all([
      import("./plans/es.json").then((m) => m.default),
      import("./plans/plan-1/es.json").then((m) => m.default),
      import("./plans/plan-2/es.json").then((m) => m.default),
      import("./plans/plan-3/es.json").then((m) => m.default),
    ]).then(([page, p1, p2, p3]) => ({ ...page, plans: [p1, p2, p3] }) as DictMap["plans"]),
    en: () => Promise.all([
      import("./plans/en.json").then((m) => m.default),
      import("./plans/plan-1/en.json").then((m) => m.default),
      import("./plans/plan-2/en.json").then((m) => m.default),
      import("./plans/plan-3/en.json").then((m) => m.default),
    ]).then(([page, p1, p2, p3]) => ({ ...page, plans: [p1, p2, p3] }) as DictMap["plans"]),
    fr: () => Promise.all([
      import("./plans/fr.json").then((m) => m.default),
      import("./plans/plan-1/fr.json").then((m) => m.default),
      import("./plans/plan-2/fr.json").then((m) => m.default),
      import("./plans/plan-3/fr.json").then((m) => m.default),
    ]).then(([page, p1, p2, p3]) => ({ ...page, plans: [p1, p2, p3] }) as DictMap["plans"]),
    de: () => Promise.all([
      import("./plans/de.json").then((m) => m.default),
      import("./plans/plan-1/de.json").then((m) => m.default),
      import("./plans/plan-2/de.json").then((m) => m.default),
      import("./plans/plan-3/de.json").then((m) => m.default),
    ]).then(([page, p1, p2, p3]) => ({ ...page, plans: [p1, p2, p3] }) as DictMap["plans"]),
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
