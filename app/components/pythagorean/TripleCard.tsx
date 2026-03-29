"use client";

import { Triple } from "../../lib/pythagorean";
import { ShowButton } from "../layout/ShowButton";

interface TripleCardProps {
  triple: Triple;
  index: number;
}

export function TripleCard({ triple, index }: TripleCardProps) {
  const area = (triple[0] * triple[1]) / 2;

  return (
    <div className="grid grid-cols-12 items-center px-3 sm:px-4 py-3 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-900 transition-colors">
      <span className="col-span-1 text-zinc-600 tabular-nums text-xs sm:text-sm font-mono">
        {index + 1}
      </span>
      <span className="col-span-7 font-bold tabular-nums text-sm sm:text-base font-mono text-emerald-400">
        {triple[0]}, {triple[1]}, {triple[2]}
      </span>
      <div className="col-span-2 text-right font-mono text-xs text-zinc-500 hidden sm:block">
        :{area}
      </div>
      <div className="col-span-4 sm:col-span-2 flex justify-end">
        <ShowButton sides={triple} label="Pythagorean" />
      </div>
    </div>
  );
}
