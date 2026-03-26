// 2yLZUPgE7z1wQ0EB
// types/index.ts
export type User = {
  id: string
  email: string
  role: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  stripe_subscription_status?: string
  created_at: string
  updated_at: string
}

export type Subscription = {
  id: string
  user_id: string
  stripe_subscription_id: string
  status: string
  plan: 'monthly' | 'yearly'
  price: number
  created_at: string
  ends_at: string
}

export type Score = {
  id: string
  user_id: string
  value: number
  recorded_at: string
  created_at: string
  updated_at: string
}

export type Charity = {
  id: string
  name: string
  description?: string
  image_url?: string
  events?: string[]
  is_active: boolean
  created_at: string
}

export type UserCharityPreference = {
  id: string
  user_id: string
  charity_id: string
  contribution_percent: number
  created_at: string
  updated_at: string
}

export type Draw = {
  id: string
  month: string
  status: 'pending' | 'run' | 'published'
  jackpot_rollover: number
  created_at: string
}

export type DrawResult = {
  id: string
  draw_id: string
  user_id: string
  numbers: string[]
  matching_count: 3 | 4 | 5
  prize_amount: number
  is_paid: boolean
  proof_url?: string
  created_at: string
  updated_at: string
}