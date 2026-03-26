// app/admin/charities/page.tsx
import { createClient } from '@/lib/supabase'

export default async function AdminCharitiesPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.role !== 'admin') return <div>Forbidden</div>

  const { data: charities } = await supabase
    .from('charities')
    .select('*')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Charities</h1>
      <div className="space-y-4">
        {charities?.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded border px-4 py-3"
          >
            <div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded bg-blue-600 px-3 py-1 text-white">
                Edit
              </button>
              <button className="rounded bg-red-600 px-3 py-1 text-white">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}