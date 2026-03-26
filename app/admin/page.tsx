// // // // // app/admin/page.tsx
// // // // import { createClient } from '@/lib/supabase'

// // // // export default async function AdminPage() {
// // // //   const supabase = createClient()
// // // //   const { data: { user } } = await supabase.auth.getUser()

// // // //   if (!user || user.role !== 'admin') return <div>Forbidden</div>

// // // //   return (
// // // //     <div className="container mx-auto px-4 py-8">
// // // //       <h1 className="mb-6 text-3xl font-bold">Admin Panel</h1>
// // // //       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
// // // //         <div className="rounded border p-6">
// // // //           <h2 className="mb-2 text-xl font-semibold">User Management</h2>
// // // //           <a href="/admin/users" className="text-blue-600 underline">
// // // //             Manage Users
// // // //           </a>
// // // //         </div>
// // // //         <div className="rounded border p-6">
// // // //           <h2 className="mb-2 text-xl font-semibold">Draw Management</h2>
// // // //           <a href="/admin/draws" className="text-blue-600 underline">
// // // //             Monthly Draws
// // // //           </a>
// // // //         </div>
// // // //         <div className="rounded border p-6">
// // // //           <h2 className="mb-2 text-xl font-semibold">Charity Management</h2>
// // // //           <a href="/admin/charities" className="text-blue-600 underline">
// // // //             Charities
// // // //           </a>
// // // //         </div>
// // // //         <div className="rounded border p-6">
// // // //           <h2 className="mb-2 text-xl font-semibold">Winner Verification</h2>
// // // //           <a href="/admin/winners" className="text-blue-600 underline">
// // // //             Winners
// // // //           </a>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }
// // // import { createSupabaseServerClient } from '@/lib/supabase/server'
// // // import { redirect } from 'next/navigation'

// // // export default async function AdminPage() {
// // //   const supabase = await createSupabaseServerClient()

// // //   const {
// // //     data: { user },
// // //   } = await supabase.auth.getUser()

// // //   if (!user) {
// // //     redirect('/login')
// // //   }

// // //   const { data: profile } = await supabase
// // //     .from('profiles')
// // //     .select('role')
// // //     .eq('id', user.id)
// // //     .single()

// // //   if (profile?.role !== 'admin') {
// // //     return <div>Forbidden</div>
// // //   }

// // //   return (
// // //     <div>Admin Panel</div>
// // //   )
// // // }
// // import { createSupabaseServerClient } from '@/lib/supabase/server'
// // import { redirect } from 'next/navigation'

// // export default async function AdminPage() {
// //   const supabase = await createSupabaseServerClient()

// //   const {
// //     data: { user },
// //   } = await supabase.auth.getUser()

// //   if (!user) {
// //     redirect('/login')
// //   }

// //   const { data: dbUser } = await supabase
// //     .from('users') // ✅ correct table
// //     .select('role')
// //     .eq('id', user.id)
// //     .single()

// //   if (dbUser?.role !== 'admin') {
// //     return <div>Forbidden</div>
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="mb-6 text-3xl font-bold">Admin Panel</h1>
// //       <p>Welcome admin 👑</p>
// //     </div>
// //   )
// // }
// export default async function AdminPage() {
//   const supabase = await createSupabaseServerClient()

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   if (!user) redirect('/login')

//   const { data: dbUser } = await supabase
//     .from('users')
//     .select('role')
//     .eq('id', user.id)
//     .single()

//   if (!dbUser) redirect('/login') // extra safety

//   if (dbUser.role !== 'admin') {
//     redirect('/dashboard') // better UX than "Forbidden"
//   }

//   return (
//     <div>
//       <h1>Admin Panel</h1>
//     </div>
//   )
// }
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ✅ Only check login (same as dashboard)
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Panel</h1>
      <p>Welcome 👋</p>
    </div>
  )
}