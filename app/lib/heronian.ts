import { gcd } from "./math";

export type HeronianTriple = [number, number, number];
export type TriangleKind = "right" | "obtuse" | "acute";

export interface AltitudeDecomposition {
  base: number;
  first: [number, number, number];
  second: [number, number, number];
}

export function generateHeronian(area: number): HeronianTriple[] {
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
      const triple: HeronianTriple = [i + j, i + z, j + z].sort(
        (a, b) => a - b,
      ) as HeronianTriple;
      resultSet.add(JSON.stringify(triple));
    }
  }
  return [...resultSet]
    .map((s) => JSON.parse(s) as HeronianTriple)
    .sort((a, b) =>
      a[0] !== b[0] ? a[0] - b[0] : a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2],
    );
}

export function triangleKind(t: HeronianTriple): TriangleKind {
  const d = t[0] * t[0] + t[1] * t[1] - t[2] * t[2];
  if (d === 0) return "right";
  if (d < 0) return "obtuse";
  return "acute";
}

export function analyzeHeronian(
  t: HeronianTriple,
  area: number,
): AltitudeDecomposition | undefined {
  if (t[0] * t[0] + t[1] * t[1] - t[2] * t[2] === 0) return;
  if (t[0] === t[1] || t[1] === t[2]) return;
  let height = 0,
    base = 0,
    first = 0,
    second = 0;
  if ((2 * area) % t[0] === 0) {
    base = t[0];
    height = (2 * area) / t[0];
    first = t[1];
    second = t[2];
  } else if ((2 * area) % t[1] === 0) {
    base = t[1];
    height = (2 * area) / t[1];
    first = t[0];
    second = t[2];
  } else if ((2 * area) % t[2] === 0) {
    base = t[2];
    height = (2 * area) / t[2];
    first = t[0];
    second = t[1];
  } else return;
  const leg1 = Math.sqrt(first * first - height * height);
  const leg2 = Math.sqrt(second * second - height * height);
  if (leg1 !== Math.floor(leg1) || leg2 !== Math.floor(leg2)) return;
  return { base, first: [height, leg1, first], second: [height, leg2, second] };
}

export function countPrimitive(triangles: HeronianTriple[]): number {
  return triangles.filter((t) => gcd(t[0], gcd(t[1], t[2])) === 1).length;
}
