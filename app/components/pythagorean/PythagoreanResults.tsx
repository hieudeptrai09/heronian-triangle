"use client";

import { Triple } from "../../lib/pythagorean";
import { TripleCard } from "./TripleCard";

interface PythagoreanResultsProps {
  triples: Triple[];
}

export function PythagoreanResults({ triples }: PythagoreanResultsProps) {
  return (
    <div>
      {/* Summary bar — matches Heronian/Altitude */}
      <div className="mb-6 pb-4 border-b border-zinc-800 flex items-center gap-6">
        <div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
            Primitive triples
          </div>
          <div className="text-3xl font-bold text-sky-400">
            {triples.length}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-4 text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-emerald-500 inline-block shrink-0" />
          Primitive (gcd = 1)
        </span>
      </div>

      {/* Table — matches Heronian table structure */}
      <div className="border border-zinc-800 overflow-hidden rounded-lg">
        <div className="grid grid-cols-12 text-xs text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 sm:px-4 py-2 border-b border-zinc-800 font-mono">
          <span className="col-span-1">#</span>
          <span className="col-span-8">Sides (a, b, c)</span>
          <span className="col-span-3 text-right hidden sm:block">Area</span>
        </div>
        {triples.map((triple, idx) => (
          <TripleCard key={idx} triple={triple} index={idx} />
        ))}
      </div>

      <p className="mt-6 text-xs text-zinc-600 font-mono">
        All triples satisfy a² + b² = c² with gcd(a, b) = 1.
      </p>
    </div>
  );
}
