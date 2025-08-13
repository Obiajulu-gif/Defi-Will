"use client"

import { Plus, Shield, Clock, Users, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWeb3 } from "@/hooks/use-web3"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface Will {
  id: number
  name: string
  status: string
  assets: string
  beneficiaries: number
  lastActivity: string
  riskLevel: string
  contractAddress: string
}

export function WillsOverview() {
  const { address, isConnected } = useWeb3()
  const router = useRouter()
  const [wills, setWills] = useState<Will[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isConnected && address) {
      setIsLoading(true)
      // Simulate loading delay
      setTimeout(() => {
        const mockWills: Will[] = [
          {
            id: 1,
            name: "Primary Will",
            status: "Active",
            assets: "$125,430",
            beneficiaries: 3,
            lastActivity: "2 hours ago",
            riskLevel: "Low",
            contractAddress: `0x${address.slice(2, 6)}...${address.slice(-4)}`,
          },
          {
            id: 2,
            name: "Emergency Fund",
            status: "Monitoring",
            assets: "$45,200",
            beneficiaries: 1,
            lastActivity: "1 day ago",
            riskLevel: "Medium",
            contractAddress: `0x${address.slice(2, 6)}...${address.slice(-4)}`,
          },
        ]
        setWills(mockWills)
        setIsLoading(false)
      }, 1000)
    }
  }, [isConnected, address])

  const handleCreateWill = () => {
    router.push("/create-will")
  }

  const viewOnExplorer = (contractAddress: string) => {
    window.open(`https://snowtrace.io/address/${contractAddress}`, "_blank")
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading">Your Wills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Connect your wallet to view your wills</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading">Your Wills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-500">Loading your wills...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-heading">Your Wills</CardTitle>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleCreateWill}>
          <Plus className="w-4 h-4 mr-2" />
          Create Will
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {wills.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="mb-4">No wills created yet</p>
            <Button onClick={handleCreateWill} className="bg-emerald-600 hover:bg-emerald-700">
              Create Your First Will
            </Button>
          </div>
        ) : (
          wills.map((will) => (
            <div key={will.id} className="p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-slate-900">{will.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={will.status === "Active" ? "default" : "secondary"}
                    className={will.status === "Active" ? "bg-emerald-100 text-emerald-700" : ""}
                  >
                    {will.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewOnExplorer(will.contractAddress)}
                    className="h-6 w-6 p-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-600">Assets: {will.assets}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-600">{will.beneficiaries} beneficiaries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-600">Active {will.lastActivity}</span>
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className={`${will.riskLevel === "Low" ? "border-green-200 text-green-700" : "border-yellow-200 text-yellow-700"}`}
                  >
                    {will.riskLevel} Risk
                  </Badge>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-mono">Contract: {will.contractAddress}</div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
