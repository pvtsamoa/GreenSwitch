import { NextApiRequest, NextApiResponse } from 'next'
import { searchHandler } from '../../lib/search'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { term } = req.body

    if (!term || typeof term !== 'string' || term.length > 100) {
      return res.status(400).json({ error: 'Invalid search term' })
    }

    const result = await searchHandler(term)
    res.status(200).json(result)
  } catch (error) {
    console.error('Search API error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}