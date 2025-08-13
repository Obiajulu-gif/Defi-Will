"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, LogOut, Settings, Copy, ExternalLink, AlertTriangle, LayoutDashboard } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"
import { WalletConnectionModal } from "./wallet-connection-modal"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function WalletStatus() {
  const { isConnected, address, networkName, isWrongNetwork, disconnectWallet, switchToAvalanche } = useWeb3()
  const router = useRouter()

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      toast.success("Address copied to clipboard")
    }
  }

  const openInExplorer = () => {
    if (address) {
      const explorerUrl = `https://snowtrace.io/address/${address}`
      window.open(explorerUrl, "_blank")
    }
  }

  const goToDashboard = () => {
    router.push("/dashboard")
  }

  if (!isConnected) {
    return (
      <WalletConnectionModal>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </WalletConnectionModal>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={goToDashboard} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
        <LayoutDashboard className="h-4 w-4" />
        <span className="hidden sm:inline">Dashboard</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Wallet className="h-4 w-4" />
            <span className="hidden sm:inline">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            {isWrongNetwork && <AlertTriangle className="h-4 w-4 text-red-500" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Connected Wallet</span>
              <Badge variant={isWrongNetwork ? "destructive" : "secondary"} className="text-xs">
                {networkName}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 mt-1 font-mono">
              {address?.slice(0, 20)}...{address?.slice(-10)}
            </div>
          </div>

          <DropdownMenuSeparator />

          {isWrongNetwork && (
            <>
              <DropdownMenuItem onClick={() => switchToAvalanche(true)} className="text-red-600">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Switch to Avalanche
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}

          <DropdownMenuItem onClick={goToDashboard}>
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Go to Dashboard
          </DropdownMenuItem>

          <DropdownMenuItem onClick={copyAddress}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </DropdownMenuItem>

          <DropdownMenuItem onClick={openInExplorer}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2" />
            Wallet Settings
          </DropdownMenuItem>

          <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
