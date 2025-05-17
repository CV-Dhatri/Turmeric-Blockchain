"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
  const [role, setRole] = useState("farmer")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would authenticate with a backend
    // For demo purposes, we'll just redirect based on role
    if (role && password) {
      router.push(`/dashboard/${role}`)
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="role" className="text-lg font-medium">
              Role
            </label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="farmer">Farmer</SelectItem>
                <SelectItem value="processor">Processor</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="retailer">Retailer</SelectItem>
                <SelectItem value="consumer">Consumer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-lg font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-base"
              required
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              className="flex-1 h-12 bg-[#d4a017] text-white font-medium rounded-md hover:bg-[#c29016] transition-colors"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="flex-1 h-12 bg-white text-[#333333] font-medium rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
