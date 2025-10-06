# Tevra Setup Instructions

## 🚀 Quick Start Guide

Follow these steps to get Tevra up and running on your local machine.

### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **A Web3 wallet** (MetaMask, WalletConnect, etc.)
- **Some ETH** for gas fees (you can get testnet ETH from faucets)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tevra.git
   cd tevra
   ```

2. **Install dependencies**
   ```bash
   # Install smart contract dependencies
   cd contracts
   forge install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cd frontend
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and update the following variables:
   ```env
   NEXT_PUBLIC_TEVRA_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8
   NEXT_PUBLIC_CHAIN_ID=31337
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   ```

4. **Build smart contracts**
   ```bash
   cd ../contracts
   forge build
   ```

5. **Start local blockchain (optional)**
   ```bash
   # In a new terminal
   anvil
   ```

6. **Deploy contracts to local network (optional)**
   ```bash
   forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast
   ```

7. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm run dev
   ```

8. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development Commands

### Smart Contracts
```bash
# Build contracts
forge build

# Run tests
forge test

# Run tests with verbose output
forge test -vvv

# Deploy to local network
forge script script/Deploy.s.sol --rpc-url http://localhost:8545 --broadcast

# Deploy to testnet
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

### Make Commands
```bash
# Install all dependencies
make install

# Build everything
make build

# Run all tests
make test

# Start frontend development
make frontend

# Clean build artifacts
make clean

# Setup development environment
make setup
```

## 🌐 Network Configuration

### Supported Networks

- **Localhost** (31337) - For development
- **Sepolia** (11155111) - Ethereum testnet
- **Mainnet** (1) - Ethereum mainnet

### Adding Custom Networks

To add support for additional networks:

1. Update `SUPPORTED_NETWORKS` in `frontend/lib/constants.ts`
2. Add the network configuration to `frontend/lib/wagmi.ts`
3. Deploy contracts to the new network
4. Update contract addresses in environment variables

## 🔑 Environment Variables

### Required Variables

```env
# Contract Addresses
NEXT_PUBLIC_TEVRA_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MOCK_USDC_ADDRESS=0x...
NEXT_PUBLIC_MOCK_USDT_ADDRESS=0x...

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_RPC_URL=https://...

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

### Optional Variables

```env
# External Services
NEXT_PUBLIC_CHAINLINK_KEEPER_REGISTRY=0x...
NEXT_PUBLIC_GELATO_API_KEY=your_gelato_api_key

# Development
NODE_ENV=development
```

## 🧪 Testing

### Smart Contract Testing

```bash
cd contracts
forge test
```

### Frontend Testing

```bash
cd frontend
npm test
```

### Integration Testing

1. Deploy contracts to a testnet
2. Update environment variables with testnet addresses
3. Test the full application flow

## 🚀 Deployment

### Smart Contract Deployment

1. **Set up deployment environment**
   ```bash
   export PRIVATE_KEY=your_private_key
   export RPC_URL=your_rpc_url
   export ETHERSCAN_API_KEY=your_etherscan_key
   ```

2. **Deploy contracts**
   ```bash
   forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify
   ```

3. **Update frontend configuration**
   - Copy deployed contract addresses
   - Update environment variables
   - Update network configuration

### Frontend Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel/Netlify**
   ```bash
   # Vercel
   vercel --prod
   
   # Netlify
   netlify deploy --prod --dir=out
   ```

3. **Configure environment variables**
   - Set production environment variables in your deployment platform
   - Update contract addresses for production network

## 🔍 Troubleshooting

### Common Issues

1. **"Contract not deployed" error**
   - Check contract address in environment variables
   - Ensure contracts are deployed to the correct network
   - Verify network configuration

2. **"Wallet not connected" error**
   - Make sure your wallet is unlocked
   - Check if you're connected to the correct network
   - Try refreshing the page and reconnecting

3. **"Transaction failed" error**
   - Check if you have sufficient ETH for gas
   - Verify token balances
   - Check network congestion

4. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check Node.js version (should be 18+)
   - Clear cache: `rm -rf node_modules package-lock.json && npm install`

### Getting Help

- **Documentation**: Check the `/docs` section in the application
- **GitHub Issues**: Report bugs and feature requests
- **Discord**: Join our community for support
- **Email**: Contact support@tevra.com

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs)
- [Foundry Documentation](https://book.getfoundry.sh/)

## 🎯 Next Steps

After setting up the project:

1. **Explore the Dashboard** - Connect your wallet and explore the interface
2. **Create Your First Rule** - Set up an auto top-up or withdraw rule
3. **Read the Documentation** - Check out the comprehensive docs at `/docs`
4. **Join the Community** - Connect with other users and developers
5. **Contribute** - Help improve Tevra by contributing to the project

---

Happy automating! 🚀
