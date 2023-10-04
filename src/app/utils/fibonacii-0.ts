export function generateFibonacci0(n: number): number {
  return n < 1
    ? 0
    : n <= 2
      ? 1
      : generateFibonacci0(n - 1) + generateFibonacci0(n - 2);
}
