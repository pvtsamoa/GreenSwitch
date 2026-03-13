const aiService = require('../services/ai');
const database = require('../services/database');
const cache = require('../services/cache');
const rateLimit = require('../services/rateLimit');
const keyboards = require('../utils/keyboards');
const messageBuilder = require('../utils/messages');
const logger = require('../utils/logger');
const hardcodedComparisons = require('../data/comparisons');

// Replace with your ACTUAL bot username (without the @)
const BOT_USERNAME = 'GreenSwitchBot'; // ← CHANGE THIS TO YOUR REAL BOT USERNAME
async function start(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messageBuilder.welcome(), {
    parse_mode: 'Markdown',
    reply_markup: keyboards.mainMenu()
  });
}

/**
 * /search command - HYBRID: Hardcoded First, AI Fallback
 * Supports /search ... and /search@BotName ... for supergroups
 */
async function search(bot, msg, match) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username || 'anonymous';
  const term = match && match[1] ? match[1].trim() : '';

  // Input validation
  if (term.length > 100) {
    bot.sendMessage(chatId, "❌ Search term too long. Please keep it under 100 characters.");
    return;
  }

  if (!term) {
    bot.sendMessage(
      chatId,
      "🔍 *How to search:*\n\n`/search <product>`\n\nExamples:\n• `/search insulation`\n• `/search paint`\n• `/search plastic bottle`\n\nOr use the buttons below:",
      {
        parse_mode: 'Markdown',
        reply_markup: keyboards.quickSearch()
      }
    );
    return;
  }

  // Rate limiting
  if (!rateLimit.check(userId)) {
    bot.sendMessage(chatId, "⏳ Please wait a few seconds between searches.");
    return;
  }

  const startTime = Date.now();

  const searchMsg = await bot.sendMessage(
    chatId,
    `🔍 Searching for industrial cannabis alternatives to *${term}*...\n\n⏳ One moment...`,
    { parse_mode: 'Markdown' }
  );

  try {
    let comparison = null;
    let source = 'cache';
    let cost = 0;

    // STEP 1: Cache (fastest, free)
    comparison = cache.get(term);

    if (!comparison) {
      // STEP 2: Hardcoded list (instant, free)
      const lowerTerm = term.toLowerCase();
      const hardcoded = hardcodedComparisons.find(comp =>
        comp.keywords.some(kw => lowerTerm.includes(kw.toLowerCase()))
      );

      if (hardcoded) {
        comparison = hardcoded;
        source = 'hardcoded';
        logger.success(`💚 HARDCODED HIT: "${term}" - $0 cost!`);
        cache.set(term, comparison);
      }
    }

    if (!comparison) {
      // STEP 3: Database (saved AI results)
      comparison = database.getComparison(term);
      if (comparison) {
        source = 'database';
        cache.set(term, comparison);
      }
    }

    if (!comparison) {
      // STEP 4: AI fallback (costs money, but saved for everyone else)
      source = 'ai';
      logger.info(`🤖 AI GENERATION for "${term}" - will cost $0.005`);

      const aiResult = await aiService.generateComparison(term);

      if (!aiResult.success) {
        throw new Error(aiResult.error || 'AI service failed');
      }

      comparison = aiResult.data;
      cost = aiResult.cost;

      database.saveComparison(term, null, comparison, comparison.sources || []);
      cache.set(term, comparison);

      logger.warn(`💰 AI used: $${cost.toFixed(4)} - saved for future users!`);
    }

    const responseTime = Date.now() - startTime;

    // Log successful search
    database.logSearch(userId, username, term, null, true, responseTime, cost);

    // Delete "searching..." message
    await bot.deleteMessage(chatId, searchMsg.message_id);

    // Send formatted comparison
    const message = messageBuilder.buildComparison(comparison, source);
    bot.sendMessage(chatId, message, {
      reply_markup: keyboards.comparisonActions(term),
      disable_web_page_preview: true
    });

    const costMsg = cost > 0 ? `💰 $${cost.toFixed(4)}` : '💚 FREE';
    logger.info(`Search: "${term}" by @${username} (${source}, ${responseTime}ms, ${costMsg})`);

  } catch (error) {
    logger.error('Search error:', error);

    // Clean up searching message
    await bot.deleteMessage(chatId, searchMsg.message_id);

    // Log failure
    database.logSearch(userId, username, term, null, false, Date.now() - startTime, 0);

    bot.sendMessage(
      chatId,
      `❌ Sorry, I couldn't find information about "*${term}*".\n\n` +
      `This could mean:\n` +
      `• No industrial cannabis alternative exists yet\n` +
      `• Limited information available\n` +
      `• Try a different search term\n\n` +
      `💡 /contribute if you know of a cannabis alternative!`,
      {
        parse_mode: 'Markdown',
        reply_markup: keyboards.searchAgain()
      }
    );
  }
}

/**
 * /stats command
 */
async function stats(bot, msg) {
  const chatId = msg.chat.id;

  try {
    const stats = database.getStats();
    const cacheStats = cache.getStats();

    const message = messageBuilder.buildStats(stats, cacheStats);

    bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: keyboards.backToMain()
    });
  } catch (error) {
    logger.error('Stats error:', error);
    bot.sendMessage(chatId, "❌ Error loading statistics.");
  }
}

/**
 * /about command
 */
async function about(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    messageBuilder.about(),
    {
      parse_mode: 'Markdown',
      reply_markup: keyboards.aboutActions()
    }
  );
}

/**
 * /help command
 */
async function help(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    messageBuilder.help(),
    {
      parse_mode: 'Markdown',
      reply_markup: keyboards.mainMenu()
    }
  );
}

/**
 * /contribute command
 */
async function contribute(bot, msg) {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    messageBuilder.contribute(),
    {
      parse_mode: 'Markdown',
      reply_markup: keyboards.backToMain()
    }
  );
}

// Export all handlers
module.exports = {
  start,
  search,
  stats,
  about,
  help,
  contribute
};