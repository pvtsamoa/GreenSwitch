import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database operations
export const db = {
  async getComparison(term) {
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .eq('term', term.toLowerCase())
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw error
    }

    return data
  },

  async saveComparison(term, comparison, source) {
    const { data, error } = await supabase
      .from('comparisons')
      .upsert({
        term: term.toLowerCase(),
        data: comparison,
        source,
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString()
      })

    if (error) throw error
    return data
  },

  async logSearch(userId, username, term, comparisonId, success, responseTime, cost) {
    const { error } = await supabase
      .from('searches')
      .insert({
        user_id: userId,
        username,
        term,
        comparison_id: comparisonId,
        success,
        response_time: responseTime,
        cost,
        source: 'web', // or 'bot'
        created_at: new Date().toISOString()
      })

    if (error) console.error('Failed to log search:', error)
  }
}