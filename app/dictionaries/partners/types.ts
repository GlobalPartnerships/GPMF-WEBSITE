export interface PartnersDict {
  meta: { title: string; description: string };
  hero: { eyebrow: string; headline: string; headlineKeyword: string; headlineAccent: string; description: string };
  professionals: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { name: string; role: string; description: string; image: string | null }[];
  };
  corporatePartners: {
    eyebrow: string;
    title: string;
    subtitle: string;
    badge: string;
    items: { name: string; description: string }[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    allyBox: {
      title: string;
      description: string;
      emailCta: { label: string; href: string };
      scheduleCta: { label: string; href: string };
    };
  };
}
