"use client";

interface TriangleCanvasProps {
  sides: [number, number, number];
}

export function TriangleCanvas({ sides }: TriangleCanvasProps) {
  const [sideC, sideB, sideA] = [...sides].sort((a, b) => a - b);

  const angA = Math.acos(
    (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC),
  );

  const PA_raw = { x: 0, y: 0 };
  const PB_raw = { x: sideC, y: 0 };
  const PC_raw = { x: sideB * Math.cos(angA), y: sideB * Math.sin(angA) };

  const minX = Math.min(PA_raw.x, PB_raw.x, PC_raw.x);
  const maxX = Math.max(PA_raw.x, PB_raw.x, PC_raw.x);
  const minY = Math.min(PA_raw.y, PB_raw.y, PC_raw.y);
  const maxY = Math.max(PA_raw.y, PB_raw.y, PC_raw.y);

  const rawW = maxX - minX;
  const rawH = maxY - minY;

  const H = 400;
  const PAD = 32;
  const scale = H / rawH;
  const W = rawW * scale;

  // toSVG maps raw coords into the padded viewBox
  function toSVG(p: { x: number; y: number }) {
    return {
      x: PAD + (p.x - minX) * scale,
      y: PAD + (maxY - p.y) * scale,
    };
  }

  const PA = toSVG(PA_raw);
  const PB = toSVG(PB_raw);
  const PC = toSVG(PC_raw);

  const gcx = (PA.x + PB.x + PC.x) / 3;
  const gcy = (PA.y + PB.y + PC.y) / 3;

  function offset(m: { x: number; y: number }, dist = 20) {
    const dx = m.x - gcx;
    const dy = m.y - gcy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return { x: m.x + (dx / len) * dist, y: m.y + (dy / len) * dist };
  }

  function vOffset(p: { x: number; y: number }, dist = 16) {
    const dx = p.x - gcx;
    const dy = p.y - gcy;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    return { x: p.x + (dx / len) * dist, y: p.y + (dy / len) * dist };
  }

  const lSideA = offset({ x: (PB.x + PC.x) / 2, y: (PB.y + PC.y) / 2 });
  const lSideB = offset({ x: (PA.x + PC.x) / 2, y: (PA.y + PC.y) / 2 });
  const lSideC = offset({ x: (PA.x + PB.x) / 2, y: (PA.y + PB.y) / 2 });

  const vA = vOffset(PA);
  const vB = vOffset(PB);
  const vC = vOffset(PC);

  const VW = W + PAD * 2;
  const VH = H + PAD * 2;

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      height={VH}
      className="block mx-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points={`${PA.x},${PA.y} ${PB.x},${PB.y} ${PC.x},${PC.y}`}
        fill="rgba(99,102,241,0.08)"
        stroke="rgb(99,102,241)"
        strokeWidth="1.5"
      />
      {[PA, PB, PC].map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3} fill="rgb(99,102,241)" />
      ))}
      <text
        x={vA.x}
        y={vA.y}
        fontSize="13"
        fill="rgb(161,161,170)"
        fontFamily="monospace"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        A
      </text>
      <text
        x={vB.x}
        y={vB.y}
        fontSize="13"
        fill="rgb(161,161,170)"
        fontFamily="monospace"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        B
      </text>
      <text
        x={vC.x}
        y={vC.y}
        fontSize="13"
        fill="rgb(161,161,170)"
        fontFamily="monospace"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        C
      </text>
      <text
        x={lSideA.x}
        y={lSideA.y}
        fontSize="13"
        fill="rgb(52,211,153)"
        fontFamily="monospace"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {sideA}
      </text>
      <text
        x={lSideB.x}
        y={lSideB.y}
        fontSize="13"
        fill="rgb(52,211,153)"
        fontFamily="monospace"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {sideB}
      </text>
      <text
        x={lSideC.x}
        y={lSideC.y}
        fontSize="13"
        fill="rgb(52,211,153)"
        fontFamily="monospace"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {sideC}
      </text>
    </svg>
  );
}
