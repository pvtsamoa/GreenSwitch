import { cache } from './cache.js'
import { db } from './database.js'
import { generateComparison } from './ai.js'
import { rateLimit } from './rateLimit.js'

// Hardcoded comparisons (same as bot)
const hardcodedComparisons = [
  {
    keywords: ['plastic bottle', 'water bottle', 'bottle'],
    data: {
      title: 'Plastic Water Bottle',
      emoji: '🥤',
      petroleum: {
        product: 'PET Plastic Bottle',
        material: 'Polyethylene terephthalate (PET)',
        downsides: [
          'Takes 450+ years to decompose',
          'Releases microplastics into water',
          'Made from fossil fuels',
          'Single-use pollution'
        ]
      },
      cannabis: {
        product: 'Hemp Plastic Bottle',
        benefits: [
          'Biodegradable in 3-6 months',
          'No microplastic shedding',
          'Renewable hemp fiber',
          'Carbon negative production'
        ],
        brands: ['Eco Hemp', 'Greenware', 'Living Green'],
        sources: ['hempplastic.com', 'greenwarehome.com']
      }
    }
  },
  // Add more hardcoded comparisons here...
]

export async function searchHandler(term, userId = 'web-user', username = 'web-user') {
  const startTime = Date.now()

  // Rate limiting
  if (!(await rateLimit.check(userId))) {
    return { error: 'Rate limited. Please wait a few seconds.' }
  }

  let comparison = null
  let source = 'cache'
  let cost = 0

  // STEP 1: Cache check
  comparison = await cache.get(term)

  if (!comparison) {
    // STEP 2: Hardcoded list
    const lowerTerm = term.toLowerCase()
    const hardcoded = hardcodedComparisons.find(comp =>
      comp.keywords.some(kw => lowerTerm.includes(kw))
    )

    if (hardcoded) {
      comparison = hardcoded.data
      source = 'hardcoded'
      await cache.set(term, comparison)
    }
  }

  if (!comparison) {
    // STEP 3: Database lookup
    comparison = await db.getComparison(term)
    if (comparison) {
      source = 'database'
      await cache.set(term, comparison)
    }
  }

  if (!comparison) {
    // STEP 4: AI generation
    source = 'ai'
    const aiResult = await generateComparison(term)

    if (!aiResult.success) {
      throw new Error(aiResult.error)
    }

    comparison = aiResult.data
    cost = aiResult.cost

    // Save to database and cache
    await db.saveComparison(term, comparison, source)
    await cache.set(term, comparison)
  }

  const responseTime = Date.now() - startTime

  // Log search
  await db.logSearch(userId, username, term, null, true, responseTime, cost)

  return {
    comparison,
    source,
    responseTime,
    cost
  }
}