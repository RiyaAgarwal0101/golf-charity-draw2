// components/forms/CharitySelector.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import type { Charity } from '@/types'

export default function CharitySelector() {
  const [charities, setCharities] = useState<Charity[]>([])
  const [selectedCharityId, setSelectedCharityId] = useState<string>('')
  const [contribution, setContribution] = useState(10)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('charities')
      .select('*')
      .eq('is_active', true)
      .then(({ data, error }) => {
        if (error) console.error(error)
        else setCharities(data)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCharityId) return

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from('user_charity_prefs').upsert({
      user_id: user.id,
      charity_id: selectedCharityId,
      contribution_percent: contribution,
    })

    if (error) {
      alert('Failed to save preference.')
    } else {
      alert('Charity preference saved!')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded border p-4 shadow-sm"
    >
      <h3 className="mb-3 text-lg font-semibold">Charity Selection</h3>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Charity</label>
        <select
          value={selectedCharityId}
          onChange={(e) => setSelectedCharityId(e.target.value)}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">-- Select a charity --</option>
          {charities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">
          Contribution % (min 10%)
        </label>
        <input
          type="number"
          min="10"
          value={contribution}
          onChange={(e) => setContribution(Number(e.target.value))}
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Save Preference
      </button>
    </form>
  )
}