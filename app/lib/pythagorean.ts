import { gcd } from "./math";

export type GaussianPair = [number, number];
export type Triple = [number, number, number];

export interface PrimeFactors {
  two: number[];
  fermat: number[];
  nonfermat: number[];
}

export interface ComputeResult {
  triples?: Triple[];
  error?: boolean;
}

function primeFactorize(p: number): PrimeFactors {
  const result: PrimeFactors = { two: [], fermat: [], nonfermat: [] };
  while (p % 2 === 0) {
    result.two.push(2);
    p /= 2;
  }
  let i = 3;
  while (p > 1) {
    if (p % i === 0) {
      p % 4 === 1 ? result.fermat.push(i) : result.nonfermat.push(i);
      p /= i;
    } else i += 2;
  }
  return result;
}

function powerAndMod(base: number, exp: number, mod: number): number {
  if (exp === 1) return base % mod;
  if (exp % 2 === 1) {
    const result = powerAndMod(base, (exp - 1) / 2, mod) % mod;
    return (((result * result) % mod) * base) % mod;
  }
  const result = powerAndMod(base, exp / 2, mod) % mod;
  return (result * result) % mod;
}

function primeSeparate(p: number): GaussianPair {
  const qnr = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
  let i = 0;
  while (i < qnr.length) {
    if (i === 0 && p % 8 === 5) break;
    if (i === 1 && p % 3 === 2) break;
    if (
      i >= 2 &&
      powerAndMod(p % qnr[i], (qnr[i] - 1) / 2, qnr[i]) === qnr[i] - 1
    )
      break;
    ++i;
  }
  const x = powerAndMod(qnr[i], (p - 1) / 4, p);
  let a = p,
    b = x;
  while (true) {
    const temp = a;
    a = b;
    b = temp % a;
    if (a * a < p) break;
  }
  return [a, b];
}

function hypotenuseSeparate(n: number): Set<string> | null {
  const primes = primeFactorize(n);
  if (primes.two.length > 0 || primes.nonfermat.length > 0) return null;
  const ingredients: string[] = [];
  let results = new Set<string>();
  for (let i = 0; i < primes.fermat.length; i++) {
    ingredients.push(JSON.stringify(primeSeparate(primes.fermat[i])));
  }
  const first = ingredients.pop();
  if (first === undefined) return null;
  results.add(first);
  while (ingredients.length > 0) {
    const raw = ingredients.pop()!;
    const a = JSON.parse(raw) as GaussianPair;
    const values = results.values();
    const temp: string[] = [];
    for (const value of values) {
      const b = JSON.parse(value) as GaussianPair;
      temp.push(
        JSON.stringify(
          [a[0] * b[0] + a[1] * b[1], Math.abs(a[0] * b[1] - a[1] * b[0])].sort(
            (x, y) => x - y,
          ),
        ),
      );
      temp.push(
        JSON.stringify(
          [a[0] * b[1] + a[1] * b[0], Math.abs(a[0] * b[0] - a[1] * b[1])].sort(
            (x, y) => x - y,
          ),
        ),
      );
    }
    results = new Set<string>();
    for (let i = 0; i < temp.length; i++) results.add(temp[i]);
  }
  return results;
}

function hypotenuseTriple(a: number, b: number): Triple {
  const sorted = [Math.abs(a * a - b * b), 2 * a * b, a * a + b * b].sort(
    (x, y) => x - y,
  );
  return [sorted[0], sorted[1], sorted[2]];
}

export function computeTriples(input: string): ComputeResult {
  const p = parseInt(input, 10);
  if (isNaN(p) || p < 5) return { error: true };
  const separation = hypotenuseSeparate(p);
  if (!separation) {
    return {
      error: true,
    };
  }
  const triples: Triple[] = [];
  for (const value of separation.values()) {
    const [m, n] = JSON.parse(value) as GaussianPair;
    if (gcd(m, n) > 1) continue;
    triples.push(hypotenuseTriple(m, n));
  }
  return { triples };
}
