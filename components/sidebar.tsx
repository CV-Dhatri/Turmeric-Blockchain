"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface SidebarProps {
  role: string
  title?: string
  menuItems: {
    label: string
    href: string
  }[]
}

export default function Sidebar({ role, title = "Dashboard", menuItems }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col bg-[#0a3b1e] text-white">
      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-[#e78c0e]">
              <path d="M50,20 C60,40 80,50 80,70 C80,85 65,95 50,95 C35,95 20,85 20,70 C20,50 40,40 50,20 Z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block py-3 px-4 rounded-md transition-colors",
                pathname === item.href ? "bg-[#0a2e18] text-white" : "text-white/90 hover:bg-[#0a2e18]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <Link href="/login" className="block py-3 px-4 text-white/90 hover:text-white transition-colors">
          Logout
        </Link>
      </div>
    </div>
  )
}
