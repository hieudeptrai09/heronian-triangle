"use client";

import { AltitudeTriple } from "../../lib/altitude";
import { ShowButton } from "../layout/ShowButton";

export interface TriangleEntry {
  value: AltitudeTriple;
  gcd: number;
  area: number;
}

interface TriangleListProps {
  entries: TriangleEntry[];
  showPrimitiveHint?: boolean;
  showObtuse?: boolean;
}

export function TriangleList({
  entries,
  showPrimitiveHint = false,
  showObtuse = false,
}: TriangleListProps) {
  if (entries.length === 0) {
    return <p className="text-zinc-600 text-xs font-mono py-2">None found.</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      {entries.map((entry, idx) => {
        const isPrimitive = entry.gcd === 1;
        const [a, b, c] = entry.value;
        const isObtuse = showObtuse && a * a + b * b < c * c;

        return (
          <div
            key={idx}
            className={`
              flex items-center gap-3 font-mono text-sm py-1 px-2 rounded
              ${isPrimitive ? "text-emerald-400" : "text-pink-400"}
            `}
          >
            <span
              className={`flex-1 ${isObtuse ? "underline underline-offset-4 decoration-1" : ""}`}
            >
              {a}, {b}, {c}
            </span>
            <span className="text-xs text-zinc-500">:{entry.area}</span>

            {!isPrimitive && showPrimitiveHint && (
              <span className="text-xs text-sky-400">
                → {a / entry.gcd}, {b / entry.gcd}, {c / entry.gcd}
                <span className="text-zinc-500 ml-1">
                  :{entry.area / (entry.gcd * entry.gcd)}
                </span>
              </span>
            )}

            <ShowButton sides={entry.value} label="Altitude" />
          </div>
        );
      })}
    </div>
  );
}
