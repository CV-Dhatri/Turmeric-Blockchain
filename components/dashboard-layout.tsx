"use client"

import type { ReactNode } from "react"
import Sidebar from "@/components/sidebar"

interface DashboardLayoutProps {
  role: string
  title?: string
  menuItems: {
    label: string
    href: string
  }[]
  children: ReactNode
}

export default function DashboardLayout({ role, title, menuItems, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a3b1e] flex">
      {/* Sidebar */}
      <div className="w-[320px] hidden md:block">
        <Sidebar role={role} title={title} menuItems={menuItems} />
      </div>

      {/* Mobile sidebar - would be implemented with a drawer in a real app */}
      <div className="md:hidden">{/* Mobile menu button would go here */}</div>

      {/* Main content */}
      <div className="flex-1">
        <main className="min-h-screen p-6">
          <div className="bg-[#fdf6e9] rounded-xl shadow-lg overflow-hidden">{children}</div>
        </main>
      </div>
    </div>
  )
}
