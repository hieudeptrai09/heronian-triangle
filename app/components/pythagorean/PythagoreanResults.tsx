"use client";

import { Triple } from "../../lib/pythagorean";
import { TripleCard } from "./TripleCard";
import { gcd } from "../../lib/math";

interface PythagoreanResultsProps {
  triples: Triple[];
}

export function PythagoreanResults({ triples }: PythagoreanResultsProps) {
  const primitiveCount = triples.filter((t) => gcd(t[0], gcd(t[1], t[2])) === 1).length;
  const scaledCount = triples.length - primitiveCount;

  if (triples.length === 0) {
    return (
      <div className="text-center text-zinc-600 py-12 text-sm font-mono">
        No Pythagorean triples found for this hypotenuse.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-6 gap-4 mb-6 pb-4 border-b border-zinc-800">
        <div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Total</div>
          <div className="text-3xl font-bold text-sky-400">{triples.length}</div>
        </div>
        <div>
          <div className="text-xs text-emerald-500 uppercase tracking-widest font-mono">Primitive</div>
          <div className="text-2xl font-bold text-emerald-400">{primitiveCount}</div>
        </div>
        <div>
          <div className="text-xs text-pink-500 uppercase tracking-widest font-mono">Scaled</div>
          <div className="text-2xl font-bold text-pink-400">{scaledCount}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-4 text-zinc-500 font-mono">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-emerald-500 inline-block flex-shrink-0" />
          Primitive (gcd = 1)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-pink-500 inline-block flex-shrink-0" />
          Scaled (gcd &gt; 1)
        </span>
      </div>

      <div className="border border-zinc-800 overflow-hidden rounded-lg">
        <div className="grid grid-cols-12 text-xs text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 sm:px-4 py-2 border-b border-zinc-800 font-mono">
          <span className="col-span-1">#</span>
          <span className="col-span-7">Sides (a, b, c)</span>
          <span className="col-span-2 text-right hidden sm:block">Area</span>
          <span className="col-span-4 sm:col-span-2" />
        </div>
        {triples.map((triple, idx) => (
          <TripleCard key={idx} triple={triple} index={idx} />
        ))}
      </div>

      <p className="mt-6 text-xs text-zinc-600 font-mono">
        All triples satisfy a² + b² = c².
      </p>
    </div>
  );
}
