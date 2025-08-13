"use client"

import { useState, useEffect } from "react"
import { Shield, Users, DollarSign, Clock } from "lucide-react"

export function TrustSection() {
  const [stats, setStats] = useState({
    wills: 4329,
    assets: 125000000,
    users: 12500,
    uptime: 99.9,
  })

  // Animate counters
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        wills: prev.wills + Math.floor(Math.random() * 3) + 1,
        assets: prev.assets + Math.floor(Math.random() * 50000) + 10000,
        users: prev.users + Math.floor(Math.random() * 5) + 1,
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500 mb-8">Trusted by leading crypto organizations</p>
          <div className="flex items-center justify-center space-x-12 opacity-70">
            <div className="flex items-center space-x-3 group hover:opacity-100 transition-opacity">
              <img
                src="/avalanche-logo.png"
                alt="Avalanche"
                className="w-8 h-8 group-hover:scale-110 transition-transform"
              />
              <span className="font-semibold text-gray-700 text-lg">Avalanche</span>
            </div>
            <div className="flex items-center space-x-3 group hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-semibold text-gray-700 text-lg">Chainlink</span>
            </div>
            <div className="flex items-center space-x-3 group hover:opacity-100 transition-opacity">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-gray-700 text-lg">LegalTech</span>
            </div>
            <div className="flex items-center space-x-3 group hover:opacity-100 transition-opacity">
              <img
                src="/crypto-wallet-icon.png"
                alt="MetaMask"
                className="w-8 h-8 group-hover:scale-110 transition-transform"
              />
              <span className="font-semibold text-gray-700 text-lg">MetaMask</span>
            </div>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-emerald-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-emerald-100 transition-colors">
              <Shield className="h-8 w-8 text-emerald-600 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 tabular-nums">{stats.wills.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Wills Secured</div>
            <div className="text-xs text-emerald-600 mt-1">Live Counter ●</div>
          </div>

          <div className="text-center group">
            <div className="bg-blue-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
              <DollarSign className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 tabular-nums">
              ${(stats.assets / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-gray-600">Assets Protected</div>
            <div className="text-xs text-blue-600 mt-1">Growing Daily ↗</div>
          </div>

          <div className="text-center group">
            <div className="bg-purple-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
              <Users className="h-8 w-8 text-purple-600 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 tabular-nums">{stats.users.toLocaleString()}+</div>
            <div className="text-sm text-gray-600">Active Users</div>
            <div className="text-xs text-purple-600 mt-1">Worldwide</div>
          </div>

          <div className="text-center group">
            <div className="bg-yellow-50 rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:bg-yellow-100 transition-colors">
              <Clock className="h-8 w-8 text-yellow-600 mx-auto" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2 tabular-nums">{stats.uptime}%</div>
            <div className="text-sm text-gray-600">Uptime</div>
            <div className="text-xs text-yellow-600 mt-1">24/7 Monitoring</div>
          </div>
        </div>
      </div>
    </section>
  )
}
