// // // // // // app/login/page.tsx
// // // // // 'use client'

// // // // // import { useState } from 'react'
// // // // // import { createClient } from '@/lib/supabase'

// // // // // export default function LoginPage() {
// // // // //   const supabase = createClient()
// // // // //   const [email, setEmail] = useState('')
// // // // //   const [password, setPassword] = useState('')
// // // // //   const [error, setError] = useState<string | null>(null)

// // // // //   const signIn = async () => {
// // // // //     const { error } = await supabase.auth.signInWithPassword({ email, password })
// // // // //     if (error) setError(error.message)
// // // // //     else window.location.href = '/dashboard'
// // // // //   }

// // // // //   const signUp = async () => {
// // // // //     const { error } = await supabase.auth.signUp({ email, password })
// // // // //     if (error) setError(error.message)
// // // // //     else {
// // // // //       alert('Check your email for the confirmation link.')
// // // // //     }
// // // // //   }

// // // // //   return (
// // // // //     <div className="mx-auto flex h-screen max-w-md flex-col justify-center gap-6 px-4">
// // // // //       <h1 className="text-2xl font-bold">Login / Sign Up</h1>
// // // // //       {error && <div className="rounded bg-red-100 p-2 text-red-700">{error}</div>}
// // // // //       <input
// // // // //         placeholder="Email"
// // // // //         value={email}
// // // // //         onChange={(e) => setEmail(e.target.value)}
// // // // //         className="rounded border px-3 py-2"
// // // // //       />
// // // // //       <input
// // // // //         type="password"
// // // // //         placeholder="Password"
// // // // //         value={password}
// // // // //         onChange={(e) => setPassword(e.target.value)}
// // // // //         className="rounded border px-3 py-2"
// // // // //       />
// // // // //       <div className="flex gap-3">
// // // // //         <button
// // // // //           onClick={signIn}
// // // // //           className="flex-1 rounded bg-blue-600 py-2 text-white"
// // // // //         >
// // // // //           Login
// // // // //         </button>
// // // // //         <button
// // // // //           onClick={signUp}
// // // // //           className="flex-1 rounded bg-gray-600 py-2 text-white"
// // // // //         >
// // // // //           Sign Up
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }
// // // // // 'use client' // important for client components

// // // // // import { createClient } from '@/lib/supabase'
// // // // // import { useState } from 'react'

// // // // // export default function LoginPage() {
// // // // //   const supabase = createClient()
// // // // //   const [email, setEmail] = useState('')
// // // // //   const [password, setPassword] = useState('')

// // // // //   const handleLogin = async () => {
// // // // //     const { data, error } = await supabase.auth.signInWithPassword({
// // // // //       email,
// // // // //       password,
// // // // //     })
// // // // //     if (error) console.error(error)
// // // // //     else console.log('Logged in:', data)
// // // // //   }

// // // // //   return (
// // // // //     <div>
// // // // //       <input
// // // // //         type="email"
// // // // //         value={email}
// // // // //         onChange={(e) => setEmail(e.target.value)}
// // // // //         placeholder="Email"
// // // // //       />
// // // // //       <input
// // // // //         type="password"
// // // // //         value={password}
// // // // //         onChange={(e) => setPassword(e.target.value)}
// // // // //         placeholder="Password"
// // // // //       />
// // // // //       <button onClick={handleLogin}>Login</button>
// // // // //     </div>
// // // // //   )
// // // // // }
// // // // // app/login/page.tsx
// // // // 'use client'

// // // // import { useState } from 'react'
// // // // import { createClient } from '@/lib/supabase'

// // // // export default function LoginPage() {
// // // //   const supabase = createClient()
// // // //   const [email, setEmail] = useState('')
// // // //   const [password, setPassword] = useState('')
// // // //   const [isSignUp, setIsSignUp] = useState(false) // toggle: false = login, true = signup
// // // //   const [error, setError] = useState<string | null>(null)

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     setError(null)

// // // //     if (isSignUp) {
// // // //       const { error } = await supabase.auth.signUp({ email, password })
// // // //       if (error) {
// // // //         setError(error.message)
// // // //       } else {
// // // //         alert('Check your email for the confirmation link.')
// // // //         // you can auto switch to login now:
// // // //         setIsSignUp(false)
// // // //       }
// // // //     } else {
// // // //       const { error } = await supabase.auth.signInWithPassword({ email, password })
// // // //       if (error) {
// // // //         setError(error.message)
// // // //       } else {
// // // //         window.location.href = '/dashboard'
// // // //       }
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="mx-auto flex h-screen max-w-md flex-col justify-center gap-6 px-4">
// // // //       <h1 className="text-2xl font-bold">
// // // //         {isSignUp ? 'Sign Up' : 'Login'}
// // // //       </h1>

// // // //       {error && (
// // // //         <div className="rounded bg-red-100 p-2 text-red-700">{error}</div>
// // // //       )}

// // // //       <form onSubmit={handleSubmit} className="space-y-4">
// // // //         <input
// // // //           placeholder="Email"
// // // //           value={email}
// // // //           onChange={(e) => setEmail(e.target.value)}
// // // //           className="w-full rounded border px-3 py-2"
// // // //           required
// // // //         />
// // // //         <input
// // // //           type="password"
// // // //           placeholder="Password"
// // // //           value={password}
// // // //           onChange={(e) => setPassword(e.target.value)}
// // // //           className="w-full rounded border px-3 py-2"
// // // //           required
// // // //         />
// // // //       </form>

// // // //       <button
// // // //         onClick={handleSubmit}
// // // //         className="w-full rounded bg-blue-600 py-2 text-white"
// // // //       >
// // // //         {isSignUp ? 'Sign Up' : 'Login'}
// // // //       </button>

// // // //       <p className="text-center text-sm text-gray-600">
// // // //         {isSignUp ? (
// // // //           <>
// // // //             Already have an account?{' '}
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setIsSignUp(false)}
// // // //               className="text-blue-600 underline"
// // // //             >
// // // //               Sign in
// // // //             </button>
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             Don’t have an account?{' '}
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => setIsSignUp(true)}
// // // //               className="text-blue-600 underline"
// // // //             >
// // // //               Sign up
// // // //             </button>
// // // //           </>
// // // //         )}
// // // //       </p>
// // // //     </div>
// // // //   )
// // // // }
// // // 'use client'

// // // import { useState } from 'react'
// // // import { createClient } from '@/lib/supabase'

// // // export default function LoginPage() {
// // //   const supabase = createClient()
// // //   const [email, setEmail] = useState('')
// // //   const [password, setPassword] = useState('')
// // //   const [isSignUp, setIsSignUp] = useState(false) // false = login, true = signup
// // //   const [error, setError] = useState<string | null>(null)

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     setError(null)

// // //     if (isSignUp) {
// // //       const { error } = await supabase.auth.signUp({ email, password })
// // //       if (error) {
// // //         setError(error.message)
// // //       } else {
// // //         alert('Check your email for the confirmation link.')
// // //         // Optionally switch to login after sign‑up
// // //         setIsSignUp(false)
// // //       }
// // //     } else {
// // //       const { error } = await supabase.auth.signInWithPassword({ email, password })
// // //       if (error) {
// // //         setError(error.message)
// // //       } else {
// // //         window.location.href = '/dashboard'
// // //       }
// // //     }
// // //   }

// // //   return (
// // //     <div className="mx-auto flex h-screen max-w-md flex-col justify-center gap-6 px-4">
// // //       <h1 className="text-2xl font-bold">
// // //         {isSignUp ? 'Sign Up' : 'Login'}
// // //       </h1>

// // //       {error && (
// // //         <div className="rounded bg-red-100 p-2 text-red-700">{error}</div>
// // //       )}

// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         <input
// // //           placeholder="Email"
// // //           value={email}
// // //           onChange={(e) => setEmail(e.target.value)}
// // //           className="w-full rounded border px-3 py-2"
// // //           required
// // //         />
// // //         <input
// // //           type="password"
// // //           placeholder="Password"
// // //           value={password}
// // //           onChange={(e) => setPassword(e.target.value)}
// // //           className="w-full rounded border px-3 py-2"
// // //           required
// // //         />
// // //       </form>

// // //       <button
// // //         onClick={handleSubmit}
// // //         className="w-full rounded bg-blue-600 py-2 text-white"
// // //       >
// // //         {isSignUp ? 'Sign Up' : 'Login'}
// // //       </button>

// // //       <p className="text-center text-sm text-gray-600">
// // //         {isSignUp ? (
// // //           <>
// // //             Already have an account?{' '}
// // //             <button
// // //               type="button"
// // //               onClick={() => setIsSignUp(false)}
// // //               className="text-blue-600 underline"
// // //             >
// // //               Sign in
// // //             </button>
// // //           </>
// // //         ) : (
// // //           <>
// // //             Don’t have an account?{' '}
// // //             <button
// // //               type="button"
// // //               onClick={() => setIsSignUp(true)}
// // //               className="text-blue-600 underline"
// // //             >
// // //               Sign up
// // //             </button>
// // //           </>
// // //         )}
// // //       </p>
// // //     </div>
// // //   )
// // // }
// // // app/login/page.tsx
// 'use client'

// import { useState } from 'react'
// import { redirect } from 'next/navigation'
// import { createRouteHandlerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export default function LoginPage() {
//   const supabase = createRouteHandlerClient({ cookies })
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [isSignUp, setIsSignUp] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError(null)

//     if (isSignUp) {
//       const { error } = await supabase.auth.signUp({ email, password })
//       if (error) {
//         setError(error.message)
//       } else {
//         alert('Check your email for the confirmation link.')
//         setIsSignUp(false)
//       }
//     } else {
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password })
//       if (error) {
//         setError(error.message)
//       } else if (data.user) {
//         redirect('/dashboard')
//       }
//     }
//   }

//   return (
//     <div className="mx-auto flex h-screen max-w-md flex-col justify-center gap-6 px-4">
//       <h1 className="text-2xl font-bold">
//         {isSignUp ? 'Sign Up' : 'Login'}
//       </h1>

//       {error && (
//         <div className="rounded bg-red-100 p-2 text-red-700">{error}</div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           className="w-full rounded border px-3 py-2"
//           required
//         />
//         <input
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//           className="w-full rounded border px-3 py-2"
//           required
//         />
//       </form>

//       <button
//         type="submit"
//         onClick={handleSubmit}
//         className="w-full rounded bg-blue-600 py-2 text-white"
//       >
//         {isSignUp ? 'Sign Up' : 'Login'}
//       </button>

//       <p className="text-center text-sm text-gray-600">
//         {isSignUp ? (
//           <>
//             Already have an account?{' '}
//             <button
//               type="button"
//               onClick={() => setIsSignUp(false)}
//               className="text-blue-600 underline"
//             >
//               Sign in
//             </button>
//           </>
//         ) : (
//           <>
//             Don’t have an account?{' '}
//             <button
//               type="button"
//               onClick={() => setIsSignUp(true)}
//               className="text-blue-600 underline"
//             >
//               Sign up
//             </button>
//           </>
//         )}
//       </p>
//     </div>
//   )
// }
// app/login/page.tsx
// // 'use client'

// // import { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// // import { createClient } from '@/lib/supabase'




// // export default function LoginPage() {
// //   const supabase = createClient()
// //   const router = useRouter()
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [isSignUp, setIsSignUp] = useState(false)
// //   const [error, setError] = useState<string | null>(null)

// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     setError(null)

// //     if (isSignUp) {
// //       const { error } = await supabase.auth.signUp({ email, password })
// //       if (error) {
// //         setError(error.message)
// //       } else {
// //         alert('Check your email for the confirmation link.')
// //         setIsSignUp(false)
// //       }
// //     } else {
// //       const { error } = await supabase.auth.signInWithPassword({ email, password })
// //       if (error) {
// //         setError(error.message)
// //       } else {
// //         router.push('/dashboard')
// //       }
// //     }
// //   }

// //   return (
// //     <div className="mx-auto flex h-screen max-w-md flex-col justify-center gap-6 px-4">
// //       <h1 className="text-2xl font-bold">
// //         {isSignUp ? 'Sign Up' : 'Login'}
// //       </h1>

// //       {error && (
// //         <div className="rounded bg-red-100 p-2 text-red-700">{error}</div>
// //       )}

// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         <input
// //           placeholder="Email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           type="email"
// //           className="w-full rounded border px-3 py-2"
// //           required
// //         />
// //         <input
// //           placeholder="Password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           type="password"
// //           className="w-full rounded border px-3 py-2"
// //           required
// //         />
// //       </form>

// //       <button
// //         type="submit"
// //         onClick={handleSubmit}
// //         className="w-full rounded bg-blue-600 py-2 text-white"
// //       >
// //         {isSignUp ? 'Sign Up' : 'Login'}
// //       </button>

// //       <p className="text-center text-sm text-gray-600">
// //         {isSignUp ? (
// //           <>
// //             Already have an account?{' '}
// //             <button
// //               type="button"
// //               onClick={() => setIsSignUp(false)}
// //               className="text-blue-600 underline"
// //             >
// //               Sign in
// //             </button>
// //           </>
// //         ) : (
// //           <>
// //             Don’t have an account?{' '}
// //             <button
// //               type="button"
// //               onClick={() => setIsSignUp(true)}
// //               className="text-blue-600 underline"
// //             >
// //               Sign up
// //             </button>
// //           </>
// //         )}
// //       </p>
// //     </div>
// //   )
// // }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        alert('Check your email for the confirmation link.')
        setIsSignUp(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-md flex-col justify-center gap-6 px-4">
      <h1 className="text-2xl font-bold">
        {isSignUp ? 'Sign Up' : 'Login'}
      </h1>

      {error && (
        <div className="rounded bg-red-100 p-2 text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        />

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 text-white"
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className="text-blue-600 underline"
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don’t have an account?{' '}
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className="text-blue-600 underline"
            >
              Sign up
            </button>
          </>
        )}
      </p>
    </div>
  )
}