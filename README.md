# Tevra - Web3 Automation Bot

Tevra is a comprehensive Web3 automation platform that allows users to set up intelligent rules for cryptocurrency transactions. Built with Next.js, TypeScript, and Solidity, it provides a user-friendly interface for creating automation rules while leveraging Chainlink Keepers and Gelato Network for reliable execution.

## 🚀 Features

- **Auto Top-up & Withdraw**: Automatically manage wallet balances based on user-defined thresholds
- **Smart Contract Integration**: Built on Ethereum with audited smart contracts
- **Bot Automation**: Powered by Chainlink Keepers and Gelato Network
- **Real-time Notifications**: Toast notifications and comprehensive alert system
- **Multi-token Support**: Support for ETH, USDC, USDT, and custom tokens
- **Price-based Execution**: Execute rules only when token prices are within specified ranges
- **Comprehensive Dashboard**: Monitor balances, bot status, and execution history
- **Developer-friendly**: Complete API documentation and SDK examples

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **RainbowKit** - Wallet connection with manual selection
- **Wagmi/Viem** - Ethereum interaction library
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

### Smart Contracts
- **Solidity 0.8.19** - Smart contract language
- **Foundry** - Development framework
- **OpenZeppelin** - Security-focused smart contract library
- **Chainlink Keepers** - Decentralized automation
- **Gelato Network** - Web3 automation infrastructure

## 📁 Project Structure

```
tevra/
├── contracts/                 # Foundry Solidity contracts
│   ├── TevraBot.sol         # Main automation contract
│   └── MockERC20.sol        # Mock token for testing
├── frontend/                 # Next.js frontend application
│   ├── components/          # Reusable React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities and configurations
│   ├── pages/               # Next.js pages
│   │   ├── docs/           # Documentation pages
│   │   ├── index.tsx       # Landing page
│   │   ├── dashboard.tsx   # Main dashboard
│   │   ├── topup.tsx       # Auto top-up form
│   │   ├── withdraw.tsx    # Auto withdraw form
│   │   ├── history.tsx     # Transaction history
│   │   └── rules.tsx       # Rules management
│   └── styles/             # Global styles and TailwindCSS
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask, WalletConnect, etc.)
- Some ETH for gas fees

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tevra.git
   cd tevra
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update the following variables:
   ```env
   NEXT_PUBLIC_TEVRA_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8
   NEXT_PUBLIC_CHAIN_ID=1
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

4. **Deploy smart contracts (optional for testing)**
   ```bash
   cd ../contracts
   forge build
   forge test
   ```

5. **Start the development server**
   ```bash
   cd ../frontend
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Creating Your First Rule

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the top navigation
   - Select your preferred wallet from the modal

2. **Navigate to Top-up or Withdraw**
   - Go to the Top-up page for auto top-up rules
   - Go to the Withdraw page for auto withdraw rules

3. **Configure Your Rule**
   - Enter recipient address
   - Select token (ETH, USDC, USDT)
   - Set amount and threshold
   - Choose schedule (daily, weekly, monthly)
   - Set price range conditions

4. **Submit and Activate**
   - Click "Create Rule" to submit
   - Confirm the transaction in your wallet
   - Your rule will be active and monitored

### Dashboard Features

- **Wallet Balances**: View your current token balances
- **Bot Status**: Monitor active rules and execution status
- **Recent Activity**: Track all automation activities
- **Rule Management**: Create, edit, pause, or delete rules

## 🔧 Smart Contract Details

### TevraBot Contract

The main contract handles all automation logic:

```solidity
// Key functions
function createRule(bool isTopup, address token, address recipient, uint256 amount, uint256 threshold, uint256 maxBalance, uint256 schedule, uint256 minPrice, uint256 maxPrice)
function autoTopup(uint256 ruleId, uint256 amount) external returns (bool)
function autoWithdraw(uint256 ruleId, uint256 amount) external returns (bool)
function checkUpkeep(bytes calldata) external view returns (bool upkeepNeeded, bytes memory)
function performUpkeep(bytes calldata performData) external
```

### Events

```solidity
event AutoTopupExecuted(address indexed user, address indexed token, address indexed recipient, uint256 amount, uint256 timestamp, bool success)
event AutoWithdrawExecuted(address indexed user, address indexed token, address indexed recipient, uint256 amount, uint256 timestamp, bool success)
```

## 🔗 Automation Integration

### Chainlink Keepers

Tevra implements Chainlink Keepers for decentralized automation:

- **checkUpkeep()**: Monitors rule conditions
- **performUpkeep()**: Executes rules when conditions are met
- **Decentralized execution**: No single point of failure
- **Gas optimization**: Efficient execution scheduling

### Gelato Network

Alternative automation provider with:

- **Task-based execution**: Flexible scheduling
- **Conditional logic**: Complex automation rules
- **Gasless transactions**: Reduced execution costs
- **Multi-chain support**: Cross-chain automation

## 📚 Documentation

Comprehensive documentation is available at `/docs`:

- **Getting Started**: Setup and first steps
- **Usage Examples**: Real-world automation scenarios
- **Bot Automation**: Technical implementation details
- **Notifications**: Alert system configuration
- **API Reference**: Complete API documentation
- **FAQ**: Common questions and troubleshooting

## 🛡️ Security

- **Audited Smart Contracts**: Security-focused development
- **OpenZeppelin Libraries**: Battle-tested security patterns
- **Reentrancy Protection**: Prevents reentrancy attacks
- **Access Control**: Owner-only administrative functions
- **Input Validation**: Comprehensive parameter validation

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` section
- **Discord**: Join our community server
- **Email**: support@tevra.com
- **GitHub Issues**: Report bugs and feature requests

## 🗺️ Roadmap

- [ ] Multi-chain support (Polygon, Arbitrum, Optimism)
- [ ] Advanced trading strategies
- [ ] Mobile application
- [ ] API rate limiting and analytics
- [ ] Custom token support
- [ ] Portfolio management tools

---

Built with ❤️ by the Tevra team
