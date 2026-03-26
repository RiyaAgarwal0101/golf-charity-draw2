// components/forms/ScoreForm.tsx
'use client'

import { useState } from 'react'
import type { Score } from '@/types'

type Props = {
  userId: string
}

export default function ScoreForm({ userId }: Props) {
  const [score, setScore] = useState<number | ''>('')
  const [recordedAt, setRecordedAt] = useState(() => {
    const now = new Date()
    return now.toISOString().split('T')[0] // yyyy-mm-dd
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!score || typeof score !== 'number') {
      setError('Score is required and must be a number.')
      return
    }
    if (score < 1 || score > 45) {
      setError('Score must be between 1 and 45.')
      return
    }
    setError(null)

    const res = await fetch('/api/score/upsert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        value: score,
        recorded_at: recordedAt,
      }),
    })

    if (!res.ok) {
      const body = await res.json()
      setError(body.error)
    } else {
      setScore('')
      alert('Score saved.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded border p-4 shadow-sm"
    >
      <h3 className="mb-3 text-lg font-semibold">Enter Score (Stableford)</h3>
      {error && (
        <div className="mb-3 rounded bg-red-100 px-3 py-2 text-red-700">
          {error}
        </div>
      )}
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">
          Recorded Date
        </label>
        <input
          type="date"
          value={recordedAt}
          onChange={(e) => setRecordedAt(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">
          Score (1–45)
        </label>
        <input
          type="number"
          min="1"
          max="45"
          value={score}
          onChange={(e) =>
            setScore(e.target.value === '' ? '' : Number(e.target.value))
          }
          className="w-full rounded border px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Save Score
      </button>
    </form>
  )
}