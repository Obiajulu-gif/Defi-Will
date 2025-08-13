"use client"

import type React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Wifi } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"

interface NetworkGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function NetworkGuard({ children, fallback }: NetworkGuardProps) {
  const { isConnected, isWrongNetwork, switchToAvalanche, networkName } = useWeb3()

  if (!isConnected) {
    return (
      fallback || (
        <Alert>
          <Wifi className="h-4 w-4" />
          <AlertDescription>Please connect your wallet to continue.</AlertDescription>
        </Alert>
      )
    )
  }

  if (isWrongNetwork) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>You're connected to {networkName}. Please switch to Avalanche network to use DeFi Will.</span>
          <Button variant="outline" size="sm" onClick={() => switchToAvalanche(true)}>
            Switch Network
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
}
