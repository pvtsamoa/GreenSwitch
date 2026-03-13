# 🌿 GreenSwitch - Industrial Cannabis Revolution

> **The world's first AI-powered industrial cannabis alternatives platform**

Discover Cannabis sativa L. (low-THC variety) alternatives to petroleum products worldwide. Non-psychoactive. Biodegradable. Revolutionary.

**Industrial cannabis will replace petroleum. We show you how.**

---

## 🔬 What is Industrial Cannabis?

Cannabis sativa L. with <0.3% THC. Non-psychoactive. Legal in 50+ countries.

**Common names:** Hemp, industrial hemp, fiber cannabis  
**Reality:** It's all cannabis - just the industrial variety.

**We use "cannabis" because:**
- ✅ Scientifically accurate
- ✅ Bigger market ($5.7B+ globally)
- ✅ Better SEO and discovery
- ✅ Future-proof terminology
- ✅ Industry standard

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
cp .env.example .env
# Add your BOT_TOKEN and ANTHROPIC_API_KEY

# 3. Run
npm start
```

**[📖 Full Setup Guide](./SETUP_GUIDE.md)**

---

## ✨ Features

### 🤖 AI-Powered Global Search
- Search **any petroleum product** - AI finds industrial cannabis alternatives
- Global coverage - products from all countries
- Real-time web search integration
- Generates comparisons with scientific sources
- **Clarifies industrial (low-THC) vs recreational cannabis**

### ⚡ Optimized for Free Tier
- **Claude Haiku 4** - $0.005 per search (3x cheaper!)
- **$5 free credit** = 1,000 AI searches
- **Smart caching** - 80%+ cache hit rate
- **7-day cache** - maximum reuse
- **Cost: ~$5-15/month** with 1,000+ users

### 💾 Intelligent Database
- Stores all cannabis comparisons
- Tracks analytics & trends
- User feedback system
- Popular product rankings
- **Educational mission tracking**

### 🌍 Production-Ready Architecture
- Modular design
- Easy to extend
- Built for scale
- Ready for "Industrial Cannabis Amazon" vision

---

## 📊 How It Works

```
User: /search plastic bottle
         ↓
    Check cache
         ↓ (miss)
    Check database
         ↓ (miss)
    AI generates comparison
    "Cannabis bioplastic vs PET"
    + Web search for sources
         ↓
    Save to database
         ↓
    Show user results
    (Specifies: industrial cannabis, THC <0.3%)
         ↓
    Cache for next 1,000 users (FREE)
```

---

## 💰 Cost Analysis (FREE TIER OPTIMIZED!)

### Typical Usage (1,000 searches/month)
- **80% cache hits:** FREE ✅
- **200 AI generations:** $1/month (Haiku pricing!)
- **Web search (optional):** $2/month
- **Total: ~$3/month** 🎉

### Heavy Usage (10,000 searches/month)
- **70% cache hits:** FREE ✅
- **3,000 AI generations:** $15/month
- **Web search:** $10/month
- **Total: ~$25/month**

### Your $5 Free Credit
- **1,000 AI searches** before paying anything!
- With 80% cache rate = **5,000 total searches**
- **3-6 months of free testing!** 🚀

---

## 🏗️ Architecture

```
src/
├── bot.js                 # Bot initialization
├── config/
│   └── config.js         # All settings (CANNABIS-FOCUSED)
├── handlers/
│   ├── commands.js       # /start, /search, /stats
│   └── callbacks.js      # Button clicks
├── services/
│   ├── ai.js             # Claude AI (industrial cannabis expert)
│   ├── search.js         # Web search
│   ├── database.js       # SQLite storage
│   ├── cache.js          # Memory cache (7-day TTL)
│   └── rateLimit.js      # Rate limiting
└── utils/
    ├── keyboards.js      # Telegram buttons
    ├── messages.js       # CANNABIS terminology
    └── logger.js         # Logging
```

**Design Pattern:** Modular + Service Layer  
**AI Model:** Claude Haiku 4 (optimized for cost)  
**Terminology:** Industrial cannabis (THC <0.3%)

---

## 🎯 Roadmap

### Phase 1: AI Bot ✅ (Current)
- [x] AI-powered cannabis alternative search
- [x] Database storage
- [x] Smart caching (7-day TTL)
- [x] Analytics & tracking
- [x] Cannabis education focus
- [x] Free tier optimization ($5 = 1000 searches)
- [ ] Multi-language support
- [ ] Location-aware results

### Phase 2: Industrial Cannabis Web Platform
- [ ] Next.js website
- [ ] User accounts
- [ ] Browse by cannabis application (fiber/oil/hurds)
- [ ] Community contributions
- [ ] Developer API
- [ ] Cannabis industry news

### Phase 3: B2B Cannabis Marketplace
- [ ] Supplier listings
- [ ] Buyer accounts
- [ ] Reviews & certifications
- [ ] WeedCoin payments
- [ ] Supply chain tracking
- [ ] Bulk ordering

### Phase 4: Industrial Cannabis OS 🚀
- [ ] Global marketplace
- [ ] Cannabis innovation hub
- [ ] Industry analytics
- [ ] White-label solutions
- [ ] Research database
- [ ] Policy advocacy tools

---

## 📚 Commands

| Command | Description |
|---------|-------------|
| `/start` | Welcome to industrial cannabis revolution |
| `/search <product>` | Find cannabis alternatives to petroleum products |
| `/stats` | View bot statistics & popular searches |
| `/about` | Learn about industrial cannabis |
| `/contribute` | Submit cannabis product discoveries |
| `/help` | Command help |

**Search Examples:**
```
/search insulation → Cannabis fiber insulation vs fiberglass
/search paint → Cannabis oil paint vs petroleum paint
/search rope → Cannabis fiber rope vs nylon rope
/search plastic bottle → Cannabis bioplastic vs PET
```

---

## 🛠️ Tech Stack

- **Bot Framework:** node-telegram-bot-api
- **AI:** Claude Haiku 4 (Anthropic) - Optimized for cost!
- **Database:** SQLite (better-sqlite3)
- **Cache:** node-cache (7-day TTL)
- **Search:** SerpAPI / Google Custom Search (optional)
- **Runtime:** Node.js 16+

---

## 🔧 Configuration

All settings in `.env`:

```env
# Required
BOT_TOKEN=your_telegram_token
ANTHROPIC_API_KEY=your_claude_key

# Optional (Free tier optimized)
SERP_API_KEY=your_serpapi_key
ENABLE_WEB_SEARCH=false
RATE_LIMIT_WINDOW=3000
CACHE_TTL_HOURS=168
AI_COST_PER_REQUEST=0.005
```

See [.env.example](./.env.example) for all options.

---

## 🌿 Cannabis Terminology

We use accurate scientific terminology:

| Term | Meaning | THC Level |
|------|---------|-----------|
| **Industrial Cannabis** | Cannabis sativa L. grown for materials | <0.3% |
| **Hemp** | Common/legal name for industrial cannabis | <0.3% |
| **Cannabis Fiber** | From stalks (textiles, rope, paper) | <0.3% |
| **Cannabis Oil** | From seeds (paints, fuel, food) | <0.3% |
| **Cannabis Hurds** | Inner woody core (insulation, building) | <0.3% |
| **Recreational Cannabis** | High-THC variety (NOT our focus) | >0.3% |

**Important:** We ONLY cover industrial cannabis (non-psychoactive, legal).

---

## 📖 Documentation

- **[Setup Guide](./SETUP_GUIDE.md)** - Complete installation
- **[API Keys](./SETUP_GUIDE.md#-step-1-get-api-keys)** - How to get keys (FREE!)
- **[Architecture](./SETUP_GUIDE.md#-project-structure)** - Code structure
- **[Free Tier Optimization](./SETUP_GUIDE.md#-cost-estimation)** - Maximize your $5 credit

---

## 🤝 Contributing

We need:
- **Industrial cannabis product submissions**
- Cannabis fiber/oil/hurd brands & suppliers
- Scientific studies on cannabis materials
- Code contributions
- Translations
- Cannabis industry expertise

**Focus:** Industrial/low-THC cannabis ONLY (legal, non-psychoactive)

**[Contribution Guide](./SETUP_GUIDE.md#-need-help)**

---

## 📊 Market Opportunity

**Industrial Cannabis Market:**
- $5.7B globally (2024)
- 25% annual growth
- 25,000+ products available
- Legal in 50+ countries

**Cannabis Applications:**
- Textiles: $2B
- Building materials: $1.5B
- Food & beverages: $1B
- Bioplastics: $800M
- Personal care: $500M

**Our Position:** The knowledge platform for the entire industry.

---

## 🌍 Vision

**GreenSwitch aims to become:**
1. The world's largest industrial cannabis knowledge base
2. The go-to platform for cannabis material discovery
3. The "Industrial Cannabis Amazon" - full B2B marketplace
4. A key accelerator of the cannabis industrial revolution

**Industrial cannabis will replace petroleum.**  
**We're building the infrastructure to make it happen.**

---

## 🔥 Why This Matters

**Environmental Impact:**
- Cannabis absorbs 1.63 tons CO2 per ton grown
- Biodegrades in months vs 450 years (plastic)
- Zero microplastic pollution
- Replaces fossil fuel extraction

**Economic Impact:**
- $5.7B industry growing to $50B+ by 2030
- Creates sustainable jobs
- Reduces petroleum dependency
- Supports regenerative agriculture

**Social Impact:**
- Educates public on industrial cannabis
- Destigmatizes cannabis plant
- Accelerates legal cannabis adoption
- Builds sustainable future

---

## 📧 Contact

- **Telegram:** @pvtSamoa
- **Bot:** @GreenSwitchBot
- **WeedCoin:** [Coming Soon]
- **Mission:** Accelerate the cannabis industrial revolution

---

## 📄 License

MIT License - See [LICENSE](./LICENSE)

---

## ⭐ Join the Revolution

If you believe industrial cannabis will replace petroleum:
- ⭐ Star this repo
- 🌿 Share with cannabis industry
- 📊 Contribute data
- 💚 Spread the word

**Every search brings us closer to a petroleum-free, cannabis-powered future.** 🌍🌿

---

## 💪 The Mission

Cannabis sativa L. (low-THC variety) can replace petroleum in:
- 80% of textiles
- 100% of single-use plastics
- 50% of building materials
- 100% of paper products
- Biofuel applications

**It's not a question of IF. It's a question of WHEN.**

**GreenSwitch accelerates WHEN.**

---

Made with 💚 by the GreenSwitch team

*Industrial cannabis. Non-psychoactive. Revolutionary.* 🌿🚀