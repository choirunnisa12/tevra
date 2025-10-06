import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import { 
  BookOpen, 
  Play, 
  Code, 
  Bot, 
  Bell, 
  HelpCircle, 
  ExternalLink,
  Copy,
  Check,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Clock,
  DollarSign
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/docs',
    icon: BookOpen,
  },
  {
    name: 'Getting Started',
    href: '/docs/getting-started',
    icon: Play,
  },
  {
    name: 'Usage & Examples',
    href: '/docs/usage',
    icon: Code,
  },
  {
    name: 'Bot Automation',
    href: '/docs/bot-automation',
    icon: Bot,
  },
  {
    name: 'Notifications',
    href: '/docs/notifications',
    icon: Bell,
  },
  {
    name: 'API Reference',
    href: '/docs/api-reference',
    icon: Code,
  },
  {
    name: 'FAQ & Troubleshooting',
    href: '/docs/faq',
    icon: HelpCircle,
  },
];

const usageExamples = [
  {
    title: 'Basic Auto Top-up',
    description: 'Automatically top up your wallet when balance falls below threshold',
    code: `// Create a basic auto top-up rule
const autoTopup = async () => {
  const rule = await tevra.createRule({
    isTopup: true,
    token: '0x0000000000000000000000000000000000000000', // ETH
    recipient: userWalletAddress,
    amount: '0.5', // Top up with 0.5 ETH
    threshold: '0.1', // When balance falls below 0.1 ETH
    maxBalance: '2.0', // Stop when balance reaches 2 ETH
    schedule: 86400, // Check daily
    minPrice: '1800', // Only execute if ETH > $1800
    maxPrice: '2200'  // Only execute if ETH < $2200
  });
  
  console.log('Auto top-up rule created:', rule.id);
};`,
  },
  {
    title: 'Smart DCA Strategy',
    description: 'Dollar-cost average into a token with price-based triggers',
    code: `// Dollar Cost Averaging with price triggers
const dcaStrategy = async () => {
  const rule = await tevra.createRule({
    isTopup: true,
    token: USDC_ADDRESS,
    recipient: DEX_CONTRACT_ADDRESS,
    amount: '100', // Buy $100 worth
    threshold: '0', // Always execute when conditions are met
    maxBalance: '10000', // Stop after $10k invested
    schedule: 604800, // Weekly
    minPrice: '0.95', // Only buy if token price < $0.95
    maxPrice: '1.05'  // Only buy if token price > $1.05
  });
  
  // Listen for execution events
  tevra.on('AutoTopupExecuted', (user, token, recipient, amount, timestamp, success) => {
    if (success) {
      console.log(\`DCA execution: Bought \${amount} tokens at \${timestamp}\`);
    }
  });
};`,
  },
  {
    title: 'Profit Taking Bot',
    description: 'Automatically take profits when token price reaches target',
    code: `// Take profits when token price hits target
const profitTaking = async () => {
  const rule = await tevra.createRule({
    isTopup: false, // This is a withdraw/sell operation
    token: TOKEN_ADDRESS,
    recipient: DEX_CONTRACT_ADDRESS,
    amount: '1000', // Sell 1000 tokens
    threshold: '5000', // When balance exceeds 5000 tokens
    maxBalance: '5000', // Keep maximum 5000 tokens
    schedule: 3600, // Check hourly
    minPrice: '2.50', // Only sell if price > $2.50
    maxPrice: '10.00' // Only sell if price < $10.00
  });
  
  console.log('Profit taking rule created');
};`,
  },
  {
    title: 'Multi-Token Portfolio Rebalancing',
    description: 'Automatically rebalance your portfolio across multiple tokens',
    code: `// Portfolio rebalancing across multiple tokens
const portfolioRebalancing = async () => {
  const tokens = ['ETH', 'USDC', 'WBTC'];
  const targetAllocations = [0.4, 0.4, 0.2]; // 40% ETH, 40% USDC, 20% WBTC
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const targetAllocation = targetAllocations[i];
    
    await tevra.createRule({
      isTopup: true,
      token: TOKEN_ADDRESSES[token],
      recipient: REBALANCING_CONTRACT,
      amount: '1000', // Rebalance amount
      threshold: '0', // Always check
      maxBalance: '50000', // Max portfolio value
      schedule: 2592000, // Monthly rebalancing
      minPrice: '0.01', // Minimum price threshold
      maxPrice: '100000' // Maximum price threshold
    });
  }
  
  console.log('Portfolio rebalancing rules created');
};`,
  },
  {
    title: 'Event-Driven Automation',
    description: 'Listen to contract events and trigger actions',
    code: `// Listen to external contract events and trigger automation
const eventDrivenAutomation = async () => {
  // Listen to a DeFi protocol's events
  const protocol = new ethers.Contract(PROTOCOL_ADDRESS, PROTOCOL_ABI, provider);
  
  protocol.on('RewardsClaimed', async (user, amount, timestamp) => {
    // When rewards are claimed, automatically compound them
    if (user.toLowerCase() === userAddress.toLowerCase()) {
      await tevra.createRule({
        isTopup: true,
        token: REWARD_TOKEN_ADDRESS,
        recipient: STAKING_CONTRACT_ADDRESS,
        amount: amount.toString(),
        threshold: '0',
        maxBalance: '100000',
        schedule: 0, // Execute immediately
        minPrice: '0',
        maxPrice: '1000000'
      });
    }
  });
  
  console.log('Event-driven automation set up');
};`,
  },
  {
    title: 'Gas Price Optimization',
    description: 'Execute transactions only when gas prices are favorable',
    code: `// Gas price optimization for cost-effective execution
const gasOptimizedExecution = async () => {
  const rule = await tevra.createRule({
    isTopup: true,
    token: '0x0000000000000000000000000000000000000000',
    recipient: userWalletAddress,
    amount: '1.0',
    threshold: '0.5',
    maxBalance: '5.0',
    schedule: 3600, // Check hourly
    minPrice: '1800',
    maxPrice: '2200'
  });
  
  // Monitor gas prices and adjust execution timing
  const gasPriceMonitor = setInterval(async () => {
    const gasPrice = await provider.getGasPrice();
    const gasPriceGwei = ethers.utils.formatUnits(gasPrice, 'gwei');
    
    if (parseFloat(gasPriceGwei) < 20) { // Execute when gas < 20 gwei
      // Trigger immediate execution
      await tevra.executeRule(rule.id);
    }
  }, 300000); // Check every 5 minutes
  
  console.log('Gas-optimized execution enabled');
};`,
  },
];

const bestPractices = [
  {
    title: 'Start Small',
    description: 'Begin with small amounts and test your rules thoroughly before scaling up.',
    icon: TrendingUp,
  },
  {
    title: 'Set Realistic Thresholds',
    description: 'Use realistic price ranges and balance thresholds based on market conditions.',
    icon: DollarSign,
  },
  {
    title: 'Monitor Regularly',
    description: 'Regularly check your rules and adjust them based on market conditions.',
    icon: Clock,
  },
  {
    title: 'Use Multiple Rules',
    description: 'Create multiple rules for different scenarios rather than one complex rule.',
    icon: Bot,
  },
];

export default function UsageExamples() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <>
      <Head>
        <title>Usage & Examples - Tevra Documentation</title>
      </Head>
      
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold gradient-text">Tevra</span>
              </Link>
              <Link href="/dashboard" className="btn-primary">
                Launch App
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const isActive = router.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      )}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="max-w-4xl">
                <div className="mb-8">
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Usage & Examples
                  </h1>
                  <p className="text-xl text-gray-300">
                    Explore real-world examples and advanced usage patterns for Tevra automation.
                  </p>
                </div>

                {/* Examples */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Real-World Examples</h2>
                  <div className="space-y-8">
                    {usageExamples.map((example, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {example.title}
                            </h3>
                            <p className="text-gray-300 mb-4">
                              {example.description}
                            </p>
                          </div>
                          <button
                            onClick={() => copyCode(example.code, index)}
                            className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            {copiedCode === index ? (
                              <>
                                <Check className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 text-sm">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400 text-sm">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <code className="text-gray-300 text-sm">{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Best Practices */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Best Practices</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {bestPractices.map((practice, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <practice.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {practice.title}
                            </h3>
                            <p className="text-gray-300 text-sm">
                              {practice.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Advanced Patterns */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Advanced Patterns</h2>
                  <div className="space-y-6">
                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-3">Conditional Execution Chains</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Create complex automation chains where the execution of one rule triggers another:
                      </p>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
                            <span>Rule A: Buy ETH when price < $1800</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                            <span>Rule B: Stake ETH when balance > 1 ETH</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-purple-400 rounded-full mr-2"></div>
                            <span>Rule C: Claim rewards when available</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-3">Multi-Signature Integration</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Integrate with multi-signature wallets for enhanced security:
                      </p>
                      <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <code className="text-gray-300 text-sm">{`// Multi-sig integration example
const multisigIntegration = async () => {
  const multisig = new ethers.Contract(MULTISIG_ADDRESS, MULTISIG_ABI, provider);
  
  // Create rule that requires multi-sig approval
  const rule = await tevra.createRule({
    isTopup: true,
    token: '0x0000000000000000000000000000000000000000',
    recipient: MULTISIG_ADDRESS,
    amount: '10.0', // Large amount requiring approval
    threshold: '0',
    maxBalance: '100',
    schedule: 0,
    minPrice: '0',
    maxPrice: '1000000'
  });
  
  // The rule will create a proposal in the multi-sig
  // that needs to be approved by the required number of signers
};`}</code>
                      </pre>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-3">Cross-Chain Automation</h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Automate actions across multiple blockchains:
                      </p>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">E</span>
                            </div>
                            <p className="text-gray-300">Ethereum</p>
                            <p className="text-gray-400">Buy ETH</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 mx-auto self-center" />
                          <div className="text-center">
                            <div className="w-8 h-8 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">P</span>
                            </div>
                            <p className="text-gray-300">Polygon</p>
                            <p className="text-gray-400">Bridge & Deploy</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 mx-auto self-center" />
                          <div className="text-center">
                            <div className="w-8 h-8 bg-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-white font-bold text-xs">A</span>
                            </div>
                            <p className="text-gray-300">Arbitrum</p>
                            <p className="text-gray-400">Yield Farm</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Integration Examples */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Integration Examples</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/docs/api-reference" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
                          <p className="text-gray-400 text-sm">
                            Complete API documentation and reference guides.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>

                    <Link href="/docs/bot-automation" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Bot Automation</h3>
                          <p className="text-gray-400 text-sm">
                            Learn about Chainlink Keepers and Gelato integration.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
