import { Button } from "@/components/ui/button"
import { Shield, Menu } from "lucide-react"
import { WalletStatus } from "@/components/wallet-status"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <img src="/avalanche-logo.png" alt="Avalanche" className="h-6 w-6 opacity-80" />
            </div>
            <span className="font-heading text-xl font-black text-slate-900">DeFi Will</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#security" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Security
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <WalletStatus />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
