"use client";

import { useState } from "react";

// ── helpers ──────────────────────────────────────────────────────────────────

function gcd(a: number, b: number): number {
  if (a > b) [a, b] = [b, a];
  while (a % b > 0) {
    const temp = a % b;
    a = b;
    b = temp;
  }
  return b;
}

function generate(area: number): [number, number, number][] {
  if (area % 6 !== 0 || area < 6) return [];

  const resultSet = new Set<string>();
  const x = Math.pow((area * area) / 3, 1 / 4);

  for (let i = 1; i <= x; i++) {
    const y = Math.pow((area * area) / 2 / i, 1 / 3);
    for (let j = i; j <= y; j++) {
      let z = Math.sqrt((i + j) * (i + j) + (4 * area * area) / i / j);
      if (z !== Math.floor(z)) continue;
      z = (-i - j + z) / 2;
      if (z !== Math.floor(z)) continue;
      const triple: [number, number, number] = [i + j, i + z, j + z].sort(
        (a, b) => a - b,
      ) as [number, number, number];
      resultSet.add(JSON.stringify(triple));
    }
  }

  return [...resultSet]
    .map((s) => JSON.parse(s) as [number, number, number])
    .sort((a, b) =>
      a[0] !== b[0] ? a[0] - b[0] : a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2],
    );
}

function triangleKind(
  t: [number, number, number],
): "right" | "obtuse" | "acute" {
  const rightIndex = t[0] * t[0] + t[1] * t[1] - t[2] * t[2];
  if (rightIndex === 0) return "right";
  if (rightIndex < 0) return "obtuse";
  return "acute";
}

type RightTriangle = [number, number, number]; // [height, leg, hypotenuse]

interface AltitudeDecomposition {
  base: number;
  first: RightTriangle;
  second: RightTriangle;
}

function analyze(
  t: [number, number, number],
  area: number,
): AltitudeDecomposition | undefined {
  // Only works on non-right, non-isosceles triangles
  if (t[0] * t[0] + t[1] * t[1] - t[2] * t[2] === 0) return;
  if (t[0] === t[1] || t[1] === t[2]) return;

  let height = 0,
    base = 0,
    first = 0,
    second = 0;

  if ((2 * area) % t[0] === 0) {
    base = t[0];
    height = (2 * area) / t[0];
    first = t[1];
    second = t[2];
  } else if ((2 * area) % t[1] === 0) {
    base = t[1];
    height = (2 * area) / t[1];
    first = t[0];
    second = t[2];
  } else if ((2 * area) % t[2] === 0) {
    base = t[2];
    height = (2 * area) / t[2];
    first = t[0];
    second = t[1];
  } else return;

  const leg1 = Math.sqrt(first * first - height * height);
  const leg2 = Math.sqrt(second * second - height * height);

  // Only show if sub-triangles have integer legs
  if (leg1 !== Math.floor(leg1) || leg2 !== Math.floor(leg2)) return;

  return {
    base,
    first: [height, leg1, first],
    second: [height, leg2, second],
  };
}

function fmt(n: number) {
  return Number.isInteger(n) ? n.toString() : n.toFixed(3);
}

// ── component ─────────────────────────────────────────────────────────────────

export default function HeronianTriangles() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    area: number;
    triangles: [number, number, number][];
  } | null>(null);
  const [shake, setShake] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  function handleSubmit() {
    const area = Number(input);
    if (!area || area % 6 !== 0 || area < 6) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setResult({ area, triangles: generate(area) });
    setExpanded(null);
    setInput("");
  }

  function toggleRow(i: number) {
    setExpanded((prev) => (prev === i ? null : i));
  }

  const primitiveCount =
    result?.triangles.filter((t) => gcd(t[0], gcd(t[1], t[2])) === 1).length ??
    0;
  const scaledCount = (result?.triangles.length ?? 0) - primitiveCount;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Header */}
      <header className="border-b border-zinc-800 px-4 sm:px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            HERONIAN △
          </h1>
          <p className="text-zinc-500 text-xs mt-0.5 tracking-widest uppercase">
            Integer-sided · Integer-area triangles
          </p>
        </div>
        <div className="text-zinc-700 text-xs text-right hidden sm:block">
          <div>A = √(s(s−a)(s−b)(s−c))</div>
          <div className="mt-1 text-zinc-600">Heron's formula</div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Input card */}
        <div className="border border-zinc-800 bg-zinc-900 p-4 sm:p-6 mb-8">
          <label className="block text-xs text-zinc-500 tracking-widest uppercase mb-3">
            Target Area
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              inputMode="numeric"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="e.g. 84"
              className={`
                w-full bg-zinc-950 border text-white text-lg px-4 py-3
                placeholder-zinc-700 outline-none focus:border-amber-400
                transition-colors
                ${shake ? "border-red-500 animate-pulse" : "border-zinc-700"}
              `}
            />
            <button
              onClick={handleSubmit}
              className="w-full sm:w-auto px-8 py-3 bg-amber-400 text-zinc-950 font-bold text-sm
                         tracking-widest uppercase hover:bg-amber-300 transition-colors
                         active:scale-95 whitespace-nowrap"
            >
              Solve
            </button>
          </div>

          <p className="mt-3 text-zinc-600 text-xs">
            Area must be a positive multiple of 6 (e.g. 6, 12, 24, 36, 60, 84 …)
          </p>
        </div>

        {/* Results */}
        {result && (
          <div>
            {/* Summary bar */}
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-6 gap-4 mb-6 pb-4 border-b border-zinc-800">
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">
                  Area
                </div>
                <div className="text-3xl font-bold text-amber-400">
                  {result.area}
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">
                  Total
                </div>
                <div className="text-3xl font-bold">
                  {result.triangles.length}
                </div>
              </div>
              <div>
                <div className="text-xs text-emerald-500 uppercase tracking-widest">
                  Primitive
                </div>
                <div className="text-2xl font-bold text-emerald-400">
                  {primitiveCount}
                </div>
              </div>
              <div>
                <div className="text-xs text-pink-500 uppercase tracking-widest">
                  Scaled
                </div>
                <div className="text-2xl font-bold text-pink-400">
                  {scaledCount}
                </div>
              </div>
            </div>

            {result.triangles.length === 0 ? (
              <div className="text-center text-zinc-600 py-12 text-sm">
                No Heronian triangles found for this area.
              </div>
            ) : (
              <>
                {/* Legend */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-4 text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 inline-block flex-shrink-0" />
                    Primitive (gcd = 1)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-pink-500 inline-block flex-shrink-0" />
                    Scaled (gcd &gt; 1)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="underline underline-offset-2 decoration-zinc-500">
                      underline
                    </span>
                    = obtuse
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-zinc-300">∎</span>= right angle
                  </span>
                </div>

                {/* Table */}
                <div className="border border-zinc-800 overflow-hidden">
                  {/* Header */}
                  <div
                    className="grid grid-cols-12 text-xs text-zinc-500 uppercase tracking-widest
                                  bg-zinc-900 px-3 sm:px-4 py-2 border-b border-zinc-800"
                  >
                    <span className="col-span-1">#</span>
                    <span className="col-span-7">Sides (a, b, c)</span>
                    <span className="col-span-4 text-right">Type</span>
                  </div>

                  {result.triangles.map((t, i) => {
                    const kind = triangleKind(t);
                    const gcdT = gcd(t[0], gcd(t[1], t[2]));
                    const isPrimitive = gcdT === 1;
                    const isExpanded = expanded === i;
                    const decomp = analyze(t, result.area);
                    const canExpand = decomp !== undefined;

                    return (
                      <div
                        key={i}
                        className="border-b border-zinc-800 last:border-b-0"
                      >
                        {/* Main row */}
                        <div
                          onClick={() => canExpand && toggleRow(i)}
                          className={`
                            grid grid-cols-12 items-center px-3 sm:px-4 py-3 transition-colors
                            ${canExpand ? "cursor-pointer hover:bg-zinc-800" : "hover:bg-zinc-900"}
                            ${isExpanded ? "bg-zinc-800" : ""}
                          `}
                        >
                          {/* index */}
                          <span className="col-span-1 text-zinc-600 tabular-nums text-xs sm:text-sm">
                            {i + 1}
                          </span>

                          {/* sides */}
                          <span
                            className={`
                              col-span-7 font-bold tabular-nums text-sm sm:text-base
                              ${isPrimitive ? "text-emerald-400" : "text-pink-400"}
                              ${kind === "obtuse" ? "underline underline-offset-4 decoration-1" : ""}
                            `}
                          >
                            {t[0]}, {t[1]}, {t[2]}
                            {kind === "right" && (
                              <span className="ml-1 text-zinc-300">∎</span>
                            )}
                          </span>

                          {/* type + chevron */}
                          <div className="col-span-4 flex items-center justify-end gap-1.5">
                            <span className="text-zinc-600 text-xs hidden sm:inline">
                              {isPrimitive ? "prim" : `÷${gcdT}`}
                            </span>
                            <span
                              className={`
                                text-xs px-1.5 py-0.5 border
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
                        </div>

                        {/* Expanded panel: two sub-triangle lines */}
                        {isExpanded &&
                          decomp &&
                          (() => {
                            const g1 = gcd(
                              decomp.first[0],
                              gcd(decomp.first[1], decomp.first[2]),
                            );
                            const g2 = gcd(
                              decomp.second[0],
                              gcd(decomp.second[1], decomp.second[2]),
                            );
                            return (
                              <div className="bg-zinc-900 border-t border-zinc-700 pl-8 sm:pl-10 pr-4 py-2 font-bold tabular-nums text-sm">
                                {/* amber = shared height · zinc = unique leg · blue = hypotenuse */}
                                <p className="py-0.5 flex items-baseline gap-2">
                                  <span>
                                    <span className="text-amber-400">
                                      {fmt(decomp.first[0])}
                                    </span>
                                    <span className="text-zinc-500">, </span>
                                    <span className="text-zinc-300">
                                      {fmt(decomp.first[1])}
                                    </span>
                                    <span className="text-zinc-500">, </span>
                                    <span className="text-sky-400">
                                      {fmt(decomp.first[2])}
                                    </span>
                                  </span>
                                  {g1 > 1 && (
                                    <span className="text-xs font-normal text-zinc-500">
                                      = {fmt(decomp.first[0] / g1)}{" "}
                                      {fmt(decomp.first[1] / g1)}{" "}
                                      {fmt(decomp.first[2] / g1)} × {g1}
                                    </span>
                                  )}
                                </p>
                                <p className="py-0.5 flex items-baseline gap-2">
                                  <span>
                                    <span className="text-amber-400">
                                      {fmt(decomp.second[0])}
                                    </span>
                                    <span className="text-zinc-500">, </span>
                                    <span className="text-zinc-300">
                                      {fmt(decomp.second[1])}
                                    </span>
                                    <span className="text-zinc-500">, </span>
                                    <span className="text-sky-400">
                                      {fmt(decomp.second[2])}
                                    </span>
                                  </span>
                                  {g2 > 1 && (
                                    <span className="text-xs font-normal text-zinc-500">
                                      = {fmt(decomp.second[0] / g2)}{" "}
                                      {fmt(decomp.second[1] / g2)}{" "}
                                      {fmt(decomp.second[2] / g2)} × {g2}
                                    </span>
                                  )}
                                </p>
                              </div>
                            );
                          })()}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 sm:px-8 py-4 text-zinc-700 text-xs text-center">
        Integer-sided triangles with integer area · Based on Heron's formula
      </footer>
    </div>
  );
}
