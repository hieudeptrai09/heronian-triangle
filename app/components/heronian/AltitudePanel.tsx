"use client";

import { AltitudeDecomposition } from "../../lib/heronian";
import { gcd, fmt } from "../../lib/math";

interface AltitudePanelProps {
  decomp: AltitudeDecomposition;
}

export function AltitudePanel({ decomp }: AltitudePanelProps) {
  const g1 = gcd(decomp.first[0], gcd(decomp.first[1], decomp.first[2]));
  const g2 = gcd(decomp.second[0], gcd(decomp.second[1], decomp.second[2]));

  return (
    <div className="bg-zinc-900 border-t border-zinc-700 pl-8 sm:pl-10 pr-4 py-2 font-bold tabular-nums text-sm font-mono">
      <p className="py-0.5 flex items-baseline gap-2">
        <span>
          <span className="text-amber-400">{fmt(decomp.first[0])}</span>
          <span className="text-zinc-500">, </span>
          <span className="text-zinc-300">{fmt(decomp.first[1])}</span>
          <span className="text-zinc-500">, </span>
          <span className="text-sky-400">{fmt(decomp.first[2])}</span>
        </span>
        {g1 > 1 && (
          <span className="text-xs font-normal text-zinc-500">
            = {fmt(decomp.first[0] / g1)} {fmt(decomp.first[1] / g1)}{" "}
            {fmt(decomp.first[2] / g1)} × {g1}
          </span>
        )}
      </p>
      <p className="py-0.5 flex items-baseline gap-2">
        <span>
          <span className="text-amber-400">{fmt(decomp.second[0])}</span>
          <span className="text-zinc-500">, </span>
          <span className="text-zinc-300">{fmt(decomp.second[1])}</span>
          <span className="text-zinc-500">, </span>
          <span className="text-sky-400">{fmt(decomp.second[2])}</span>
        </span>
        {g2 > 1 && (
          <span className="text-xs font-normal text-zinc-500">
            = {fmt(decomp.second[0] / g2)} {fmt(decomp.second[1] / g2)}{" "}
            {fmt(decomp.second[2] / g2)} × {g2}
          </span>
        )}
      </p>
    </div>
  );
}
