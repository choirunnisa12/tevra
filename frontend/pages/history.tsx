import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useAccount } from 'wagmi';
import { formatAddress, formatDate } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { 
  History, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ExternalLink,
  Filter,
  Search,
  Download,
  RefreshCw
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'topup' | 'withdraw' | 'rule_created' | 'rule_updated';
  amount: string;
  token: string;
  recipient: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: number;
  txHash?: string;
  gasUsed?: string;
  gasPrice?: string;
}

export default function HistoryPage() {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed' | 'pending'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'topup' | 'withdraw' | 'rule_created' | 'rule_updated'>('all');

  // Mock transaction data - in production, this would come from your backend or contract events
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'topup',
      amount: '0.5',
      token: 'ETH',
      recipient: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
      status: 'success',
      timestamp: Date.now() - 3600000, // 1 hour ago
      txHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      gasUsed: '21000',
      gasPrice: '20000000000',
    },
    {
      id: '2',
      type: 'withdraw',
      amount: '100',
      token: 'USDC',
      recipient: '0x1234567890123456789012345678901234567890',
      status: 'success',
      timestamp: Date.now() - 86400000, // 1 day ago
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      gasUsed: '65000',
      gasPrice: '25000000000',
    },
    {
      id: '3',
      type: 'rule_created',
      amount: '0',
      token: 'ETH',
      recipient: 'Auto Top-up Rule',
      status: 'success',
      timestamp: Date.now() - 259200000, // 3 days ago
      txHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      gasUsed: '150000',
      gasPrice: '18000000000',
    },
    {
      id: '4',
      type: 'topup',
      amount: '0.2',
      token: 'ETH',
      recipient: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
      status: 'failed',
      timestamp: Date.now() - 432000000, // 5 days ago
      txHash: '0xfedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210',
      gasUsed: '0',
      gasPrice: '22000000000',
    },
    {
      id: '5',
      type: 'withdraw',
      amount: '50',
      token: 'USDT',
      recipient: '0x0987654321098765432109876543210987654321',
      status: 'pending',
      timestamp: Date.now() - 600000, // 10 minutes ago
    },
  ];

  useEffect(() => {
    // Simulate loading transactions
    const loadTransactions = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTransactions(mockTransactions);
      setFilteredTransactions(mockTransactions);
      setLoading(false);
    };

    if (isConnected) {
      loadTransactions();
    }
  }, [isConnected]);

  useEffect(() => {
    // Filter transactions based on search term and filters
    let filtered = transactions;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(tx => tx.type === typeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.amount.includes(searchTerm) ||
        (tx.txHash && tx.txHash.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter, typeFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-900 text-green-300';
      case 'failed':
        return 'bg-red-900 text-red-300';
      case 'pending':
        return 'bg-yellow-900 text-yellow-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'topup':
        return 'Auto Top-up';
      case 'withdraw':
        return 'Auto Withdraw';
      case 'rule_created':
        return 'Rule Created';
      case 'rule_updated':
        return 'Rule Updated';
      default:
        return type;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const exportHistory = () => {
    const csvContent = [
      ['Type', 'Amount', 'Token', 'Recipient', 'Status', 'Timestamp', 'Tx Hash'],
      ...filteredTransactions.map(tx => [
        getTypeLabel(tx.type),
        tx.amount,
        tx.token,
        tx.recipient,
        tx.status,
        formatDate(tx.timestamp / 1000),
        tx.txHash || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tevra-transaction-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Transaction history exported');
  };

  const refreshTransactions = async () => {
    setLoading(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast.success('Transactions refreshed');
  };

  if (!isConnected) {
    return (
      <>
        <Head>
          <title>Transaction History - Tevra</title>
        </Head>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400">
                Connect your wallet to view your transaction history.
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
        <title>Transaction History - Tevra</title>
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Transaction History
                </h1>
                <p className="text-gray-400">
                  View all your bot transactions and automation activities.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={refreshTransactions}
                  disabled={loading}
                  className="btn-secondary flex items-center"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={exportHistory}
                  className="btn-secondary flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="input-field"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                  className="input-field"
                >
                  <option value="all">All Types</option>
                  <option value="topup">Auto Top-up</option>
                  <option value="withdraw">Auto Withdraw</option>
                  <option value="rule_created">Rule Created</option>
                  <option value="rule_updated">Rule Updated</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="flex items-center text-gray-400">
                <Filter className="w-4 h-4 mr-2" />
                {filteredTransactions.length} transactions
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="card">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-400">Loading transactions...</span>
              </div>
            ) : filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  No transactions found
                </h3>
                <p className="text-gray-400">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : 'Your transaction history will appear here'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Amount</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Recipient</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Timestamp</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(tx.status)}
                            <span className="text-white font-medium">
                              {getTypeLabel(tx.type)}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">
                            {tx.amount} {tx.token}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => copyToClipboard(tx.recipient)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            {formatAddress(tx.recipient)}
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {formatDate(tx.timestamp / 1000)}
                        </td>
                        <td className="py-4 px-4">
                          {tx.txHash ? (
                            <button
                              onClick={() => window.open(`https://etherscan.io/tx/${tx.txHash}`, '_blank')}
                              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              View
                            </button>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
