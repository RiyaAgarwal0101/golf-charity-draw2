// // // // app/api/auth/supabase.ts
// // // import { NextApiRequest, NextApiResponse } from 'next'
// // // import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// // // import { cookies } from 'next/headers'

// // // export async function POST(req: NextApiRequest, res: NextApiResponse) {
// // //   const cookieStore = cookies()
// // //   const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

// // //   try {
// // //     const { email, password } = await req.json()
// // //     const { data, error } = await supabase.auth.signInWithPassword({
// // //       email,
// // //       password,
// // //     })

// // //     if (error) throw error

// // //     return res.status(200).json(data)
// // //   } catch (err) {
// // //     return res.status(400).json({ error: (err as Error).message })
// // //   }
// // // }

// // // export const config = { api: { bodyParser: true } }
// // // app/api/auth/supabase.ts
// // import { type NextRequest } from 'next/server'
// // import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// // import { cookies } from 'next/headers'

// // export async function POST(req: NextRequest) {
// //   const cookieStore = cookies()
// //   const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

// //   try {
// //     const { email, password } = await req.json()
// //     const { data, error } = await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     })

// //     if (error) throw error

// //     return Response.json(data)
// //   } catch (err) {
// //     return Response.json({ error: (err as Error).message }, { status: 400 })
// //   }
// // }
// // app/api/auth/supabase.ts
// import { type NextRequest } from 'next/server'
// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// import { cookies } from 'next/headers'

// export async function POST(req: NextRequest) {
//   const cookieStore = cookies()
//   const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

//   try {
//     const { email, password } = await req.json()
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     })

//     if (error) throw error

//     return Response.json(data)
//   } catch (err) {
//     return Response.json({ error: (err as Error).message }, { status: 400 })
//   }
// }
// app/api/auth/supabase/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    const { email, password } = await req.json()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 400 }
    )
  }
}