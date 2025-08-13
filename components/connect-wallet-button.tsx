"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { WalletConnectionModal } from "./wallet-connection-modal"

interface ConnectWalletButtonProps {
  redirectToDashboard?: boolean
  className?: string
  children?: React.ReactNode
}

export function ConnectWalletButton({
  redirectToDashboard = false,
  className = "",
  children,
}: ConnectWalletButtonProps) {
  return (
    <WalletConnectionModal redirectToDashboard={redirectToDashboard}>
      {children || (
        <Button className={`gap-2 bg-emerald-600 hover:bg-emerald-700 ${className}`}>
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </WalletConnectionModal>
  )
}
