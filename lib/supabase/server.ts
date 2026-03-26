// // // lib/supabase/server.ts

// // import { createServerClient } from '@supabase/ssr'
// // import { cookies } from 'next/headers'

// // export const createSupabaseServerClient = () => {
// //   const cookieStore = cookies()

// //   return createServerClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// //     {
// //       cookies: {
// //         getAll: () => cookieStore.getAll(),
// //         setAll: (cookiesToSet) => {
// //           cookiesToSet.forEach(({ name, value, options }) =>
// //             cookieStore.set(name, value, options)
// //           )
// //         },
// //       },
// //     }
// //   )
// // }
// // lib/supabase/server.ts

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export const createSupabaseServerClient = () => {
//   const cookieStore = cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll ? cookieStore.getAll() : []
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options)
//             )
//           } catch {
//             // ⚠️ Ignore in Server Components (read-only cookies)
//           }
//         },
//       },
//     }
//   )
// }
// lib/supabase/server.ts

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies() // ✅ FIX

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // ignore (read-only in server components)
          }
        },
      },
    }
  )
}