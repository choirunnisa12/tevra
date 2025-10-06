// TevraBot Contract ABI
export const TevraBotABI = [
  {
    "inputs": [
      { "name": "isTopup", "type": "bool" },
      { "name": "token", "type": "address" },
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" },
      { "name": "threshold", "type": "uint256" },
      { "name": "maxBalance", "type": "uint256" },
      { "name": "schedule", "type": "uint256" },
      { "name": "minPrice", "type": "uint256" },
      { "name": "maxPrice", "type": "uint256" }
    ],
    "name": "createRule",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "ruleId", "type": "uint256" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "autoTopup",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "ruleId", "type": "uint256" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "autoWithdraw",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "user", "type": "address" }
    ],
    "name": "getUserRuleCount",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "user", "type": "address" },
      { "name": "ruleId", "type": "uint256" }
    ],
    "name": "getUserRule",
    "outputs": [
      {
        "components": [
          { "name": "isTopup", "type": "bool" },
          { "name": "isActive", "type": "bool" },
          { "name": "token", "type": "address" },
          { "name": "recipient", "type": "address" },
          { "name": "amount", "type": "uint256" },
          { "name": "threshold", "type": "uint256" },
          { "name": "maxBalance", "type": "uint256" },
          { "name": "schedule", "type": "uint256" },
          { "name": "lastExecuted", "type": "uint256" },
          { "name": "nextExecution", "type": "uint256" },
          { "name": "minPrice", "type": "uint256" },
          { "name": "maxPrice", "type": "uint256" }
        ],
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "user", "type": "address" },
      { "indexed": true, "name": "token", "type": "address" },
      { "indexed": true, "name": "recipient", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" },
      { "indexed": false, "name": "timestamp", "type": "uint256" },
      { "indexed": false, "name": "success", "type": "bool" }
    ],
    "name": "AutoTopupExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "user", "type": "address" },
      { "indexed": true, "name": "token", "type": "address" },
      { "indexed": true, "name": "recipient", "type": "address" },
      { "indexed": false, "name": "amount", "type": "uint256" },
      { "indexed": false, "name": "timestamp", "type": "uint256" },
      { "indexed": false, "name": "success", "type": "bool" }
    ],
    "name": "AutoWithdrawExecuted",
    "type": "event"
  }
] as const;
