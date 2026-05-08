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
    es: () => import("./dashboard/es.json").then((m) => m.default as DictMap["dashboard"]),
    en: () => import("./dashboard/en.json").then((m) => m.default as DictMap["dashboard"]),
    fr: () => import("./dashboard/fr.json").then((m) => m.default as DictMap["dashboard"]),
    de: () => import("./dashboard/de.json").then((m) => m.default as DictMap["dashboard"]),
  },
};

export async function getDictionary<S extends DictSection>(
  locale: Locale,
  section: S
): Promise<DictMap[S]> {
  return loaders[section][locale]();
}
