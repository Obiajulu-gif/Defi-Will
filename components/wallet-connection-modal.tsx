"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, Shield, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"
import { useRouter } from "next/navigation"

interface WalletConnectionModalProps {
  children: React.ReactNode
  redirectToDashboard?: boolean
}

export function WalletConnectionModal({ children, redirectToDashboard = false }: WalletConnectionModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const {
    isConnected,
    isConnecting,
    isWrongNetwork,
    address,
    networkName,
    connectWallet,
    switchToAvalanche,
    connectors,
    connectError,
  } = useWeb3()

  const handleWalletConnect = async (connectorId: string) => {
    try {
      await connectWallet(connectorId)
      if (redirectToDashboard) {
        // Wait a moment for connection to complete
        setTimeout(() => {
          router.push("/dashboard")
          setIsOpen(false)
        }, 1000)
      }
    } catch (error) {
      console.error("Connection failed:", error)
    }
  }

  const handleNetworkSwitch = async () => {
    try {
      await switchToAvalanche(true) // Use testnet for demo
    } catch (error) {
      console.error("Network switch failed:", error)
    }
  }

  const getConnectorIcon = (connectorId: string) => {
    switch (connectorId) {
      case "metaMask":
        return "🦊"
      case "walletConnect":
        return "🔗"
      case "injected":
        return "💼"
      default:
        return "🔗"
    }
  }

  const getConnectorName = (connectorId: string) => {
    switch (connectorId) {
      case "metaMask":
        return "MetaMask"
      case "walletConnect":
        return "WalletConnect"
      case "injected":
        return "Browser Wallet"
      default:
        return connectorId
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-montserrat">
            <Wallet className="h-5 w-5 text-emerald-600" />
            Connect Your Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Connection Status */}
          {isConnected && (
            <Alert className="border-emerald-200 bg-emerald-50">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800">
                Connected to {address?.slice(0, 6)}...{address?.slice(-4)}
                <Badge variant="secondary" className="ml-2">
                  {networkName}
                </Badge>
              </AlertDescription>
            </Alert>
          )}

          {/* Wrong Network Warning */}
          {isConnected && isWrongNetwork && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Please switch to Avalanche network to continue.
                <Button variant="outline" size="sm" className="ml-2 bg-transparent" onClick={handleNetworkSwitch}>
                  Switch Network
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Connection Error */}
          {connectError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{connectError.message}</AlertDescription>
            </Alert>
          )}

          {/* Wallet Options */}
          {!isConnected && (
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-4">Choose your preferred wallet to connect to DeFi Will:</div>

              {connectors.map((connector) => (
                <Card
                  key={connector.id}
                  className="cursor-pointer transition-all hover:shadow-md hover:border-emerald-200"
                  onClick={() => handleWalletConnect(connector.id)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getConnectorIcon(connector.id)}</div>
                      <div>
                        <div className="font-medium">{getConnectorName(connector.id)}</div>
                        <div className="text-sm text-gray-500">
                          {connector.id === "metaMask" && "Most popular wallet"}
                          {connector.id === "walletConnect" && "Mobile & desktop wallets"}
                          {connector.id === "injected" && "Browser extension wallet"}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </CardContent>
                </Card>
              ))}

              {isConnecting && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                  <p className="text-sm text-gray-600 mt-2">Connecting wallet...</p>
                </div>
              )}
            </div>
          )}

          {/* Security Notice */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2 text-blue-800">
                <Shield className="h-4 w-4" />
                Security Notice
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-blue-700 text-xs">
                DeFi Will never stores your private keys. Your wallet remains secure and under your control at all
                times. We only request permission to read your public address and interact with our smart contracts.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {isConnected && !isWrongNetwork && redirectToDashboard && (
            <Button
              onClick={() => {
                router.push("/dashboard")
                setIsOpen(false)
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Continue to Dashboard
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
