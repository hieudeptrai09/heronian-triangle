"use client";

interface TriangleInfoProps {
  sides: [number, number, number]; // sorted [small, mid, large] from generator
}

function toDeg(rad: number) {
  return ((rad * 180) / Math.PI).toFixed(4) + "°";
}

export function TriangleInfo({ sides }: TriangleInfoProps) {
  // A = largest angle vertex, opposite the longest side
  const [sideC, sideB, sideA] = [...sides].sort((a, b) => a - b);

  const angleA = Math.acos(
    (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC),
  );
  const angleB = Math.acos(
    (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC),
  );
  const angleC = Math.PI - angleA - angleB;

  const s = (sideA + sideB + sideC) / 2;
  const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

  return (
    <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-800 flex flex-col gap-px">
      {/* Row 1: a, b, c */}
      <div className="grid grid-cols-3 gap-px">
        {(
          [
            ["a", String(sideA)],
            ["b", String(sideB)],
            ["c", String(sideC)],
          ] as [string, string][]
        ).map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 font-mono text-sm"
          >
            <span className="text-zinc-500">{label}</span>
            <span className="text-zinc-100 tabular-nums">{value}</span>
          </div>
        ))}
      </div>

      {/* Row 2: ∠A, ∠B, ∠C */}
      <div className="grid grid-cols-3 gap-px">
        {(
          [
            ["∠A", toDeg(angleA)],
            ["∠B", toDeg(angleB)],
            ["∠C", toDeg(angleC)],
          ] as [string, string][]
        ).map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 font-mono text-sm"
          >
            <span className="text-zinc-500">{label}</span>
            <span className="text-zinc-100 tabular-nums">{value}</span>
          </div>
        ))}
      </div>

      {/* Row 3: area, perimeter */}
      <div className="grid grid-cols-2 gap-px">
        {(
          [
            ["Area", Number.isInteger(area) ? String(area) : area.toFixed(6)],
            ["Perimeter", String(sideA + sideB + sideC)],
          ] as [string, string][]
        ).map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 font-mono text-sm"
          >
            <span className="text-zinc-500">{label}</span>
            <span className="text-zinc-100 tabular-nums">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
