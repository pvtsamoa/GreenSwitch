const Anthropic = require('@anthropic-ai/sdk')
const config = require('../config/config')
const logger = require('../utils/logger')
const searchService = require('./search')

const anthropic = new Anthropic({
  apiKey: config.ai.anthropic.apiKey
})

/**
 * Generate a hemp vs petroleum comparison using AI
 * @param {string} product - Product to search for
 * @param {string} location - Optional location
 * @returns {Promise<Object>} Comparison data
 */
async function generateComparison(product, location = null) {
  try {
    logger.info(`AI: Generating comparison for "${product}"${location ? ` in ${location}` : ''}`)

    // Step 1: Get web search results (if enabled)
    let searchContext = ''
    if (config.search.enabled) {
      const searchResults = await searchService.search(product, location)
      if (searchResults) {
        searchContext = `\n\nWeb Search Results:\n${searchResults}`
      }
    }

    // Step 2: Generate comparison with Claude
    const message = await anthropic.messages.create({
      model: config.ai.anthropic.model,
      max_tokens: config.ai.anthropic.maxTokens,
      system: config.prompts.system,
      messages: [{
        role: 'user',
        content: `Generate a hemp vs petroleum comparison for: "${product}"${location ? ` (Location: ${location})` : ''}

Requirements:
1. Identify the petroleum product and material
2. List 3-4 specific downsides (with data/numbers)
3. Identify the hemp alternative
4. List 3-4 specific benefits (with data/numbers)
5. List 2-3 brands/suppliers (with regions if known)
6. Keep it concise but informative

${searchContext}

Format as JSON:
{
  "title": "Product Name & Category",
  "emoji": "🔥",
  "petroleum": {
    "product": "Product name",
    "material": "Base material",
    "downsides": ["Downside 1", "Downside 2", "Downside 3"]
  },
  "hemp": {
    "product": "Hemp alternative name",
    "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"]
  },
  "brands": [
    {"name": "Brand 1", "region": "USA", "url": "example.com"},
    {"name": "Brand 2", "region": "EU", "url": "example.com"}
  ],
  "sources": ["url1", "url2"],
  "note": "Additional context"
}`
      }]
    })

    // Parse AI response
    const responseText = message.content[0].text
    
    // Extract JSON (Claude might add explanation before/after)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in AI response')
    }

    const comparison = JSON.parse(jsonMatch[0])
    
    logger.success(`AI: Generated comparison for "${product}"`)
    
    return {
      success: true,
      data: comparison,
      cost: config.costs.aiPerRequest
    }

  } catch (error) {
    logger.error('AI generation error:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Ask AI a follow-up question about a comparison
 * @param {string} question - User's question
 * @param {Object} context - Previous comparison data
 * @returns {Promise<string>} AI response
 */
async function askFollowUp(question, context) {
  try {
    const message = await anthropic.messages.create({
      model: config.ai.anthropic.model,
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: `Context: ${JSON.stringify(context)}

User question: ${question}

Provide a brief, helpful answer.`
      }]
    })

    return message.content[0].text

  } catch (error) {
    logger.error('AI follow-up error:', error)
    return 'Sorry, I encountered an error processing your question.'
  }
}

module.exports = {
  generateComparison,
  askFollowUp
}