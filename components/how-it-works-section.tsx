"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wallet, UserPlus, Shield, CheckCircle, Play, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Connect your Avalanche wallet and grant monitoring permissions for activity tracking.",
    step: "01",
    details:
      "Supports MetaMask, Core Wallet, and hardware wallets. We only monitor activity patterns, never access your private keys.",
    color: "emerald",
  },
  {
    icon: UserPlus,
    title: "Add Beneficiaries",
    description: "Set up beneficiaries with custom asset allocation and inheritance conditions.",
    step: "02",
    details:
      "Use ENS names, wallet addresses, or email invitations. Set percentage allocations and specific conditions for each heir.",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Configure Security",
    description: "Set up multi-sig protection, inactivity thresholds, and emergency contacts.",
    step: "03",
    details:
      "Choose your inactivity period (3-24 months), set up 2-of-3 multi-sig, and add emergency contacts for additional security.",
    color: "purple",
  },
  {
    icon: CheckCircle,
    title: "Monitor & Maintain",
    description: "AI continuously monitors your activity while you maintain full control of your assets.",
    step: "04",
    details:
      "Receive regular activity reports, update your will anytime, and get alerts before any inheritance triggers activate.",
    color: "yellow",
  },
]

const colorClasses = {
  emerald: "from-emerald-500 to-emerald-600 bg-emerald-50 text-emerald-600 border-emerald-200",
  blue: "from-blue-500 to-blue-600 bg-blue-50 text-blue-600 border-blue-200",
  purple: "from-purple-500 to-purple-600 bg-purple-50 text-purple-600 border-purple-200",
  yellow: "from-yellow-500 to-yellow-600 bg-yellow-50 text-yellow-600 border-yellow-200",
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-heading text-4xl font-black tracking-tight text-gray-900 sm:text-5xl mb-6">
            How It Works
          </h2>
          <p className="text-xl leading-relaxed text-gray-600 mb-8">
            Set up your digital inheritance in minutes with our simple, secure process.
          </p>

          {/* Embedded Video Placeholder */}
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <div className="aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="bg-white/20 rounded-full p-6 mb-4 group-hover:bg-white/30 transition-colors">
                  <Play className="h-12 w-12 text-white ml-1" />
                </div>
                <p className="text-white text-lg font-semibold">Watch 1-Minute Explainer</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 to-blue-600/80"></div>
          </div>
        </div>

        {/* Interactive Steps */}
        <div className="max-w-6xl mx-auto">
          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {steps.map((step, index) => (
              <Button
                key={index}
                variant={activeStep === index ? "default" : "outline"}
                onClick={() => setActiveStep(index)}
                className={`px-6 py-3 ${
                  activeStep === index
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                <span className="font-bold mr-2">{step.step}</span>
                {step.title}
              </Button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className={`border-2 ${colorClasses[steps[activeStep].color].split(" ").slice(-1)[0]} shadow-xl`}>
                <CardHeader className="text-center pb-4">
                  <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${colorClasses[steps[activeStep].color].split(" ").slice(0, 2).join(" ")} text-white font-heading text-2xl font-black shadow-lg`}
                  >
                    {steps[activeStep].step}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colorClasses[steps[activeStep].color].split(" ")[2]} ${colorClasses[steps[activeStep].color].split(" ")[3]}`}
                    >
                      {(() => {
                        const IconComponent = steps[activeStep].icon
                        return <IconComponent className="h-8 w-8" />
                      })()}
                    </div>
                  </div>
                  <CardTitle className="font-heading text-2xl font-bold mt-4">{steps[activeStep].title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed text-lg">
                    {steps[activeStep].description}
                  </CardDescription>
                  <p className="text-gray-700 leading-relaxed">{steps[activeStep].details}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">
                Step {steps[activeStep].step}: {steps[activeStep].title}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed">{steps[activeStep].details}</p>

              {/* Step-specific content */}
              {activeStep === 0 && (
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-3">Supported Wallets:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg"></div>
                      <span>MetaMask</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-500 rounded-lg"></div>
                      <span>Core Wallet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                      <span>Ledger</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
                      <span>Trezor</span>
                    </div>
                  </div>
                </div>
              )}

              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4"
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              >
                {activeStep === steps.length - 1 ? "Get Started Now" : "Next Step"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
