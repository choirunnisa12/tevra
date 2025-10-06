# Tevra Deployment Guide

This guide covers deploying Tevra to production environments.

## 🏗️ Architecture Overview

Tevra consists of two main components:
- **Smart Contracts** (Solidity) - Deployed on Ethereum
- **Frontend** (Next.js) - Deployed on web hosting platforms

## 🔧 Smart Contract Deployment

### Prerequisites

- **Private Key** with sufficient ETH for deployment
- **RPC URL** for the target network
- **Etherscan API Key** for contract verification
- **Foundry** installed and configured

### Deployment Steps

1. **Set up environment variables**
   ```bash
   export PRIVATE_KEY=your_private_key_here
   export RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
   export ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

2. **Deploy contracts**
   ```bash
   cd contracts
   forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify
   ```

3. **Verify deployment**
   ```bash
   # Check deployed contracts on Etherscan
   # Verify contract addresses match expected values
   ```

### Network-Specific Deployment

#### Ethereum Mainnet
```bash
export RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID
export ETHERSCAN_API_KEY=your_mainnet_etherscan_key
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify
```

#### Ethereum Sepolia Testnet
```bash
export RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
export ETHERSCAN_API_KEY=your_sepolia_etherscan_key
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify
```

#### Polygon Mainnet
```bash
export RPC_URL=https://polygon-mainnet.infura.io/v3/YOUR_PROJECT_ID
export ETHERSCAN_API_KEY=your_polygon_etherscan_key
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify
```

## 🌐 Frontend Deployment

### Environment Configuration

Create production environment variables:

```env
# Production Environment Variables
NEXT_PUBLIC_TEVRA_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8
NEXT_PUBLIC_MOCK_USDC_ADDRESS=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_MOCK_USDT_ADDRESS=0x0987654321098765432109876543210987654321

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_production_project_id

# External Services
NEXT_PUBLIC_CHAINLINK_KEEPER_REGISTRY=0x...
NEXT_PUBLIC_GELATO_API_KEY=your_production_gelato_key

# Production Settings
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tevra.com
```

### Deployment Platforms

#### Vercel Deployment

1. **Connect repository**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure environment variables**
   - Go to Vercel dashboard
   - Navigate to project settings
   - Add all production environment variables

#### Netlify Deployment

1. **Build configuration**
   Create `netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "out"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

2. **Deploy**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod --dir=out
   ```

3. **Configure environment variables**
   - Go to Netlify dashboard
   - Navigate to site settings
   - Add all production environment variables

#### AWS Amplify Deployment

1. **Connect repository**
   - Go to AWS Amplify console
   - Connect your GitHub repository
   - Select the `frontend` folder as the root

2. **Configure build settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: out
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Set environment variables**
   - Add all production environment variables in Amplify console

## 🔐 Security Considerations

### Smart Contract Security

1. **Multi-signature wallet**
   ```solidity
   // Use multi-sig for contract ownership
   // Implement time-locked admin functions
   // Regular security audits
   ```

2. **Access control**
   ```solidity
   // Owner-only functions for critical operations
   // Pause functionality for emergencies
   // Upgradeable contracts if needed
   ```

3. **Rate limiting**
   ```solidity
   // Implement rate limiting for rule creation
   // Maximum number of rules per user
   // Cooldown periods for rule modifications
   ```

### Frontend Security

1. **Environment variables**
   ```bash
   # Never commit private keys to version control
   # Use environment variables for all sensitive data
   # Implement proper CORS policies
   ```

2. **Content Security Policy**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; 
                  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.walletconnect.com; 
                  connect-src 'self' https://*.infura.io wss://*.walletconnect.com;">
   ```

3. **Input validation**
   ```typescript
   // Validate all user inputs
   // Sanitize data before processing
   // Implement proper error handling
   ```

## 📊 Monitoring & Analytics

### Smart Contract Monitoring

1. **Event monitoring**
   ```javascript
   // Monitor contract events
   // Track execution success/failure rates
   // Monitor gas usage patterns
   ```

2. **Health checks**
   ```solidity
   // Implement health check functions
   // Monitor contract balance
   // Track active rules count
   ```

### Frontend Monitoring

1. **Error tracking**
   ```javascript
   // Implement error tracking (Sentry, LogRocket)
   // Monitor user interactions
   // Track performance metrics
   ```

2. **Analytics**
   ```javascript
   // User behavior analytics
   // Feature usage tracking
   // Performance monitoring
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy-contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Foundry
        uses: foundry-rs/foundry-toolchain@v1
      - name: Deploy contracts
        run: |
          forge script script/Deploy.s.sol --rpc-url ${{ secrets.RPC_URL }} --broadcast --verify
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          ETHERSCAN_API_KEY: ${{ secrets.ETHERSCAN_API_KEY }}

  deploy-frontend:
    needs: deploy-contracts
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd frontend && npm ci
      - name: Build
        run: cd frontend && npm run build
        env:
          NEXT_PUBLIC_TEVRA_CONTRACT_ADDRESS: ${{ secrets.CONTRACT_ADDRESS }}
          NEXT_PUBLIC_CHAIN_ID: ${{ secrets.CHAIN_ID }}
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
```

## 🚨 Emergency Procedures

### Smart Contract Emergency

1. **Pause functionality**
   ```solidity
   // Implement emergency pause
   // Stop all rule executions
   // Notify users of maintenance
   ```

2. **Fund recovery**
   ```solidity
   // Emergency fund withdrawal
   // Return funds to users
   // Document all actions
   ```

### Frontend Emergency

1. **Maintenance mode**
   ```javascript
   // Implement maintenance page
   // Graceful degradation
   // User communication
   ```

2. **Rollback procedure**
   ```bash
   # Quick rollback to previous version
   # Database backup/restore
   # DNS failover if needed
   ```

## 📈 Performance Optimization

### Smart Contract Optimization

1. **Gas optimization**
   ```solidity
   // Optimize storage usage
   // Batch operations
   // Use events for data storage
   ```

2. **Execution efficiency**
   ```solidity
   // Minimize external calls
   // Cache frequently used data
   // Optimize loop operations
   ```

### Frontend Optimization

1. **Bundle optimization**
   ```javascript
   // Code splitting
   // Lazy loading
   // Tree shaking
   ```

2. **Caching strategies**
   ```javascript
   // Static asset caching
   // API response caching
   // Browser caching headers
   ```

## 🔍 Post-Deployment Checklist

- [ ] Verify contract deployment on Etherscan
- [ ] Test all smart contract functions
- [ ] Verify frontend deployment
- [ ] Test wallet connections
- [ ] Verify rule creation and execution
- [ ] Check notification system
- [ ] Monitor error logs
- [ ] Test on different devices/browsers
- [ ] Verify analytics tracking
- [ ] Check performance metrics
- [ ] Test emergency procedures
- [ ] Document deployment details

---

## 📞 Support

For deployment assistance:
- **Documentation**: Check `/docs` section
- **GitHub Issues**: Report deployment issues
- **Discord**: Community support
- **Email**: deployment@tevra.com

Happy deploying! 🚀
