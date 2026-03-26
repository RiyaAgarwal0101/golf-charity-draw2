// app/api/payment/create-subscription.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.NEXT_PUBLIC_MONTHLY_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscribe`,
    metadata: { user_id: user.id },
  })

  return NextResponse.json({ id: session.id })
}