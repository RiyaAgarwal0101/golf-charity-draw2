// app/api/draw/run-draw.ts
import { NextRequest } from 'next/server'
import { createClient } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Only allow admin
  if (!user || user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const now = new Date()
  const month = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthStr = month.toISOString().split('T')[0]

  // 1. Get active subscribers
  const { data: subs, error: subErr } = await supabase
    .from('subscriptions')
    .select('user_id, price')
    .eq('status', 'active')

  if (subErr) return Response.json({ error: subErr.message }, { status: 500 })

  const totalPool = subs.reduce((acc, s) => acc + s.price, 0)

  // 2. Get last draw (for rollover)
  const { data: lastDraw } = await supabase
    .from('draws')
    .select('*')
    .order('month', { ascending: false })
    .limit(1)

  const jackpotBase = totalPool * 0.4
  const jackpot = lastDraw?.length ? lastDraw[0].jackpot_rollover + jackpotBase : jackpotBase

  // 3. Create this month’s draw
  const { data: draw, error: drawErr } = await supabase
    .from('draws')
    .insert({
      month,
      status: 'pending',
      jackpot_rollover: 0,
    })
    .select()
    .single()

  if (drawErr) return Response.json({ error: drawErr.message }, { status: 500 })

  // 4. For each subscriber, pick 5 numbers (1–45) and save
  for (const sub of subs) {
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

  return Response.json({ ok: true })
}