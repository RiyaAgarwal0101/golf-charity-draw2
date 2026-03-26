// // // // // // app/dashboard/page.tsx
// // // // // import { createClient } from '@/lib/supabase'

// // // // // export default async function DashboardPage() {
// // // // //   const supabase = createClient()
// // // // //   const { data: { user } } = await supabase.auth.getUser()

// // // // //   if (!user) return <div>Unauthorized</div>

// // // // //   const { data: scores } = await supabase
// // // // //     .from('scores')
// // // // //     .select('*', { count: 'exact' })
// // // // //     .eq('user_id', user.id)

// // // // //   const { data: prefs } = await supabase
// // // // //     .from('user_charity_prefs')
// // // // //     .select('*')
// // // // //     .eq('user_id', user.id)
// // // // //     .single()

// // // // //   const { count: totalScores } = scores || { count: 0 }

// // // // //   return (
// // // // //     <div className="container mx-auto px-4 py-8">
// // // // //       <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
// // // // //       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
// // // // //         <div className="rounded border p-6">
// // // // //           <h2 className="mb-2 text-xl font-semibold">Your Subscription</h2>
// // // // //           <p>Status: Active</p>
// // // // //           <p>Next renewal: 2026-04-01</p>
// // // // //         </div>
// // // // //         <div className="rounded border p-6">
// // // // //           <h2 className="mb-2 text-xl font-semibold">Charity Support</h2>
// // // // //           <p>Charity: {prefs?.charity_id ? 'Selected' : 'None yet'}</p>
// // // // //           <p>Contribution: {prefs?.contribution_percent ?? 'N/A'}%</p>
// // // // //         </div>
// // // // //       </div>
// // // // //       <div className="rounded border p-6">
// // // // //         <h2 className="mb-3 text-xl font-semibold">Scores</h2>
// // // // //         <p>Recent scores: {totalScores}</p>
// // // // //         <a
// // // // //           href="/dashboard/scores"
// // // // //           className="text-blue-600 underline"
// // // // //         >
// // // // //           Manage Scores
// // // // //         </a>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }
// // // // // app/dashboard/page.tsx
// // // // import { cookies } from 'next/headers'
// // // // import { createRouteHandlerClient } from '@supabase/ssr'
// // // // import { redirect } from 'next/navigation'

// // // // export default async function DashboardPage() {
// // // //   const supabase = createRouteHandlerClient({ cookies })
// // // //   const { data: { user } } = await supabase.auth.getUser()

// // // //   if (!user) {
// // // //     redirect('/login')
// // // //   }

// // // //   // Fetch user scores (last 5)
// // // //   const { data: scores } = await supabase
// // // //     .from('scores')
// // // //     .select('*', { count: 'exact' })
// // // //     .eq('user_id', user.id)
// // // //     .order('recorded_at', { ascending: false })
// // // //     .limit(5)

// // // //   // Fetch charity preference
// // // //   const { data: prefs } = await supabase
// // // //     .from('user_charity_prefs')
// // // //     .select('*')
// // // //     .eq('user_id', user.id)
// // // //     .single()

// // // //   const totalScores = scores?.length || 0

// // // //   return (
// // // //     <div className="container mx-auto px-4 py-8">
// // // //       <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
// // // //       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
// // // //         <div className="rounded border p-6">
// // // //           <h2 className="mb-2 text-xl font-semibold">Your Subscription</h2>
// // // //           <p>Status: Active</p>
// // // //           <p>Next renewal: 2026-04-01</p>
// // // //         </div>
// // // //         <div className="rounded border p-6">
// // // //           <h2 className="mb-2 text-xl font-semibold">Charity Support</h2>
// // // //           <p>
// // // //             Charity:{' '}
// // // //             {prefs?.charity_id ? 'Selected' : 'None yet'}
// // // //           </p>
// // // //           <p>
// // // //             Contribution: {prefs?.contribution_percent ?? 'N/A'}%
// // // //           </p>
// // // //         </div>
// // // //       </div>

// // // //       <div className="rounded border p-6">
// // // //         <h2 className="mb-3 text-xl font-semibold">Scores</h2>
// // // //         <p>Recent scores: {totalScores}</p>
// // // //         <a href="/dashboard/scores" className="text-blue-600 underline">
// // // //           Manage Scores
// // // //         </a>
// // // //         <ul className="mt-3 space-y-2">
// // // //           {scores?.map((s) => (
// // // //             <li key={s.id} className="text-sm">
// // // //               {s.value} points on{' '}
// // // //               {new Date(s.recorded_at).toLocaleDateString()}
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }
// // // // app/dashboard/page.tsx
// // // import { createServerClient } from '@/app/lib/supabase/server'

// // // export default async function DashboardPage() {
// // //   const supabase = createServerClient()
// // //   const { data: { user } } = await supabase.auth.getUser()

// // //   if (!user) {
// // //     // Force client‑side redirect (you can also use redirect() in a server‑only file)
// // //     return (
// // //       <div className="container mx-auto px-4 py-8">
// // //         <p>Unauthorized. <a href="/login" className="text-blue-600 underline">Go to login</a>.</p>
// // //       </div>
// // //     )
// // //   }

// // //   const { data: scores } = await supabase
// // //     .from('scores')
// // //     .select('*', { count: 'exact' })
// // //     .eq('user_id', user.id)
// // //     .order('recorded_at', { ascending: false })
// // //     .limit(5)

// // //   const { data: prefs } = await supabase
// // //     .from('user_charity_prefs')
// // //     .select('*')
// // //     .eq('user_id', user.id)
// // //     .single()

// // //   const totalScores = scores?.length || 0

// // //   return (
// // //     <div className="container mx-auto px-4 py-8">
// // //       <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
// // //       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
// // //         <div className="rounded border p-6">
// // //           <h2 className="mb-2 text-xl font-semibold">Your Subscription</h2>
// // //           <p>Status: Active</p>
// // //           <p>Next renewal: 2026-04-01</p>
// // //         </div>
// // //         <div className="rounded border p-6">
// // //           <h2 className="mb-2 text-xl font-semibold">Charity Support</h2>
// // //           <p>
// // //             Charity: {prefs?.charity_id ? 'Selected' : 'None yet'}
// // //           </p>
// // //           <p>
// // //             Contribution: {prefs?.contribution_percent ?? 'N/A'}%
// // //           </p>
// // //         </div>
// // //       </div>

// // //       <div className="rounded border p-6">
// // //         <h2 className="mb-3 text-xl font-semibold">Scores</h2>
// // //         <p>Recent scores: {totalScores}</p>
// // //         <a href="/dashboard/scores" className="text-blue-600 underline">
// // //           Manage Scores
// // //         </a>
// // //         <ul className="mt-3 space-y-2">
// // //           {scores?.map((s) => (
// // //             <li key={s.id} className="text-sm">
// // //               {s.value} points on {new Date(s.recorded_at).toLocaleDateString()}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   )
// // // }
// // // app/dashboard/page.tsx
// // import { createSupabaseServerClient } from '@/app/lib/supabase/server'

// // export default async function DashboardPage() {
// //   const supabase = createSupabaseServerClient()
// //   const { data: { user } } = await supabase.auth.getUser()

// //   if (!user) {
// //     return (
// //       <div className="container mx-auto px-4 py-8">
// //         <p>Unauthorized. <a href="/login" className="text-blue-600 underline">Go to login</a>.</p>
// //       </div>
// //     )
// //   }

// //   const { data: scores } = await supabase
// //     .from('scores')
// //     .select('*', { count: 'exact' })
// //     .eq('user_id', user.id)
// //     .order('recorded_at', { ascending: false })
// //     .limit(5)

// //   const { data: prefs } = await supabase
// //     .from('user_charity_prefs')
// //     .select('*')
// //     .eq('user_id', user.id)
// //     .single()

// //   const totalScores = scores?.length || 0

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
// //       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
// //         <div className="rounded border p-6">
// //           <h2 className="mb-2 text-xl font-semibold">Your Subscription</h2>
// //           <p>Status: Active</p>
// //           <p>Next renewal: 2026-04-01</p>
// //         </div>
// //         <div className="rounded border p-6">
// //           <h2 className="mb-2 text-xl font-semibold">Charity Support</h2>
// //           <p>
// //             Charity: {prefs?.charity_id ? 'Selected' : 'None yet'}
// //           </p>
// //           <p>
// //             Contribution: {prefs?.contribution_percent ?? 'N/A'}%
// //           </p>
// //         </div>
// //       </div>

// //       <div className="rounded border p-6">
// //         <h2 className="mb-3 text-xl font-semibold">Scores</h2>
// //         <p>Recent scores: {totalScores}</p>
// //         <a href="/dashboard/scores" className="text-blue-600 underline">
// //           Manage Scores
// //         </a>
// //         <ul className="mt-3 space-y-2">
// //           {scores?.map((s) => (
// //             <li key={s.id} className="text-sm">
// //               {s.value} points on {new Date(s.recorded_at).toLocaleDateString()}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>
// //     </div>
// //   )
// // }
// // import { createSupabaseServerClient } from '@/lib/supabase/server'
// import { createSupabaseServerClient } from '@/lib/supabase/server'
// import { redirect } from 'next/navigation'

// export default async function DashboardPage() {
//   // const supabase = createSupabaseServerClient()
//    const supabase = await createSupabaseServerClient()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   // ✅ AUTO redirect if not logged in
//   if (!user) {
//     redirect('/login')
//   }

//   const { data: scores } = await supabase
//     .from('scores')
//     .select('*')
//     .eq('user_id', user.id)
//     .order('recorded_at', { ascending: false })
//     .limit(5)

//   const { data: prefs } = await supabase
//     .from('user_charity_prefs')
//     .select('*')
//     .eq('user_id', user.id)
//     .single()

//   const totalScores = scores?.length || 0

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
//         <div className="rounded border p-6">
//           <h2 className="mb-2 text-xl font-semibold">Your Subscription</h2>
//           <p>Status: Active</p>
//           <p>Next renewal: 2026-04-01</p>
//         </div>

//         <div className="rounded border p-6">
//           <h2 className="mb-2 text-xl font-semibold">Charity Support</h2>
//           <p>
//             Charity: {prefs?.charity_id ? 'Selected' : 'None yet'}
//           </p>
//           <p>
//             Contribution: {prefs?.contribution_percent ?? 'N/A'}%
//           </p>
//         </div>
//       </div>

//       <div className="rounded border p-6">
//         <h2 className="mb-3 text-xl font-semibold">Scores</h2>
//         <p>Recent scores: {totalScores}</p>

//         <a href="/dashboard/scores" className="text-blue-600 underline">
//           Manage Scores
//         </a>

//         <ul className="mt-3 space-y-2">
//           {scores?.map((s) => (
//             <li key={s.id} className="text-sm">
//               {s.value} points on{' '}
//               {new Date(s.recorded_at).toLocaleDateString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }
// app/dashboard/page.tsx
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Auto redirect if not logged in
  if (!user) {
    redirect('/login')
  }

  const { data: scores } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.id)
    .order('recorded_at', { ascending: false })
    .limit(5)

  const { data: prefs } = await supabase
    .from('user_charity_prefs')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const totalScores = scores?.length || 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded border p-6">
          <h2 className="mb-2 text-xl font-semibold">Your Subscription</h2>
          <p>Status: Active</p>
          <p>Next renewal: 2026-04-01</p>
        </div>

        <div className="rounded border p-6">
          <h2 className="mb-2 text-xl font-semibold">Charity Support</h2>
          <p>Charity: {prefs?.charity_id ? 'Selected' : 'None yet'}</p>
          <p>Contribution: {prefs?.contribution_percent ?? 'N/A'}%</p>
        </div>
      </div>

      <div className="rounded border p-6">
        <h2 className="mb-3 text-xl font-semibold">Scores</h2>
        <p>Recent scores: {totalScores}</p>

        <a href="/dashboard/scores" className="text-blue-600 underline">
          Manage Scores
        </a>

        <ul className="mt-3 space-y-2">
          {scores?.map((s) => (
            <li key={s.id} className="text-sm">
              {s.value} points on {new Date(s.recorded_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}