export interface DiagnosisDict {
  meta: { title: string; description: string };
  hero: {
    title: string;
    titleHighlight: string;
    titleEn: string;
    titleEnHighlight: string;
    description: string;
    descriptionEn: string;
  };
  form: {
    questions: {
      challenge: {
        label: string;
        labelEn: string;
        options: Array<{ value: string; label: string; labelEn: string }>;
      };
      stage: {
        label: string;
        labelEn: string;
        placeholder: string;
        options: Array<{ value: string; label: string }>;
      };
      pain: {
        label: string;
        labelEn: string;
        placeholder: string;
      };
      urgency: {
        label: string;
        labelEn: string;
        options: Array<{ value: string; label: string; labelEn: string }>;
      };
      budget: {
        label: string;
        labelEn: string;
        note: string;
        noteEn: string;
        placeholder: string;
        options: Array<{ value: string; label: string }>;
      };
    };
    contact: {
      title: string;
      titleEn: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      companyPlaceholder: string;
    };
    submit: {
      label: string;
      labelEn: string;
      sending: string;
    };
    disclaimer: {
      text: string;
      textEn: string;
    };
    errorMessage: string;
  };
  success: {
    title: string;
    titleEn: string;
    body: string;
    bodyEn: string;
    backLink: string;
  };
  cta: {
    title: string;
    titleEn: string;
    body: string;
    bodyEn: string;
  };
}
