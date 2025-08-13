import type { Metadata } from "next"
import { SmartContractArchitecture } from "@/components/smart-contract-architecture"

export const metadata: Metadata = {
  title: "Smart Contract Architecture - DeFi Will",
  description:
    "Interactive visualization of DeFi Will's smart contract architecture with real-time blockchain integration",
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <SmartContractArchitecture />
    </div>
  )
}
