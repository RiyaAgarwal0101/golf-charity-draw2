// // app/api/score/upsert.ts
// import { NextRequest } from 'next/server'
// import { createClient } from '@/lib/auth'

// export async function POST(req: NextRequest) {
//   const supabase = createClient()
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) {
//     return Response.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const { value, recorded_at } = await req.json()

//   if (value < 1 || value > 45) {
//     return Response.json({ error: 'Score must be between 1 and 45' }, { status: 400 })
//   }

//   // Insert new score
//   const { data: newScore, error: insErr } = await supabase
//     .from('scores')
//     .insert({ user_id: user.id, value, recorded_at })
//     .select()
//     .single()

//   if (insErr) return Response.json({ error: insErr.message }, { status: 500 })

//   // Keep only latest 5 scores
//   const { data: scores, error: listErr } = await supabase
//     .from('scores')
//     .select('id')
//     .eq('user_id', user.id)
//     .order('recorded_at', { ascending: false })

//   if (listErr) return Response.json({ error: listErr.message }, { status: 500 })

//   if (scores.length > 5) {
//     const deleteIds = scores.slice(5).map((s) => s.id)
//     await supabase.from('scores').delete().in('id', deleteIds)
//   }

//   return Response.json({ score: newScore })
// }
// app/api/score/upsert/route.ts  ⚠️ also fix file location
import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { value, recorded_at } = await req.json()

  if (value < 1 || value > 45) {
    return NextResponse.json(
      { error: 'Score must be between 1 and 45' },
      { status: 400 }
    )
  }

  // ✅ FIX timestamp issue
  const timestamp = recorded_at
    ? new Date(recorded_at).toISOString()
    : new Date().toISOString()

  // Insert new score
  const { data: newScore, error: insErr } = await supabase
    .from('scores')
    .insert({
      user_id: user.id,
      value,
      recorded_at: timestamp,
    })
    .select()
    .single()

  if (insErr) {
    console.error('INSERT ERROR:', insErr)
    return NextResponse.json({ error: insErr.message }, { status: 500 })
  }

  // Keep only latest 5 scores
  const { data: scores, error: listErr } = await supabase
    .from('scores')
    .select('id')
    .eq('user_id', user.id)
    .order('recorded_at', { ascending: false })

  if (listErr) {
    console.error('LIST ERROR:', listErr)
    return NextResponse.json({ error: listErr.message }, { status: 500 })
  }

  if (scores.length > 5) {
    const deleteIds = scores.slice(5).map((s) => s.id)
    await supabase.from('scores').delete().in('id', deleteIds)
  }

  return NextResponse.json({ score: newScore })
}