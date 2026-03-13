const keyboards = require('../utils/keyboards')
const messageBuilder = require('../utils/messages')
const database = require('../services/database')
const logger = require('../utils/logger')

/**
 * Handle all callback queries (button clicks)
 */
async function handle(bot, query) {
  const chatId = query.message.chat.id
  const messageId = query.message.message_id
  const data = query.data
  const userId = query.from.id

  logger.info(`🔘 Button clicked: ${data} by user ${userId}`)

  try {
    // Answer immediately to remove loading state
    await bot.answerCallbackQuery(query.id)

    // Main menu
    if (data === 'action_menu') {
      await bot.editMessageText(
        messageBuilder.welcome(),
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: keyboards.mainMenu()
        }
      )
    }

    // Search action
    else if (data === 'action_search') {
      await bot.editMessageText(
        "🔍 *Search for Industrial Cannabis Alternatives*\n\n" +
        "Choose a category or type:\n\n" +
        "`/search <product name>`",
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: keyboards.quickSearch()
        }
      )
    }

    // Quick searches - FIXED! Call command directly instead of sending message
    else if (data.startsWith('search_')) {
      const product = data.replace('search_', '')
      
      logger.success(`🔍 Quick search triggered: ${product}`)
      
      // Import commands and call search directly
      const commandHandlers = require('./commands')
      
      // Create a mock message object that looks like a user sent it
      const mockMsg = {
        chat: { id: chatId },
        from: query.from,
        message_id: messageId
      }
      
      // Call search handler directly with the product term
      await commandHandlers.search(bot, mockMsg, [null, product])
    }

    // Why Hemp/Cannabis
    else if (data === 'action_why') {
      await bot.editMessageText(
        messageBuilder.whyHemp(),
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: keyboards.backToMain()
        }
      )
    }

    // Statistics
    else if (data === 'action_stats') {
      const stats = database.getStats()
      const cache = require('../services/cache')
      const cacheStats = cache.getStats()

      await bot.editMessageText(
        messageBuilder.buildStats(stats, cacheStats),
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: keyboards.backToMain()
        }
      )
    }

    // About
    else if (data === 'action_about') {
      await bot.editMessageText(
        messageBuilder.about(),
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: keyboards.aboutActions()
        }
      )
    }

    // Contribute
    else if (data === 'action_contribute') {
      await bot.editMessageText(
        messageBuilder.contribute(),
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: keyboards.backToMain()
        }
      )
    }

    // Share
    else if (data.startsWith('share_')) {
      const product = data.replace('share_', '')
      
      const shareText = 
        `🌿 *GreenSwitch Discovery*\n\n` +
        `I just found an industrial cannabis alternative to ${product}!\n\n` +
        `Discover cannabis alternatives to petroleum products:\n` +
        `t.me/GreenSwitch_Bot\n\n` +
        `🔬 No microplastics\n` +
        `♻️ Biodegradable\n` +
        `🌍 Better for the planet`

      await bot.editMessageText(
        shareText + `\n\n_Copy the text above to share!_`,
        {
          chat_id: chatId,
          message_id: messageId,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [{ text: "🔄 Search Another", callback_data: "action_search" }],
              [{ text: "⬅️ Menu", callback_data: "action_menu" }]
            ]
          }
        }
      )
    }

    // Feedback
    else if (data.startsWith('feedback_')) {
      const parts = data.split('_')
      const product = parts[1]
      const rating = parseInt(parts[2])

      const comparison = database.getComparison(product)
      
      if (comparison) {
        database.saveFeedback(comparison.id, userId, rating, null)
        logger.info(`👍 Feedback: ${rating} from user ${userId} for "${product}"`)
      }

      await bot.editMessageReplyMarkup(
        {
          inline_keyboard: [
            [{ text: "✅ Thanks for feedback!", callback_data: "noop" }],
            [{ text: "🔄 Search Another", callback_data: "action_search" }]
          ]
        },
        {
          chat_id: chatId,
          message_id: messageId
        }
      )
    }

    // Unknown callback
    else {
      logger.warn(`⚠️ Unknown callback: ${data}`)
    }

  } catch (error) {
    logger.error('❌ Callback error:', error)
    
    try {
      await bot.answerCallbackQuery(query.id, {
        text: "❌ Error processing button click",
        show_alert: true
      })
    } catch (e) {
      // Ignore if we can't answer
    }
  }
}

module.exports = {
  handle
}