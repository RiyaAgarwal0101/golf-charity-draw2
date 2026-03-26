// components/layout/Sidebar.tsx
import { createClient } from '@/lib/supabase'

export default async function Sidebar() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  return (
    <aside className="hidden w-64 border-r bg-gray-50 md:block">
      <div className="p-4">
        <h2 className="mb-6 text-lg font-semibold">Menu</h2>
        <nav className="space-y-2 text-sm">
          <a
            href="/dashboard"
            className="block rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/scores"
            className="block rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
          >
            Score Entry
          </a>
          {user.role === 'admin' && (
            <>
              <a
                href="/admin"
                className="block rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
              >
                Admin Panel
              </a>
              <a
                href="/admin/draws"
                className="block rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
              >
                Draws
              </a>
              <a
                href="/admin/charities"
                className="block rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
              >
                Charities
              </a>
              <a
                href="/admin/winners"
                className="block rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
              >
                Winners
              </a>
            </>
          )}
          <a
            href="/charity"
            className="block rounded px-3 py-2 font-medium text-gray-800 hover:bg-gray-200"
          >
            Charity
          </a>
        </nav>
      </div>
    </aside>
  )
}