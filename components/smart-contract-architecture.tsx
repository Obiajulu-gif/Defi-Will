"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useWeb3 } from "@/hooks/use-web3"
import { useDefiWill } from "@/hooks/use-defi-will"
import {
  Shield,
  Brain,
  Scale,
  Eye,
  Network,
  Gavel,
  Vault,
  Activity,
  Users,
  Key,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Play,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Copy,
  Loader2,
} from "lucide-react"

interface ContractFunction {
  name: string
  description: string
  inputs?: { name: string; type: string; placeholder?: string }[]
  executable: boolean
}

interface ContractInfo {
  id: string
  name: string
  purpose: string
  category: "core" | "security" | "ai" | "legal" | "privacy" | "crosschain"
  icon: React.ComponentType<{ className?: string }>
  functions: ContractFunction[]
  features: string[]
  connections: string[]
  address?: string
  status: "deployed" | "pending" | "not-deployed"
}

const contracts: ContractInfo[] = [
  {
    id: "inheritance-vault",
    name: "InheritanceVault",
    purpose: "Main vault contract managing user assets and inheritance logic",
    category: "core",
    icon: Vault,
    functions: [
      {
        name: "updateActivity",
        description: "Reset inactivity timer",
        executable: true,
      },
      {
        name: "setBeneficiaries",
        description: "Configure inheritance recipients",
        inputs: [
          { name: "beneficiaries", type: "address[]", placeholder: "0x123..., 0x456..." },
          { name: "percentages", type: "uint256[]", placeholder: "50, 30, 20" },
        ],
        executable: true,
      },
      {
        name: "triggerInheritance",
        description: "Activate deadman switch",
        executable: true,
      },
      {
        name: "emergencyWithdraw",
        description: "Owner emergency control",
        executable: true,
      },
      {
        name: "claimInheritance",
        description: "Beneficiary asset claiming",
        executable: true,
      },
    ],
    features: ["Multi-sig integration", "Time-locked releases", "Emergency mode controls", "Reentrancy protection"],
    connections: ["activity-monitor", "multisig-controller", "legal-compliance"],
    status: "deployed",
  },
  {
    id: "activity-monitor",
    name: "ActivityMonitor",
    purpose: "Track user wallet activity and detect inactivity patterns",
    category: "ai",
    icon: Activity,
    functions: [
      {
        name: "recordActivity",
        description: "Log transaction data",
        executable: false,
      },
      {
        name: "checkInactivity",
        description: "Validate inactivity periods",
        executable: true,
      },
      {
        name: "updateInactivityThreshold",
        description: "Adjust monitoring parameters",
        inputs: [{ name: "threshold", type: "uint256", placeholder: "30 (days)" }],
        executable: true,
      },
      {
        name: "getActivityPattern",
        description: "Retrieve user behavior data",
        executable: true,
      },
    ],
    features: ["AI Integration: Interfaces with AIAnalysisEngine for pattern recognition"],
    connections: ["inheritance-vault"],
    status: "deployed",
  },
  {
    id: "legal-compliance",
    name: "LegalComplianceEngine",
    purpose: "Enforce jurisdiction-specific inheritance laws",
    category: "legal",
    icon: Scale,
    functions: [
      {
        name: "setJurisdiction",
        description: "Configure user legal context",
        inputs: [{ name: "jurisdiction", type: "string", placeholder: "US, EU, Asia" }],
        executable: true,
      },
      {
        name: "verifyLegalDocument",
        description: "Validate death certificates/court orders",
        inputs: [{ name: "documentHash", type: "bytes32", placeholder: "0x..." }],
        executable: true,
      },
      {
        name: "validateInheritance",
        description: "Check legal compliance",
        executable: true,
      },
      {
        name: "getRequiredDocuments",
        description: "List jurisdiction requirements",
        executable: true,
      },
    ],
    features: [
      "Multi-jurisdiction support (US, EU, Asia)",
      "Forced heirship rule enforcement",
      "Cross-border inheritance coordination",
    ],
    connections: ["inheritance-vault", "zk-verifier", "dispute-resolution"],
    status: "pending",
  },
  {
    id: "multisig-controller",
    name: "MultiSigController",
    purpose: "Manage 2-of-3 multi-signature security for asset transfers",
    category: "security",
    icon: Key,
    functions: [
      {
        name: "submitTransaction",
        description: "Propose asset transfer",
        inputs: [
          { name: "to", type: "address", placeholder: "0x..." },
          { name: "value", type: "uint256", placeholder: "Amount in wei" },
          { name: "data", type: "bytes", placeholder: "0x" },
        ],
        executable: true,
      },
      {
        name: "confirmTransaction",
        description: "Add signature approval",
        inputs: [{ name: "transactionId", type: "uint256", placeholder: "Transaction ID" }],
        executable: true,
      },
      {
        name: "executeTransaction",
        description: "Complete signed transfer",
        inputs: [{ name: "transactionId", type: "uint256", placeholder: "Transaction ID" }],
        executable: true,
      },
      {
        name: "revokeConfirmation",
        description: "Remove signature",
        inputs: [{ name: "transactionId", type: "uint256", placeholder: "Transaction ID" }],
        executable: true,
      },
    ],
    features: ["Security Model: User Key + Executor Key + Platform Key (2-of-3 required)"],
    connections: ["inheritance-vault"],
    status: "deployed",
  },
  {
    id: "zk-verifier",
    name: "ZKVerifier",
    purpose: "Privacy-preserving verification of legal documents",
    category: "privacy",
    icon: Eye,
    functions: [
      {
        name: "registerVerificationKey",
        description: "Setup ZK verification parameters",
        inputs: [{ name: "verificationKey", type: "bytes", placeholder: "ZK verification key" }],
        executable: true,
      },
      {
        name: "verifyProof",
        description: "Validate zero-knowledge proofs",
        inputs: [
          { name: "proof", type: "bytes", placeholder: "ZK proof" },
          { name: "publicInputs", type: "uint256[]", placeholder: "Public inputs" },
        ],
        executable: true,
      },
      {
        name: "generateProofRequest",
        description: "Create verification challenges",
        executable: true,
      },
    ],
    features: [
      "Death certificate verification without disclosure",
      "Court order validation with privacy protection",
      "Identity verification with minimal data exposure",
    ],
    connections: ["legal-compliance"],
    status: "not-deployed",
  },
  {
    id: "dispute-resolution",
    name: "DisputeResolution",
    purpose: "Handle contested inheritance claims and system disputes",
    category: "legal",
    icon: Gavel,
    functions: [
      {
        name: "createDispute",
        description: "Initiate dispute process",
        inputs: [
          { name: "willId", type: "uint256", placeholder: "Will ID" },
          { name: "reason", type: "string", placeholder: "Dispute reason" },
        ],
        executable: true,
      },
      {
        name: "submitEvidence",
        description: "Add supporting documentation",
        inputs: [
          { name: "disputeId", type: "uint256", placeholder: "Dispute ID" },
          { name: "evidenceHash", type: "bytes32", placeholder: "Evidence hash" },
        ],
        executable: true,
      },
      {
        name: "vote",
        description: "Arbitrator decision making",
        inputs: [
          { name: "disputeId", type: "uint256", placeholder: "Dispute ID" },
          { name: "decision", type: "bool", placeholder: "true/false" },
        ],
        executable: true,
      },
      {
        name: "executeResolution",
        description: "Implement dispute outcome",
        inputs: [{ name: "disputeId", type: "uint256", placeholder: "Dispute ID" }],
        executable: true,
      },
    ],
    features: ["Governance Model: Decentralized arbitration with qualified arbitrators"],
    connections: ["legal-compliance"],
    status: "not-deployed",
  },
  {
    id: "crosschain-bridge",
    name: "CrossChainBridge",
    purpose: "Enable cross-chain and cross-subnet asset transfers",
    category: "crosschain",
    icon: Network,
    functions: [
      {
        name: "initiateCrossChainTransfer",
        description: "Start cross-chain process",
        inputs: [
          { name: "destinationChain", type: "uint256", placeholder: "Chain ID" },
          { name: "recipient", type: "address", placeholder: "0x..." },
          { name: "amount", type: "uint256", placeholder: "Amount" },
        ],
        executable: true,
      },
      {
        name: "completeCrossChainTransfer",
        description: "Finalize transfer with proofs",
        inputs: [
          { name: "transferId", type: "bytes32", placeholder: "Transfer ID" },
          { name: "proof", type: "bytes", placeholder: "Cross-chain proof" },
        ],
        executable: true,
      },
      {
        name: "registerChain",
        description: "Add new blockchain support",
        inputs: [
          { name: "chainId", type: "uint256", placeholder: "Chain ID" },
          { name: "bridgeAddress", type: "address", placeholder: "Bridge address" },
        ],
        executable: true,
      },
    ],
    features: ["Avalanche Integration: Leverages Avalanche Warp Messaging (AWM) for subnet communication"],
    connections: ["inheritance-vault"],
    status: "pending",
  },
]

const categoryColors = {
  core: "bg-emerald-500",
  security: "bg-red-500",
  ai: "bg-purple-500",
  legal: "bg-blue-500",
  privacy: "bg-indigo-500",
  crosschain: "bg-orange-500",
}

const categoryIcons = {
  core: Vault,
  security: Shield,
  ai: Brain,
  legal: Scale,
  privacy: Eye,
  crosschain: Network,
}

const statusIcons = {
  deployed: CheckCircle,
  pending: Clock,
  "not-deployed": AlertCircle,
}

const statusColors = {
  deployed: "text-green-500",
  pending: "text-yellow-500",
  "not-deployed": "text-red-500",
}

export function SmartContractArchitecture() {
  const { account, isConnected } = useWeb3()
  const { createWill, updateActivity, setBeneficiaries } = useDefiWill()
  const [selectedContract, setSelectedContract] = useState<string | null>(null)
  const [expandedFunctions, setExpandedFunctions] = useState<string[]>([])
  const [executingFunction, setExecutingFunction] = useState<string | null>(null)
  const [functionInputs, setFunctionInputs] = useState<Record<string, Record<string, string>>>({})
  const [transactionHistory, setTransactionHistory] = useState<
    Array<{
      hash: string
      function: string
      contract: string
      timestamp: number
      status: "pending" | "success" | "failed"
    }>
  >([])

  const toggleFunctions = (contractId: string) => {
    setExpandedFunctions((prev) =>
      prev.includes(contractId) ? prev.filter((id) => id !== contractId) : [...prev, contractId],
    )
  }

  const getConnectedContracts = (contractId: string) => {
    const contract = contracts.find((c) => c.id === contractId)
    return contract?.connections.map((id) => contracts.find((c) => c.id === id)).filter(Boolean) || []
  }

  const handleFunctionInput = (contractId: string, functionName: string, inputName: string, value: string) => {
    setFunctionInputs((prev) => ({
      ...prev,
      [contractId]: {
        ...prev[contractId],
        [`${functionName}_${inputName}`]: value,
      },
    }))
  }

  const executeFunction = async (contractId: string, functionName: string, func: ContractFunction) => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }

    setExecutingFunction(`${contractId}_${functionName}`)

    try {
      let result
      const inputs = functionInputs[contractId] || {}

      // Execute different functions based on contract and function name
      switch (contractId) {
        case "inheritance-vault":
          switch (functionName) {
            case "updateActivity":
              result = await updateActivity()
              break
            case "setBeneficiaries":
              const beneficiariesStr = inputs[`${functionName}_beneficiaries`] || ""
              const percentagesStr = inputs[`${functionName}_percentages`] || ""
              const beneficiaries = beneficiariesStr.split(",").map((addr) => addr.trim())
              const percentages = percentagesStr.split(",").map((p) => Number.parseInt(p.trim()))
              result = await setBeneficiaries(beneficiaries, percentages)
              break
            default:
              // Mock execution for other functions
              result = { hash: `0x${Math.random().toString(16).substr(2, 64)}` }
          }
          break
        default:
          // Mock execution for other contracts
          result = { hash: `0x${Math.random().toString(16).substr(2, 64)}` }
      }

      // Add to transaction history
      setTransactionHistory((prev) => [
        {
          hash: result.hash,
          function: functionName,
          contract: contractId,
          timestamp: Date.now(),
          status: "pending",
        },
        ...prev,
      ])

      // Simulate transaction confirmation
      setTimeout(() => {
        setTransactionHistory((prev) => prev.map((tx) => (tx.hash === result.hash ? { ...tx, status: "success" } : tx)))
      }, 3000)
    } catch (error) {
      console.error("Function execution failed:", error)
      alert("Function execution failed. Please try again.")
    } finally {
      setExecutingFunction(null)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">DeFi Will Smart Contract Architecture</h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Interactive blockchain-based inheritance system with AI monitoring, legal compliance, and cross-chain
          capabilities
        </p>
        {isConnected && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-slate-600">
              Connected: {account?.slice(0, 6)}...{account?.slice(-4)}
            </span>
          </div>
        )}
      </div>

      {/* Category Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {Object.entries(categoryColors).map(([category, color]) => {
          const IconComponent = categoryIcons[category as keyof typeof categoryIcons]
          return (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${color}`} />
              <IconComponent className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700 capitalize">
                {category === "crosschain" ? "Cross-Chain" : category}
              </span>
            </div>
          )
        })}
      </div>

      {/* Architecture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {contracts.map((contract) => {
          const IconComponent = contract.icon
          const StatusIcon = statusIcons[contract.status]
          const isSelected = selectedContract === contract.id
          const isExpanded = expandedFunctions.includes(contract.id)

          return (
            <Card
              key={contract.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected ? "ring-2 ring-emerald-500 shadow-lg" : ""
              }`}
              onClick={() => setSelectedContract(isSelected ? null : contract.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${categoryColors[contract.category]} bg-opacity-10`}>
                      <IconComponent
                        className={`h-6 w-6 ${categoryColors[contract.category].replace("bg-", "text-")}`}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        {contract.name}
                        <StatusIcon className={`h-4 w-4 ${statusColors[contract.status]}`} />
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className={`${categoryColors[contract.category]} text-white`}>
                          {contract.category === "crosschain" ? "Cross-Chain" : contract.category}
                        </Badge>
                        <Badge variant="outline" className={statusColors[contract.status]}>
                          {contract.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mt-2">{contract.purpose}</p>
                {contract.address && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-500">Contract:</span>
                    <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                      {contract.address.slice(0, 6)}...{contract.address.slice(-4)}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(contract.address!)
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://snowtrace.io/address/${contract.address}`, "_blank")
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                {/* Interactive Functions */}
                <div className="mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFunctions(contract.id)
                    }}
                    className="flex items-center gap-2 p-0 h-auto font-semibold text-slate-700"
                  >
                    Interactive Functions
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>

                  {isExpanded && (
                    <div className="mt-3 space-y-3">
                      {contract.functions.map((func, index) => (
                        <div key={index} className="bg-slate-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-medium text-sm text-slate-900">{func.name}()</span>
                              <p className="text-xs text-slate-600">{func.description}</p>
                            </div>
                            {func.executable && (
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  executeFunction(contract.id, func.name, func)
                                }}
                                disabled={!isConnected || executingFunction === `${contract.id}_${func.name}`}
                                className="h-7"
                              >
                                {executingFunction === `${contract.id}_${func.name}` ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <Play className="h-3 w-3" />
                                )}
                              </Button>
                            )}
                          </div>

                          {func.inputs && func.inputs.length > 0 && (
                            <div className="space-y-2">
                              {func.inputs.map((input, inputIndex) => (
                                <Input
                                  key={inputIndex}
                                  placeholder={`${input.name} (${input.type}): ${input.placeholder || ""}`}
                                  value={functionInputs[contract.id]?.[`${func.name}_${input.name}`] || ""}
                                  onChange={(e) =>
                                    handleFunctionInput(contract.id, func.name, input.name, e.target.value)
                                  }
                                  className="text-xs h-8"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-slate-700">Features:</h4>
                  {contract.features.map((feature, index) => (
                    <div key={index} className="text-xs text-slate-600 bg-emerald-50 p-2 rounded">
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Connections */}
                {contract.connections.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <h4 className="font-semibold text-sm text-slate-700 mb-2">Connects to:</h4>
                    <div className="flex flex-wrap gap-1">
                      {getConnectedContracts(contract.id).map((connected) => (
                        <Badge key={connected?.id} variant="outline" className="text-xs">
                          {connected?.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Transaction History */}
      {transactionHistory.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactionHistory.slice(0, 5).map((tx) => (
                <div key={tx.hash} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        tx.status === "success"
                          ? "bg-green-500"
                          : tx.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                    />
                    <div>
                      <span className="font-medium text-sm">{tx.function}()</span>
                      <p className="text-xs text-slate-600">{tx.contract}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(`https://snowtrace.io/tx/${tx.hash}`, "_blank")}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Flow Diagram */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Network className="h-6 w-6 text-emerald-600" />
            System Flow Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <span className="font-semibold text-slate-900">User Activity</span>
              <span className="text-xs text-slate-600">Monitored by AI</span>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 rotate-90 lg:rotate-0" />

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Activity className="h-8 w-8 text-purple-600" />
              </div>
              <span className="font-semibold text-slate-900">Activity Monitor</span>
              <span className="text-xs text-slate-600">Pattern Analysis</span>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 rotate-90 lg:rotate-0" />

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                <Scale className="h-8 w-8 text-blue-600" />
              </div>
              <span className="font-semibold text-slate-900">Legal Compliance</span>
              <span className="text-xs text-slate-600">Jurisdiction Rules</span>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 rotate-90 lg:rotate-0" />

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <span className="font-semibold text-slate-900">Multi-Sig Security</span>
              <span className="text-xs text-slate-600">2-of-3 Approval</span>
            </div>

            <ArrowRight className="h-6 w-6 text-slate-400 rotate-90 lg:rotate-0" />

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                <Vault className="h-8 w-8 text-emerald-600" />
              </div>
              <span className="font-semibold text-slate-900">Asset Transfer</span>
              <span className="text-xs text-slate-600">To Beneficiaries</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-900">Technical Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500" />
                Security Features
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Multi-signature 2-of-3 approval</li>
                <li>• Time-locked asset releases</li>
                <li>• Reentrancy protection</li>
                <li>• Emergency mode controls</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-500" />
                AI Integration
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Behavioral pattern analysis</li>
                <li>• Inactivity detection</li>
                <li>• Risk assessment algorithms</li>
                <li>• Predictive monitoring</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                <Network className="h-4 w-4 text-orange-500" />
                Cross-Chain Support
              </h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Avalanche Warp Messaging</li>
                <li>• Multi-subnet transfers</li>
                <li>• Cross-chain asset bridging</li>
                <li>• Interoperability protocols</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
