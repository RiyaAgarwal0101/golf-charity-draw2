// app/charity/page.tsx
import { createClient } from '@/lib/supabase'

export default async function CharityPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: charities } = await supabase
    .from('charities')
    .select('*')
    .eq('is_active', true)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Support a Charity</h1>
      <div className="space-y-6">
        {charities?.map((c) => (
          <div
            key={c.id}
            className="rounded border p-6 shadow-sm"
          >
            <h2 className="mb-2 text-xl font-semibold">{c.name}</h2>
            <p className="mb-3 text-gray-700">{c.description}</p>
            {c.events?.length > 0 && (
              <div>
                <h3 className="mb-1 text-sm font-medium">Events:</h3>
                <ul className="list-disc pl-5 text-sm">
                  {c.events.map((e, idx) => (
                    <li key={idx}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
            {user ? (
              <button className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
                Donate to this Charity
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = '/login')}
                className="mt-4 rounded bg-gray-600 px-4 py-2 text-white"
              >
                Login to Donate
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}