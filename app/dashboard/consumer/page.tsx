"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QrCode } from "lucide-react"
import QRScanner from "@/components/blockchain/qr-scanner"
import BatchDetails from "@/components/blockchain/batch-details"

const menuItems = [
  { label: "Scan QR Code", href: "/dashboard/consumer" },
  { label: "Purchase History", href: "/dashboard/consumer/history" },
]

export default function ConsumerDashboard() {
  const [batchId, setBatchId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showScanner, setShowScanner] = useState(false)

  const handleQRCodeScanned = async (data: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // Extract batchId from QR code data
      const extractedBatchId = data.includes(":") ? data.split(":")[1] : data

      if (!extractedBatchId || extractedBatchId.trim() === "") {
        throw new Error("Invalid QR code format")
      }

      setBatchId(extractedBatchId)
      setShowScanner(false)
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
      setShowScanner(false)
    }
  }

  const resetScanner = () => {
    setBatchId(null)
    setError(null)
    setShowScanner(false)
  }

  return (
    <DashboardLayout role="consumer" menuItems={menuItems}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Scan QR Code</h1>
          {batchId && (
            <Button
              onClick={resetScanner}
              variant="outline"
              className="border-[#d4a017] text-[#d4a017] hover:bg-[#d4a017] hover:text-white"
            >
              Scan Another Product
            </Button>
          )}
        </div>

        {!batchId && (
          <>
            <Button
              onClick={() => setShowScanner(!showScanner)}
              className="bg-[#e78c0e] hover:bg-[#d47d0e] text-white mb-12 h-14 px-6 text-lg"
            >
              <QrCode className="mr-2 h-5 w-5" />
              {showScanner ? "Hide Scanner" : "Scan QR Code"}
            </Button>

            {showScanner && (
              <div className="mb-8">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Scan Product QR Code</h2>
                  <p className="text-gray-600 mb-6">
                    Scan the QR code on your turmeric product to trace its complete journey from farm to store.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">QR Scanner</h3>
                      <QRScanner onScan={handleQRCodeScanned} />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Manual Search</h3>
                      <p className="text-sm text-gray-600 mb-4">Can't scan the QR code? Enter the batch ID manually.</p>
                      <form onSubmit={handleManualSearch} className="space-y-4">
                        <div>
                          <label htmlFor="batchId" className="block text-sm font-medium mb-1">
                            Batch ID
                          </label>
                          <input
                            id="batchId"
                            name="batchId"
                            type="text"
                            placeholder="e.g., BATCH_123456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full px-4 py-2 bg-[#d4a017] text-white font-medium rounded-md hover:bg-[#c29016] transition-colors"
                        >
                          Search Batch
                        </button>
                      </form>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {!showScanner && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">How to Trace Your Product</h2>
                  <Card className="p-6 bg-[#fdf6e9]/50 border border-[#e7e0d0]">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-[#d4a017] text-white text-sm flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Find the QR Code</h3>
                          <p className="text-sm text-gray-600">
                            Look for the QR code on your turmeric product packaging.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-[#d4a017] text-white text-sm flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Scan or Enter Batch ID</h3>
                          <p className="text-sm text-gray-600">Use the scanner above or manually enter the batch ID.</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-[#d4a017] text-white text-sm flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">View Complete Journey</h3>
                          <p className="text-sm text-gray-600">
                            See the complete traceability information from farm to store.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Why Trace Your Turmeric?</h2>
                  <Card className="p-6 bg-[#fdf6e9]/50 border border-[#e7e0d0]">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-[#d4a017]">✓ Verify Authenticity</h3>
                        <p className="text-sm text-gray-600">Ensure your turmeric is genuine and not adulterated.</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#d4a017]">✓ Check Quality</h3>
                        <p className="text-sm text-gray-600">View quality test results and processing methods.</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#d4a017]">✓ Know the Source</h3>
                        <p className="text-sm text-gray-600">
                          Learn about the farmer and farm where your turmeric was grown.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium text-[#d4a017]">✓ Blockchain Verified</h3>
                        <p className="text-sm text-gray-600">
                          All information is secured and verified on the blockchain.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}

        {isLoading && (
          <div className="text-center py-8 mb-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#d4a017] border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading batch information...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-8">
            <div className="flex justify-between items-center">
              <p>{error}</p>
              <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
                ✕
              </button>
            </div>
          </div>
        )}

        {!batchId && !showScanner && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">For Testing Purposes</h3>
            <p className="text-sm text-blue-700 mb-2">Try these valid batch IDs:</p>
            <div className="flex flex-wrap gap-2">
              {["BATCH_123456", "BATCH_789012", "BATCH_345678", "BATCH_901234", "BATCH_567890"].map((id) => (
                <button
                  key={id}
                  onClick={() => setBatchId(id)}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200 transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Each batch ID shows different stages of the supply chain journey.
            </p>
          </div>
        )}

        {batchId && !isLoading && !error && (
          <div className="mb-8">
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 font-medium">
                ✓ Product Found! Here's the complete traceability information for batch: {batchId}
              </p>
            </div>
            <BatchDetails batchId={batchId} />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
