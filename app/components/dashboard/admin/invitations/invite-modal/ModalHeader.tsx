interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-surface-variant/50 hover:text-burgundy transition-colors"
        aria-label="Close"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <header>
        <h2 className="font-serif text-xl font-bold text-burgundy uppercase tracking-tight">
          {title}
        </h2>
      </header>
    </>
  );
}
