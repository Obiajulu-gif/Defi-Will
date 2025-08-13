// Contract addresses (will be set after deployment)
export const CONTRACT_ADDRESSES = {
  WILL_FACTORY: process.env.NEXT_PUBLIC_WILL_FACTORY_ADDRESS || "",
  DEFI_WILL_TEMPLATE: process.env.NEXT_PUBLIC_DEFI_WILL_TEMPLATE_ADDRESS || "",
} as const

// Avalanche network configuration
export const AVALANCHE_MAINNET = {
  chainId: 43114,
  name: "Avalanche Mainnet",
  rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  blockExplorer: "https://snowtrace.io",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
}

export const AVALANCHE_FUJI = {
  chainId: 43113,
  name: "Avalanche Fuji Testnet",
  rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
  blockExplorer: "https://testnet.snowtrace.io",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
}

// Network utilities
export const getNetworkName = (chainId: number): string => {
  switch (chainId) {
    case AVALANCHE_MAINNET.chainId:
      return "Avalanche Mainnet"
    case AVALANCHE_FUJI.chainId:
      return "Avalanche Fuji Testnet"
    default:
      return "Unknown Network"
  }
}

export const isAvalancheNetwork = (chainId: number): boolean => {
  return chainId === AVALANCHE_MAINNET.chainId || chainId === AVALANCHE_FUJI.chainId
}

export const getNetworkConfig = (chainId: number) => {
  switch (chainId) {
    case AVALANCHE_MAINNET.chainId:
      return AVALANCHE_MAINNET
    case AVALANCHE_FUJI.chainId:
      return AVALANCHE_FUJI
    default:
      return AVALANCHE_FUJI // Default to testnet
  }
}

// Contract ABIs (simplified for key functions)
export const DEFI_WILL_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_inactivityPeriod", type: "uint256" },
      { internalType: "string", name: "_encryptedData", type: "string" },
    ],
    name: "createWill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "recordActivity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_beneficiaryAddress", type: "address" },
      { internalType: "uint256", name: "_percentage", type: "uint256" },
      { internalType: "string", name: "_name", type: "string" },
    ],
    name: "addBeneficiary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_willOwner", type: "address" }],
    name: "canTriggerWill",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_willOwner", type: "address" }],
    name: "triggerWill",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_willOwner", type: "address" }],
    name: "getBeneficiaries",
    outputs: [
      {
        components: [
          { internalType: "address", name: "beneficiaryAddress", type: "address" },
          { internalType: "uint256", name: "percentage", type: "uint256" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "bool", name: "isActive", type: "bool" },
        ],
        internalType: "struct DefiWill.Beneficiary[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_willOwner", type: "address" }],
    name: "getWill",
    outputs: [
      {
        components: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "uint256", name: "lastActivity", type: "uint256" },
          { internalType: "uint256", name: "inactivityPeriod", type: "uint256" },
          { internalType: "bool", name: "isActive", type: "bool" },
          { internalType: "bool", name: "isTriggered", type: "bool" },
          { internalType: "uint256", name: "createdAt", type: "uint256" },
          { internalType: "string", name: "encryptedData", type: "string" },
        ],
        internalType: "struct DefiWill.Will",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

export const WILL_FACTORY_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_inactivityPeriod", type: "uint256" },
      { internalType: "string", name: "_encryptedData", type: "string" },
    ],
    name: "createWillContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserWills",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalWills",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const
