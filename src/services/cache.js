const NodeCache = require('node-cache')
const config = require('../config/config')
const logger = require('../utils/logger')

const cache = new NodeCache({
  stdTTL: config.cache.ttl,
  checkperiod: 600, // Check for expired keys every 10 minutes
  maxKeys: config.cache.maxSize,
  useClones: false // Better performance
})

// Track hits/misses for analytics
let hits = 0
let misses = 0

/**
 * Get value from cache
 */
function get(key) {
  const value = cache.get(normalize(key))
  
  if (value) {
    hits++
    logger.debug(`Cache HIT: ${key}`)
    return value
  }
  
  misses++
  logger.debug(`Cache MISS: ${key}`)
  return null
}

/**
 * Set value in cache
 */
function set(key, value, ttl = null) {
  const normalizedKey = normalize(key)
  
  if (ttl) {
    cache.set(normalizedKey, value, ttl)
  } else {
    cache.set(normalizedKey, value)
  }
  
  logger.debug(`Cache SET: ${key}`)
  return true
}

/**
 * Delete from cache
 */
function del(key) {
  cache.del(normalize(key))
  logger.debug(`Cache DELETE: ${key}`)
}

/**
 * Clear all cache
 */
function clear() {
  cache.flushAll()
  hits = 0
  misses = 0
  logger.info('Cache cleared')
}

/**
 * Get cache statistics
 */
function getStats() {
  const stats = cache.getStats()
  const total = hits + misses
  const hitRate = total > 0 ? ((hits / total) * 100).toFixed(1) : 0

  return {
    keys: cache.keys().length,
    hits,
    misses,
    hitRate: `${hitRate}%`,
    size: stats.keys,
    memory: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
  }
}

/**
 * Normalize cache key
 */
function normalize(key) {
  return key.toLowerCase().trim()
}

// Reset stats daily
setInterval(() => {
  logger.info(`Cache stats: ${hits} hits, ${misses} misses, ${cache.keys().length} keys`)
  hits = 0
  misses = 0
}, 24 * 60 * 60 * 1000)

module.exports = {
  get,
  set,
  del,
  clear,
  getStats
}