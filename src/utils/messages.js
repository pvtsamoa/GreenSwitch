const config = require('../config/config')

/**
 * Welcome message - CANNABIS POWER MODE
 */
function welcome() {
  return `*🌿 Welcome to GreenSwitch!*

*Industrial Cannabis Will Replace Petroleum.*

Discover Cannabis sativa L. (low-THC variety) alternatives to petroleum products worldwide.

🔬 *What is Industrial Cannabis?*
Cannabis with <0.3% THC (non-psychoactive). Commonly called "hemp" - same plant, zero high, infinite applications.

💀 *The Problem:*
Microplastics are in human blood, lungs, and placentas. Petroleum products shed millions of toxic particles that poison our bodies and planet.

🌿 *The Solution:*
Industrial cannabis offers biodegradable, renewable alternatives without the pollution:
  • Cannabis fiber → Textiles, rope, paper
  • Cannabis oil → Paints, plastics, fuel
  • Cannabis hurds → Insulation, building materials

✅ *Legal. Sustainable. Revolutionary.*

*What would you like to discover?*`
}

/**
 * Build comparison message - PLAIN TEXT (no parse_mode needed!)
 * 
 * WHY PLAIN TEXT:
 * Telegram's Markdown and HTML parsers are strict and crash on
 * special characters like () [] < > in product data.
 * Plain text with emojis looks great and NEVER crashes.
 * 
 * IMPORTANT: In commands.js, do NOT set parse_mode when sending
 * this message. Just remove the parse_mode line entirely.
 */
function buildComparison(data, source = 'ai') {
  let msg = `${data.emoji || '🌿'} ${data.title}\n\n`

  // Petroleum side
  msg += `⛽ PETROLEUM SIDE: ${data.petroleum.product}\n`
  if (data.petroleum.material) {
    msg += `Material: ${data.petroleum.material}\n\n`
  }
  data.petroleum.downsides.forEach(d => {
    msg += `  • ${d}\n`
  })

  // Cannabis side
  const cannabisProduct = data.cannabis?.product || data.hemp?.product || 'Unknown'
  msg += `\n🌿 INDUSTRIAL CANNABIS SIDE: ${cannabisProduct}\n`
  msg += `Cannabis sativa L. (THC <0.3%) - Non-psychoactive\n\n`
  
  const benefits = data.cannabis?.benefits || data.hemp?.benefits || []
  benefits.forEach(b => {
    msg += `  • ${b}\n`
  })

  // Where to buy
  if (data.brands && data.brands.length > 0) {
    msg += `\n🛒 WHERE TO BUY:\n`
    data.brands.forEach(brand => {
      msg += `  • ${brand.name}`
      if (brand.region) {
        msg += ` (${brand.region})`
      }
      if (brand.url) {
        msg += `\n    ${brand.url}`
      }
      msg += `\n`
    })
  }

  // Note
  if (data.note) {
    msg += `\n📝 ${data.note}\n`
  }

  // Sources
  if (data.sources && data.sources.length > 0) {
    msg += `\n📚 Sources:\n`
    data.sources.slice(0, 3).forEach((src, i) => {
      msg += `  ${i + 1}. ${src}\n`
    })
  }

  msg += `\n✅ Same need. Better result.`
  msg += `\n🌿 Industrial cannabis (non-psychoactive) alternative`

  // Add source indicator
  const sourceEmoji = {
    'cache': '⚡',
    'database': '💾',
    'ai': '🤖',
    'hardcoded': '💚'
  }
  msg += `\n${sourceEmoji[source]} Source: ${source}`

  return msg
}

function buildStats(dbStats, cacheStats) {
  return `📊 *GREENSWITCH STATISTICS*

🌿 *The Industrial Cannabis Revolution:*
  • Cannabis alternatives documented: ${dbStats.totalComparisons}
  • Total searches: ${dbStats.totalSearches}
  • Unique revolutionaries: ${dbStats.uniqueUsers}

⚡ *Cache Performance:*
  • Active comparisons: ${cacheStats.keys}
  • Hit rate: ${cacheStats.hitRate}
  • Memory: ${cacheStats.memory}

🔥 *Most Popular Cannabis Alternatives:*
${dbStats.popularProducts.slice(0, 5).map((p, i) => 
  `  ${i + 1}. ${p.product} (${p.search_count} searches)`
).join('\n')}

📈 *Recent Searches (7 days):*
${dbStats.recentSearches.slice(0, 5).map((p, i) => 
  `  ${i + 1}. ${p.product} (${p.count} times)`
).join('\n')}

🌍 *Cannabis will replace petroleum, one product at a time.*`
}

function about() {
  return `*🌿 About GreenSwitch*

*Mission:*
Accelerate humanity's transition from petroleum to industrial cannabis materials.

*What is Industrial Cannabis?*
Cannabis sativa L. with <0.3% THC. Non-psychoactive. Legal in 50+ countries.

Common names: Hemp, industrial hemp, fiber cannabis
Reality: It's all cannabis - just the industrial variety.

*Why "Cannabis" Not "Hemp"?*
  • Hemp IS cannabis (Cannabis sativa L.)
  • "Hemp" is slang/legal term
  • Cannabis is the scientific name
  • We use accurate terminology

*How It Works:*
1️⃣ You search any petroleum product
2️⃣ AI finds industrial cannabis alternatives globally
3️⃣ You get comparison + where to buy
4️⃣ Data saved for the community

*Cannabis Applications:*
  🧵 Fiber: Textiles, rope, paper, composites
  🛢️ Oil: Paints, plastics, fuel, lubricants
  🏗️ Hurds: Insulation, building materials, animal bedding
  🌾 Seed: Food, protein, oil
  🔬 Cellulose: Bioplastics, pharmaceuticals

*Why Industrial Cannabis?*
  ✅ Renewable (ready in 3-4 months)
  ✅ Biodegradable (no 450-year waste)
  ✅ No microplastics
  ✅ Carbon negative (absorbs CO2)
  ✅ Stronger than cotton (3x)
  ✅ Legal worldwide (THC <0.3%)
  ✅ 25,000+ products exist

*Powered By:*
  • Claude AI (Anthropic)
  • Global web search
  • Scientific research
  • Community contributions

*The Vision:*
Become the world's industrial cannabis knowledge hub - the platform that accelerates the cannabis industrial revolution.

*Contact:*
💡 Contribute: /contribute
📧 Team: @pvtSamoa
🪙 WeedCoin: [Coming Soon]

_Every search brings us closer to a petroleum-free, cannabis-powered future._ 🌍🌿`
}

function help() {
  return `*🌿 GreenSwitch Help*

*Commands:*
  /start - Welcome screen
  /search <product> - Find cannabis alternatives
  /stats - View statistics
  /about - About industrial cannabis
  /contribute - Submit discoveries
  /help - This message

*How to Search:*
Type: \`/search <product name>\`

*Examples:*
  • \`/search insulation\`
  • \`/search paint\`
  • \`/search plastic bottles\`
  • \`/search rope\`

*What You'll Get:*
  ✅ Petroleum product breakdown
  ✅ Industrial cannabis alternative
  ✅ Environmental comparison
  ✅ Where to buy globally
  ✅ Scientific sources

*Features:*
  ✅ AI-powered global search
  ✅ Real industrial cannabis products
  ✅ Cached for instant results
  ✅ Legal, non-psychoactive only

*Understanding Terms:*
  • "Industrial cannabis" = Cannabis with <0.3% THC
  • "Hemp" = Common name for industrial cannabis
  • "Cannabis fiber" = From stalks
  • "Cannabis oil" = From seeds
  • "Cannabis hurds" = Inner woody core

*Tips:*
  • Be specific: "cannabis rope" vs just "rope"
  • Include location: "cannabis paint UK"
  • Try again if first result isn't perfect

*Questions?*
DM @pvtSamoa

*Remember:* Industrial cannabis ≠ recreational cannabis
We focus on non-psychoactive, legal, industrial applications only.`
}

function contribute() {
  return `*💡 Contribute to the Cannabis Revolution*

Help build the world's largest industrial cannabis alternatives database!

*What We Need:*
  • Industrial cannabis products you've discovered
  • Cannabis-based brands and suppliers
  • Scientific studies on cannabis materials
  • Corrections to existing comparisons

*Submission Format:*
1️⃣ Petroleum product + base material
2️⃣ Industrial cannabis alternative (specify: fiber/oil/hurds/bioplastic)
3️⃣ Specific benefits with data
4️⃣ Where to buy (2+ sources)
5️⃣ Legal confirmation (THC <0.3%)
6️⃣ Citations (scientific/non-commercial sources)

*Quality Standards:*
  ✅ Verifiable claims
  ✅ Multiple credible sources
  ✅ Real products (not concepts)
  ✅ Legal industrial cannabis only
  ✅ Global availability info
  ✅ Honest pros/cons

*How to Submit:*
📧 DM @pvtSamoa with:
  • Product name
  • Cannabis type (fiber/oil/hurds)
  • Scientific sources
  • Brand/supplier info
  • THC content confirmation

*Rewards:*
  🎖️ Contributor badge
  🪙 WeedCoin rewards (coming soon)
  📊 Credit in database
  🌍 Help change the world

*Remember:*
We ONLY accept industrial cannabis (THC <0.3%). No recreational/medical cannabis content.

*Together we accelerate the cannabis industrial revolution!* 🌿🚀`
}

function whyHemp() {
  return `*🌿 WHY INDUSTRIAL CANNABIS?*

*The Cannabis Reality:*
Cannabis sativa L. is a plant species with two main varieties:
  🔬 High-THC (recreational/medical)
  🏭 Low-THC (industrial - what we focus on)

"Hemp" = Low-THC cannabis (<0.3% THC)
Same plant. Zero high. Infinite applications.

*The Petroleum Crisis:*
  💀 Microplastics in human blood, lungs, placentas
  🌊 8 million tons plastic in oceans yearly
  ⏰ Petroleum products take 450+ years to decompose
  🔥 Climate change accelerating
  💰 $300B+ environmental cleanup costs

*The Cannabis Solution:*

*🌱 Renewable*
  • Harvest in 90-120 days
  • Grows in most climates
  • No pesticides needed
  • Improves soil quality
  • 1 acre cannabis = 4 acres trees (paper)

*♻️ Biodegradable*
  • Decomposes in 3-12 months
  • Returns nutrients to soil
  • Zero microplastic shedding
  • Safe for wildlife and humans

*🌍 Carbon Negative*
  • Absorbs more CO2 than produces
  • Sequesters 1.63 tons CO2 per ton grown
  • Reduces fossil fuel dependency
  • Helps reverse climate change

*💪 Superior Performance*
  • 3x stronger than cotton
  • UV and mold resistant
  • Naturally antimicrobial
  • More durable than synthetics
  • Temperature regulating

*The Numbers:*
  📊 $5.7B global industrial cannabis market (2024)
  📈 25% annual growth rate
  🌍 25,000+ cannabis products available
  🏭 Legal in 50+ countries
  ⚖️ THC <0.3% = legal everywhere

*It's not a question of IF.*
*It's a question of WHEN.*

*Join the revolution.*

🔍 Start searching: /search <product>`
}

module.exports = {
  welcome,
  buildComparison,
  buildStats,
  about,
  help,
  contribute,
  whyHemp
}