import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { TrustSection } from "@/components/trust-section"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { InteractiveDemoSection } from "@/components/interactive-demo-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SecuritySection } from "@/components/security-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <ProblemSection />
        <InteractiveDemoSection />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <SecuritySection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
