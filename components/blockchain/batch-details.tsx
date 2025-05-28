"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

interface BatchDetailsProps {
  batchId: string
}

// Define types for batch data
interface BatchData {
  batchId: string
  blockchainTxHash: string
  currentStatus: "harvested" | "processed" | "in_transit" | "at_retailer" | "sold"
  qrCode: string
  farmer: {
    userId: {
      fullName: string
      roleSpecificData: {
        farmLocation: string
      }
    }
    farmLocation: string
    harvestDate: string
    quantity: number
    qualityGrade: string
    organicCertified: boolean
  }
  processor?: {
    userId: {
      fullName: string
      roleSpecificData: {
        processingUnitName: string
      }
    }
    processingDate: string
    processingMethod: string
    qualityTests: Array<{
      testType: string
      result: string
      testDate: string
    }>
  }
  distributor?: {
    userId: {
      fullName: string
      roleSpecificData: {
        distributionCompanyName: string
      }
    }
    pickupDate: string
    deliveryDate: string
    transportMethod: string
    storageConditions: string
  }
  retailer?: {
    userId: {
      fullName: string
      roleSpecificData: {
        storeName: string
      }
    }
    receivedDate: string
    shelfLife: string
    price: number
    storeLocation: string
  }
  createdAt: string
  updatedAt: string
}

interface BlockchainData {
  batchId: string
  farmLocation: string
  harvestDate: Date
  quantity: number
  farmer: string
  processingMethod?: string
  processingDate?: Date
  processor?: string
  transportMethod?: string
  pickupDate?: Date
  distributor?: string
  status: number
}

export default function BatchDetails({ batchId }: BatchDetailsProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [batchData, setBatchData] = useState<BatchData | null>(null)
  const [blockchainData, setBlockchainData] = useState<BlockchainData | null>(null)
  const [isVerified, setIsVerified] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchBatchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // In a real app, you would fetch from your API
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blockchain/batch/${batchId}`)
        // if (!response.ok) throw new Error('Failed to fetch batch data')
        // const data = await response.json()

        // For demo purposes, we'll simulate API response with mock data
        await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

        // Mock data based on batchId
        const mockData = generateMockData(batchId)

        setBatchData(mockData.batch)
        setBlockchainData(mockData.blockchain)

        // Verify data integrity between database and blockchain
        setIsVerified(verifyDataIntegrity(mockData.batch, mockData.blockchain))
      } catch (err) {
        console.error("Error fetching batch data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch batch data")
      } finally {
        setIsLoading(false)
      }
    }

    if (batchId) {
      fetchBatchData()
    }
  }, [batchId])

  // Helper function to verify data integrity between database and blockchain
  const verifyDataIntegrity = (dbData: BatchData | null, bcData: BlockchainData | null): boolean => {
    if (!dbData || !bcData) return false

    // Check key fields match between database and blockchain
    return (
      dbData.batchId === bcData.batchId &&
      dbData.farmer.farmLocation === bcData.farmLocation &&
      new Date(dbData.farmer.harvestDate).getTime() === new Date(bcData.harvestDate).getTime() &&
      dbData.farmer.quantity === bcData.quantity
    )
  }

  // Generate mock data for demo purposes
  const generateMockData = (id: string) => {
    const harvestDate = new Date()
    harvestDate.setMonth(harvestDate.getMonth() - 3) // 3 months ago

    const processingDate = new Date(harvestDate)
    processingDate.setDate(processingDate.getDate() + 14) // 2 weeks after harvest

    const pickupDate = new Date(processingDate)
    pickupDate.setDate(pickupDate.getDate() + 7) // 1 week after processing

    const deliveryDate = new Date(pickupDate)
    deliveryDate.setDate(deliveryDate.getDate() + 3) // 3 days after pickup

    const receivedDate = new Date(deliveryDate)
    receivedDate.setDate(receivedDate.getDate() + 1) // 1 day after delivery

    const shelfLife = new Date()
    shelfLife.setFullYear(shelfLife.getFullYear() + 1) // 1 year shelf life

    // Determine current status based on the batch ID
    // For demo, we'll use the last digit of the ID to determine status
    const lastDigit = Number.parseInt(id.slice(-1))
    let currentStatus: "harvested" | "processed" | "in_transit" | "at_retailer" | "sold"

    if (lastDigit < 2) currentStatus = "harvested"
    else if (lastDigit < 4) currentStatus = "processed"
    else if (lastDigit < 6) currentStatus = "in_transit"
    else if (lastDigit < 8) currentStatus = "at_retailer"
    else currentStatus = "sold"

    // Create mock batch data
    const batch: BatchData = {
      batchId: id,
      blockchainTxHash:
        "0x" +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
      currentStatus,
      qrCode: `QR_${id}_${Date.now()}`,
      farmer: {
        userId: {
          fullName: "Rajesh Kumar",
          roleSpecificData: {
            farmLocation: "Sangli, Maharashtra",
          },
        },
        farmLocation: "Sangli, Maharashtra",
        harvestDate: harvestDate.toISOString(),
        quantity: 1000,
        qualityGrade: "A",
        organicCertified: true,
      },
      createdAt: harvestDate.toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add processor data if status is beyond harvested
    if (currentStatus !== "harvested") {
      batch.processor = {
        userId: {
          fullName: "Priya Processing Unit",
          roleSpecificData: {
            processingUnitName: "Golden Spice Processing",
          },
        },
        processingDate: processingDate.toISOString(),
        processingMethod: "Steam drying",
        qualityTests: [
          {
            testType: "Moisture content",
            result: "12%",
            testDate: processingDate.toISOString(),
          },
          {
            testType: "Curcumin level",
            result: "3.2%",
            testDate: processingDate.toISOString(),
          },
        ],
      }
    }

    // Add distributor data if status is beyond processed
    if (currentStatus !== "harvested" && currentStatus !== "processed") {
      batch.distributor = {
        userId: {
          fullName: "Swift Distributors",
          roleSpecificData: {
            distributionCompanyName: "Swift Spice Distributors",
          },
        },
        pickupDate: pickupDate.toISOString(),
        deliveryDate: deliveryDate.toISOString(),
        transportMethod: "Refrigerated truck",
        storageConditions: "Cool and dry",
      }
    }

    // Add retailer data if status is at_retailer or sold
    if (currentStatus === "at_retailer" || currentStatus === "sold") {
      batch.retailer = {
        userId: {
          fullName: "Fresh Mart Store",
          roleSpecificData: {
            storeName: "Fresh Mart Organic Store",
          },
        },
        receivedDate: receivedDate.toISOString(),
        shelfLife: shelfLife.toISOString(),
        price: 25.99,
        storeLocation: "Pune, Maharashtra",
      }
    }

    // Create mock blockchain data
    const blockchain: BlockchainData = {
      batchId: id,
      farmLocation: "Sangli, Maharashtra",
      harvestDate: harvestDate,
      quantity: 1000,
      farmer: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      status: ["harvested", "processed", "in_transit", "at_retailer", "sold"].indexOf(currentStatus),
    }

    // Add processing data to blockchain if applicable
    if (currentStatus !== "harvested") {
      blockchain.processingMethod = "Steam drying"
      blockchain.processingDate = processingDate
      blockchain.processor = "0x8ba1f109551bD432803012645Hac136c30C6756"
    }

    // Add distribution data to blockchain if applicable
    if (currentStatus !== "harvested" && currentStatus !== "processed") {
      blockchain.transportMethod = "Refrigerated truck"
      blockchain.pickupDate = pickupDate
      blockchain.distributor = "0x617F2E2fD72FD9D5503197092aC168c91465E7f2"
    }

    return { batch, blockchain }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#d4a017] border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Loading batch information...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p className="font-medium">Error loading batch data</p>
        <p>{error}</p>
      </div>
    )
  }

  if (!batchData) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
        <p>No data found for batch ID: {batchId}</p>
      </div>
    )
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "harvested":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Clock className="w-3 h-3 mr-1" />
            Harvested
          </span>
        )
      case "processed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Processed
          </span>
        )
      case "in_transit":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            In Transit
          </span>
        )
      case "at_retailer":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Clock className="w-3 h-3 mr-1" />
            At Retailer
          </span>
        )
      case "sold":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sold
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unknown
          </span>
        )
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl">Batch Information</CardTitle>
            <CardDescription>Details about batch {batchId}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(batchData.currentStatus)}
            {isVerified !== null &&
              (isVerified ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <XCircle className="w-3 h-3 mr-1" />
                  Not Verified
                </span>
              ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-500">Batch ID</h3>
              <p>{batchData.batchId}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-500">Blockchain Transaction</h3>
              <p className="truncate">{batchData.blockchainTxHash}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative border-l-2 border-gray-200 pl-8 ml-4 space-y-10">
        {/* Farmer */}
        <div className="relative">
          <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-2 border-white bg-[#d4a017] flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Harvested by Farmer</CardTitle>
              <CardDescription>{formatDate(batchData.farmer.harvestDate)}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-500">Farmer</h3>
                  <p>{batchData.farmer.userId.fullName}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Farm Location</h3>
                  <p>{batchData.farmer.farmLocation}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Quantity</h3>
                  <p>{batchData.farmer.quantity} kg</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Quality Grade</h3>
                  <p>{batchData.farmer.qualityGrade}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Organic Certified</h3>
                  <p>{batchData.farmer.organicCertified ? "Yes" : "No"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Processor */}
        {batchData.processor && (
          <div className="relative">
            <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-2 border-white bg-[#d4a017] flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Processed</CardTitle>
                <CardDescription>{formatDate(batchData.processor.processingDate)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Processor</h3>
                    <p>{batchData.processor.userId.fullName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Processing Unit</h3>
                    <p>{batchData.processor.userId.roleSpecificData.processingUnitName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Processing Method</h3>
                    <p>{batchData.processor.processingMethod}</p>
                  </div>
                </div>

                {batchData.processor.qualityTests && batchData.processor.qualityTests.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-500 mb-2">Quality Tests</h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Test Type
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Result
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {batchData.processor.qualityTests.map((test, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{test.testType}</td>
                            <td className="px-4 py-2">{test.result}</td>
                            <td className="px-4 py-2">{formatDate(test.testDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Distributor */}
        {batchData.distributor && (
          <div className="relative">
            <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-2 border-white bg-[#d4a017] flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Distribution</CardTitle>
                <CardDescription>
                  {formatDate(batchData.distributor.pickupDate)} - {formatDate(batchData.distributor.deliveryDate)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Distributor</h3>
                    <p>{batchData.distributor.userId.fullName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Company</h3>
                    <p>{batchData.distributor.userId.roleSpecificData.distributionCompanyName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Transport Method</h3>
                    <p>{batchData.distributor.transportMethod}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Storage Conditions</h3>
                    <p>{batchData.distributor.storageConditions}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Retailer */}
        {batchData.retailer && (
          <div className="relative">
            <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border-2 border-white bg-[#d4a017] flex items-center justify-center">
              <span className="text-white text-xs font-bold">4</span>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Retail</CardTitle>
                <CardDescription>{formatDate(batchData.retailer.receivedDate)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Retailer</h3>
                    <p>{batchData.retailer.userId.fullName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Store</h3>
                    <p>{batchData.retailer.userId.roleSpecificData.storeName}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Store Location</h3>
                    <p>{batchData.retailer.storeLocation}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Price</h3>
                    <p>${batchData.retailer.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Shelf Life Until</h3>
                    <p>{formatDate(batchData.retailer.shelfLife)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Blockchain Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Verification</CardTitle>
          <CardDescription>Verify the authenticity of this batch on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                {isVerified ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <p className="font-medium">
                  {isVerified
                    ? "This batch has been verified on the blockchain"
                    : "This batch could not be fully verified on the blockchain"}
                </p>
                <p className="text-sm text-gray-500">
                  {isVerified
                    ? "All data matches the blockchain record"
                    : "Some data may have been altered or is missing from the blockchain"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Blockchain Transaction</h3>
              <p className="text-sm font-mono break-all">{batchData.blockchainTxHash}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
