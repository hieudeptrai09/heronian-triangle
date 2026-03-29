"use client";

import { useTriangle, SelectedTriangle } from "../../lib/TriangleContext";

interface ShowButtonProps {
  sides: [number, number, number];
  label: string;
}

export function ShowButton({ sides, label }: ShowButtonProps) {
  const { showTriangle } = useTriangle();

  function handle() {
    showTriangle({ sides, label });
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handle();
      }}
      className="text-xs font-mono px-2 py-0.5 border border-zinc-700 text-zinc-400
                 hover:border-zinc-400 hover:text-white transition-colors rounded"
    >
      show
    </button>
  );
}
