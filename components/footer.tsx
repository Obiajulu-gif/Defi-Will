import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <img src="/avalanche-logo.png" alt="Avalanche" className="h-6 w-6 opacity-80" />
              </div>
              <span className="font-heading text-xl font-black text-white">DeFi Will</span>
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              Secure your digital legacy with AI-powered inheritance planning on Avalanche blockchain.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center space-x-2">
                <img src="/avalanche-logo.png" alt="Avalanche" className="w-4 h-4" />
                <span className="text-xs text-red-400 font-medium">Powered by Avalanche</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Audits
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold text-white">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-400">© 2025 DeFi Will. All rights reserved. Built on Avalanche.</p>
        </div>
      </div>
    </footer>
  )
}
