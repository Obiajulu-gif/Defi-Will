import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Zap } from "lucide-react"

export function SecuritySection() {
  return (
    <section id="security" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Bank-Grade Security
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Your assets are protected by multiple layers of security, from smart contracts to AI monitoring.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl font-bold">Multi-Signature Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 leading-relaxed">
                2-of-3 multi-signature architecture ensures no single point of failure. Your key + Executor key +
                Platform key required for any inheritance trigger.
              </CardDescription>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Time-locked releases for added security
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Emergency override capabilities
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Reentrancy protection built-in
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-sm">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl font-bold">Zero-Knowledge Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 leading-relaxed">
                Privacy-preserving verification using zero-knowledge proofs. Verify legal documents without exposing
                sensitive information.
              </CardDescription>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Death certificate verification
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Court order validation
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Identity verification with minimal data
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-sm">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl font-bold">AI Fraud Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 leading-relaxed">
                Advanced machine learning algorithms continuously monitor for suspicious activity and potential fraud
                attempts in real-time.
              </CardDescription>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Behavioral pattern analysis
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Anomaly detection algorithms
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Real-time threat assessment
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-sm">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-heading text-xl font-bold">Smart Contract Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-600 leading-relaxed">
                All smart contracts undergo rigorous security audits and formal verification to ensure the highest level
                of protection for your assets.
              </CardDescription>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  OpenZeppelin security standards
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Formal verification processes
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <div className="mr-2 h-2 w-2 rounded-full bg-primary"></div>
                  Continuous security monitoring
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
