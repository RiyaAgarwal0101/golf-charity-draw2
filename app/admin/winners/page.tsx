// app/admin/winners/page.tsx
import { createClient } from '@/lib/supabase'

export default async function AdminWinnersPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.role !== 'admin') return <div>Forbidden</div>

  const { data: winners } = await supabase
    .from('draw_results')
    .select('*, draw_id(*), user_id(*)')
    .neq('prize_amount', 0)
    .order('matching_count', { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Winner Management</h1>
      <div className="space-y-4">
        {winners?.map((w) => (
          <div
            key={w.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <h3 className="font-semibold">
                {w.user_id.email} — {w.matching_count}‑match
              </h3>
              <p>Prize: ₹{w.prize_amount}</p>
              <p>Status: {w.is_paid ? 'Paid' : 'Pending'}</p>
            </div>
            <div className="flex gap-3">
              <button className="rounded bg-blue-600 px-3 py-1 text-white">
                Approve
              </button>
              <button className="rounded bg-green-600 px-3 py-1 text-white">
                Mark Paid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
