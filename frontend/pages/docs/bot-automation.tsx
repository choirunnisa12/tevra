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
  Shield,
  Zap,
  Clock,
  Settings
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

const automationProviders = [
  {
    name: 'Chainlink Keepers',
    description: 'Decentralized automation network powered by Chainlink',
    features: [
      'Decentralized execution',
      'High reliability (99.9% uptime)',
      'Gas price optimization',
      'Cross-chain support',
    ],
    code: `// Chainlink Keepers integration
import { KeeperRegistryInterface } from '@chainlink/contracts/src/v0.8/interfaces/KeeperRegistryInterface.sol';

contract TevraBot is KeeperCompatibleInterface {
    function checkUpkeep(bytes calldata checkData) 
        external 
        view 
        override 
        returns (bool upkeepNeeded, bytes memory performData) {
        
        // Check if any user rules need execution
        for (uint256 i = 0; i < totalUsers; i++) {
            address user = users[i];
            uint256 ruleCount = userRuleCount[user];
            
            for (uint256 j = 0; j < ruleCount; j++) {
                AutomationRule storage rule = userRules[user][j];
                
                if (rule.isActive && 
                    block.timestamp >= rule.nextExecution &&
                    _shouldExecute(rule)) {
                    
                    upkeepNeeded = true;
                    performData = abi.encode(user, j);
                    break;
                }
            }
        }
        
        return (upkeepNeeded, performData);
    }
    
    function performUpkeep(bytes calldata performData) 
        external 
        override {
        
        (address user, uint256 ruleId) = abi.decode(performData, (address, uint256));
        AutomationRule storage rule = userRules[user][ruleId];
        
        if (rule.isTopup) {
            _executeTopup(rule);
        } else {
            _executeWithdraw(rule);
        }
        
        rule.lastExecuted = block.timestamp;
        rule.nextExecution = block.timestamp + rule.schedule;
    }
}`,
  },
  {
    name: 'Gelato Network',
    description: 'Web3 automation infrastructure for smart contracts',
    features: [
      'Task-based execution',
      'Conditional logic',
      'Gasless transactions',
      'Multi-chain support',
    ],
    code: `// Gelato Network integration
import { GelatoRelay } from '@gelatonetwork/relay-sdk';

class TevraGelatoIntegration {
    private gelatoRelay: GelatoRelay;
    
    constructor() {
        this.gelatoRelay = new GelatoRelay();
    }
    
    async createAutomationTask(rule: AutomationRule): Promise<string> {
        const task = {
            name: \`Tevra Rule \${rule.id}\`,
            execAddress: TEVRA_BOT_ADDRESS,
            execSelector: 'executeRule(uint256)',
            execData: this.encodeExecuteData(rule.id),
            interval: rule.schedule,
            startTime: rule.nextExecution,
            conditions: this.buildConditions(rule)
        };
        
        const taskId = await this.gelatoRelay.createTask(task);
        return taskId;
    }
    
    private buildConditions(rule: AutomationRule): Condition[] {
        return [
            {
                inst: 'conditional',
                data: {
                    condition: 'balance',
                    operator: rule.isTopup ? 'lt' : 'gt',
                    value: rule.threshold,
                    token: rule.token
                }
            },
            {
                inst: 'conditional',
                data: {
                    condition: 'price',
                    operator: 'between',
                    minValue: rule.minPrice,
                    maxValue: rule.maxPrice,
                    token: rule.token
                }
            }
        ];
    }
}`,
  },
];

const automationFeatures = [
  {
    title: 'Conditional Execution',
    description: 'Execute rules only when specific conditions are met',
    icon: Settings,
  },
  {
    title: 'Gas Optimization',
    description: 'Automatically optimize gas usage for cost-effective execution',
    icon: Zap,
  },
  {
    title: 'Reliable Execution',
    description: '99.9% uptime with automatic retry mechanisms',
    icon: Shield,
  },
  {
    title: 'Scheduled Tasks',
    description: 'Execute rules on custom schedules (daily, weekly, monthly)',
    icon: Clock,
  },
];

export default function BotAutomation() {
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
        <title>Bot Automation - Tevra Documentation</title>
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
                    Bot Automation
                  </h1>
                  <p className="text-xl text-gray-300">
                    Learn how Tevra's automation system works and integrates with Chainlink Keepers and Gelato Network.
                  </p>
                </div>

                {/* Overview */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">How Automation Works</h2>
                  <div className="card">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-4 flex-shrink-0">1</div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Rule Creation</h3>
                          <p className="text-gray-300">
                            Users create automation rules with specific conditions, thresholds, and schedules. 
                            These rules are stored on-chain and monitored by the automation network.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-4 flex-shrink-0">2</div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Continuous Monitoring</h3>
                          <p className="text-gray-300">
                            The automation network continuously monitors your rules and checks if the 
                            conditions are met (balance thresholds, price ranges, time schedules).
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-4 flex-shrink-0">3</div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Automatic Execution</h3>
                          <p className="text-gray-300">
                            When conditions are met, the automation network automatically executes your 
                            rule by calling the smart contract functions with the specified parameters.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white mr-4 flex-shrink-0">4</div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Event Emission</h3>
                          <p className="text-gray-300">
                            The smart contract emits events with execution results, which are picked up 
                            by the frontend to show notifications and update the dashboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Automation Features */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Automation Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {automationFeatures.map((feature, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-gray-300 text-sm">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Automation Providers */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Automation Providers</h2>
                  <div className="space-y-8">
                    {automationProviders.map((provider, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                              {provider.name}
                            </h3>
                            <p className="text-gray-300 mb-4">
                              {provider.description}
                            </p>
                            <ul className="space-y-1">
                              {provider.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-center text-gray-300 text-sm">
                                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <button
                            onClick={() => copyCode(provider.code, index)}
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
                          <code className="text-gray-300 text-sm">{provider.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Security Considerations */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Security Considerations</h2>
                  <div className="space-y-6">
                    <div className="card border-yellow-500/30 bg-yellow-900/10">
                      <div className="flex items-start">
                        <Shield className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Smart Contract Security
                          </h3>
                          <p className="text-gray-300 text-sm mb-3">
                            Tevra's smart contracts have been audited and follow security best practices:
                          </p>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Reentrancy protection using OpenZeppelin's ReentrancyGuard</li>
                            <li>• Access control with onlyOwner modifiers</li>
                            <li>• Input validation for all parameters</li>
                            <li>• Event emission for all state changes</li>
                            <li>• Emergency pause functionality</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="card border-blue-500/30 bg-blue-900/10">
                      <div className="flex items-start">
                        <Bot className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Automation Network Security
                          </h3>
                          <p className="text-gray-300 text-sm mb-3">
                            The automation networks provide additional security layers:
                          </p>
                          <ul className="space-y-1 text-sm text-gray-300">
                            <li>• Decentralized execution prevents single points of failure</li>
                            <li>• Economic incentives ensure reliable execution</li>
                            <li>• Multiple validators verify rule conditions</li>
                            <li>• Gas price optimization reduces execution costs</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Monitoring & Alerts */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Monitoring & Alerts</h2>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">Real-time Monitoring</h3>
                    <p className="text-gray-300 mb-4">
                      Tevra provides comprehensive monitoring and alerting capabilities:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Execution Alerts</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Successful rule executions</li>
                          <li>• Failed execution attempts</li>
                          <li>• Gas price fluctuations</li>
                          <li>• Balance threshold breaches</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">System Alerts</h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                          <li>• Network congestion warnings</li>
                          <li>• Contract upgrade notifications</li>
                          <li>• Security incident alerts</li>
                          <li>• Maintenance notifications</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Next Steps */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/docs/notifications" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">Notifications</h3>
                          <p className="text-gray-400 text-sm">
                            Learn about Tevra's notification system and alert management.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>

                    <Link href="/docs/api-reference" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
                          <p className="text-gray-400 text-sm">
                            Complete API documentation for integrating with Tevra.
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
