export function gcd(a: number, b: number): number {
  if (a < b) {
    let temp = a;
    a = b;
    b = temp;
  }
  while (b > 0) {
    const temp = a;
    a = b;
    b = temp % b;
  }
  return a;
}

export function fmt(n: number): string {
  return Number.isInteger(n) ? n.toString() : n.toFixed(3);
}
