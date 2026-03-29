"use client";

export function AltitudeLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs mb-6 text-zinc-500 font-mono">
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-emerald-500 inline-block shrink-0" />
        Primitive (gcd = 1)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2 h-2 bg-pink-500 inline-block shrink-0" />
        Scaled (gcd &gt; 1)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="underline underline-offset-2 decoration-zinc-500">
          underline
        </span>
        = obtuse (scalene only)
      </span>
    </div>
  );
}
