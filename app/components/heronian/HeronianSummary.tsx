"use client";

interface HeronianSummaryProps {
  area: number;
  total: number;
  primitiveCount: number;
  scaledCount: number;
}

export function HeronianSummary({
  area,
  total,
  primitiveCount,
  scaledCount,
}: HeronianSummaryProps) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:items-center sm:gap-6 gap-4 mb-6 pb-4 border-b border-zinc-800">
      <div>
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
          Area
        </div>
        <div className="text-3xl font-bold text-amber-400">{area}</div>
      </div>
      <div>
        <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono">
          Total
        </div>
        <div className="text-3xl font-bold">{total}</div>
      </div>
      <div>
        <div className="text-xs text-emerald-500 uppercase tracking-widest font-mono">
          Primitive
        </div>
        <div className="text-2xl font-bold text-emerald-400">
          {primitiveCount}
        </div>
      </div>
      <div>
        <div className="text-xs text-pink-500 uppercase tracking-widest font-mono">
          Scaled
        </div>
        <div className="text-2xl font-bold text-pink-400">{scaledCount}</div>
      </div>
    </div>
  );
}
