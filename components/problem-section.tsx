"use client"

import { AlertTriangle, FileX, DollarSign } from "lucide-react"

export function ProblemSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">The $140 Billion Problem</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every year, billions in crypto assets are lost forever due to poor inheritance planning. Don't let your
            legacy disappear.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-16 text-center border border-red-100">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-100 rounded-full p-4">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>
          <div className="text-5xl font-bold text-red-600 mb-4">20%</div>
          <div className="text-xl text-gray-700 mb-2">of all Bitcoin is lost forever</div>
          <div className="text-gray-500">That's over $140 billion in unreachable assets</div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileX className="h-8 w-8 text-red-500 mr-3" />
              Traditional Wills
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">Months of Legal Process</div>
                  <div className="text-gray-600">Probate courts, lawyers, endless paperwork</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">High Costs</div>
                  <div className="text-gray-600">Legal fees can consume 5-10% of assets</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">No Crypto Support</div>
                  <div className="text-gray-600">Traditional lawyers don't understand DeFi</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">Single Point of Failure</div>
                  <div className="text-gray-600">Lost keys = lost forever</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl shadow-lg p-8 border-l-4 border-emerald-500">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <DollarSign className="h-8 w-8 text-emerald-500 mr-3" />
              DeFi Will
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">Instant Execution</div>
                  <div className="text-gray-600">Smart contracts execute automatically</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">Minimal Costs</div>
                  <div className="text-gray-600">Only network fees, no lawyer markup</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">Native Crypto Support</div>
                  <div className="text-gray-600">Built specifically for DeFi assets</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <div>
                  <div className="font-semibold text-gray-900">Multi-Sig Security</div>
                  <div className="text-gray-600">Distributed control, maximum security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
