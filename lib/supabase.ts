// //  lib/supabase.ts
//  import { createClient } from '@supabase/supabase-js'
//  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//  export const supabase = createClient(supabaseUrl, supabaseAnonKey)
// // // // // // // lib/supabase.ts
// // // // // // import { createBrowserClient } from '@supabase/ssr'

// // // // // // export function createClient() {
// // // // // //   return createBrowserClient(
// // // // // //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// // // // // //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // // // // //   )
// // // // // // }
// // // // // // lib/supabase.ts
// // // // // import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// // // // // import { cookies } from 'next/headers'
// // // // // import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// // // // // export const supabase = (cookieStore = cookies()) =>
// // // // //   createRouteHandlerClient({ cookies: () => cookieStore })
// // // // // lib/supabase.ts
// // // // import { createRouteHandlerClient } from '@supabase/ssr'
// // // // import { cookies } from 'next/headers'

// // // // export const supabase = createRouteHandlerClient(
// // // //   { cookies: () => cookies() }
// // // // )
// // // // lib/supabase.ts

// // // import { createBrowserClient } from '@supabase/ssr'

// // // export const createClient = () =>
// // //   createBrowserClient(
// // //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// // //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // //   )
// // // app/lib/supabase/server.ts
// // import { createServerClient } from '@supabase/ssr'
// // import { cookies } from 'next/headers'

// // export const createSupabaseServerClient = () =>
// //   createServerClient(
// //     process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// //     {
// //       cookies: {
// //         getAll() {
// //           return cookies().getAll()
// //         },
// //         setAll(cookiesToSet) {
// //           cookiesToSet.forEach(({ name, value, options }) =>
// //             cookies().set(name, value, options)
// //           )
// //         },
// //       },
// //     }
// //   )
// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )