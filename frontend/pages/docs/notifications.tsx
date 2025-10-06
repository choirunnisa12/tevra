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
  ArrowRight,
  Mail,
  MessageSquare,
  Slack,
  Discord,
  Webhook
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

const notificationTypes = [
  {
    title: 'Execution Notifications',
    description: 'Get notified when your automation rules execute',
    icon: Bot,
    examples: [
      'Auto top-up executed successfully',
      'Withdraw rule triggered',
      'Rule execution failed',
      'Gas price optimization applied',
    ],
  },
  {
    title: 'Balance Alerts',
    description: 'Monitor your wallet balances and thresholds',
    icon: Bell,
    examples: [
      'Balance below threshold',
      'Maximum balance reached',
      'Large balance changes',
      'Token price alerts',
    ],
  },
  {
    title: 'System Updates',
    description: 'Stay informed about system changes and maintenance',
    icon: MessageSquare,
    examples: [
      'Contract upgrades',
      'Network maintenance',
      'Security updates',
      'Feature releases',
    ],
  },
];

const notificationChannels = [
  {
    name: 'In-App Notifications',
    description: 'Real-time notifications within the Tevra dashboard',
    icon: Bell,
    features: [
      'Toast notifications',
      'Dashboard alerts',
      'Real-time updates',
      'Customizable display',
    ],
  },
  {
    name: 'Email Notifications',
    description: 'Receive notifications via email',
    icon: Mail,
    features: [
      'Daily summaries',
      'Critical alerts',
      'Custom email templates',
      'Unsubscribe options',
    ],
  },
  {
    name: 'Webhook Integration',
    description: 'Integrate with external services via webhooks',
    icon: Webhook,
    features: [
      'Custom endpoints',
      'JSON payloads',
      'Retry mechanisms',
      'Authentication support',
    ],
  },
  {
    name: 'Discord Integration',
    description: 'Get notifications in your Discord server',
    icon: Discord,
    features: [
      'Custom Discord bot',
      'Channel notifications',
      'Rich embeds',
      'User mentions',
    ],
  },
  {
    name: 'Slack Integration',
    description: 'Send notifications to Slack channels',
    icon: Slack,
    features: [
      'Channel notifications',
      'Direct messages',
      'Custom formatting',
      'Team collaboration',
    ],
  },
];

export default function Notifications() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Notifications - Tevra Documentation</title>
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
                    Notifications
                  </h1>
                  <p className="text-xl text-gray-300">
                    Stay informed about your automation rules and system updates with Tevra's comprehensive notification system.
                  </p>
                </div>

                {/* Notification Types */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Types</h2>
                  <div className="space-y-6">
                    {notificationTypes.map((type, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <type.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {type.title}
                            </h3>
                            <p className="text-gray-300 mb-4">
                              {type.description}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {type.examples.map((example, exampleIndex) => (
                                <div key={exampleIndex} className="flex items-center text-sm text-gray-400">
                                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></div>
                                  {example}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Notification Channels */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Channels</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {notificationChannels.map((channel, index) => (
                      <div key={index} className="card">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                            <channel.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {channel.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {channel.description}
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-1">
                          {channel.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Configuration */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Configuration</h2>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">Setting Up Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-3 flex-shrink-0">1</div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Access Notification Settings</h4>
                          <p className="text-gray-300 text-sm">
                            Go to the Rules & Settings page and click on the Notifications tab to configure your preferences.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-3 flex-shrink-0">2</div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Choose Notification Types</h4>
                          <p className="text-gray-300 text-sm">
                            Select which types of notifications you want to receive (execution alerts, balance updates, system notifications).
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-3 flex-shrink-0">3</div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Configure Channels</h4>
                          <p className="text-gray-300 text-sm">
                            Set up your preferred notification channels (email, webhook, Discord, Slack) and customize the delivery settings.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-3 flex-shrink-0">4</div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Test Notifications</h4>
                          <p className="text-gray-300 text-sm">
                            Use the test notification feature to verify that your configuration is working correctly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Notification Examples */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Examples</h2>
                  <div className="space-y-6">
                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-4">Success Notification</h3>
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                          <span className="text-green-300 font-medium">Auto Top-up Executed</span>
                        </div>
                        <p className="text-green-200 text-sm">
                          Successfully topped up 0.5 ETH to wallet 0x742d...C8C8. 
                          Transaction hash: 0x1234...5678. Gas used: 65,000.
                        </p>
                        <p className="text-green-300 text-xs mt-2">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-4">Alert Notification</h3>
                      <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                          <span className="text-yellow-300 font-medium">Balance Threshold Alert</span>
                        </div>
                        <p className="text-yellow-200 text-sm">
                          ETH balance (0.08 ETH) has fallen below your threshold (0.1 ETH). 
                          Auto top-up rule will be triggered on next schedule check.
                        </p>
                        <p className="text-yellow-300 text-xs mt-2">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-4">Error Notification</h3>
                      <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                          <span className="text-red-300 font-medium">Execution Failed</span>
                        </div>
                        <p className="text-red-200 text-sm">
                          Auto withdraw rule execution failed: Insufficient balance. 
                          Required: 100 USDC, Available: 85 USDC. Retry scheduled in 1 hour.
                        </p>
                        <p className="text-red-300 text-xs mt-2">
                          {new Date().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Best Practices */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Best Practices</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-3">Notification Frequency</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Enable immediate alerts for critical events</li>
                        <li>• Use daily summaries for routine updates</li>
                        <li>• Set up weekly reports for long-term trends</li>
                        <li>• Configure quiet hours to avoid spam</li>
                      </ul>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-3">Channel Selection</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Use in-app notifications for real-time updates</li>
                        <li>• Email for important alerts and summaries</li>
                        <li>• Webhooks for integration with other tools</li>
                        <li>• Discord/Slack for team collaboration</li>
                      </ul>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-3">Alert Management</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Set appropriate thresholds to avoid noise</li>
                        <li>• Use different channels for different severity levels</li>
                        <li>• Regularly review and adjust notification settings</li>
                        <li>• Test notifications after configuration changes</li>
                      </ul>
                    </div>

                    <div className="card">
                      <h3 className="text-lg font-semibold text-white mb-3">Security Considerations</h3>
                      <ul className="space-y-2 text-sm text-gray-300">
                        <li>• Never share sensitive information in notifications</li>
                        <li>• Use secure webhook endpoints with authentication</li>
                        <li>• Regularly rotate API keys and tokens</li>
                        <li>• Monitor notification delivery for anomalies</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Next Steps */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/docs/api-reference" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
                          <p className="text-gray-400 text-sm">
                            Learn how to integrate notifications with your applications.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>

                    <Link href="/docs/faq" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">FAQ & Troubleshooting</h3>
                          <p className="text-gray-400 text-sm">
                            Find answers to common notification questions and issues.
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
