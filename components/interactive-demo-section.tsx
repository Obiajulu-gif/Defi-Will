"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Users, Clock, ArrowRight } from "lucide-react"

export function InteractiveDemoSection() {
  const [assets, setAssets] = useState({ avax: 10, joe: 500, usdc: 5000 })
  const [beneficiaries, setBeneficiaries] = useState([
    { name: "Sarah (Spouse)", percentage: 60 },
    { name: "Michael (Son)", percentage: 25 },
    { name: "Emma (Daughter)", percentage: 15 },
  ])
  const [inactivityPeriod, setInactivityPeriod] = useState([6])

  const totalValue = assets.avax * 45 + assets.joe * 0.8 + assets.usdc

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Simulate Your Will</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See exactly how your assets would be distributed to your beneficiaries with our interactive demo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <div className="space-y-8">
            <Card className="border-2 border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                  <span>Your Assets</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="avax">AVAX Amount</Label>
                  <Input
                    id="avax"
                    type="number"
                    value={assets.avax}
                    onChange={(e) => setAssets((prev) => ({ ...prev, avax: Number(e.target.value) }))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">≈ ${(assets.avax * 45).toLocaleString()}</p>
                </div>
                <div>
                  <Label htmlFor="joe">JOE LP Tokens</Label>
                  <Input
                    id="joe"
                    type="number"
                    value={assets.joe}
                    onChange={(e) => setAssets((prev) => ({ ...prev, joe: Number(e.target.value) }))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">≈ ${(assets.joe * 0.8).toLocaleString()}</p>
                </div>
                <div>
                  <Label htmlFor="usdc">USDC</Label>
                  <Input
                    id="usdc"
                    type="number"
                    value={assets.usdc}
                    onChange={(e) => setAssets((prev) => ({ ...prev, usdc: Number(e.target.value) }))}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">${assets.usdc.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-6 w-6 text-purple-600" />
                  <span>Inactivity Period</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label>Alert me if inactive for {inactivityPeriod[0]} months</Label>
                <Slider
                  value={inactivityPeriod}
                  onValueChange={setInactivityPeriod}
                  max={24}
                  min={1}
                  step={1}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1 month</span>
                  <span>24 months</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="space-y-8">
            <Card className="border-2 border-emerald-100 bg-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-emerald-600" />
                    <span>Distribution Preview</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">${totalValue.toLocaleString()}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {beneficiaries.map((beneficiary, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                    <div>
                      <div className="font-semibold text-gray-900">{beneficiary.name}</div>
                      <div className="text-sm text-gray-500">{beneficiary.percentage}% allocation</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">
                        ${((totalValue * beneficiary.percentage) / 100).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-100 bg-yellow-50">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-lg font-semibold text-gray-900">
                    Your will activates after {inactivityPeriod[0]} months of inactivity
                  </div>
                  <div className="text-sm text-gray-600">
                    AI monitoring will detect your activity patterns and alert you before activation
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    Create This Will Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
