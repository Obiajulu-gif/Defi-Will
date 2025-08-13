import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export function CTASection() {
  return (
    <section className="bg-primary py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>

          <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl">
            Ready to Secure Your Digital Legacy?
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-white/90">
            Join thousands of DeFi users who trust their digital inheritance to our AI-powered platform. Set up your
            will in minutes, not months.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <ConnectWalletButton
              redirectToDashboard={true}
              className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold"
            >
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold w-full"
              >
                Start Your Digital Will
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </ConnectWalletButton>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-white/70">
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-white/50"></div>
              No setup fees
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-white/50"></div>
              Cancel anytime
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-white/50"></div>
              24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
