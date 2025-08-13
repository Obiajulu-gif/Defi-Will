"use client"

import { Bell, Settings, User, Search, Menu, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useWeb3 } from "@/hooks/use-web3"
import { useState } from "react"

export function DashboardHeader() {
  const { address, isConnected, disconnect } = useWeb3()
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-heading font-bold text-sm">DW</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-600">Manage your digital legacy</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search wills, beneficiaries, assets..."
                className="pl-10 bg-slate-50 border-slate-200 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </span>
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-emerald-100 text-emerald-700">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-slate-900">John Doe</p>
                {isConnected && address ? (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={copyAddress}
                      className="text-xs text-slate-600 hover:text-emerald-600 flex items-center space-x-1"
                    >
                      <span>{formatAddress(address)}</span>
                      <Copy className="w-3 h-3" />
                    </button>
                    {copied && <span className="text-xs text-emerald-600">Copied!</span>}
                  </div>
                ) : (
                  <p className="text-xs text-slate-600">Premium Plan</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input placeholder="Search..." className="pl-10 bg-slate-50 border-slate-200" />
          </div>
          {isConnected && address && (
            <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-700">Connected: {formatAddress(address)}</span>
                <Button variant="ghost" size="sm" onClick={copyAddress}>
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
