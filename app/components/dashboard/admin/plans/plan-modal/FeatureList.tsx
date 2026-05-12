interface FeatureListProps {
  features: string[];
  newFeature: string;
  label: string;
  addLabel: string;
  placeholder: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
  onNewFeatureChange: (value: string) => void;
}

export function FeatureList({
  features,
  newFeature,
  label,
  addLabel,
  placeholder,
  onAdd,
  onRemove,
  onChange,
  onNewFeatureChange,
}: FeatureListProps) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
        {label}
      </label>
      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              className="flex-1 border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
              value={feature}
              onChange={(e) => onChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-surface-variant/40 hover:text-red-500 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input
            className="flex-1 border border-outline/15 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
            placeholder={placeholder}
            value={newFeature}
            onChange={(e) => onNewFeatureChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } }}
          />
          <button
            type="button"
            onClick={onAdd}
            className="px-4 py-2 bg-charcoal text-white text-xs font-medium rounded-sm hover:bg-black transition-colors flex-shrink-0"
          >
            {addLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
