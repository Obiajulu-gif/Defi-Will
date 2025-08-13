"use client"

import { type ReactNode, createContext, useContext, useState, useEffect } from "react"

interface Web3ContextType {
  isConnected: boolean
  address: string | null
  chainId: number | null
  isConnecting: boolean
  connectError: Error | null
  connect: () => Promise<void>
  disconnect: () => void
  switchNetwork: (chainId: number) => Promise<void>
}

const Web3Context = createContext<Web3ContextType | null>(null)

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectError, setConnectError] = useState<Error | null>(null)

  const connect = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        setIsConnecting(true)
        setConnectError(null)

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        })

        setAddress(accounts[0])
        setChainId(Number.parseInt(chainId, 16))
        setIsConnected(true)

        if (window.location.pathname !== "/dashboard") {
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1000)
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        setConnectError(error as Error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      setConnectError(new Error("No wallet detected. Please install MetaMask or another Web3 wallet."))
    }
  }

  const disconnect = () => {
    setAddress(null)
    setChainId(null)
    setIsConnected(false)
    setConnectError(null)
  }

  const switchNetwork = async (targetChainId: number) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${targetChainId.toString(16)}` }],
        })
        setChainId(targetChainId)
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                targetChainId === 43114
                  ? {
                      chainId: "0xA86A",
                      chainName: "Avalanche Mainnet",
                      nativeCurrency: {
                        name: "AVAX",
                        symbol: "AVAX",
                        decimals: 18,
                      },
                      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                      blockExplorerUrls: ["https://snowtrace.io/"],
                    }
                  : {
                      chainId: "0xA869",
                      chainName: "Avalanche Fuji Testnet",
                      nativeCurrency: {
                        name: "AVAX",
                        symbol: "AVAX",
                        decimals: 18,
                      },
                      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                      blockExplorerUrls: ["https://testnet.snowtrace.io/"],
                    },
              ],
            })
            setChainId(targetChainId)
          } catch (addError) {
            console.error("Failed to add network:", addError)
          }
        } else {
          console.error("Failed to switch network:", error)
        }
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const checkExistingConnection = async () => {
        try {
          // Only check for existing connections, don't trigger new ones
          const accounts = await window.ethereum!.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            setIsConnected(true)
            try {
              const chainId = await window.ethereum!.request({ method: "eth_chainId" })
              setChainId(Number.parseInt(chainId, 16))
            } catch (chainError) {
              console.warn("Could not get chain ID:", chainError)
            }
          }
        } catch (error) {
          console.warn("Automatic wallet connection check failed:", error)
          // Don't set this as a connection error since it's just an automatic check
        }
      }

      checkExistingConnection()

      // Listen for account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else {
          setAddress(accounts[0])
          setIsConnected(true)
        }
      }

      // Listen for chain changes
      const handleChainChanged = (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          window.ethereum.removeListener("chainChanged", handleChainChanged)
        }
      }
    }
  }, [])

  const value: Web3ContextType = {
    isConnected,
    address,
    chainId,
    isConnecting,
    connectError,
    connect,
    disconnect,
    switchNetwork,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (data: any) => void) => void
      removeListener: (event: string, callback: (data: any) => void) => void
    }
  }
}
