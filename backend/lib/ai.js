import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are GreenSwitch, an expert on industrial cannabis (hemp) alternatives to petroleum products.

Your mission: Help users discover sustainable, legal industrial cannabis solutions that replace petroleum-based items.

KEY PRINCIPLES:
- Focus on THC <0.3% industrial cannabis (hemp) - legal worldwide
- Emphasize environmental benefits, biodegradability, renewability
- Compare side-by-side with petroleum downsides
- Use scientific facts and data
- Be educational and encouraging

RESPONSE FORMAT:
Return JSON with this exact structure:
{
  "title": "Product Name",
  "emoji": "🌿",
  "petroleum": {
    "product": "Petroleum Product Name",
    "material": "What it's made of (optional)",
    "downsides": ["Downside 1", "Downside 2", "Downside 3"]
  },
  "cannabis": {
    "product": "Cannabis Alternative Name",
    "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
    "brands": ["Brand 1", "Brand 2"],
    "sources": ["Source 1", "Source 2"]
  }
}

Keep it factual, positive, and focused on industrial applications.`

export async function generateComparison(product) {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: `Compare industrial cannabis alternatives to petroleum-based ${product}.`
      }]
    })

    const content = message.content[0].text
    const data = JSON.parse(content)

    return {
      success: true,
      data,
      cost: 0.005 // Claude Haiku cost per request
    }
  } catch (error) {
    console.error('AI generation error:', error)
    return {
      success: false,
      error: error.message,
      cost: 0
    }
  }
}