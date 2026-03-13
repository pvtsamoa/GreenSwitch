const TelegramBot = require('node-telegram-bot-api')
const config = require('./config/config')
const logger = require('./utils/logger')

// Handlers
const commandHandlers = require('./handlers/commands')
const callbackHandlers = require('./handlers/callbacks')

const bot = new TelegramBot(config.telegram.token, { polling: true })

// Register command handlers
bot.onText(/\/start/, (msg) => commandHandlers.start(bot, msg))
bot.onText(/\/search(?:\s+(.+))?/, (msg, match) => commandHandlers.search(bot, msg, match))
bot.onText(/\/help/, (msg) => commandHandlers.help(bot, msg))
bot.onText(/\/stats/, (msg) => commandHandlers.stats(bot, msg))
bot.onText(/\/about/, (msg) => commandHandlers.about(bot, msg))
bot.onText(/\/contribute/, (msg) => commandHandlers.contribute(bot, msg))

// Register callback handlers
bot.on('callback_query', (query) => callbackHandlers.handle(bot, query))

// Error handling
bot.on('polling_error', (error) => {
  logger.error('Polling error:', error)
})

module.exports = {
  start: () => {
    logger.info('Bot started successfully')
  },
  stop: async () => {
    await bot.stopPolling()
    logger.info('Bot stopped')
  }
}