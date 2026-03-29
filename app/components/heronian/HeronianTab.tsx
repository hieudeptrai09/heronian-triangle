"use client";

import { useState } from "react";
import {
  HeronianTriple,
  generateHeronian,
  countPrimitive,
} from "../../lib/heronian";
import { HeronianInput } from "./HeronianInput";
import { HeronianSummary } from "./HeronianSummary";
import { HeronianTable } from "./HeronianTable";

export function HeronianTab() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    area: number;
    triangles: HeronianTriple[];
  } | null>(null);
  const [shake, setShake] = useState(false);

  function handleSubmit() {
    const area = Number(input);
    if (!area || area % 6 !== 0 || area < 6) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setResult({ area, triangles: generateHeronian(area) });
    setInput("");
  }

  const primitiveCount = result ? countPrimitive(result.triangles) : 0;
  const scaledCount = (result?.triangles.length ?? 0) - primitiveCount;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-2 font-mono">
          Number Theory Tool
        </p>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Heronian Triangle Finder
        </h2>
        <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
          Integer-sided triangles with integer area. Enter a target area (must
          be a multiple of 6).
        </p>
      </div>

      <HeronianInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        shake={shake}
      />

      {result && (
        <>
          <HeronianSummary
            area={result.area}
            total={result.triangles.length}
            primitiveCount={primitiveCount}
            scaledCount={scaledCount}
          />
          <HeronianTable triangles={result.triangles} area={result.area} />
        </>
      )}
    </div>
  );
}
