export function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim())
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export function sanitizeHttpUrl(url: string | undefined): string | undefined {
  if (!url) {
    return undefined
  }

  return isSafeHttpUrl(url) ? url.trim() : undefined
}
