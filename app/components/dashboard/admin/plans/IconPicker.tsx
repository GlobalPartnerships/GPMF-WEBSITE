"use client";

import type { CloudinaryImage } from "./svg-upload/types";
import { InlineSvg } from "./svg-upload/InlineSvg";

interface IconPickerProps {
  assets: CloudinaryImage[];
  isLoading: boolean;
  selectedUrl: string | null;
  searchValue: string;
  label: string;
  searchPlaceholder: string;
  uploadLabel: string;
  deleteLabel: string;
  onSelect: (url: string) => void;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}

export function IconPicker({
  assets,
  isLoading,
  selectedUrl,
  searchValue,
  label,
  searchPlaceholder,
  uploadLabel,
  deleteLabel,
  onSelect,
  onSearchChange,
  onClear,
}: IconPickerProps) {
  const filtered = assets.filter((asset) => {
    const name = asset.publicId.split("/").pop() ?? asset.publicId;
    return name.toLowerCase().includes(searchValue.toLowerCase());
  });

  return (
    <div className="space-y-3">
      <label className="text-[10px] font-semibold uppercase tracking-[0.12em] text-surface-variant">
        {label}
      </label>
      <div className="relative">
        <svg
          className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          className="w-full pl-9 pr-4 py-2 border border-outline/15 rounded-sm text-sm focus:outline-none focus:border-burgundy/40 transition-colors"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="border border-outline/10 rounded-sm p-3 bg-warmgray">
        <div className="grid grid-cols-5 gap-3 max-h-48 overflow-y-auto hide-scrollbar">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-full h-12 rounded-full bg-outline/10 animate-pulse" />
            ))
          ) : filtered.length === 0 ? (
            <p className="col-span-5 text-center text-xs text-surface-variant/50 py-4">
              No icons found
            </p>
          ) : (
            filtered.map((asset) => (
              <button
                key={asset.id}
                type="button"
                title={asset.publicId.split("/").pop()}
                onClick={() => onSelect(asset.url)}
                className={`w-full h-12 rounded-full border flex items-center justify-center transition-colors ${
                  selectedUrl === asset.url
                    ? "border-2 border-burgundy text-burgundy bg-white"
                    : "border-outline/20 text-surface-variant/50 bg-white hover:border-burgundy/40 hover:text-burgundy"
                }`}
              >
                <InlineSvg url={asset.url} className="w-6 h-6" />
              </button>
            ))
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="flex-1 py-2 border-2 border-dashed border-outline/20 rounded-sm text-[10px] font-medium text-surface-variant hover:border-burgundy/40 hover:text-burgundy transition-colors uppercase tracking-wider"
        >
          {uploadLabel}
        </button>
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2 border border-outline/15 rounded-sm text-[10px] font-medium text-surface-variant/60 hover:text-red-500 hover:border-red-200 transition-colors uppercase tracking-wider"
        >
          {deleteLabel}
        </button>
      </div>
    </div>
  );
}
