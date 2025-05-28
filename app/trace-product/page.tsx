"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Hexagon } from "lucide-react"
import QRScanner from "@/components/blockchain/qr-scanner"
import BatchDetails from "@/components/blockchain/batch-details"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TraceProductPage() {
  const [batchId, setBatchId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleQRCodeScanned = async (data: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Extract batchId from QR code data
      // Assuming QR code contains data in format "batchId:BATCH_123" or just "BATCH_123"
      const extractedBatchId = data.includes(":") ? data.split(":")[1] : data

      // Validate the batch ID format
      if (!extractedBatchId || extractedBatchId.trim() === "") {
        throw new Error("Invalid QR code format")
      }

      setBatchId(extractedBatchId)
    } catch (err) {
      console.error("Error processing QR code:", err)
      setError(err instanceof Error ? err.message : "Failed to process QR code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const manualBatchId = formData.get("batchId") as string

    if (manualBatchId && manualBatchId.trim() !== "") {
      setBatchId(manualBatchId)
    }
  }

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
            Login
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-8 text-center">
            Trace Your Turmeric Product
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Scan QR Code</CardTitle>
                <CardDescription>Scan the QR code on your turmeric product to trace its journey</CardDescription>
              </CardHeader>
              <CardContent>
                <QRScanner onScan={handleQRCodeScanned} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manual Search</CardTitle>
                <CardDescription>Enter the batch ID manually if you cannot scan the QR code</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSearch} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="batchId" className="text-sm font-medium">
                      Batch ID
                    </label>
                    <input
                      id="batchId"
                      name="batchId"
                      type="text"
                      placeholder="e.g., BATCH_123456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#d4a017] text-white font-medium rounded-md hover:bg-[#c29016] transition-colors"
                  >
                    Search
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#d4a017] border-t-transparent"></div>
              <p className="mt-2 text-gray-600">Loading batch information...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
              <p>{error}</p>
            </div>
          )}

          {batchId && !isLoading && !error && <BatchDetails batchId={batchId} />}
        </div>
      </main>
    </div>
  )
}
