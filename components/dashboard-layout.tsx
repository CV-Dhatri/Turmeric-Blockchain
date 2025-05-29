"use client"

import type React from "react"

import Link from "next/link"
import { Hexagon } from "lucide-react"

interface DashboardLayoutProps {
  role: string
  title?: string
  menuItems: {
    label: string
    href: string
  }[]
  children: React.ReactNode
}

export default function DashboardLayout({ role, menuItems, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-[#333333]">
          <Hexagon className="h-8 w-8" strokeWidth={1.5} />
          <span className="text-xl font-medium tracking-wide">TRACEABILITY</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            About
          </Link>
          <Link href="/trace-product" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            Trace Product
          </Link>
          <Link href="/login" className="text-[#333333] hover:text-[#d4a017] transition-colors">
            Login Wallet
          </Link>
        </nav>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-[#fdf6e9]/50 border-r border-[#e7e0d0] py-8 px-4">
          <h2 className="text-lg font-semibold mb-4">{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h2>
          <nav>
            <ul>
              {menuItems.map((item) => (
                <li key={item.label} className="mb-2">
                  <Link href={item.href} className="block px-4 py-2 rounded-md hover:bg-[#e7e0d0] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-auto">{children}</main>
      </div>
    </div>
  )
}
