"use client";

import { useState } from "react";

interface AltitudeSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AltitudeSection({
  title,
  count,
  children,
  defaultOpen = true,
}: AltitudeSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900 hover:bg-zinc-800 transition-colors"
      >
        <span className="font-mono text-sm text-zinc-300 tracking-wide">
          {title}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-500">
            {count} triangle{count !== 1 ? "s" : ""}
          </span>
          <span className="text-zinc-600 text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && <div className="px-4 py-3 bg-zinc-950">{children}</div>}
    </div>
  );
}
