"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Users, Play } from "lucide-react"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export function HeroSection() {
  const [floatingElements, setFloatingElements] = useState([
    { id: 1, x: 20, y: 20, delay: 0 },
    { id: 2, x: 80, y: 30, delay: 1 },
    { id: 3, x: 15, y: 70, delay: 2 },
    { id: 4, x: 85, y: 80, delay: 0.5 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingElements((prev) =>
        prev.map((el) => ({
          ...el,
          y: el.y + (Math.random() - 0.5) * 2,
          x: el.x + (Math.random() - 0.5) * 1,
        })),
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-20 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/avalanche-mountain-bg.png"
          alt="Avalanche Mountains"
          className="absolute inset-0 w-full h-full object-cover opacity-5"
        />
        {floatingElements.map((el) => (
          <div
            key={el.id}
            className="absolute opacity-10 animate-pulse"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              animationDelay: `${el.delay}s`,
            }}
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-full blur-xl relative">
              <img src="/blockchain-icon.png" alt="Blockchain" className="absolute inset-2 w-12 h-12 opacity-30" />
            </div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-5xl text-center">
          {/* Announcement Badge */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center space-x-2 rounded-full bg-emerald-100 px-6 py-3 text-sm font-semibold text-emerald-800 border border-emerald-200 hover:bg-emerald-200 transition-colors cursor-pointer">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span>4,329+ Digital Wills Secured • Live Counter</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-5xl font-black tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-6">
            Never Lose Your Crypto to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
              Time or Tragedy
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-600 sm:text-2xl">
            DeFi Will automatically safeguards your assets for loved ones—with{" "}
            <span className="font-semibold text-emerald-600">AI monitoring</span> +{" "}
            <span className="font-semibold text-blue-600">court-approved transfers</span>.
          </p>

          {/* Key Benefits */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-lg">
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Set up your inheritance plan in 3 minutes</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>100% on-chain, no intermediaries</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <ConnectWalletButton
              redirectToDashboard={true}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </ConnectWalletButton>

            <Button
              size="lg"
              variant="outline"
              className="px-10 py-5 text-lg font-semibold border-2 border-gray-300 hover:border-emerald-500 hover:text-emerald-600 rounded-xl transition-all duration-300 group bg-transparent"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              See How It Works →
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg group-hover:shadow-xl transition-shadow relative">
                <Shield className="h-8 w-8 text-white" />
                <img
                  src="/crypto-wallet-icon.png"
                  alt="Crypto Wallet"
                  className="absolute -top-1 -right-1 w-6 h-6 opacity-80"
                />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-gray-900">Multi-Sig Security</h3>
              <p className="mt-2 text-gray-600 text-center">
                2-of-3 multi-signature protection with hardware wallet support
              </p>
            </div>

            <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:shadow-xl transition-shadow relative">
                <Zap className="h-8 w-8 text-white" />
                <img
                  src="/avalanche-logo.png"
                  alt="Avalanche"
                  className="absolute -bottom-1 -right-1 w-5 h-5 opacity-70"
                />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-gray-900">AI Monitoring</h3>
              <p className="mt-2 text-gray-600 text-center">Intelligent activity detection with behavioral analysis</p>
            </div>

            <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-shadow relative">
                <Users className="h-8 w-8 text-white" />
                <img
                  src="/inheritance-icon.png"
                  alt="Inheritance"
                  className="absolute -top-1 -left-1 w-6 h-6 opacity-80"
                />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-gray-900">Family Inheritance</h3>
              <p className="mt-2 text-gray-600 text-center">Seamless asset transfer to your chosen beneficiaries</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-10 top-1/2 transform -translate-y-1/2 hidden xl:block opacity-20">
        <div className="w-64 h-64 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-3xl shadow-2xl transform rotate-12 animate-pulse relative">
          <img src="/blockchain-icon.png" alt="Blockchain Network" className="absolute inset-8 w-48 h-48 opacity-40" />
        </div>
      </div>
    </section>
  )
}
