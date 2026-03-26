// app/api/charity/apply.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  try {
    const { charity_id, contribution_percent } = req.body

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) throw userError
    if (!user) return res.status(401).json({ error: 'Unauthorized' })

    if (!charity_id || contribution_percent < 10) {
      return res.status(400).json({ error: 'Invalid charity or contribution (min 10%)' })
    }

    const { error: dbError } = await supabase.from('user_charity_prefs').upsert({
      user_id: user.id,
      charity_id,
      contribution_percent,
    })

    if (dbError) return res.status(500).json({ error: dbError.message })

    return res.status(200).json({ message: 'Charity preference saved' })
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message })
  }
}
