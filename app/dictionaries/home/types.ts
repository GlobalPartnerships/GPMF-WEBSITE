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