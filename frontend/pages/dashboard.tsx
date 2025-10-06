import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  Wallet, 
  Bot, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Activity,
  DollarSign
} from 'lucide-react';

export default function Dashboard() {
  const mockWalletBalances = [
    {
      token: 'ETH',
      symbol: 'ETH',
      balance: '2.5',
      usdValue: '5000.00',
    },
    {
      token: 'USDC',
      symbol: 'USDC',
      balance: '1,250.50',
      usdValue: '1,250.50',
    },
    {
      token: 'USDT',
      symbol: 'USDT',
      balance: '850.75',
      usdValue: '850.75',
    },
  ];

  const mockBotStatus = {
    isActive: true,
    lastAction: 'Auto top-up executed 2 hours ago',
    nextScheduledAction: 'Next check in 22 hours',
    totalRules: 3,
    activeRules: 3,
  };

  return (
    <>
      <Head>
        <title>Dashboard - Tevra</title>
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
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Demo Mode</span>
                <button className="btn-primary">Connect Wallet</button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-400">
              Welcome to Tevra Web3 Automation Bot
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Balance</p>
                  <p className="text-2xl font-bold text-white">
                    $7,101.25
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Rules</p>
                  <p className="text-2xl font-bold text-white">{mockBotStatus.activeRules}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Bot Status</p>
                  <p className={`text-lg font-semibold ${mockBotStatus.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {mockBotStatus.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${mockBotStatus.isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                  {mockBotStatus.isActive ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">99.9%</p>
                </div>
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Wallet Balances */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Wallet Balances</h2>
                <Wallet className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {mockWalletBalances.map((balance, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {balance.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{balance.symbol}</p>
                        <p className="text-gray-400 text-sm">{balance.balance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${balance.usdValue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot Status */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Bot Status</h2>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mockBotStatus.isActive 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-red-900 text-red-300'
                  }`}>
                    {mockBotStatus.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Rules</span>
                  <span className="text-white font-medium">{mockBotStatus.totalRules}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Rules</span>
                  <span className="text-white font-medium">{mockBotStatus.activeRules}</span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Last Action</span>
                  </div>
                  <p className="text-white text-sm">{mockBotStatus.lastAction}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Next Scheduled</span>
                  </div>
                  <p className="text-white text-sm">{mockBotStatus.nextScheduledAction}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    type: 'Auto Top-up',
                    amount: '0.5 ETH',
                    recipient: '0x742d...C8C8',
                    timestamp: '2 hours ago',
                    status: 'success',
                  },
                  {
                    type: 'Auto Withdraw',
                    amount: '100 USDC',
                    recipient: '0x1234...7890',
                    timestamp: '1 day ago',
                    status: 'success',
                  },
                  {
                    type: 'Rule Created',
                    amount: 'Daily Schedule',
                    recipient: 'Auto Top-up',
                    timestamp: '3 days ago',
                    status: 'success',
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <p className="text-white font-medium">{activity.type}</p>
                        <p className="text-gray-400 text-sm">
                          {activity.amount} to {activity.recipient}
                        </p>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/topup" className="p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">+</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Create Top-up Rule</h3>
                      <p className="text-blue-200 text-sm">Automatically add funds</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/withdraw" className="p-4 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">-</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Create Withdraw Rule</h3>
                      <p className="text-green-200 text-sm">Automatically remove funds</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/rules" className="p-4 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">Manage Rules</h3>
                      <p className="text-purple-200 text-sm">View and edit automation</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}