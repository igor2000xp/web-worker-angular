declare var _: any;

export function generateFibonacci(n: number): number {
  return n < 1
    ? 0
    : n <= 2
      ? 1
      : generateFibonacci(n - 1) + generateFibonacci(n - 2);
}
