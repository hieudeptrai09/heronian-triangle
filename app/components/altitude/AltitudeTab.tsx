"use client";

import { useState } from "react";
import {
  generateHypotenuses,
  generateRightTriangles,
  generateIsoscelesTriangles,
  generateScaleneTriangles,
  RightTriangle,
} from "../../lib/altitude";
import { AltitudeInput } from "./AltitudeInput";
import { AltitudeLegend } from "./AltitudeLegend";
import { AltitudeSection } from "./AltitudeSection";
import { TriangleList } from "./TriangleList";

interface AltitudeResult {
  altitude: number;
  right: RightTriangle[];
}

export function AltitudeTab() {
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [result, setResult] = useState<AltitudeResult | null>(null);
  const [showScalene, setShowScalene] = useState(false);

  function handleSubmit() {
    const altitude = Number(input);
    if (!altitude || !Number.isInteger(altitude) || altitude < 1) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    const hyps = generateHypotenuses(altitude);
    const right = generateRightTriangles(altitude, hyps);
    setResult({ altitude, right });
    setShowScalene(false);
    setInput("");
  }

  const isosceles = result ? generateIsoscelesTriangles(result.right) : [];
  const scalene =
    showScalene && result ? generateScaleneTriangles(result.right) : [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-2 font-mono">
          Number Theory Tool
        </p>
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Altitude-Based Triangle Generator
        </h2>
        <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
          Enter an integer altitude. Generates all Heronian right, isosceles,
          and scalene triangles that share that altitude, via integer
          decomposition of the leg.
        </p>
      </div>

      <AltitudeInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        shake={shake}
      />

      {result && (
        <div>
          <div className="mb-6 pb-4 border-b border-zinc-800 flex items-baseline gap-2">
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
              Altitude
            </span>
            <span className="text-3xl font-bold text-violet-400">
              {result.altitude}
            </span>
          </div>

          <AltitudeLegend />

          <AltitudeSection title="Right triangles" count={result.right.length}>
            <TriangleList entries={result.right} />
          </AltitudeSection>

          <AltitudeSection title="Isosceles triangles" count={isosceles.length}>
            <TriangleList entries={isosceles} />
          </AltitudeSection>

          {!showScalene ? (
            <button
              onClick={() => setShowScalene(true)}
              className="w-full py-3 border border-zinc-700 rounded-lg text-sm font-mono text-zinc-400
                         hover:bg-zinc-800 hover:text-zinc-200 transition-colors tracking-wide"
            >
              Generate scalene triangles ▼
            </button>
          ) : (
            <AltitudeSection
              title="Scalene triangles"
              count={scalene.length}
              defaultOpen={true}
            >
              <TriangleList entries={scalene} showPrimitiveHint showObtuse />
            </AltitudeSection>
          )}
        </div>
      )}
    </div>
  );
}
