"use client";

import { useEffect, useState } from "react";

const svgCache = new Map<string, string>();

function normalizeSvg(raw: string): string {
  let svg = raw;
  svg = svg.replace(/fill="(?!none)[^"]*"/g, "");
  svg = svg.replace(/stroke="[^"]*"/g, "");
  svg = svg.replace(/style="[^"]*(?:fill|stroke)[^"]*"/g, "");
  svg = svg.replace(/<svg([^>]*)>/, (_, attrs: string) => {
    const cleaned = attrs
      .replace(/\bwidth="[^"]*"/g, "")
      .replace(/\bheight="[^"]*"/g, "");
    return `<svg${cleaned} width="100%" height="100%" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">`;
  });
  return svg;
}

interface InlineSvgProps {
  url: string;
  className?: string;
}

export function InlineSvg({ url, className = "w-4 h-4" }: InlineSvgProps) {
  const [svgHtml, setSvgHtml] = useState<string | null>(
    svgCache.get(url) ?? null
  );

  useEffect(() => {
    if (svgCache.has(url)) {
      setSvgHtml(svgCache.get(url)!);
      return;
    }

    let cancelled = false;
    fetch(url)
      .then((r) => r.text())
      .then((text) => {
        if (cancelled) return;
        const normalized = normalizeSvg(text);
        svgCache.set(url, normalized);
        setSvgHtml(normalized);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (!svgHtml) {
    return <div className={`${className} animate-pulse bg-outline/10 rounded`} />;
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgHtml }}
    />
  );
}
