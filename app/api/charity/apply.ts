// app/api/charity/apply.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return res.status(401).json({ error: 'Unauthorized' })

  const body = await req.json()
  const { charity_id, contribution_percent } = body

  if (!charity_id || contribution_percent < 10) {
    return res.status(400).json({
      error: 'Invalid charity or contribution (min 10%)',
    })
  }

  const { data, error } = await supabase
    .from('user_charity_prefs')
    .upsert({
      user_id: user.id,
      charity_id,
      contribution_percent,
    })

  if (error) return res.status(500).json({ error: error.message })

  return res.status(200).json({ message: 'Charity preference saved' })
}

export const config = { api: { bodyParser: true } }