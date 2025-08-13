"use client"

import { useWeb3 as useWeb3Context } from "@/contexts/web3-provider"
import { useCallback, useEffect, useState } from "react"

// Avalanche network constants
const AVALANCHE_MAINNET_ID = 43114
const AVALANCHE_FUJI_ID = 43113

export function useWeb3() {
  const { isConnected, address, chainId, isConnecting, connectError, connect, disconnect, switchNetwork } =
    useWeb3Context()
  const [isWrongNetwork, setIsWrongNetwork] = useState(false)

  // Check if user is on correct network
  useEffect(() => {
    if (isConnected && chainId) {
      setIsWrongNetwork(!isAvalancheNetwork(chainId))
    } else {
      setIsWrongNetwork(false)
    }
  }, [isConnected, chainId])

  const isAvalancheNetwork = (chainId: number): boolean => {
    return chainId === AVALANCHE_MAINNET_ID || chainId === AVALANCHE_FUJI_ID
  }

  const getNetworkName = (chainId: number): string => {
    switch (chainId) {
      case AVALANCHE_MAINNET_ID:
        return "Avalanche Mainnet"
      case AVALANCHE_FUJI_ID:
        return "Avalanche Fuji Testnet"
      case 1:
        return "Ethereum Mainnet"
      case 137:
        return "Polygon"
      default:
        return `Network ${chainId}`
    }
  }

  const connectWallet = useCallback(
    async (connectorId?: string) => {
      await connect()
    },
    [connect],
  )

  const switchToAvalanche = useCallback(
    async (testnet = false) => {
      try {
        const targetChainId = testnet ? AVALANCHE_FUJI_ID : AVALANCHE_MAINNET_ID
        await switchNetwork(targetChainId)
      } catch (error) {
        console.error("Failed to switch network:", error)
      }
    },
    [switchNetwork],
  )

  const disconnectWallet = useCallback(() => {
    disconnect()
  }, [disconnect])

  return {
    // Connection state
    address,
    isConnected,
    isConnecting,
    isWrongNetwork,

    // Network info
    chainId,
    networkName: chainId ? getNetworkName(chainId) : "",

    // Actions
    connectWallet,
    disconnectWallet,
    switchToAvalanche,

    // Available connectors
    connectors: [
      { id: "metaMask", name: "MetaMask" },
      { id: "injected", name: "Browser Wallet" },
    ],

    // Errors
    connectError,
  }
}
