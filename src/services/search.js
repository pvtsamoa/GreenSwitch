const axios = require('axios')
const config = require('../config/config')
const logger = require('../utils/logger')

/**
 * Search the web for hemp product information
 * @param {string} product - Product to search
 * @param {string} location - Optional location
 * @returns {Promise<string>} Formatted search results
 */
async function search(product, location = null) {
  if (!config.search.enabled) {
    return null
  }

  try {
    const query = buildSearchQuery(product, location)
    logger.info(`Web Search: "${query}"`)

    let results = []

    // Try SerpAPI first (if configured)
    if (config.search.provider === 'serp' && config.search.serpApi.apiKey) {
      results = await searchWithSerpApi(query)
    }
    // Fallback to Google Custom Search
    else if (config.search.provider === 'google' && config.search.google.apiKey) {
      results = await searchWithGoogle(query)
    }

    if (results.length === 0) {
      return null
    }

    // Format results for AI
    const formatted = results.slice(0, 5).map((r, i) => 
      `[${i + 1}] ${r.title}\n${r.snippet}\nSource: ${r.url}\n`
    ).join('\n')

    logger.success(`Web Search: Found ${results.length} results`)
    return formatted

  } catch (error) {
    logger.error('Web search error:', error.message)
    return null
  }
}

/**
 * Build optimized search query
 */
function buildSearchQuery(product, location) {
  let query = `hemp alternative to ${product} vs petroleum`
  
  if (location) {
    query += ` ${location}`
  }
  
  // Add useful keywords
  query += ' biodegradable microplastics environment'
  
  return query
}

/**
 * Search using SerpAPI
 */
async function searchWithSerpApi(query) {
  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        q: query,
        api_key: config.search.serpApi.apiKey,
        num: 5
      },
      timeout: 8000
    })

    return (response.data.organic_results || []).map(r => ({
      title: r.title,
      snippet: r.snippet,
      url: r.link
    }))

  } catch (error) {
    logger.error('SerpAPI error:', error.message)
    return []
  }
}

/**
 * Search using Google Custom Search
 */
async function searchWithGoogle(query) {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: config.search.google.apiKey,
        cx: config.search.google.engineId,
        q: query,
        num: 5
      },
      timeout: 8000
    })

    return (response.data.items || []).map(r => ({
      title: r.title,
      snippet: r.snippet,
      url: r.link
    }))

  } catch (error) {
    logger.error('Google Search error:', error.message)
    return []
  }
}

module.exports = {
  search
}