# GreenSwitch Bot - AI Agent Instructions

## Project Overview
GreenSwitch is an AI-powered Telegram bot that finds industrial cannabis alternatives to petroleum products. The bot uses a **cost-optimized hybrid approach**: hardcoded comparisons + database + AI fallback (Claude Haiku).

**Core Mission:** Educate users that industrial cannabis (hemp) is a viable, legal, non-psychoactive alternative to petroleum-based products globally.

---

## Architecture & Critical Patterns

### Search Flow (Multi-Tier Cost Optimization)
The search command (`src/handlers/commands.js`) implements a 4-step cascade to minimize API costs:

1. **Cache check** (in-memory, 7-day TTL via NodeCache)
2. **Hardcoded comparisons** (`src/data/comparisons.js`) - instant, free results for common products
3. **Database lookup** (SQLite, `src/services/database.js`) - previously generated AI results
4. **AI generation** (Claude Haiku via `src/services/ai.js`) - expensive fallback, saved to DB

**Why this matters:** Design any new comparison features or data structures around this cascade. Always cache generated content and prioritize hardcoded/database hits.

### Modular Service Layer
- `src/services/ai.js` - Claude API integration with system prompts from config
- `src/services/cache.js` - NodeCache wrapper with hit/miss tracking
- `src/services/database.js` - SQLite via better-sqlite3 (WAL mode for concurrency)
- `src/services/rateLimit.js` - Per-user rate limiting (default: 3sec between searches, 10/minute)
- `src/services/search.js` - Optional web search (SerpAPI/Google)

**Message handling flows through:**
- `src/handlers/commands.js` - /start, /search, /help, /stats, /about, /contribute
- `src/handlers/callbacks.js` - Inline button interactions

### Terminology Convention
**CRITICAL:** Use "industrial cannabis" (not "hemp") in user-facing messages. This is intentional for SEO, accuracy, and combating stigma. The system messaging (see `src/utils/messages.js`) always clarifies: "Cannabis sativa L. (THC <0.3%) - Non-psychoactive."

---

## Development Workflows

### Local Setup
```bash
npm install
cp .env.example .env  # Add BOT_TOKEN, ANTHROPIC_API_KEY
npm start             # Polling mode for local testing
npm run dev          # Watch mode with nodemon
```

### Environment Variables
- `BOT_TOKEN` (required) - Telegram Bot API token
- `ANTHROPIC_API_KEY` - Claude API key (uses Haiku for cost efficiency)
- `SERP_API_KEY` - Optional web search (disabled by default)
- `ENABLE_WEB_SEARCH=true` - Toggle web search in `src/services/search.js`
- `RATE_LIMIT_WINDOW` - Milliseconds between searches (default 3000)
- `MAX_SEARCHES_PER_MINUTE` - Rate limit ceiling (default 10)
- `CACHE_TTL_HOURS` - Cache expiry (default 168 = 7 days)

### Database
SQLite at `./database/greenswitch.db`. Schema includes:
- `comparisons` - Generated product comparisons with JSON data
- `analytics` - Search metrics and trends
- `feedback` - User ratings and corrections

Tables auto-create on first run. Use `src/services/database.js` functions to query.

---

## Key Design Decisions

### Why Claude Haiku?
- $0.005 per request vs GPT-4 ($0.03) = 6x cheaper
- Sufficient quality for structured product comparisons
- $5 free credit = ~1,000 searches = sustainable free tier

### Why Hardcoded Comparisons?
- 80%+ cache hit rate reduces AI calls and costs
- `src/data/comparisons.js` contains hand-curated entries with verified data
- Fallback for AI API outages

### Why Multi-Comparison Format Support?
Messages handle both legacy (`hemp` field) and new (`cannabis` field) JSON structures. Always output with `cannabis` field for consistency.

---

## Common Tasks & Code Locations

| Task | Location | Example |
|------|----------|---------|
| Add new comparison | `src/data/comparisons.js` | Add keywords array, petroleum downsides, cannabis benefits |
| Customize welcome message | `src/utils/messages.js` → `welcome()` | Update cannabis terminology or call-to-action |
| Add new /command | `src/handlers/commands.js` → register in `src/bot.js` | Use existing pattern with `bot.onText()` |
| Adjust AI prompt | `src/config/config.js` → `prompts.system` | Modify comparison format or tone |
| Tune rate limiting | `src/services/rateLimit.js` or `.env` | Change `RATE_LIMIT_WINDOW` or `MAX_SEARCHES_PER_MINUTE` |
| Debug logs | `src/utils/logger.js` | Uses `chalk` for colored output: `logger.info()`, `logger.error()`, `logger.success()` |

---

## Integration Points & Dependencies

- **Telegram Bot API** - `node-telegram-bot-api@0.64.0` for polling-based message handling
- **Claude API** - `@anthropic-ai/sdk@0.27.0` with Haiku model (primary AI provider)
- **Database** - `better-sqlite3@9.2.0` for lightweight data persistence
- **Caching** - `node-cache@5.1.2` for in-memory comparison caching
- **Web Search** - Optional via SerpAPI (see `src/services/search.js`)

---

## When Extending This Bot

1. **Adding product categories?** Update `src/data/comparisons.js` with hardcoded entries first; only use AI for novel products
2. **New feedback features?** Store in database (`src/services/database.js`), not in-memory
3. **Multi-language support?** Create `src/utils/messages_[lang].js` files; centralize message templates
4. **New search providers?** Create `src/services/search_[provider].js` following existing pattern
5. **Scaling to thousands of users?** Database is ready; monitor cache hit ratio via `src/services/cache.js` stats

---

## File Navigation Cheat Sheet

```
index.js                 → Entry point (legacy, use src/bot.js for new work)
src/bot.js              → Bot initialization & command registration
src/config/config.js    → All environment config + model/API settings
src/handlers/
  ├─ commands.js        → /search, /start, /help logic
  └─ callbacks.js       → Inline button handlers
src/services/
  ├─ ai.js              → Claude API + comparison generation
  ├─ cache.js           → NodeCache wrapper
  ├─ database.js        → SQLite queries
  ├─ rateLimit.js       → User rate limiting
  └─ search.js          → Web search (optional)
src/utils/
  ├─ messages.js        → All bot messages + comparison formatting
  ├─ keyboards.js       → Telegram inline keyboards/buttons
  └─ logger.js          → Colored logging
src/data/comparisons.js → Hardcoded product comparisons (CRITICAL for cost optimization)
database/               → SQLite file location
```
