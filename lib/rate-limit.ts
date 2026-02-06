type RateLimitEntry = {
  count: number
  resetAt: number
}

type RateLimitResult = {
  ok: boolean
  remaining: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now()
): RateLimitResult {
  const existing = store.get(key)

  if (!existing || now >= existing.resetAt) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return {
      ok: true,
      remaining: Math.max(0, limit - 1),
      resetAt,
    }
  }

  const count = existing.count + 1
  existing.count = count
  store.set(key, existing)

  const remaining = Math.max(0, limit - count)
  return {
    ok: count <= limit,
    remaining,
    resetAt: existing.resetAt,
  }
}
