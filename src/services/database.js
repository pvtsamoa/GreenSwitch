const Database = require('better-sqlite3')
const config = require('../config/config')
const logger = require('../utils/logger')
const fs = require('fs')
const path = require('path')

let db = null

/**
 * Initialize database
 */
function init() {
  return new Promise((resolve, reject) => {
    try {
      // Ensure database directory exists
      const dbDir = path.dirname(config.database.path)
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true })
      }

      // Open database
      db = new Database(config.database.path)
      db.pragma('journal_mode = WAL') // Better performance

      // Create tables
      createTables()

      logger.success('Database initialized')
      resolve()

    } catch (error) {
      logger.error('Database init error:', error)
      reject(error)
    }
  })
}

/**
 * Create database tables
 */
function createTables() {
  // Comparisons table
  db.exec(`
    CREATE TABLE IF NOT EXISTS comparisons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      location TEXT,
      data TEXT NOT NULL,
      sources TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      search_count INTEGER DEFAULT 1,
      UNIQUE(product, location)
    )
  `)

  // Search analytics
  db.exec(`
    CREATE TABLE IF NOT EXISTS searches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      username TEXT,
      product TEXT NOT NULL,
      location TEXT,
      found BOOLEAN,
      response_time INTEGER,
      cost REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // User feedback
  db.exec(`
    CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      comparison_id INTEGER,
      user_id INTEGER NOT NULL,
      rating INTEGER,
      comment TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(comparison_id) REFERENCES comparisons(id)
    )
  `)

  // Bot stats
  db.exec(`
    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date DATE NOT NULL,
      total_searches INTEGER DEFAULT 0,
      unique_users INTEGER DEFAULT 0,
      ai_generations INTEGER DEFAULT 0,
      cache_hits INTEGER DEFAULT 0,
      total_cost REAL DEFAULT 0,
      UNIQUE(date)
    )
  `)

  logger.info('Database tables created')
}

/**
 * Save or update a comparison
 */
function saveComparison(product, location, data, sources) {
  const stmt = db.prepare(`
    INSERT INTO comparisons (product, location, data, sources)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(product, location) DO UPDATE SET
      data = excluded.data,
      sources = excluded.sources,
      updated_at = CURRENT_TIMESTAMP,
      search_count = search_count + 1
  `)

  const result = stmt.run(
    product.toLowerCase(),
    location?.toLowerCase() || null,
    JSON.stringify(data),
    JSON.stringify(sources)
  )

  return result.changes > 0
}

/**
 * Get a comparison from database
 */
function getComparison(product, location = null) {
  const stmt = db.prepare(`
    SELECT * FROM comparisons 
    WHERE product = ? AND (location = ? OR location IS NULL)
    ORDER BY location IS NOT NULL DESC, updated_at DESC
    LIMIT 1
  `)

  const row = stmt.get(product.toLowerCase(), location?.toLowerCase() || null)

  if (row) {
    // Increment search count
    db.prepare('UPDATE comparisons SET search_count = search_count + 1 WHERE id = ?')
      .run(row.id)

    return {
      id: row.id,
      product: row.product,
      location: row.location,
      data: JSON.parse(row.data),
      sources: JSON.parse(row.sources || '[]'),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      searchCount: row.search_count
    }
  }

  return null
}

/**
 * Log a search
 */
function logSearch(userId, username, product, location, found, responseTime, cost) {
  const stmt = db.prepare(`
    INSERT INTO searches (user_id, username, product, location, found, response_time, cost)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  stmt.run(userId, username, product.toLowerCase(), location, found ? 1 : 0, responseTime, cost)
}

/**
 * Save user feedback
 */
function saveFeedback(comparisonId, userId, rating, comment) {
  const stmt = db.prepare(`
    INSERT INTO feedback (comparison_id, user_id, rating, comment)
    VALUES (?, ?, ?, ?)
  `)

  stmt.run(comparisonId, userId, rating, comment)
}

/**
 * Get statistics
 */
function getStats() {
  const total = db.prepare('SELECT COUNT(*) as count FROM comparisons').get()
  const searches = db.prepare('SELECT COUNT(*) as count FROM searches').get()
  const users = db.prepare('SELECT COUNT(DISTINCT user_id) as count FROM searches').get()
  
  const popular = db.prepare(`
    SELECT product, search_count 
    FROM comparisons 
    ORDER BY search_count DESC 
    LIMIT 10
  `).all()

  const recentSearches = db.prepare(`
    SELECT product, COUNT(*) as count 
    FROM searches 
    WHERE timestamp > datetime('now', '-7 days')
    GROUP BY product 
    ORDER BY count DESC 
    LIMIT 10
  `).all()

  return {
    totalComparisons: total.count,
    totalSearches: searches.count,
    uniqueUsers: users.count,
    popularProducts: popular,
    recentSearches: recentSearches
  }
}

/**
 * Close database connection
 */
function close() {
  if (db) {
    db.close()
    logger.info('Database closed')
  }
}

module.exports = {
  init,
  saveComparison,
  getComparison,
  logSearch,
  saveFeedback,
  getStats,
  close
}