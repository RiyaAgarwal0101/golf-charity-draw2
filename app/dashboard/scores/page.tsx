// // app/dashboard/scores/page.tsx
// import { createClient } from '@/lib/supabase'
// import ScoreForm from '@/components/forms/ScoreForm'

// export default async function ScoresPage() {
//   const supabase = createClient()
//   const { data: { user } } = await supabase.auth.getUser()

//   if (!user) return <div>Unauthorized</div>

//   const { data: scores } = await supabase
//     .from('scores')
//     .select('*')
//     .eq('user_id', user.id)
//     .order('recorded_at', { ascending: false })

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="mb-6 text-2xl font-bold">Your Scores</h2>
//       <ScoreForm userId={user.id} />
//       <div className="mt-6 space-y-2">
//         {scores?.map((s) => (
//           <div
//             key={s.id}
//             className="flex items-center justify-between rounded border px-4 py-2"
//           >
//             <span>Score: {s.value}</span>
//             <span>Recorded: {new Date(s.recorded_at).toLocaleDateString()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }
import { createSupabaseServerClient } from '@/lib/supabase/server'
import ScoreForm from '@/components/forms/ScoreForm'
import { redirect } from 'next/navigation'

export default async function ScoresPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login') // better than "Unauthorized"
  }

  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('recorded_at', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Your Scores</h2>
      <ScoreForm userId={user.id} />

      <div className="mt-6 space-y-2">
        {scores?.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded border px-4 py-2"
          >
            <span>Score: {s.value}</span>
            <span>
              Recorded: {new Date(s.recorded_at).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}