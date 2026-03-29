"use client";

import { useTriangle } from "../../lib/TriangleContext";
import { TriangleCanvas } from "./TriangleCanvas";
import { TriangleInfo } from "./TriangleInfo";

export function DisplayTab() {
  const { selected } = useTriangle();

  if (!selected) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-24 gap-4">
        <svg
          viewBox="0 0 80 70"
          className="w-20 opacity-20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="40,4 76,66 4,66"
            fill="none"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        <p className="text-zinc-600 font-mono text-sm text-center">
          No triangle selected.
          <br />
          Press <span className="text-zinc-400">show</span> on any result to
          display it here.
        </p>
      </div>
    );
  }

  const { sides } = selected;

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <TriangleInfo sides={sides} />
      <div className="border border-zinc-800 rounded-lg bg-zinc-950">
        <TriangleCanvas sides={sides} />
      </div>
    </div>
  );
}
