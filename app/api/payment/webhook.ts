// app/api/payment/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req)
  const sig = req.headers['stripe-signature']!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Retrieve the customer and ensure it is not a deleted customer
    const customer = (await stripe.customers.retrieve(
      session.customer as string
    )) as Stripe.Customer

    const userId = customer.metadata?.user_id
    if (!userId) return res.status(200).json({})

    if (session.mode === 'subscription') {
      // Retrieve subscription and cast correctly
      const subscription = (await stripe.subscriptions.retrieve(
        session.subscription as string
      )) as Stripe.Subscription

      // current_period_end is in seconds, convert to milliseconds
      const endsAt = subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000)
        : null

      await supabase.from('subscriptions').insert({
        user_id: userId,
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        plan:
          subscription.items.data[0].price.id ===
          process.env.NEXT_PUBLIC_MONTHLY_PRICE_ID
            ? 'monthly'
            : 'yearly',
        price: subscription.items.data[0].price.unit_amount! / 100,
        ends_at: endsAt,
      })

      await supabase
        .from('users')
        .update({ role: 'subscriber', stripe_customer_id: session.customer })
        .eq('id', userId)
    }
  }

  res.status(200).json({})
}

export const config = { api: { bodyParser: false } }

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}
