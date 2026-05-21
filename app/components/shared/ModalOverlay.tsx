"use client";

import { useEffect, useRef } from "react";

interface ModalOverlayProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalOverlay({ onClose, children }: ModalOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl whisper-shadow border border-outline/10 p-8 m-4 relative">
        {children}
      </div>
    </div>
  );
}
