// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the page.tsx file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={16}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
// // app/page.tsx
// export default function HomePage() {
//   return (
//     <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-4 py-12">
//       <div className="mx-auto max-w-5xl">
//         <!-- Hero -->
//         <div className="mb-12 text-center">
//           <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
//             Golf. Charity. Draw.
//           </h1>
//           <p className="mx-auto max-w-2xl text-lg text-gray-600">
//             Track your golf scores, support your favorite charity, and enter
//             monthly prize draws — all in one subscription platform.
//           </p>
//         </div>

//         <!-- Key features -->
//         <div className="mb-12 grid gap-8 md:grid-cols-3">
//           <div className="rounded-xl bg-white p-6 shadow-sm">
//             <h2 className="mb-2 text-xl font-semibold text-gray-800">Score Tracking</h2>
//             <p className="text-gray-600">
//               Enter your last 5 Stableford scores (1–45), and the platform keeps
//               only the latest ones for your monthly draw entries.
//             </p>
//           </div>

//           <div className="rounded-xl bg-white p-6 shadow-sm">
//             <h2 className="mb-2 text-xl font-semibold text-gray-800">Charity Support</h2>
//             <p className="text-gray-600">
//               Choose a charity and set your contribution (minimum 10%). A portion
//               of every subscription goes straight to your selected cause.
//             </p>
//           </div>

//           <div className="rounded-xl bg-white p-6 shadow-sm">
//             <h2 className="mb-2 text-xl font-semibold text-gray-800">Monthly Draws</h2>
//             <p className="text-gray-600">
//               Every month, we run a prize draw. Match 3, 4, or 5 numbers and win
//               a share of the prize pool.
//             </p>
//           </div>
//         </div>

//         <!-- Call to action -->
//         <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
//           <a
//             href="/login"
//             className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-md hover:bg-green-700"
//           >
//             Join Now
//           </a>
//           <a
//             href="/charity"
//             className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Explore Charities
//           </a>
//         </div>
//       </div>
//     </main>
//   );
// }
// app/page.tsx
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-4 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
            Golf. Charity. Draw.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Track your golf scores, support your favorite charity, and enter
            monthly prize draws — all in one subscription platform.
          </p>
        </div>

        {/* Key features */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Score Tracking</h2>
            <p className="text-gray-600">
              Enter your last 5 Stableford scores (1–45), and the platform keeps
              only the latest ones for your monthly draw entries.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Charity Support</h2>
            <p className="text-gray-600">
              Choose a charity and set your contribution (minimum 10%). A portion
              of every subscription goes straight to your selected cause.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-gray-800">Monthly Draws</h2>
            <p className="text-gray-600">
              Every month, we run a prize draw. Match 3, 4, or 5 numbers and win
              a share of the prize pool.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/login"
            className="inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-md hover:bg-green-700"
          >
            Join Now
          </a>
          <a
            href="/charity"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            Explore Charities
          </a>
        </div>
      </div>
    </main>
  );
}