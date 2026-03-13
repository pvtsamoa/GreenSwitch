module.exports = {
  // Telegram
  telegram: {
    token: process.env.BOT_TOKEN,
    username: process.env.BOT_USERNAME || '@GreenSwitchBot'
  },

  // AI Services
  ai: {
    provider: 'anthropic', // or 'openai'
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: 'claude-haiku-4-5-20251001', // Optimized for free tier!
      maxTokens: 1500
    },
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4-turbo',
      maxTokens: 1500
    }
  },

  // Web Search
  search: {
    enabled: process.env.ENABLE_WEB_SEARCH === 'true',
    provider: 'serp', // 'serp' or 'google'
    serpApi: {
      apiKey: process.env.SERP_API_KEY
    },
    google: {
      apiKey: process.env.GOOGLE_SEARCH_API_KEY,
      engineId: process.env.GOOGLE_SEARCH_ENGINE_ID
    }
  },

  // Database
  database: {
    path: process.env.DB_PATH || './database/greenswitch.db'
  },

  // Rate Limiting
  rateLimit: {
    window: parseInt(process.env.RATE_LIMIT_WINDOW) || 3000, // ms
    maxPerMinute: parseInt(process.env.MAX_SEARCHES_PER_MINUTE) || 10
  },

  // Cache
  cache: {
    ttl: (parseInt(process.env.CACHE_TTL_HOURS) || 168) * 60 * 60, // 7 days default
    maxSize: parseInt(process.env.MAX_CACHE_SIZE) || 1000
  },

  // Features
  features: {
    webSearch: process.env.ENABLE_WEB_SEARCH === 'true',
    translation: process.env.ENABLE_TRANSLATION === 'true',
    analytics: process.env.ENABLE_ANALYTICS === 'true'
  },

  // Costs (for analytics)
  costs: {
    aiPerRequest: parseFloat(process.env.AI_COST_PER_REQUEST) || 0.005, // Haiku pricing
    searchPerRequest: parseFloat(process.env.SEARCH_COST_PER_REQUEST) || 0.01
  },

  // Prompts - CANNABIS FOCUSED
  prompts: {
    system: `You are GreenSwitch AI, an expert on industrial cannabis (Cannabis sativa L., low-THC variety) alternatives to petroleum products.

CRITICAL TERMINOLOGY:
- Always use "industrial cannabis" or "cannabis (low-THC variety)"
- Specify "THC <0.3%" or "non-psychoactive" when relevant
- Explain that "hemp" is simply the common name for low-THC cannabis
- This is Cannabis sativa L. - the same plant species, industrial variety

Your mission: Help people discover biodegradable industrial cannabis alternatives to petroleum-derived products globally.

When given a product search:
1. Identify the petroleum-based product and its base material
2. Find the industrial cannabis alternative (fiber, oil, hurds, etc.)
3. Compare them objectively with specific data
4. Include where to buy (brands, regions)
5. Emphasize non-psychoactive nature and legality
6. Cite credible sources

Format responses as:
- Title (with emoji)
- Petroleum side (product + 3-4 downsides with data)
- Cannabis side (product + 3-4 benefits with data, specify "industrial cannabis" or "cannabis fiber/oil/hurds")
- Where to buy (2-3 brands with regions)
- Sources (URLs)
- Note about legality/THC content if relevant

Key principles:
- Use specific data (numbers, studies)
- Be honest about limitations
- Focus on microplastics, biodegradability, carbon footprint
- Include global availability
- Always clarify "industrial/low-THC cannabis" vs recreational cannabis
- Emphasize legal status (THC <0.3%)
- Cite sources

Educational tone: Help people understand industrial cannabis is NOT about getting high - it's about sustainable materials.`,

    search: (product, location) => `Find information about industrial cannabis (low-THC variety) alternatives to ${product}${location ? ` available in ${location}` : ''}.

Search for:
1. What is the petroleum-based version made of?
2. What are the environmental downsides? (microplastics, decomposition time, carbon footprint)
3. What is the industrial cannabis alternative? (cannabis fiber, cannabis oil, cannabis bioplastic, etc.)
4. What are the benefits of the cannabis version?
5. Where can people buy it? (brands, websites, regions)
6. Any scientific studies or data?
7. Legal status (confirm THC <0.3% where relevant)

Focus on credible sources. Remember: industrial cannabis = hemp = Cannabis sativa L. with <0.3% THC.`
  },

  // Brand messaging
  brand: {
    name: "GreenSwitch",
    tagline: "Industrial Cannabis Will Replace Petroleum",
    mission: "Discover cannabis sativa L. (low-THC variety) alternatives to petroleum products worldwide.",
    description: "The world's first AI-powered industrial cannabis alternatives platform. Non-psychoactive. Biodegradable. Revolutionary."
  }
}