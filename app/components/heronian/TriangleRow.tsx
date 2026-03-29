"use client";

import {
  HeronianTriple,
  triangleKind,
  analyzeHeronian,
} from "../../lib/heronian";
import { gcd } from "../../lib/math";
import { AltitudePanel } from "./AltitudePanel";
import { ShowButton } from "../layout/ShowButton";

interface TriangleRowProps {
  triple: HeronianTriple;
  index: number;
  area: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function TriangleRow({
  triple,
  index,
  area,
  isExpanded,
  onToggle,
}: TriangleRowProps) {
  const kind = triangleKind(triple);
  const gcdT = gcd(triple[0], gcd(triple[1], triple[2]));
  const isPrimitive = gcdT === 1;
  const decomp = analyzeHeronian(triple, area);
  const canExpand = decomp !== undefined;

  return (
    <div className="border-b border-zinc-800 last:border-b-0">
      <div
        onClick={() => canExpand && onToggle()}
        className={`
          grid grid-cols-12 items-center px-3 sm:px-4 py-3 transition-colors
          ${canExpand ? "cursor-pointer hover:bg-zinc-800" : "hover:bg-zinc-900"}
          ${isExpanded ? "bg-zinc-800" : ""}
        `}
      >
        <span className="col-span-1 text-zinc-600 tabular-nums text-xs sm:text-sm font-mono">
          {index + 1}
        </span>
        <span
          className={`
          col-span-6 font-bold tabular-nums text-sm sm:text-base font-mono
          ${isPrimitive ? "text-emerald-400" : "text-pink-400"}
          ${kind === "obtuse" ? "underline underline-offset-4 decoration-1" : ""}
        `}
        >
          {triple[0]}, {triple[1]}, {triple[2]}
          {kind === "right" && <span className="ml-1 text-zinc-300">∎</span>}
        </span>
        <div className="col-span-3 flex items-center justify-end gap-1.5">
          <span className="text-zinc-600 text-xs hidden sm:inline font-mono">
            {isPrimitive ? "prim" : `÷${gcdT}`}
          </span>
          <span
            className={`
            text-xs px-1.5 py-0.5 border font-mono
            ${
              kind === "right"
                ? "border-zinc-500 text-zinc-400"
                : kind === "obtuse"
                  ? "border-orange-800 text-orange-500"
                  : "border-blue-900 text-blue-400"
            }
          `}
          >
            {kind}
          </span>
          {canExpand && (
            <span className="text-zinc-600 text-xs select-none w-3 text-center">
              {isExpanded ? "▲" : "▼"}
            </span>
          )}
        </div>
        <div
          className="col-span-2 flex justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <ShowButton sides={triple} label="Heronian" />
        </div>
      </div>

      {isExpanded && decomp && <AltitudePanel decomp={decomp} />}
    </div>
  );
}
