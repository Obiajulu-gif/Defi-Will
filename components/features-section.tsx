import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, FileText, Lock, Activity, Gavel } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Monitoring",
    description:
      "Advanced machine learning algorithms track your wallet activity patterns and detect anomalies in real-time.",
  },
  {
    icon: Users,
    title: "Beneficiary Management",
    description: "Easily assign and manage beneficiaries with customizable asset allocation and inheritance rules.",
  },
  {
    icon: FileText,
    title: "Legal Document Verification",
    description: "Zero-knowledge proof verification of death certificates and legal documents for privacy protection.",
  },
  {
    icon: Lock,
    title: "Multi-Signature Security",
    description: "2-of-3 multi-sig architecture with time-locked releases and emergency override capabilities.",
  },
  {
    icon: Activity,
    title: "Activity Dashboard",
    description: "Real-time monitoring dashboard showing wallet health, activity patterns, and inheritance status.",
  },
  {
    icon: Gavel,
    title: "Dispute Resolution",
    description: "Decentralized arbitration system for handling contested inheritance claims and disputes.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Comprehensive Digital Estate Planning
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Everything you need to secure and transfer your DeFi assets with confidence and legal compliance.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
