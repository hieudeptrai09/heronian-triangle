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

interface Triangle {
  value: [number, number, number];
  gcd: number;
  rightIndex: number;
}

function generate(area: number): Triangle[] {
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
        (a, b) => a - b
      ) as [number, number, number];
      resultSet.add(JSON.stringify(triple));
    }
  }

  return [...resultSet]
    .map((s) => {
      const value = JSON.parse(s) as [number, number, number];
      const g = gcd(value[0], gcd(value[1], value[2]));
      const rightIndex =
        value[0] ** 2 + value[1] ** 2 - value[2] ** 2;
      return { value, gcd: g, rightIndex };
    })
    .sort((a, b) =>
      a.value[0] !== b.value[0]
        ? a.value[0] - b.value[0]
        : a.value[1] !== b.value[1]
        ? a.value[1] - b.value[1]
        : a.value[2] - b.value[2]
    );
}

function triangleKind(t: Triangle): "right" | "obtuse" | "acute" {
  if (t.rightIndex === 0) return "right";
  if (t.rightIndex < 0) return "obtuse";
  return "acute";
}

// ── component ─────────────────────────────────────────────────────────────────

export default function HeronianTriangles() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    area: number;
    triangles: Triangle[];
  } | null>(null);
  const [shake, setShake] = useState(false);

  function handleSubmit() {
    const area = Number(input);
    if (!area || area % 6 !== 0 || area < 6) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setResult({ area, triangles: generate(area) });
    setInput("");
  }

  const primitiveCount = result?.triangles.filter((t) => t.gcd === 1).length ?? 0;
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

          {/* Stack vertically on mobile, side-by-side on sm+ */}
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
            {/* Summary bar — 2×2 grid on mobile, single row on sm+ */}
            <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-6 gap-4 mb-6 pb-4 border-b border-zinc-800">
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">Area</div>
                <div className="text-3xl font-bold text-amber-400">{result.area}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-widest">Total</div>
                <div className="text-3xl font-bold">{result.triangles.length}</div>
              </div>
              <div>
                <div className="text-xs text-emerald-500 uppercase tracking-widest">Primitive</div>
                <div className="text-2xl font-bold text-emerald-400">{primitiveCount}</div>
              </div>
              <div>
                <div className="text-xs text-pink-500 uppercase tracking-widest">Scaled</div>
                <div className="text-2xl font-bold text-pink-400">{scaledCount}</div>
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
                    <span className="underline underline-offset-2 decoration-zinc-500">underline</span>
                    = obtuse
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-zinc-300">∎</span>
                    = right angle
                  </span>
                </div>

                {/* Table */}
                <div className="border border-zinc-800 overflow-hidden">
                  {/* Header row */}
                  <div className="grid grid-cols-12 text-xs text-zinc-500 uppercase tracking-widest
                                  bg-zinc-900 px-3 sm:px-4 py-2 border-b border-zinc-800">
                    <span className="col-span-1">#</span>
                    <span className="col-span-7">Sides (a, b, c)</span>
                    <span className="col-span-4 text-right">Type</span>
                  </div>

                  {result.triangles.map((t, i) => {
                    const kind = triangleKind(t);
                    const isPrimitive = t.gcd === 1;

                    return (
                      <div
                        key={i}
                        className="grid grid-cols-12 items-center px-3 sm:px-4 py-3
                                   border-b border-zinc-800 last:border-b-0
                                   hover:bg-zinc-800 transition-colors"
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
                          {t.value[0]}, {t.value[1]}, {t.value[2]}
                          {kind === "right" && (
                            <span className="ml-1 text-zinc-300">∎</span>
                          )}
                        </span>

                        {/* type badge + gcd */}
                        <div className="col-span-4 flex items-center justify-end gap-1.5">
                          <span className="text-zinc-600 text-xs hidden sm:inline">
                            {isPrimitive ? "prim" : `÷${t.gcd}`}
                          </span>
                          <span
                            className={`
                              text-xs px-1.5 py-0.5 border
                              ${kind === "right"
                                ? "border-zinc-500 text-zinc-400"
                                : kind === "obtuse"
                                ? "border-orange-800 text-orange-500"
                                : "border-blue-900 text-blue-400"}
                            `}
                          >
                            {kind}
                          </span>
                        </div>
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
