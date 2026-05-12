export interface PilarsDict {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  separator: string;
  principles: {
    number: string;
    label: string;
    title: string;
    titleLine2: string;
    description: string;
    deliverables: string[];
    ctaLabel: string;
  }[];
  cta: {
    eyebrow: string;
    headline: string;
    description: string;
    displayText: string;
    globalReachTitle: string;
    globalReachDescription: string;
    artfulDetailTitle: string;
    artfulDetailDescription: string;
  };
  meta: { title: string; description: string };
}
