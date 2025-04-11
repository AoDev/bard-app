export function includes<T>(array: readonly T[] | T[], value: unknown): boolean {
  return array.some((item) => item === value)
}
