// app/api/charity/apply.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { SupabaseClient, createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // use service role for server
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  try {
    const { charity_id, contribution_percent, user_id } = req.body

    if (!user_id) return res.status(401).json({ error: 'Unauthorized' })
    if (!charity_id || contribution_percent < 10)
      return res.status(400).json({ error: 'Invalid charity or contribution (min 10%)' })

    const { error } = await supabase.from('user_charity_prefs').upsert({
      user_id,
      charity_id,
      contribution_percent,
    })

    if (error) return res.status(500).json({ error: error.message })

    return res.status(200).json({ message: 'Charity preference saved' })
  } catch (err) {
    return res.status(500).json({ error: (err as Error).message })
  }
}
