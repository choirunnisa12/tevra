import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useAccount, useBalance } from 'wagmi';
import { useUserRuleCount, useUserRule } from '@/hooks/useContract';
import { TOKENS } from '@/lib/constants';
import { formatBalance, formatAddress, formatDate } from '@/lib/utils';
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

interface BotStatus {
  isActive: boolean;
  lastAction: string;
  nextScheduledAction: string;
  totalRules: number;
  activeRules: number;
}

interface WalletBalance {
  token: string;
  symbol: string;
  balance: string;
  usdValue: string;
}

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const { data: ruleCount } = useUserRuleCount();
  const [botStatus, setBotStatus] = useState<BotStatus>({
    isActive: false,
    lastAction: 'No recent actions',
    nextScheduledAction: 'No scheduled actions',
    totalRules: 0,
    activeRules: 0,
  });
  const [walletBalances, setWalletBalances] = useState<WalletBalance[]>([]);

  // Get ETH balance
  const { data: ethBalance } = useBalance({
    address,
    enabled: !!address,
  });

  useEffect(() => {
    if (ruleCount) {
      setBotStatus(prev => ({
        ...prev,
        totalRules: Number(ruleCount),
        activeRules: Number(ruleCount), // Simplified - in production, check each rule's status
        isActive: Number(ruleCount) > 0,
      }));
    }
  }, [ruleCount]);

  useEffect(() => {
    if (ethBalance && address) {
      const balances: WalletBalance[] = [
        {
          token: 'ETH',
          symbol: 'ETH',
          balance: formatBalance(ethBalance.value, 18),
          usdValue: (parseFloat(formatBalance(ethBalance.value, 18)) * 2000).toFixed(2), // Mock USD price
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
      setWalletBalances(balances);
    }
  }, [ethBalance, address]);

  if (!isConnected) {
    return (
      <>
        <Head>
          <title>Dashboard - Tevra</title>
        </Head>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 mb-6">
                Connect your wallet to view your dashboard and manage your automation rules.
              </p>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - Tevra</title>
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back!
            </h1>
            <p className="text-gray-400">
              Connected as {formatAddress(address!)}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Balance</p>
                  <p className="text-2xl font-bold text-white">
                    ${walletBalances.reduce((sum, balance) => sum + parseFloat(balance.usdValue.replace(',', '')), 0).toFixed(2)}
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
                  <p className="text-2xl font-bold text-white">{botStatus.activeRules}</p>
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
                  <p className={`text-lg font-semibold ${botStatus.isActive ? 'text-green-400' : 'text-red-400'}`}>
                    {botStatus.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${botStatus.isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                  {botStatus.isActive ? (
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
                {walletBalances.map((balance, index) => (
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
                    botStatus.isActive 
                      ? 'bg-green-900 text-green-300' 
                      : 'bg-red-900 text-red-300'
                  }`}>
                    {botStatus.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Total Rules</span>
                  <span className="text-white font-medium">{botStatus.totalRules}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Active Rules</span>
                  <span className="text-white font-medium">{botStatus.activeRules}</span>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Last Action</span>
                  </div>
                  <p className="text-white text-sm">{botStatus.lastAction}</p>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">Next Scheduled</span>
                  </div>
                  <p className="text-white text-sm">{botStatus.nextScheduledAction}</p>
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
        </div>
      </Layout>
    </>
  );
}
