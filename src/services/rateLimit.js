const config = require('../config/config')
const logger = require('../utils/logger')

// Store: userId -> { lastRequest, requestCount, windowStart }
const limits = new Map()

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  for (const [userId, data] of limits.entries()) {
    if (now - data.lastRequest > 60 * 60 * 1000) {
      limits.delete(userId)
    }
  }
  logger.debug(`Rate limit cleanup: ${limits.size} active users`)
}, 60 * 60 * 1000)

/**
 * Check if user can make a request
 * @param {number} userId - Telegram user ID
 * @returns {boolean} - true if allowed, false if rate limited
 */
function check(userId) {
  const now = Date.now()
  const user = limits.get(userId)

  // First request
  if (!user) {
    limits.set(userId, {
      lastRequest: now,
      requestCount: 1,
      windowStart: now
    })
    return true
  }

  // Check minimum time between requests
  const timeSinceLastRequest = now - user.lastRequest
  if (timeSinceLastRequest < config.rateLimit.window) {
    logger.warn(`Rate limit: User ${userId} too fast (${timeSinceLastRequest}ms)`)
    return false
  }

  // Reset window if more than a minute has passed
  if (now - user.windowStart > 60000) {
    user.requestCount = 1
    user.windowStart = now
  } else {
    user.requestCount++
  }

  // Check requests per minute
  if (user.requestCount > config.rateLimit.maxPerMinute) {
    logger.warn(`Rate limit: User ${userId} exceeded ${config.rateLimit.maxPerMinute}/min`)
    return false
  }

  user.lastRequest = now
  return true
}

/**
 * Get rate limit stats for a user
 */
function getStats(userId) {
  const user = limits.get(userId)
  if (!user) return null

  const now = Date.now()
  return {
    requestCount: user.requestCount,
    windowTimeLeft: Math.max(0, 60000 - (now - user.windowStart)),
    lastRequest: new Date(user.lastRequest).toISOString()
  }
}

/**
 * Reset rate limit for a user (admin function)
 */
function reset(userId) {
  limits.delete(userId)
  logger.info(`Rate limit reset for user ${userId}`)
}

/**
 * Get global rate limit stats
 */
function getGlobalStats() {
  return {
    activeUsers: limits.size,
    window: `${config.rateLimit.window}ms`,
    maxPerMinute: config.rateLimit.maxPerMinute
  }
}

module.exports = {
  check,
  getStats,
  reset,
  getGlobalStats
}