"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

// Form steps
const STEPS = {
  COMMON_INFO: 0,
  ROLE_SPECIFIC: 1,
  REVIEW: 2,
  SUCCESS: 3,
}

export default function RegistrationForm() {
  const router = useRouter()
  const [step, setStep] = useState(STEPS.COMMON_INFO)
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    role: "farmer",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    govtId: "",

    // Farmer fields
    farmLocation: "",
    farmSize: "",
    cropType: "Turmeric",
    certification: "",
    experience: "",

    // Processor fields
    processingUnitName: "",
    licenseNumber: "",
    facilityLocation: "",
    processingTypes: "",
    storageCapacity: "",
    qualityStandards: "",

    // Distributor fields
    distributionCompanyName: "",
    warehouseAddress: "",
    transportationMode: "",
    gstNumber: "",
    routesCovered: "",

    // Retailer fields
    storeName: "",
    retailLicense: "",
    storeAddress: "",
    retailCategory: "",

    // Consumer fields
    userName: "",
    location: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the data to your backend
    nextStep()
  }

  // Render common information form
  const renderCommonInfoForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name / Organization Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
            <SelectTrigger>
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
          <Label htmlFor="email">Email ID *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="govtId">Government-issued ID Number (optional but recommended)</Label>
          <Input id="govtId" value={formData.govtId} onChange={(e) => handleChange("govtId", e.target.value)} />
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full bg-[#d4a017] hover:bg-[#c29016]">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )

  // Render role-specific form based on selected role
  const renderRoleSpecificForm = () => {
    switch (formData.role) {
      case "farmer":
        return renderFarmerForm()
      case "processor":
        return renderProcessorForm()
      case "distributor":
        return renderDistributorForm()
      case "retailer":
        return renderRetailerForm()
      case "consumer":
        return renderConsumerForm()
      default:
        return null
    }
  }

  // Farmer form
  const renderFarmerForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="farmLocation">Farm Location (GPS or Address) *</Label>
          <Input
            id="farmLocation"
            value={formData.farmLocation}
            onChange={(e) => handleChange("farmLocation", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="farmSize">Farm Size (in acres/hectares) *</Label>
          <Input
            id="farmSize"
            value={formData.farmSize}
            onChange={(e) => handleChange("farmSize", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cropType">Type of Crop Grown</Label>
          <Input
            id="cropType"
            value={formData.cropType}
            onChange={(e) => handleChange("cropType", e.target.value)}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certification">Certification Info (e.g., Organic, FSSAI, etc.)</Label>
          <Input
            id="certification"
            value={formData.certification}
            onChange={(e) => handleChange("certification", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Years of Experience *</Label>
          <Input
            id="experience"
            type="number"
            value={formData.experience}
            onChange={(e) => handleChange("experience", e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="bg-[#d4a017] hover:bg-[#c29016]">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )

  // Processor form
  const renderProcessorForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="processingUnitName">Processing Unit Name *</Label>
          <Input
            id="processingUnitName"
            value={formData.processingUnitName}
            onChange={(e) => handleChange("processingUnitName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenseNumber">License/Registration Number *</Label>
          <Input
            id="licenseNumber"
            value={formData.licenseNumber}
            onChange={(e) => handleChange("licenseNumber", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="facilityLocation">Facility Location *</Label>
          <Input
            id="facilityLocation"
            value={formData.facilityLocation}
            onChange={(e) => handleChange("facilityLocation", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="processingTypes">Types of Processing Performed *</Label>
          <Textarea
            id="processingTypes"
            placeholder="e.g., boiling, drying, polishing"
            value={formData.processingTypes}
            onChange={(e) => handleChange("processingTypes", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storageCapacity">Storage Capacity *</Label>
          <Input
            id="storageCapacity"
            value={formData.storageCapacity}
            onChange={(e) => handleChange("storageCapacity", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="qualityStandards">Quality Standards Followed</Label>
          <Input
            id="qualityStandards"
            placeholder="e.g., ISO, HACCP"
            value={formData.qualityStandards}
            onChange={(e) => handleChange("qualityStandards", e.target.value)}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="bg-[#d4a017] hover:bg-[#c29016]">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )

  // Distributor form
  const renderDistributorForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="distributionCompanyName">Distribution Company Name *</Label>
          <Input
            id="distributionCompanyName"
            value={formData.distributionCompanyName}
            onChange={(e) => handleChange("distributionCompanyName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="warehouseAddress">Warehouse/Logistics Center Address *</Label>
          <Textarea
            id="warehouseAddress"
            value={formData.warehouseAddress}
            onChange={(e) => handleChange("warehouseAddress", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportationMode">Transportation Mode *</Label>
          <Input
            id="transportationMode"
            placeholder="e.g., Truck, Cold Chain"
            value={formData.transportationMode}
            onChange={(e) => handleChange("transportationMode", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gstNumber">License or GST Number *</Label>
          <Input
            id="gstNumber"
            value={formData.gstNumber}
            onChange={(e) => handleChange("gstNumber", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="routesCovered">Routes Covered/Regions Served *</Label>
          <Textarea
            id="routesCovered"
            value={formData.routesCovered}
            onChange={(e) => handleChange("routesCovered", e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="bg-[#d4a017] hover:bg-[#c29016]">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )

  // Retailer form
  const renderRetailerForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="storeName">Store Name *</Label>
          <Input
            id="storeName"
            value={formData.storeName}
            onChange={(e) => handleChange("storeName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="retailLicense">Retail License Number *</Label>
          <Input
            id="retailLicense"
            value={formData.retailLicense}
            onChange={(e) => handleChange("retailLicense", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="storeAddress">Store Address *</Label>
          <Textarea
            id="storeAddress"
            value={formData.storeAddress}
            onChange={(e) => handleChange("storeAddress", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="retailCategory">Retail Category *</Label>
          <Input
            id="retailCategory"
            placeholder="e.g., Organic Store, Supermarket, Local Shop"
            value={formData.retailCategory}
            onChange={(e) => handleChange("retailCategory", e.target.value)}
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="bg-[#d4a017] hover:bg-[#c29016]">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )

  // Consumer form
  const renderConsumerForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        nextStep()
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="userName">User Name *</Label>
          <Input
            id="userName"
            value={formData.userName}
            onChange={(e) => handleChange("userName", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (optional, for regional product tracking)</Label>
          <Input id="location" value={formData.location} onChange={(e) => handleChange("location", e.target.value)} />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button type="submit" className="bg-[#d4a017] hover:bg-[#c29016]">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  )

  // Review form
  const renderReviewForm = () => {
    const renderCommonInfo = () => (
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">Common Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name / Organization</p>
            <p>{formData.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="capitalize">{formData.role}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p>{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p>{formData.phone}</p>
          </div>
          {formData.govtId && (
            <div>
              <p className="text-sm text-gray-500">Government ID</p>
              <p>{formData.govtId}</p>
            </div>
          )}
        </div>
      </div>
    )

    const renderRoleInfo = () => {
      switch (formData.role) {
        case "farmer":
          return (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Farmer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Farm Location</p>
                  <p>{formData.farmLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Farm Size</p>
                  <p>{formData.farmSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Crop Type</p>
                  <p>{formData.cropType}</p>
                </div>
                {formData.certification && (
                  <div>
                    <p className="text-sm text-gray-500">Certification</p>
                    <p>{formData.certification}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Years of Experience</p>
                  <p>{formData.experience}</p>
                </div>
              </div>
            </div>
          )
        case "processor":
          return (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Processor Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Processing Unit Name</p>
                  <p>{formData.processingUnitName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">License Number</p>
                  <p>{formData.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Facility Location</p>
                  <p>{formData.facilityLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Processing Types</p>
                  <p>{formData.processingTypes}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Storage Capacity</p>
                  <p>{formData.storageCapacity}</p>
                </div>
                {formData.qualityStandards && (
                  <div>
                    <p className="text-sm text-gray-500">Quality Standards</p>
                    <p>{formData.qualityStandards}</p>
                  </div>
                )}
              </div>
            </div>
          )
        case "distributor":
          return (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Distributor Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Distribution Company</p>
                  <p>{formData.distributionCompanyName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Warehouse Address</p>
                  <p>{formData.warehouseAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Transportation Mode</p>
                  <p>{formData.transportationMode}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">GST Number</p>
                  <p>{formData.gstNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Routes Covered</p>
                  <p>{formData.routesCovered}</p>
                </div>
              </div>
            </div>
          )
        case "retailer":
          return (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Retailer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Store Name</p>
                  <p>{formData.storeName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Retail License</p>
                  <p>{formData.retailLicense}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Store Address</p>
                  <p>{formData.storeAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Retail Category</p>
                  <p>{formData.retailCategory}</p>
                </div>
              </div>
            </div>
          )
        case "consumer":
          return (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Consumer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">User Name</p>
                  <p>{formData.userName}</p>
                </div>
                {formData.location && (
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{formData.location}</p>
                  </div>
                )}
              </div>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">{renderCommonInfo()}</div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">{renderRoleInfo()}</div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the terms and conditions and privacy policy
            </label>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="bg-[#d4a017] hover:bg-[#c29016]">
              Submit Registration
            </Button>
          </div>
        </div>
      </form>
    )
  }

  // Success message
  const renderSuccessMessage = () => (
    <div className="text-center py-8">
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
      <p className="text-gray-600 mb-6">
        Your account has been created successfully. You can now login to access the platform.
      </p>
      <Button onClick={() => router.push("/login")} className="bg-[#d4a017] hover:bg-[#c29016]">
        Go to Login
      </Button>
    </div>
  )

  // Progress indicator
  const renderProgress = () => {
    if (step === STEPS.SUCCESS) return null

    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {["Basic Info", "Role Details", "Review"].map((label, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step >= index ? "bg-[#d4a017] text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 bg-gray-200 rounded-full">
          <div
            className="h-1 bg-[#d4a017] rounded-full transition-all duration-300"
            style={{ width: `${(step / STEPS.REVIEW) * 100}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          {step === STEPS.SUCCESS ? "Registration Complete" : "Create Your Account"}
        </CardTitle>
        {step !== STEPS.SUCCESS && (
          <CardDescription className="text-center">
            {step === STEPS.COMMON_INFO && "Enter your basic information"}
            {step === STEPS.ROLE_SPECIFIC && `Enter your ${formData.role} details`}
            {step === STEPS.REVIEW && "Review your information"}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {renderProgress()}

        {step === STEPS.COMMON_INFO && renderCommonInfoForm()}
        {step === STEPS.ROLE_SPECIFIC && renderRoleSpecificForm()}
        {step === STEPS.REVIEW && renderReviewForm()}
        {step === STEPS.SUCCESS && renderSuccessMessage()}
      </CardContent>
    </Card>
  )
}
