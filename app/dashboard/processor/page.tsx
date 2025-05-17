"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const menuItems = [
  { label: "Dashboard", href: "/dashboard/processor" },
  { label: "Add Batch", href: "/dashboard/processor/add-batch" },
  { label: "Batches", href: "/dashboard/processor/batches" },
]

export default function ProcessorDashboard() {
  const [batchId, setBatchId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [processingDate, setProcessingDate] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ batchId, quantity, processingDate, additionalInfo })
  }

  return (
    <DashboardLayout role="processor" title="Processor" menuItems={menuItems}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Add Batch</h1>

        <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
          <div className="space-y-2">
            <Label htmlFor="batchId" className="text-lg">
              Batch ID
            </Label>
            <Input
              id="batchId"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="h-12 bg-[#fdf6e9] border-[#e7e0d0]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-lg">
              Quantity
            </Label>
            <Input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="h-12 bg-[#fdf6e9] border-[#e7e0d0]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="processingDate" className="text-lg">
              Processing Date
            </Label>
            <Input
              id="processingDate"
              type="date"
              value={processingDate}
              onChange={(e) => setProcessingDate(e.target.value)}
              className="h-12 bg-[#fdf6e9] border-[#e7e0d0]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo" className="text-lg">
              Additional Info
            </Label>
            <Textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              className="bg-[#fdf6e9] border-[#e7e0d0]"
              rows={4}
            />
          </div>

          <Button type="submit" className="bg-[#e78c0e] hover:bg-[#d47d0e] text-white h-12 px-8 text-lg">
            Submit
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
