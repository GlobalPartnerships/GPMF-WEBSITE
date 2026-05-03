export interface LayoutDict {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    firm: string;
    partners: string;
    services: string;
    schedule: string;
  };
  footer: {
    companyName: string;
    tagline: string;
    cities: string;
    rights: string;
    typeset: string;
    explore: string;
    studio: string;
    legal: string;
    links: {
      home: string;
      principles: string;
      methodology: string;
      work: string;
      team: string;
      manifesto: string;
      press: string;
      careers: string;
      privacy: string;
      terms: string;
      imprint: string;
    };
  };
}

export interface HomeDict {
  hero: {
    eyebrow: string;
    headlinePart1: string;
    headlineAccent: string;
    headlinePart3: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      value: string;
      label: string;
    }[];
    ratingLabel: string;
    verticalCaption: string;
  };
  trustedBy: {
    label: string;
    brands: string[];
  };
  principles: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    items: {
      number: string;
      title: string;
      description: string;
      deliverables: string[];
    }[];
  };
  methodology: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    description: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
    quote: {
      text: string;
      author: string;
    };
  };
  caseStudies: {
    eyebrow: string;
    headline: string;
    cases: {
      number: string;
      category: string;
      title: string;
      description: string;
      cta: string;
    }[];
  };
  team: {
    eyebrow: string;
    headlinePart1: string;
    headlineAccent: string;
    description: string;
    members: {
      name: string;
      role: string;
    }[];
    cta: string;
    studioLocation: string;
  };
  legacy: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    description: string;
    ctaPlaceholder: string;
    ctaButton: string;
    note: string;
    triptych: {
      label: string;
      title: string;
      subtitle: string;
    }[];
  };
}

export type DictSection = "layout" | "home";

export interface DictMap {
  layout: LayoutDict;
  home: HomeDict;
}
