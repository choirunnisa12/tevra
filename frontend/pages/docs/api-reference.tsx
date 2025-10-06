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
  Database,
  Zap,
  Shield
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

const apiEndpoints = [
  {
    method: 'POST',
    endpoint: '/api/rules',
    description: 'Create a new automation rule',
    parameters: [
      { name: 'isTopup', type: 'boolean', required: true, description: 'Whether this is a top-up or withdraw rule' },
      { name: 'token', type: 'string', required: true, description: 'Token contract address' },
      { name: 'recipient', type: 'string', required: true, description: 'Recipient wallet address' },
      { name: 'amount', type: 'string', required: true, description: 'Amount to transfer' },
      { name: 'threshold', type: 'string', required: true, description: 'Balance threshold trigger' },
      { name: 'schedule', type: 'number', required: true, description: 'Execution schedule in seconds' },
    ],
    example: `// Create auto top-up rule
const response = await fetch('/api/rules', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    isTopup: true,
    token: '0x0000000000000000000000000000000000000000',
    recipient: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
    amount: '0.5',
    threshold: '0.1',
    schedule: 86400
  })
});

const result = await response.json();
console.log('Rule created:', result.ruleId);`,
  },
  {
    method: 'GET',
    endpoint: '/api/rules',
    description: 'Get all automation rules for a user',
    parameters: [
      { name: 'user', type: 'string', required: true, description: 'User wallet address' },
      { name: 'active', type: 'boolean', required: false, description: 'Filter by active status' },
    ],
    example: `// Get user rules
const response = await fetch('/api/rules?user=0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8&active=true', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const rules = await response.json();
console.log('User rules:', rules);`,
  },
  {
    method: 'PUT',
    endpoint: '/api/rules/{ruleId}',
    description: 'Update an existing automation rule',
    parameters: [
      { name: 'isActive', type: 'boolean', required: false, description: 'Rule active status' },
      { name: 'amount', type: 'string', required: false, description: 'Updated amount' },
      { name: 'threshold', type: 'string', required: false, description: 'Updated threshold' },
    ],
    example: `// Update rule
const response = await fetch('/api/rules/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    isActive: false,
    amount: '1.0'
  })
});

const result = await response.json();
console.log('Rule updated:', result);`,
  },
  {
    method: 'DELETE',
    endpoint: '/api/rules/{ruleId}',
    description: 'Delete an automation rule',
    parameters: [],
    example: `// Delete rule
const response = await fetch('/api/rules/123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const result = await response.json();
console.log('Rule deleted:', result.success);`,
  },
  {
    method: 'GET',
    endpoint: '/api/transactions',
    description: 'Get transaction history',
    parameters: [
      { name: 'user', type: 'string', required: true, description: 'User wallet address' },
      { name: 'limit', type: 'number', required: false, description: 'Number of transactions to return' },
      { name: 'offset', type: 'number', required: false, description: 'Number of transactions to skip' },
    ],
    example: `// Get transaction history
const response = await fetch('/api/transactions?user=0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8&limit=10', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const transactions = await response.json();
console.log('Transaction history:', transactions);`,
  },
];

const sdkExamples = [
  {
    title: 'JavaScript/TypeScript SDK',
    description: 'Use the Tevra SDK in your JavaScript applications',
    code: `import { TevraSDK } from '@tevra/sdk';

// Initialize SDK
const tevra = new TevraSDK({
  contractAddress: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
  chainId: 1,
  apiKey: 'your_api_key'
});

// Create a rule
const rule = await tevra.createRule({
  isTopup: true,
  token: '0x0000000000000000000000000000000000000000',
  recipient: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
  amount: '0.5',
  threshold: '0.1',
  schedule: 86400
});

// Listen to events
tevra.on('AutoTopupExecuted', (event) => {
  console.log('Top-up executed:', event);
});

// Get user rules
const rules = await tevra.getUserRules('0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8');

// Update rule
await tevra.updateRule(rule.id, { isActive: false });

// Delete rule
await tevra.deleteRule(rule.id);`,
  },
  {
    title: 'Python SDK',
    description: 'Use the Tevra SDK in your Python applications',
    code: `from tevra_sdk import TevraSDK

# Initialize SDK
tevra = TevraSDK(
    contract_address="0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8",
    chain_id=1,
    api_key="your_api_key"
)

# Create a rule
rule = tevra.create_rule({
    "isTopup": True,
    "token": "0x0000000000000000000000000000000000000000",
    "recipient": "0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8",
    "amount": "0.5",
    "threshold": "0.1",
    "schedule": 86400
})

# Get user rules
rules = tevra.get_user_rules("0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8")

# Update rule
tevra.update_rule(rule.id, {"isActive": False})

# Delete rule
tevra.delete_rule(rule.id)`,
  },
];

export default function APIReference() {
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
        <title>API Reference - Tevra Documentation</title>
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
                    API Reference
                  </h1>
                  <p className="text-xl text-gray-300">
                    Complete API documentation for integrating with Tevra's automation platform.
                  </p>
                </div>

                {/* Authentication */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Authentication</h2>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
                    <p className="text-gray-300 mb-4">
                      All API requests require authentication using an API key. Include your API key in the Authorization header:
                    </p>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <code className="text-gray-300 text-sm">Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                    <p className="text-gray-300 mt-4 text-sm">
                      You can generate API keys in your account settings. Keep your API keys secure and never share them publicly.
                    </p>
                  </div>
                </section>

                {/* API Endpoints */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">API Endpoints</h2>
                  <div className="space-y-8">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <span className={`px-2 py-1 rounded text-sm font-medium mr-3 ${
                                endpoint.method === 'GET' ? 'bg-green-900 text-green-300' :
                                endpoint.method === 'POST' ? 'bg-blue-900 text-blue-300' :
                                endpoint.method === 'PUT' ? 'bg-yellow-900 text-yellow-300' :
                                'bg-red-900 text-red-300'
                              }`}>
                                {endpoint.method}
                              </span>
                              <code className="text-white font-mono">{endpoint.endpoint}</code>
                            </div>
                            <p className="text-gray-300 mb-4">
                              {endpoint.description}
                            </p>
                            
                            {endpoint.parameters.length > 0 && (
                              <div className="mb-4">
                                <h4 className="text-sm font-medium text-white mb-2">Parameters</h4>
                                <div className="space-y-2">
                                  {endpoint.parameters.map((param, paramIndex) => (
                                    <div key={paramIndex} className="flex items-start text-sm">
                                      <div className="flex items-center mr-3">
                                        <code className="text-blue-300 mr-2">{param.name}</code>
                                        <span className="text-gray-400">({param.type})</span>
                                        {param.required && <span className="text-red-400 ml-2">*</span>}
                                      </div>
                                      <span className="text-gray-300">{param.description}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => copyCode(endpoint.example, index)}
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
                          <code className="text-gray-300 text-sm">{endpoint.example}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>

                {/* SDK Examples */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">SDK Examples</h2>
                  <div className="space-y-8">
                    {sdkExamples.map((sdk, index) => (
                      <div key={index} className="card">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {sdk.title}
                            </h3>
                            <p className="text-gray-300">
                              {sdk.description}
                            </p>
                          </div>
                          <button
                            onClick={() => copyCode(sdk.code, index + apiEndpoints.length)}
                            className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            {copiedCode === index + apiEndpoints.length ? (
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
                          <code className="text-gray-300 text-sm">{sdk.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Error Handling */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Error Handling</h2>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">Error Responses</h3>
                    <p className="text-gray-300 mb-4">
                      The API uses standard HTTP status codes and returns JSON error responses:
                    </p>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                      <code className="text-gray-300 text-sm">{`{
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid token address",
    "details": {
      "field": "token",
      "value": "invalid_address"
    }
  }
}`}</code>
                    </pre>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Common Error Codes</h4>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• <code className="bg-gray-800 px-1 rounded">400</code> Bad Request</li>
                          <li>• <code className="bg-gray-800 px-1 rounded">401</code> Unauthorized</li>
                          <li>• <code className="bg-gray-800 px-1 rounded">403</code> Forbidden</li>
                          <li>• <code className="bg-gray-800 px-1 rounded">404</code> Not Found</li>
                          <li>• <code className="bg-gray-800 px-1 rounded">429</code> Rate Limited</li>
                          <li>• <code className="bg-gray-800 px-1 rounded">500</code> Server Error</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Rate Limiting</h4>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• 1000 requests per hour</li>
                          <li>• 100 requests per minute</li>
                          <li>• Rate limit headers included</li>
                          <li>• Exponential backoff recommended</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Webhooks */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Webhooks</h2>
                  <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">Event Notifications</h3>
                    <p className="text-gray-300 mb-4">
                      Configure webhooks to receive real-time notifications about automation events:
                    </p>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                      <code className="text-gray-300 text-sm">{`// Webhook payload example
{
  "event": "rule.executed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "ruleId": "123",
    "type": "topup",
    "amount": "0.5",
    "token": "ETH",
    "recipient": "0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8",
    "success": true,
    "transactionHash": "0x1234...5678"
  }
}`}</code>
                    </pre>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Available Events</h4>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• <code className="bg-gray-800 px-1 rounded">rule.created</code></li>
                          <li>• <code className="bg-gray-800 px-1 rounded">rule.updated</code></li>
                          <li>• <code className="bg-gray-800 px-1 rounded">rule.deleted</code></li>
                          <li>• <code className="bg-gray-800 px-1 rounded">rule.executed</code></li>
                          <li>• <code className="bg-gray-800 px-1 rounded">rule.failed</code></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-white mb-2">Security</h4>
                        <ul className="space-y-1 text-sm text-gray-300">
                          <li>• HMAC signature verification</li>
                          <li>• Timestamp validation</li>
                          <li>• Retry mechanism</li>
                          <li>• Idempotency keys</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Next Steps */}
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Next Steps</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link href="/docs/faq" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">FAQ & Troubleshooting</h3>
                          <p className="text-gray-400 text-sm">
                            Find answers to common API questions and integration issues.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </Link>

                    <a href="https://github.com/tevra" className="card hover:border-blue-500 transition-colors group">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">GitHub Repository</h3>
                          <p className="text-gray-400 text-sm">
                            View source code, examples, and contribute to the project.
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    </a>
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
