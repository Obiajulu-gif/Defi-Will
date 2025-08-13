"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "DeFi Investor",
    avatar: "/diverse-woman-portrait.png",
    content: "Recovered my dad's $250k in AVAX after he passed unexpectedly. DeFi Will made the impossible possible.",
    rating: 5,
    location: "San Francisco, CA",
  },
  {
    name: "Michael Rodriguez",
    role: "Crypto Trader",
    avatar: "/thoughtful-man.png",
    content:
      "Finally, peace of mind knowing my family can access my crypto portfolio. The AI monitoring is incredible.",
    rating: 5,
    location: "Miami, FL",
  },
  {
    name: "Emma Thompson",
    role: "Blockchain Developer",
    avatar: "/diverse-woman-portrait.png",
    content: "As a developer, I appreciate the smart contract architecture. It's bulletproof and legally compliant.",
    rating: 5,
    location: "London, UK",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Trusted by Crypto Families Worldwide</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from families who secured their digital legacy with DeFi Will.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-lg">{testimonials[currentIndex].name}</div>
                    <div className="text-gray-600">{testimonials[currentIndex].role}</div>
                    <div className="text-sm text-gray-500">{testimonials[currentIndex].location}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex space-x-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
