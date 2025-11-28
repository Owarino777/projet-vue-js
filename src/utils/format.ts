export function minutesToHhMm(total: number) {
  const h = Math.floor(total / 60)
  const m = total % 60
  if (h <= 0) return `${m} min`
  return `${h} h ${m.toString().padStart(2, '0')}`
}

export function parseRuntimeToMinutes(runtime: string | undefined) {
  if (!runtime) return 0
  // "123 min" -> 123
  const match = runtime.match(/(\d+)\s*min/i)
  return match ? Number(match[1]) : 0
}