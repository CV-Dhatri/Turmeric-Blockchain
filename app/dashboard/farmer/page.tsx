"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"

const menuItems = [
  { label: "Add Harvest", href: "/dashboard/farmer" },
  { label: "Blockchain Record Status", href: "/dashboard/farmer/blockchain" },
]

export default function FarmerDashboard() {
  return (
    <DashboardLayout role="farmer" menuItems={menuItems}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Add Harvest</h1>

        <Button className="bg-[#e78c0e] hover:bg-[#d47d0e] text-white mb-12 h-14 px-6 text-lg">
          <Plus className="mr-2 h-5 w-5" /> Add Harvest
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <Card className="h-[350px] bg-[#fdf6e9]/50 border border-[#e7e0d0]"></Card>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Blockchain Record Status</h2>
            <Card className="h-[350px] bg-[#fdf6e9]/50 border border-[#e7e0d0]"></Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
