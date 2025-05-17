"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"

interface DatePickerProps {
  id: string
  label: string
  value: string | null | undefined
  onChange: (value: string) => void
  className?: string
  required?: boolean
}

export function DatePicker({ id, label, value, onChange, className, required = false }: DatePickerProps) {
  const [showDateInput, setShowDateInput] = useState(false)

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-lg">
        {label}
      </Label>
      <div className="relative">
        <div className="flex">
          <Input
            id={id}
            type="date"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className={cn("h-12 bg-[#fdf6e9] border-[#e7e0d0] pr-10", className)}
            required={required}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-12 w-12 text-gray-500"
            onClick={() => setShowDateInput(!showDateInput)}
          >
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
