// app/admin/draws/page.tsx
import { createClient } from '@/lib/supabase'

export default async function AdminDrawsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.role !== 'admin') return <div>Forbidden</div>

  const { data: draws } = await supabase
    .from('draws')
    .select('*')
    .order('month', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Monthly Draws</h1>
      <div className="mb-6">
        <button
          // onClick={runDraw} — implement via API call
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Run New Draw
        </button>
      </div>
      <div className="space-y-4">
        {draws?.map((d) => (
          <div
            key={d.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <h3 className="font-semibold">{new Date(d.month).toLocaleDateString()}</h3>
              <p>Status: {d.status}</p>
            </div>
            <div className="flex gap-3">
              <button className="rounded bg-blue-600 px-3 py-1 text-white">
                View Results
              </button>
              {d.status === 'pending' && (
                <button className="rounded bg-green-600 px-3 py-1 text-white">
                  Publish
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}