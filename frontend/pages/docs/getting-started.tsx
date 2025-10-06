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
  Wallet,
  Settings,
  Zap
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

const steps = [
  {
    title: 'Install Dependencies',
    description: 'Install the required packages for your project',
    code: `npm install @tevra/sdk wagmi viem @rainbow-me/rainbowkit`,
  },
  {
    title: 'Setup Wagmi Configuration',
    description: 'Configure Wagmi with your desired chains',
    code: `import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})`,
  },
  {
    title: 'Initialize Tevra SDK',
    description: 'Initialize the Tevra SDK with your configuration',
    code: `import { TevraSDK } from '@tevra/sdk'

const tevra = new TevraSDK({
  contractAddress: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
  chainId: 1, // Mainnet
})`,
  },
  {
    title: 'Create Your First Rule',
    description: 'Create an automation rule for auto top-ups',
    code: `const createRule = async () => {
  const tx = await tevra.createRule({
    isTopup: true,
    token: '0x0000000000000000000000000000000000000000', // ETH
    recipient: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
    amount: '0.5',
    threshold: '0.1',
    maxBalance: '2.0',
    schedule: 86400, // Daily
    minPrice: '1800',
    maxPrice: '2200'
  })
  
  await tx.wait()
  console.log('Rule created successfully!')
}`,
  },
];

export default function GettingStarted() {
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
        <title>Getting Started - Tevra Documentation</title>
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
                    Getting Started
                  </h1>
                  <p className="text-xl text-gray-300">
                    Learn how to set up Tevra and create your first automation rule.
                  </p>
                </div>

                {/* Prerequisites */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Prerequisites</h2>
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-300 mb-3">Before you begin</h3>
                    <ul className="space-y-2 text-blue-200">
                      <li>• A Web3 wallet (MetaMask, WalletConnect, etc.)</li>
                      <li>• Basic understanding of Ethereum and smart contracts</li>
                      <li>• Node.js and npm installed on your system</li>
                      <li>• Some ETH for gas fees</li>
                    </ul>
                  </div>
                </section>

                {/* Installation Steps */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
                  <div className="space-y-8">
                    {steps.map((step, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {step.title}
                            </h3>
                            <p className="text-gray-300 mb-4">
                              {step.description}
                            </p>
                            <div className="relative">
                              <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                <code className="text-gray-300 text-sm">{step.code}</code>
                              </pre>
                              <button
                                onClick={() => copyCode(step.code, index)}
                                className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                              >
                                {copiedCode === index ? (
                                  <>
                                    <Check className="w-3 h-3 text-green-400" />
                                    <span className="text-green-400 text-xs">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3 text-gray-400" />
                                    <span className="text-gray-400 text-xs">Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Configuration */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Configuration</h2>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">Environment Variables</h3>
                    <p className="text-gray-300 mb-4">
                      Create a <code className="bg-gray-800 px-2 py-1 rounded text-sm">.env</code> file in your project root:
                    </p>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-gray-300 text-sm">{`# Tevra Configuration
TEVRA_CONTRACT_ADDRESS=0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8
TEVRA_CHAIN_ID=1
TEVRA_RPC_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# Optional: API Keys
CHAINLINK_KEEPER_REGISTRY=0x... # For Chainlink Keepers
GELATO_API_KEY=your_gelato_api_key # For Gelato Network`}</code>
                    </pre>
                  </div>
                </section>

                {/* Quick Setup Guide */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Quick Setup Guide</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">1. Connect Wallet</h3>
                      <p className="text-gray-400 text-sm">
                        Connect your Web3 wallet to the Tevra dashboard
                      </p>
                    </div>

                    <div className="card text-center">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">2. Configure Rules</h3>
                      <p className="text-gray-400 text-sm">
                        Set up your automation rules and thresholds
                      </p>
                    </div>

                    <div className="card text-center">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">3. Activate Bot</h3>
                      <p className="text-gray-400 text-sm">
                        Enable your rules and let Tevra handle the rest
                      </p>
                    </div>
                  </div>
                </section>

                {/* Next Steps */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">What's Next?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/docs/usage" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Usage Examples</h3>
                          <p className="text-gray-400 text-sm">
                            Explore advanced usage patterns and real-world scenarios.
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

                {/* Troubleshooting */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Common Issues</h2>
                  <div className="space-y-4">
                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-2">Wallet Connection Issues</h3>
                      <p className="text-gray-300 text-sm">
                        Make sure your wallet is unlocked and connected to the correct network. 
                        Tevra supports Ethereum mainnet and testnets.
                      </p>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-2">Transaction Failures</h3>
                      <p className="text-gray-300 text-sm">
                        Check your gas settings and ensure you have sufficient ETH for gas fees. 
                        Failed transactions will be retried automatically by the bot.
                      </p>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-2">Rule Not Executing</h3>
                      <p className="text-gray-300 text-sm">
                        Verify that your rule conditions are met (balance thresholds, price ranges, etc.) 
                        and that the rule is active. Check the dashboard for execution logs.
                      </p>
                    </div>
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
