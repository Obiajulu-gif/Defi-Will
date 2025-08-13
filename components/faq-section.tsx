"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What if my heirs lose their private keys?",
    answer:
      "DeFi Will includes a multi-sig recovery system. We provide secure backup options including hardware wallet integration and social recovery mechanisms to ensure your beneficiaries can always access their inheritance.",
  },
  {
    question: "How does the AI monitoring work?",
    answer:
      "Our AI analyzes your on-chain activity patterns, transaction frequency, and behavioral indicators. It learns your normal activity and can detect extended periods of inactivity while maintaining complete privacy of your transaction details.",
  },
  {
    question: "Is this legally binding?",
    answer:
      "Yes, DeFi Will works with legal partners in multiple jurisdictions to ensure compliance. Our smart contracts are designed to work alongside traditional legal frameworks and can integrate with existing estate planning documents.",
  },
  {
    question: "What happens if I want to change my will?",
    answer:
      "You maintain full control over your will at all times. You can update beneficiaries, change asset allocations, modify inactivity periods, or completely revoke the will through our secure dashboard interface.",
  },
  {
    question: "How secure are the smart contracts?",
    answer:
      "Our smart contracts are audited by leading security firms and use battle-tested multi-signature technology. We employ zero-knowledge proofs for privacy and have undergone extensive penetration testing.",
  },
  {
    question: "What cryptocurrencies are supported?",
    answer:
      "We currently support all major tokens on Avalanche including AVAX, USDC, USDT, and popular DeFi tokens. We're expanding to support Ethereum, Bitcoin, and other major networks in 2024.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Everything you need to know about securing your digital legacy.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border border-gray-200 hover:border-emerald-300 transition-colors">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 text-lg pr-4">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
