import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const WINDOW_MS = 3000 // 3 seconds
const MAX_REQUESTS = 1 // 1 request per window

export const rateLimit = {
  async check(identifier) {
    const key = `ratelimit:${identifier}`
    const now = Date.now()
    const windowStart = now - WINDOW_MS

    try {
      // Remove old requests outside the window
      await redis.zremrangebyscore(key, 0, windowStart)

      // Count requests in current window
      const requestCount = await redis.zcard(key)

      if (requestCount >= MAX_REQUESTS) {
        return false // Rate limited
      }

      // Add current request
      await redis.zadd(key, now, now)

      // Set expiry on the key
      await redis.expire(key, Math.ceil(WINDOW_MS / 1000))

      return true
    } catch (error) {
      console.error('Rate limit check error:', error)
      return true // Allow on error to avoid blocking users
    }
  }
}