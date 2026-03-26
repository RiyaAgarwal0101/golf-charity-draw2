// app/api/draw/run-draw.ts
import { NextRequest } from 'next/server'
import { createClient } from '@/lib/auth'

type User = {
  id: string
  role: string
}

type Subscription = {
  user_id: string
  price: number
}

type Draw = {
  id: string
  month: string
  status: string
  jackpot_rollover: number
}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Only allow admin
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const now = new Date()
  const month = new Date(now.getFullYear(), now.getMonth(), 1)

  // 1. Get active subscribers
  const { data: subs, error: subErr } = await supabase
    .from('subscriptions')
    .select('user_id, price')
    .eq('status', 'active')

  if (subErr) return Response.json({ error: subErr.message }, { status: 500 })

  const activeSubs: Subscription[] = subs || []

  const totalPool = activeSubs.reduce((acc: number, s: Subscription) => acc + s.price, 0)

  // 2. Get last draw (for rollover)
  const { data: lastDrawData, error: lastDrawErr } = await supabase
    .from('draws')
    .select('jackpot_rollover')
    .order('month', { ascending: false })
    .limit(1)

  if (lastDrawErr) return Response.json({ error: lastDrawErr.message }, { status: 500 })

  const jackpotBase = totalPool * 0.4
  const jackpot =
    lastDrawData && lastDrawData.length > 0
      ? lastDrawData[0].jackpot_rollover + jackpotBase
      : jackpotBase

  // 3. Create this month’s draw
  const { data: drawData, error: drawErr } = await supabase
    .from('draws')
    .insert({
      month,
      status: 'pending',
      jackpot_rollover: 0,
    })
    .select()
    .single()

  if (drawErr || !drawData) return Response.json({ error: drawErr?.message || 'Draw creation failed' }, { status: 500 })

  const draw: Draw = drawData

  // 4. For each subscriber, pick 5 numbers (1–45) and save
  for (const sub of activeSubs) {
    const userNumbers: number[] = []

    while (userNumbers.length < 5) {
      const n = Math.floor(Math.random() * 45) + 1
      if (!userNumbers.includes(n)) userNumbers.push(n)
    }

    await supabase.from('draw_results').insert({
      draw_id: draw.id,
      user_id: sub.user_id,
      numbers: userNumbers.map(String),
    })
  }

  // 5. Run simulation / publish logic here (match 3/4/5, calc payouts, etc.)

  return Response.json({ ok: true, jackpot })
}
