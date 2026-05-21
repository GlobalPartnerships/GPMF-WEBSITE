"use client";

import { useState } from "react";
import { InlineSvg } from "./InlineSvg";
import type { CloudinaryImage } from "./types";

interface SvgGridItemProps {
  image: CloudinaryImage;
  onDelete: (id: string) => void;
  deleteLabel: string;
}

export function SvgGridItem({ image, onDelete, deleteLabel }: SvgGridItemProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="relative w-14 h-14 shrink-0 rounded-full border border-outline/20 p-2.5 flex items-center justify-center transition-all duration-200 hover:border-burgundy/40 hover:text-burgundy text-surface-variant/50 group bg-white"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <InlineSvg url={image.url} className="w-6 h-6" />

      {hovering && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(image.id);
          }}
          title={deleteLabel}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-burgundy text-white flex items-center justify-center text-[11px] font-bold leading-none shadow-md hover:bg-burgundy-dark transition-colors z-50"
        >
          ×
        </button>
      )}
    </div>
  );
}