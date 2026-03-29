"use client";

import { useState } from "react";
import { HeronianTriple } from "../../lib/heronian";
import { HeronianLegend } from "./HeronianLegend";
import { TriangleRow } from "./TriangleRow";

interface HeronianTableProps {
  triangles: HeronianTriple[];
  area: number;
}

export function HeronianTable({ triangles, area }: HeronianTableProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  function toggleRow(i: number) {
    setExpanded((prev) => (prev === i ? null : i));
  }

  if (triangles.length === 0) {
    return (
      <div className="text-center text-zinc-600 py-12 text-sm font-mono">
        No Heronian triangles found for this area.
      </div>
    );
  }

  return (
    <>
      <HeronianLegend />
      <div className="border border-zinc-800 overflow-hidden rounded-lg">
        <div className="grid grid-cols-12 text-xs text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 sm:px-4 py-2 border-b border-zinc-800 font-mono">
          <span className="col-span-1">#</span>
          <span className="col-span-6">Sides (a, b, c)</span>
          <span className="col-span-3 text-right">Type</span>
          <span className="col-span-2" />
        </div>
        {triangles.map((t, i) => (
          <TriangleRow
            key={i}
            triple={t}
            index={i}
            area={area}
            isExpanded={expanded === i}
            onToggle={() => toggleRow(i)}
          />
        ))}
      </div>
    </>
  );
}
