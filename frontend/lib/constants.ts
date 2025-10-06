// Contract addresses (update these with deployed contract addresses)
export const CONTRACTS = {
  TEVRA_BOT: "0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8", // Update with actual address
  MOCK_USDC: "0x1234567890123456789012345678901234567890", // Update with actual address
  MOCK_USDT: "0x0987654321098765432109876543210987654321", // Update with actual address
} as const

// Network configuration
export const SUPPORTED_NETWORKS = [
  {
    id: 31337, // Localhost
    name: "Localhost",
    rpcUrl: "http://localhost:8545",
    blockExplorer: "",
  },
  {
    id: 11155111, // Sepolia
    name: "Sepolia",
    rpcUrl: "https://sepolia.infura.io/v3/",
    blockExplorer: "https://sepolia.etherscan.io",
  },
  {
    id: 1, // Mainnet
    name: "Ethereum",
    rpcUrl: "https://mainnet.infura.io/v3/",
    blockExplorer: "https://etherscan.io",
  },
] as const

// Token configurations
export const TOKENS = [
  {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    logo: "/tokens/eth.png",
  },
  {
    address: CONTRACTS.MOCK_USDC,
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6,
    logo: "/tokens/usdc.png",
  },
  {
    address: CONTRACTS.MOCK_USDT,
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    logo: "/tokens/usdt.png",
  },
] as const

// Schedule options
export const SCHEDULE_OPTIONS = [
  { label: "Daily", value: 86400 },
  { label: "Weekly", value: 604800 },
  { label: "Monthly", value: 2592000 },
] as const

// Automation rule types
export const RULE_TYPES = [
  { label: "Auto Top-up", value: "topup" },
  { label: "Auto Withdraw", value: "withdraw" },
] as const

// Default form values
export const DEFAULT_FORM_VALUES = {
  recipient: "",
  token: TOKENS[0].address,
  amount: "",
  threshold: "",
  maxBalance: "",
  schedule: SCHEDULE_OPTIONS[0].value,
  minPrice: "",
  maxPrice: "",
} as const

// API endpoints
export const API_ENDPOINTS = {
  PRICE_DATA: "/api/price",
  TRANSACTION_HISTORY: "/api/transactions",
  BOT_STATUS: "/api/bot-status",
} as const

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: "Please connect your wallet",
  INSUFFICIENT_BALANCE: "Insufficient balance",
  INVALID_ADDRESS: "Invalid address format",
  INVALID_AMOUNT: "Invalid amount",
  TRANSACTION_FAILED: "Transaction failed",
  NETWORK_ERROR: "Network error",
  CONTRACT_ERROR: "Contract interaction failed",
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: "Wallet connected successfully",
  TRANSACTION_SUCCESS: "Transaction completed successfully",
  RULE_CREATED: "Automation rule created successfully",
  RULE_UPDATED: "Automation rule updated successfully",
  RULE_DELETED: "Automation rule deleted successfully",
} as const
