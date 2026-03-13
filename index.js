require('dotenv').config()
const logger = require('./src/utils/logger')
const database = require('./src/services/database')
const bot = require('./src/bot')

// Check for required environment variables
if (!process.env.BOT_TOKEN) {
  console.error('❌ BOT_TOKEN missing in .env file')
  process.exit(1)
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('⚠️  ANTHROPIC_API_KEY missing - AI fallback disabled')
}

// Initialize database and start bot
async function startApp() {
  await database.init()

  // Start the bot
  bot.start()

  // Startup banner
  console.log(`
╔═══════════════════════════════════╗
║   🌿 GreenSwitch Bot Running 🌿   ║
║                                   ║
║  Industrial Cannabis Revolution   ║
║  Hybrid: Hardcoded + AI Fallback  ║
║  Database: SQLite Active          ║
║  Cache: 7-day TTL                 ║
╚═══════════════════════════════════╝
  `)

  logger.success(`Started at: ${new Date().toISOString()}`)
}

startApp().catch(error => {
  console.error('Failed to start application:', error)
  process.exit(1)
})

process.on('SIGINT', () => {
  logger.info('\n🛑 Received SIGINT, shutting down...')
  bot.stop()
  process.exit(0)
})

process.on('SIGTERM', () => {
  logger.info('\n🛑 Received SIGTERM, shutting down...')
  bot.stop()
  process.exit(0)
})