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
      className="relative w-[240px] h-[240px] shrink-0 rounded-full border border-outline/20 p-4 flex items-center justify-center transition-all duration-200 hover:border-burgundy/40 hover:text-burgundy text-surface-variant/50 group bg-white"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <InlineSvg url={image.url} className="w-10 h-10" />

      {hovering && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(image.id);
          }}
          title={deleteLabel}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-burgundy text-white flex items-center justify-center text-[16px] font-bold leading-none shadow-md hover:bg-burgundy-dark transition-colors z-50"
        >
          ×
        </button>
      )}
    </div>
  );
}
