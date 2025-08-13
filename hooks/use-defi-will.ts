"use client"

import { useCallback, useState, useEffect } from "react"
import { ethers } from "ethers"
import { useWeb3 } from "./use-web3"
import { CONTRACT_ADDRESSES, DEFI_WILL_ABI, WILL_FACTORY_ABI } from "@/lib/web3-config"

export interface Beneficiary {
  beneficiaryAddress: string
  percentage: number
  name: string
  isActive: boolean
}

export interface Will {
  owner: string
  lastActivity: number
  inactivityPeriod: number
  isActive: boolean
  isTriggered: boolean
  createdAt: number
  encryptedData: string
}

export function useDefiWill(willContractAddress?: string) {
  const { account, provider } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [willData, setWillData] = useState<Will | undefined>()
  const [beneficiariesData, setBeneficiariesData] = useState<Beneficiary[] | undefined>()
  const [canTrigger, setCanTrigger] = useState<boolean | undefined>()

  const refetchWill = useCallback(async () => {
    if (!willContractAddress || !provider) return

    try {
      const contract = new ethers.Contract(willContractAddress, DEFI_WILL_ABI, provider)
      const data = await contract.getWill(willContractAddress)
      setWillData({
        owner: data[0],
        lastActivity: Number(data[1]),
        inactivityPeriod: Number(data[2]),
        isActive: data[3],
        isTriggered: data[4],
        createdAt: Number(data[5]),
        encryptedData: data[6],
      })
    } catch (err) {
      console.error("Failed to fetch will data:", err)
    }
  }, [willContractAddress, provider])

  const refetchBeneficiaries = useCallback(async () => {
    if (!willContractAddress || !provider) return

    try {
      const contract = new ethers.Contract(willContractAddress, DEFI_WILL_ABI, provider)
      const data = await contract.getBeneficiaries(willContractAddress)
      setBeneficiariesData(
        data.map((b: any) => ({
          beneficiaryAddress: b[0],
          percentage: Number(b[1]),
          name: b[2],
          isActive: b[3],
        })),
      )
    } catch (err) {
      console.error("Failed to fetch beneficiaries:", err)
    }
  }, [willContractAddress, provider])

  const checkCanTrigger = useCallback(async () => {
    if (!willContractAddress || !provider) return

    try {
      const contract = new ethers.Contract(willContractAddress, DEFI_WILL_ABI, provider)
      const result = await contract.canTriggerWill(willContractAddress)
      setCanTrigger(result)
    } catch (err) {
      console.error("Failed to check trigger status:", err)
    }
  }, [willContractAddress, provider])

  useEffect(() => {
    if (willContractAddress && provider) {
      refetchWill()
      refetchBeneficiaries()
      checkCanTrigger()
    }
  }, [willContractAddress, provider, refetchWill, refetchBeneficiaries, checkCanTrigger])

  const createWill = useCallback(
    async (inactivityPeriod: number, encryptedData: string) => {
      if (!provider || !account) throw new Error("Wallet not connected")

      try {
        setIsLoading(true)
        setError(null)

        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESSES.WILL_FACTORY, WILL_FACTORY_ABI, signer)

        const tx = await contract.createWillContract(BigInt(inactivityPeriod), encryptedData)
        await tx.wait()

        setIsSuccess(true)
      } catch (error) {
        console.error("Failed to create will:", error)
        setError(error as Error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [provider, account],
  )

  const recordActivity = useCallback(async () => {
    if (!willContractAddress || !provider || !account) return

    try {
      setIsLoading(true)
      setError(null)

      const signer = await provider.getSigner()
      const contract = new ethers.Contract(willContractAddress, DEFI_WILL_ABI, signer)

      const tx = await contract.recordActivity()
      await tx.wait()

      setIsSuccess(true)
      await refetchWill()
    } catch (error) {
      console.error("Failed to record activity:", error)
      setError(error as Error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [provider, account, willContractAddress, refetchWill])

  const addBeneficiary = useCallback(
    async (beneficiaryAddress: string, percentage: number, name: string) => {
      if (!willContractAddress || !provider || !account) return

      try {
        setIsLoading(true)
        setError(null)

        const signer = await provider.getSigner()
        const contract = new ethers.Contract(willContractAddress, DEFI_WILL_ABI, signer)

        const tx = await contract.addBeneficiary(beneficiaryAddress, BigInt(percentage), name)
        await tx.wait()

        setIsSuccess(true)
        await refetchBeneficiaries()
      } catch (error) {
        console.error("Failed to add beneficiary:", error)
        setError(error as Error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [provider, account, willContractAddress, refetchBeneficiaries],
  )

  const triggerWill = useCallback(
    async (willOwnerAddress: string) => {
      if (!willContractAddress || !provider || !account) return

      try {
        setIsLoading(true)
        setError(null)

        const signer = await provider.getSigner()
        const contract = new ethers.Contract(willContractAddress, DEFI_WILL_ABI, signer)

        const tx = await contract.triggerWill(willOwnerAddress)
        await tx.wait()

        setIsSuccess(true)
        await refetchWill()
      } catch (error) {
        console.error("Failed to trigger will:", error)
        setError(error as Error)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [provider, account, willContractAddress, refetchWill],
  )

  return {
    // Data
    will: willData,
    beneficiaries: beneficiariesData,
    canTrigger,

    // Actions
    createWill,
    recordActivity,
    addBeneficiary,
    triggerWill,

    // State
    isLoading,
    isSuccess,
    error,

    // Utilities
    refetchWill,
    refetchBeneficiaries,
  }
}
