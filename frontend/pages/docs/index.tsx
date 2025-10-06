import React from 'react';
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
  Check
} from 'lucide-react';
import { useState } from 'react';

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

const codeExamples = [
  {
    title: 'Basic Auto Top-up Rule',
    description: 'Create a simple auto top-up rule for ETH',
    code: `// Create auto top-up rule
const createTopupRule = async () => {
  await tevraBot.createRule(
    true, // isTopup
    ETH_ADDRESS, // token
    RECIPIENT_ADDRESS, // recipient
    parseEther("0.5"), // amount
    parseEther("0.1"), // threshold
    parseEther("2.0"), // maxBalance
    86400, // schedule (daily)
    parseUnits("1800", 8), // minPrice
    parseUnits("2200", 8) // maxPrice
  );
};`,
  },
  {
    title: 'Listen to Events',
    description: 'Listen to automation events',
    code: `// Listen to auto top-up events
tevraBot.on("AutoTopupExecuted", (user, token, recipient, amount, timestamp, success) => {
  console.log(\`Auto top-up: \${amount} \${token} to \${recipient}\`);
  console.log(\`Success: \${success}, Timestamp: \${timestamp}\`);
  
  // Show notification
  if (success) {
    showSuccessNotification(\`Top-up successful: \${amount} ETH\`);
  } else {
    showErrorNotification(\`Top-up failed: \${amount} ETH\`);
  }
});`,
  },
];

export default function DocsIndex() {
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
        <title>Documentation - Tevra</title>
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
                    Tevra Documentation
                  </h1>
                  <p className="text-xl text-gray-300">
                    Learn how to automate your Web3 transactions with Tevra's intelligent bot system.
                  </p>
                </div>

                {/* Overview */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">What is Tevra?</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 mb-4">
                      Tevra is a Web3 automation platform that allows you to set up intelligent rules 
                      for your cryptocurrency transactions. Whether you need automatic top-ups, 
                      withdrawals, or complex trading strategies, Tevra handles it all automatically.
                    </p>
                    <p className="text-gray-300 mb-6">
                      Built on top of Chainlink Keepers and Gelato Network, Tevra provides reliable, 
                      decentralized automation for your DeFi activities.
                    </p>
                  </div>
                </section>

                {/* Key Features */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Smart Automation</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Set up complex automation rules with multiple conditions including 
                        balance thresholds, price ranges, and time schedules.
                      </p>
                    </div>

                    <div className="card">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                          <Bell className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Real-time Notifications</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Get instant notifications for all bot activities, transaction status, 
                        and important updates.
                      </p>
                    </div>

                    <div className="card">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Developer Friendly</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Easy-to-use APIs and comprehensive documentation for developers 
                        and power users.
                      </p>
                    </div>

                    <div className="card">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center mr-3">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Multi-chain Support</h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Support for multiple blockchains and tokens with seamless 
                        cross-chain automation capabilities.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Quick Start */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <ol className="space-y-4 text-gray-300">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">1</span>
                        <div>
                          <p className="font-medium text-white">Connect Your Wallet</p>
                          <p>Connect your Web3 wallet to access the Tevra dashboard.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">2</span>
                        <div>
                          <p className="font-medium text-white">Create Your First Rule</p>
                          <p>Set up an auto top-up or withdraw rule with your desired parameters.</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">3</span>
                        <div>
                          <p className="font-medium text-white">Monitor & Manage</p>
                          <p>Track your automation rules and adjust them as needed.</p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </section>

                {/* Code Examples */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Code Examples</h2>
                  <div className="space-y-6">
                    {codeExamples.map((example, index) => (
                      <div key={index} className="card">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{example.title}</h3>
                            <p className="text-gray-400 text-sm">{example.description}</p>
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

                {/* Next Steps */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/docs/getting-started" className="card hover:border-blue-500 transition-colors">
                      <div className="flex items-center mb-3">
                        <Play className="w-6 h-6 text-blue-400 mr-3" />
                        <h3 className="text-lg font-semibold text-white">Getting Started</h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Learn how to set up your first automation rule and configure your bot.
                      </p>
                    </Link>

                    <Link href="/docs/usage" className="card hover:border-blue-500 transition-colors">
                      <div className="flex items-center mb-3">
                        <Code className="w-6 h-6 text-blue-400 mr-3" />
                        <h3 className="text-lg font-semibold text-white">Usage Examples</h3>
                      </div>
                      <p className="text-gray-400 text-sm">
                        Explore advanced usage patterns and real-world automation scenarios.
                      </p>
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
