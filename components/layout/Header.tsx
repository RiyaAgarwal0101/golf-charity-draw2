// components/layout/Header.tsx
import { createClient } from '@/lib/supabase'

export default async function Header() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-xl font-bold">GolfCharityDraw</div>
        <nav className="space-x-6">
          <a href="/" className="text-sm font