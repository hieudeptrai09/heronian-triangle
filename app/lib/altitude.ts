import { gcd } from "./math";

export type AltitudeTriple = [number, number, number];

export interface RightTriangle {
  value: AltitudeTriple; // [altitude, leg, hypotenuse]
  gcd: number;
  area: number;
}

export interface ScaleneTriangle {
  value: AltitudeTriple;
  gcd: number;
  area: number;
}

export interface IsoscelesTriangle {
  value: AltitudeTriple; // [hyp, hyp, base]
  gcd: number;
  area: number;
}

export function generateHypotenuses(leg: number): Set<number> {
  const divisors: number[] = [];
  let i = 1;
  do {
    if (leg % i === 0) divisors.push(i);
    i++;
  } while (i * i <= leg);

  const hypotenuses = new Set<number>();

  for (let i = 0; i < divisors.length; i++) {
    const otherLeg = leg / divisors[i];

    if (divisors[i] % 2 === otherLeg % 2) {
      for (let j = 1; j < divisors[i]; j++) {
        if (divisors[i] % j === 0)
          hypotenuses.add(
            (j *
              ((divisors[i] / j + otherLeg) ** 2 +
                (divisors[i] / j - otherLeg) ** 2)) /
              4,
          );
      }
      for (let j = 1; j < otherLeg; j++) {
        if (otherLeg % j === 0)
          hypotenuses.add(
            (j *
              ((divisors[i] + otherLeg / j) ** 2 +
                (divisors[i] - otherLeg / j) ** 2)) /
              4,
          );
      }
    }

    if (divisors[i] % 2 === 0) {
      for (let j = 1; j < divisors[i] / 2; j++)
        if ((divisors[i] / 2) % j === 0)
          hypotenuses.add(
            j *
              (((divisors[i] / j) * divisors[i]) / j / 4 + otherLeg * otherLeg),
          );
    }

    if (otherLeg % 2 === 0) {
      for (let j = 1; j < otherLeg / 2; j++)
        if ((otherLeg / 2) % j === 0)
          hypotenuses.add(
            j *
              (divisors[i] * divisors[i] + ((otherLeg / j) * otherLeg) / j / 4),
          );
    }
  }

  hypotenuses.delete(leg);
  return hypotenuses;
}

export function generateRightTriangles(
  altitude: number,
  hypotenuses: Set<number>,
): RightTriangle[] {
  const result: RightTriangle[] = [];
  hypotenuses.forEach((hyp) => {
    const otherLeg = Math.sqrt(hyp * hyp - altitude * altitude);
    result.push({
      value: [altitude, otherLeg, hyp],
      gcd: gcd(altitude, gcd(otherLeg, hyp)),
      area: 0.5 * altitude * otherLeg,
    });
  });
  result.sort((a, b) => a.value[2] - b.value[2]);
  return result;
}

export function generateIsoscelesTriangles(
  rightTriangles: RightTriangle[],
): IsoscelesTriangle[] {
  return rightTriangles.map((rt) => {
    const value: AltitudeTriple = [rt.value[2], rt.value[2], 2 * rt.value[1]];
    return {
      value,
      gcd: gcd(value[0], gcd(value[1], value[2])),
      area: 2 * rt.area,
    };
  });
}

export function generateScaleneTriangles(
  rightTriangles: RightTriangle[],
): ScaleneTriangle[] {
  const result: ScaleneTriangle[] = [];
  for (let i = 0; i < rightTriangles.length; i++) {
    for (let j = i + 1; j < rightTriangles.length; j++) {
      const ri = rightTriangles[i];
      const rj = rightTriangles[j];

      // subtract: triangles share altitude, bases on opposite sides
      const vSub = (
        [ri.value[2], rj.value[2], rj.value[1] - ri.value[1]] as AltitudeTriple
      )
        .slice()
        .sort((a, b) => a - b) as AltitudeTriple;
      result.push({
        value: vSub,
        gcd: gcd(vSub[0], gcd(vSub[1], vSub[2])),
        area: rj.area - ri.area,
      });

      // add: triangles share altitude, bases on same side
      const vAdd = (
        [ri.value[2], rj.value[2], ri.value[1] + rj.value[1]] as AltitudeTriple
      )
        .slice()
        .sort((a, b) => a - b) as AltitudeTriple;
      result.push({
        value: vAdd,
        gcd: gcd(vAdd[0], gcd(vAdd[1], vAdd[2])),
        area: rj.area + ri.area,
      });
    }
  }
  return result;
}
