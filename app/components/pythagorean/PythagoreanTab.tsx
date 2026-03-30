"use client";

import { useState } from "react";
import { Triple, computeTriples } from "../../lib/pythagorean";
import { PythagoreanInput } from "./PythagoreanInput";
import { PythagoreanResults } from "./PythagoreanResults";

export function PythagoreanTab() {
  const [input, setInput] = useState<string>("");
  const [triples, setTriples] = useState<Triple[] | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [shake, setShake] = useState<boolean>(false);

  function triggerShake(): void {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  function handleGenerate(): void {
    const p = parseInt(input, 10);
    if (isNaN(p) || p < 1) {
      triggerShake();
      return;
    }
    const out = computeTriples(input);
    setSubmitted(true);
    setTriples(out.triples ?? []);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-zinc-500 mb-2 font-mono">
          Number Theory Tool
        </p>
        <h2 className="text-3xl font-bold text-white tracking-tight leading-tight">
          Pythagorean Triple Generator
        </h2>
        <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
          Enter a hypotenuse. Generates all Pythagorean triples with that hypotenuse
          via Gaussian integer decomposition of its divisors.
        </p>
      </div>

      <PythagoreanInput value={input} onChange={setInput} onSubmit={handleGenerate} shake={shake} />

      {submitted && triples && <PythagoreanResults triples={triples} />}
    </div>
  );
}
