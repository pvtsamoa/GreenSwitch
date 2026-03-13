import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const CACHE_TTL = 7 * 24 * 60 * 60 // 7 days in seconds

export const cache = {
  async get(key) {
    try {
      const data = await redis.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  },

  async set(key, value) {
    try {
      await redis.setex(key, CACHE_TTL, JSON.stringify(value))
    } catch (error) {
      console.error('Cache set error:', error)
    }
  },

  async has(key) {
    try {
      return await redis.exists(key) === 1
    } catch (error) {
      console.error('Cache has error:', error)
      return false
    }
  }
}