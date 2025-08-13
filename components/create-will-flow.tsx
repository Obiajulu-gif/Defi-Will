"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Plus, Trash2, Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDefiWill } from "@/hooks/use-defi-will"
import { useWeb3 } from "@/hooks/use-web3"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Beneficiary {
  name: string
  address: string
  percentage: number
}

interface UploadedDocument {
  name: string
  size: number
  type: string
  url: string
  uploadedAt: number
}

export function CreateWillFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isCreating, setIsCreating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const totalSteps = 5 // Increased to 5 steps to include document upload
  const router = useRouter()
  const { account, isConnected } = useWeb3()
  const { createWill, isLoading } = useDefiWill()

  // Form state
  const [willName, setWillName] = useState("")
  const [description, setDescription] = useState("")
  const [jurisdiction, setJurisdiction] = useState("")
  const [inactivityPeriod, setInactivityPeriod] = useState("")
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]) // Added document state

  const steps = [
    { number: 1, title: "Basic Information", description: "Will name and description" },
    { number: 2, title: "Document Upload", description: "Attach important documents" }, // Added document upload step
    { number: 3, title: "Asset Selection", description: "Choose assets to include" },
    { number: 4, title: "Beneficiaries", description: "Add beneficiaries and allocations" },
    { number: 5, title: "Security Setup", description: "Configure monitoring and triggers" },
  ]

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    try {
      for (const file of files) {
        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large. Maximum size is 10MB.`)
          continue
        }

        // Validate file type
        const allowedTypes = [
          "application/pdf",
          "image/jpeg",
          "image/png",
          "image/gif",
          "text/plain",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]

        if (!allowedTypes.includes(file.type)) {
          toast.error(`File type ${file.type} is not supported.`)
          continue
        }

        // Create a mock upload URL (in production, this would upload to Vercel Blob)
        const mockUrl = URL.createObjectURL(file)

        const document: UploadedDocument = {
          name: file.name,
          size: file.size,
          type: file.type,
          url: mockUrl,
          uploadedAt: Date.now(),
        }

        setUploadedDocuments((prev) => [...prev, document])
        toast.success(`${file.name} uploaded successfully`)
      }
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload documents")
    } finally {
      setIsUploading(false)
    }
  }

  const removeDocument = (index: number) => {
    setUploadedDocuments((prev) => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const addBeneficiary = () => {
    setBeneficiaries([...beneficiaries, { name: "", address: "", percentage: 0 }])
  }

  const removeBeneficiary = (index: number) => {
    setBeneficiaries(beneficiaries.filter((_, i) => i !== index))
  }

  const updateBeneficiary = (index: number, field: keyof Beneficiary, value: string | number) => {
    const updated = [...beneficiaries]
    updated[index] = { ...updated[index], [field]: value }
    setBeneficiaries(updated)
  }

  const totalPercentage = beneficiaries.reduce((sum, b) => sum + b.percentage, 0)

  const handleCreateWill = async () => {
    if (!account || !isConnected) {
      toast.error("Please connect your wallet")
      return
    }

    if (totalPercentage !== 100) {
      toast.error("Beneficiary percentages must total 100%")
      return
    }

    if (!inactivityPeriod) {
      toast.error("Please select an inactivity period")
      return
    }

    if (!willName.trim()) {
      toast.error("Please enter a will name")
      return
    }

    setIsCreating(true)
    try {
      // Convert days to seconds
      const periodInSeconds = Number.parseInt(inactivityPeriod) * 24 * 60 * 60

      const willData = {
        name: willName,
        description,
        jurisdiction,
        beneficiaries,
        documents: uploadedDocuments.map((doc) => ({
          name: doc.name,
          size: doc.size,
          type: doc.type,
          uploadedAt: doc.uploadedAt,
        })),
        createdAt: Date.now(),
        owner: account,
        inactivityPeriod: periodInSeconds,
      }

      // In a real implementation, this would be encrypted
      const encryptedData = JSON.stringify(willData)

      await createWill(periodInSeconds, encryptedData)

      toast.success("Will created successfully with all documents attached!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to create will:", error)
      toast.error("Failed to create will. Please try again.")
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="font-heading font-bold text-2xl text-slate-900">Create New Will</h1>
          <p className="text-slate-600">Set up inheritance for your DeFi assets</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step.number < currentStep
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : step.number === currentStep
                      ? "border-emerald-600 text-emerald-600"
                      : "border-slate-300 text-slate-400"
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${step.number < currentStep ? "bg-emerald-600" : "bg-slate-300"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="font-heading font-semibold text-lg text-slate-900">{steps[currentStep - 1].title}</h2>
          <p className="text-sm text-slate-600">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Step Content */}
      <Card className="mb-6">
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="will-name">Will Name *</Label>
                <Input
                  id="will-name"
                  placeholder="e.g., Primary Will, Emergency Fund"
                  value={willName}
                  onChange={(e) => setWillName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this will's purpose"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jurisdiction">Legal Jurisdiction</Label>
                <Select value={jurisdiction} onValueChange={setJurisdiction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your jurisdiction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                    <SelectItem value="sg">Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg">Upload Documents</h3>
                <p className="text-slate-600">
                  Attach important documents such as legal papers, identification, or additional instructions.
                </p>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-slate-700">Drop files here or click to upload</p>
                    <p className="text-sm text-slate-500">
                      Supports PDF, DOC, DOCX, TXT, JPG, PNG, GIF (max 10MB each)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  {isUploading && (
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto"></div>
                      <p className="text-sm text-emerald-600 mt-2">Uploading...</p>
                    </div>
                  )}
                </div>

                {/* Uploaded Documents List */}
                {uploadedDocuments.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-slate-900">Uploaded Documents ({uploadedDocuments.length})</h4>
                    {uploadedDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <File className="w-5 h-5 text-slate-500" />
                          <div>
                            <p className="font-medium text-slate-900">{doc.name}</p>
                            <p className="text-sm text-slate-500">
                              {formatFileSize(doc.size)} • {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDocument(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <h3 className="font-heading font-semibold text-lg mb-2">Asset Selection</h3>
                <p className="text-slate-600 mb-4">Your connected wallet assets will be automatically included</p>
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-emerald-800 font-medium">✓ Wallet Connected</p>
                  <p className="text-sm text-emerald-700">
                    All assets in your connected wallet ({account?.slice(0, 6)}...{account?.slice(-4)}) will be included
                    in this will
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-lg">Beneficiaries</h3>
                <Button onClick={addBeneficiary} className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Beneficiary
                </Button>
              </div>

              {beneficiaries.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p>No beneficiaries added yet. Click "Add Beneficiary" to get started.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {beneficiaries.map((beneficiary, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            placeholder="Beneficiary name"
                            value={beneficiary.name}
                            onChange={(e) => updateBeneficiary(index, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Wallet Address</Label>
                          <Input
                            placeholder="0x..."
                            value={beneficiary.address}
                            onChange={(e) => updateBeneficiary(index, "address", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Percentage</Label>
                          <Input
                            type="number"
                            placeholder="25"
                            min="0"
                            max="100"
                            value={beneficiary.percentage || ""}
                            onChange={(e) =>
                              updateBeneficiary(index, "percentage", Number.parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeBeneficiary(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}

                  <div className="text-right">
                    <p className={`text-sm ${totalPercentage === 100 ? "text-emerald-600" : "text-red-600"}`}>
                      Total: {totalPercentage}% {totalPercentage !== 100 && "(Must equal 100%)"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-heading font-semibold text-lg">Security Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Inactivity Threshold *</Label>
                    <Select value={inactivityPeriod} onValueChange={setInactivityPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Multi-sig Requirement</Label>
                    <Select defaultValue="2of3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select requirement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2of3">2 of 3 signatures</SelectItem>
                        <SelectItem value="3of5">3 of 5 signatures</SelectItem>
                        <SelectItem value="custom">Custom setup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-3">Will Summary</h4>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Name:</span> {willName || "Not specified"}
                    </p>
                    <p>
                      <span className="font-medium">Documents:</span> {uploadedDocuments.length} attached
                    </p>
                    <p>
                      <span className="font-medium">Beneficiaries:</span> {beneficiaries.length} added
                    </p>
                    <p>
                      <span className="font-medium">Inactivity Period:</span>{" "}
                      {inactivityPeriod ? `${inactivityPeriod} days` : "Not selected"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={
            currentStep === totalSteps ? handleCreateWill : () => setCurrentStep(Math.min(totalSteps, currentStep + 1))
          }
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={isCreating || isLoading || !isConnected || (currentStep === 1 && !willName.trim())}
        >
          {currentStep === totalSteps ? (isCreating ? "Creating Will..." : "Create Will") : "Next"}
          {currentStep !== totalSteps && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
