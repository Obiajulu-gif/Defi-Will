"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Shield, RefreshCw, ExternalLink, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/hooks/use-web3"
import { useEffect, useState } from "react"

interface TokenBalance {
  name: string
  symbol: string
  amount: string
  value: string
  change: string
  positive: boolean
  icon: string
  address?: string
}

export function AssetPortfolio() {
  const { address, isConnected } = useWeb3()
  const [assets, setAssets] = useState<TokenBalance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [avaxBalance, setAvaxBalance] = useState<string>("0")
  const [showValues, setShowValues] = useState(true)

  const fetchAvaxBalance = async () => {
    if (typeof window !== "undefined" && window.ethereum && address) {
      try {
        // Check if MetaMask is connected first
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length === 0) {
          console.warn("No accounts connected to MetaMask")
          return "0"
        }

        const balance = await window.ethereum.request({
          method: "eth_getBalance",
          params: [address, "latest"],
        })
        // Convert from wei to AVAX
        const avaxAmount = (Number.parseInt(balance, 16) / 1e18).toFixed(4)
        setAvaxBalance(avaxAmount)
        return avaxAmount
      } catch (error: any) {
        if (error.code === 4001) {
          console.warn("User rejected the request")
        } else if (error.code === -32002) {
          console.warn("Request already pending")
        } else {
          console.error("Failed to fetch AVAX balance:", error)
        }
        return "0"
      }
    }
    return "0"
  }

  useEffect(() => {
    if (isConnected && address) {
      const fetchBalanceWithTimeout = async () => {
        try {
          const balance = await Promise.race([
            fetchAvaxBalance(),
            new Promise<string>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000)),
          ])

          const mockAssets: TokenBalance[] = [
            {
              name: "Avalanche",
              symbol: "AVAX",
              amount: balance,
              value: `$${(Number.parseFloat(balance) * 42.5).toFixed(2)}`, // Mock price
              change: "+2.8%",
              positive: true,
              icon: "🔺",
            },
            {
              name: "USD Coin",
              symbol: "USDC",
              amount: "5,000",
              value: "$5,000",
              change: "0.0%",
              positive: true,
              icon: "💵",
              address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
            },
            {
              name: "Tether",
              symbol: "USDT",
              amount: "2,500",
              value: "$2,500",
              change: "+0.1%",
              positive: true,
              icon: "💰",
              address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
            },
            {
              name: "Wrapped Ethereum",
              symbol: "WETH",
              amount: "1.25",
              value: "$4,125",
              change: "+1.5%",
              positive: true,
              icon: "🔷",
              address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
            },
          ]
          setAssets(mockAssets)
        } catch (error) {
          console.warn("Failed to fetch balance, using fallback data:", error)
          const fallbackAssets: TokenBalance[] = [
            {
              name: "Avalanche",
              symbol: "AVAX",
              amount: "0.0000",
              value: "$0.00",
              change: "0.0%",
              positive: true,
              icon: "🔺",
            },
          ]
          setAssets(fallbackAssets)
        }
      }

      fetchBalanceWithTimeout()
    }
  }, [isConnected, address])

  const totalValue = assets.reduce((sum, asset) => {
    const value = Number.parseFloat(asset.value.replace(/[$,]/g, ""))
    return sum + value
  }, 0)

  const refreshBalances = async () => {
    setIsLoading(true)
    try {
      await Promise.race([
        fetchAvaxBalance(),
        new Promise<string>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000)),
      ])
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.warn("Failed to refresh balances:", error)
      // Don't throw the error, just log it
    } finally {
      setIsLoading(false)
    }
  }

  const openExplorer = (txAddress?: string) => {
    if (txAddress) {
      window.open(`https://snowtrace.io/address/${txAddress}`, "_blank")
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5 text-emerald-600" />
            <span>Asset Portfolio</span>
          </CardTitle>
          <CardDescription>Connect your wallet to view your assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-slate-500">
            <Wallet className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Please connect your wallet to view your digital assets</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-emerald-600" />
              <span>Asset Portfolio</span>
            </CardTitle>
            <CardDescription>Your protected digital assets</CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">
                {showValues ? `$${totalValue.toLocaleString()}` : "••••••"}
              </div>
              <div className="flex items-center space-x-1 text-sm text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span>{showValues ? "+2.1%" : "••••"}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowValues(!showValues)}>
                {showValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={refreshBalances} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{asset.icon}</div>
                <div>
                  <div className="font-medium text-slate-900">{asset.name}</div>
                  <div className="text-sm text-slate-600">
                    {showValues ? `${asset.amount} ${asset.symbol}` : "•••• " + asset.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-900">{showValues ? asset.value : "••••••"}</div>
                <div className="flex items-center space-x-1">
                  <div
                    className={`text-sm flex items-center space-x-1 ${
                      asset.positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {asset.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{showValues ? asset.change : "••••"}</span>
                  </div>
                  {asset.address && (
                    <Button variant="ghost" size="sm" onClick={() => openExplorer(asset.address)}>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-emerald-800">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Protected by Multi-Sig Security</span>
          </div>
          <p className="text-xs text-emerald-700 mt-1">
            All assets are secured with enterprise-grade multi-signature wallets and 24/7 AI monitoring.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
