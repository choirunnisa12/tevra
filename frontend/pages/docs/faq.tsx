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
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  Github
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

const faqCategories = [
  {
    title: 'General Questions',
    icon: HelpCircle,
    questions: [
      {
        question: 'What is Tevra?',
        answer: 'Tevra is a Web3 automation platform that allows you to set up intelligent rules for your cryptocurrency transactions. It automates tasks like auto top-ups, withdrawals, and complex trading strategies using smart contracts and decentralized automation networks.',
      },
      {
        question: 'How does Tevra work?',
        answer: 'Tevra uses smart contracts to store your automation rules and integrates with Chainlink Keepers and Gelato Network for reliable execution. The system continuously monitors your rules and automatically executes them when conditions are met.',
      },
      {
        question: 'Is Tevra secure?',
        answer: 'Yes, Tevra prioritizes security with audited smart contracts, decentralized execution, and multiple layers of protection. The platform uses established protocols like Chainlink Keepers and follows Web3 security best practices.',
      },
      {
        question: 'What blockchains does Tevra support?',
        answer: 'Tevra currently supports Ethereum mainnet and testnets, with plans to expand to other EVM-compatible chains like Polygon, Arbitrum, and Optimism.',
      },
    ],
  },
  {
    title: 'Getting Started',
    icon: Play,
    questions: [
      {
        question: 'How do I get started with Tevra?',
        answer: '1. Connect your Web3 wallet to the Tevra dashboard\n2. Create your first automation rule\n3. Configure your preferences and thresholds\n4. Activate your rules and monitor execution',
      },
      {
        question: 'Do I need programming knowledge to use Tevra?',
        answer: 'No, Tevra is designed to be user-friendly with a simple web interface. However, developers can use our APIs and SDKs for advanced integrations.',
      },
      {
        question: 'What wallets are supported?',
        answer: 'Tevra supports all major Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, and many others through our RainbowKit integration.',
      },
      {
        question: 'Are there any fees?',
        answer: 'Tevra charges a small fee (0.1%) on successful executions to cover operational costs. You also pay standard blockchain gas fees for transactions.',
      },
    ],
  },
  {
    title: 'Automation Rules',
    icon: Bot,
    questions: [
      {
        question: 'What types of automation can I create?',
        answer: 'You can create auto top-up rules (to add funds when balance is low), auto withdraw rules (to remove funds when balance is high), and complex strategies like DCA (Dollar Cost Averaging) and portfolio rebalancing.',
      },
      {
        question: 'How often can my rules execute?',
        answer: 'Rules can execute on various schedules: daily, weekly, monthly, or custom intervals. The system checks conditions continuously but executes according to your specified schedule.',
      },
      {
        question: 'Can I set price conditions for execution?',
        answer: 'Yes, you can set minimum and maximum price thresholds for token execution. Rules will only execute when the token price is within your specified range.',
      },
      {
        question: 'What happens if a rule execution fails?',
        answer: 'Failed executions are automatically retried with exponential backoff. You\'ll receive notifications about failures, and the system will attempt to execute again at the next scheduled time.',
      },
    ],
  },
  {
    title: 'Technical Issues',
    icon: Code,
    questions: [
      {
        question: 'Why is my rule not executing?',
        answer: 'Common reasons include: insufficient balance, gas prices too high, price conditions not met, or the rule being paused. Check your dashboard for detailed execution logs.',
      },
      {
        question: 'How do I check my rule execution history?',
        answer: 'Visit the History page in your dashboard to see all past executions, including successful transactions and any failures with error messages.',
      },
      {
        question: 'Can I pause or modify my rules?',
        answer: 'Yes, you can pause, activate, or modify your rules at any time through the Rules & Settings page. Changes take effect immediately.',
      },
      {
        question: 'What if I need to stop all automation?',
        answer: 'You can pause all your rules at once from the dashboard, or delete specific rules permanently. Your funds remain safe in your wallet.',
      },
    ],
  },
  {
    title: 'Billing & Payments',
    icon: MessageCircle,
    questions: [
      {
        question: 'How are fees calculated?',
        answer: 'Tevra charges 0.1% of the transaction amount on successful executions. Gas fees are paid separately to the blockchain network.',
      },
      {
        question: 'When are fees charged?',
        answer: 'Fees are deducted from your transaction amount when rules execute successfully. No fees are charged for failed executions.',
      },
      {
        question: 'Can I pay fees in different tokens?',
        answer: 'Currently, fees are deducted from the transaction amount in the same token. We\'re working on multi-token fee payment options.',
      },
      {
        question: 'Is there a minimum transaction amount?',
        answer: 'There\'s no minimum transaction amount, but keep in mind that gas fees may make small transactions uneconomical.',
      },
    ],
  },
];

const troubleshootingSteps = [
  {
    title: 'Rule Not Executing',
    steps: [
      'Check if the rule is active and not paused',
      'Verify your wallet has sufficient balance',
      'Ensure price conditions are met',
      'Check gas prices and network congestion',
      'Review execution logs in the History page',
    ],
  },
  {
    title: 'Transaction Failures',
    steps: [
      'Ensure sufficient ETH for gas fees',
      'Check if the token contract is valid',
      'Verify recipient address is correct',
      'Wait for network congestion to clear',
      'Try increasing gas price if needed',
    ],
  },
  {
    title: 'Connection Issues',
    steps: [
      'Refresh the page and reconnect your wallet',
      'Check if your wallet is unlocked',
      'Ensure you\'re connected to the correct network',
      'Try switching to a different RPC endpoint',
      'Clear browser cache and cookies',
    ],
  },
];

export default function FAQ() {
  const router = useRouter();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set());

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = categoryIndex * 100 + questionIndex;
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <>
      <Head>
        <title>FAQ & Troubleshooting - Tevra Documentation</title>
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
                    FAQ & Troubleshooting
                  </h1>
                  <p className="text-xl text-gray-300">
                    Find answers to common questions and solutions to technical issues.
                  </p>
                </div>

                {/* FAQ Categories */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-8">
                    {faqCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="card">
                        <div className="flex items-center mb-6">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                            <category.icon className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold text-white">
                            {category.title}
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          {category.questions.map((faq, questionIndex) => {
                            const key = categoryIndex * 100 + questionIndex;
                            const isExpanded = expandedQuestions.has(key);
                            
                            return (
                              <div key={questionIndex} className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0">
                                <button
                                  onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                  className="flex items-center justify-between w-full text-left"
                                >
                                  <h4 className="text-lg font-medium text-white pr-4">
                                    {faq.question}
                                  </h4>
                                  {isExpanded ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                  ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                  )}
                                </button>
                                
                                {isExpanded && (
                                  <div className="mt-4">
                                    <p className="text-gray-300 whitespace-pre-line">
                                      {faq.answer}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Troubleshooting */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Troubleshooting Guide</h2>
                  <div className="space-y-6">
                    {troubleshootingSteps.map((issue, index) => (
                      <div key={index} className="card">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          {issue.title}
                        </h3>
                        <div className="space-y-3">
                          {issue.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-start">
                              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-3 flex-shrink-0">
                                {stepIndex + 1}
                              </div>
                              <p className="text-gray-300 text-sm">
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Common Error Messages */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Common Error Messages</h2>
                  <div className="space-y-4">
                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-2">"Insufficient Balance"</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Cause:</strong> Your wallet doesn't have enough tokens for the transaction.
                      </p>
                      <p className="text-gray-300 text-sm">
                        <strong>Solution:</strong> Add more tokens to your wallet or adjust your rule amount.
                      </p>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-2">"Gas Price Too Low"</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Cause:</strong> The network is congested and your gas price is too low.
                      </p>
                      <p className="text-gray-300 text-sm">
                        <strong>Solution:</strong> Wait for network congestion to clear or increase gas price in settings.
                      </p>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-2">"Price Conditions Not Met"</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Cause:</strong> The current token price is outside your specified range.
                      </p>
                      <p className="text-gray-300 text-sm">
                        <strong>Solution:</strong> Adjust your price range or wait for price to move within range.
                      </p>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-2">"Rule Execution Failed"</h3>
                      <p className="text-gray-300 text-sm mb-2">
                        <strong>Cause:</strong> The smart contract execution encountered an error.
                      </p>
                      <p className="text-gray-300 text-sm">
                        <strong>Solution:</strong> Check the transaction details in your wallet or on Etherscan for more information.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Getting Help */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Getting Help</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Discord Community</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Join our Discord server for real-time support and community discussions.
                      </p>
                      <a href="#" className="btn-secondary text-sm">
                        Join Discord
                      </a>
                    </div>

                    <div className="card text-center">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Email Support</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Contact our support team directly for technical assistance.
                      </p>
                      <a href="mailto:support@tevra.com" className="btn-secondary text-sm">
                        Contact Support
                      </a>
                    </div>

                    <div className="card text-center">
                      <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">GitHub Issues</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Report bugs and feature requests on our GitHub repository.
                      </p>
                      <a href="https://github.com/tevra" className="btn-secondary text-sm">
                        View GitHub
                      </a>
                    </div>
                  </div>
                </section>

                {/* Additional Resources */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Additional Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/docs/getting-started" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Getting Started Guide</h3>
                          <p className="text-gray-400 text-sm">
                            Step-by-step guide to set up your first automation rule.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>

                    <Link href="/docs/api-reference" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">API Documentation</h3>
                          <p className="text-gray-400 text-sm">
                            Complete API reference for developers and power users.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>

                    <Link href="/docs/usage" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Usage Examples</h3>
                          <p className="text-gray-400 text-sm">
                            Real-world examples and advanced usage patterns.
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
