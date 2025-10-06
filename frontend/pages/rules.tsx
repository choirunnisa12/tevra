import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useAccount } from 'wagmi';
import { useUserRuleCount, useUserRule, useCreateRule } from '@/hooks/useContract';
import { TOKENS, SCHEDULE_OPTIONS } from '@/lib/constants';
import { formatAddress, formatDate, getScheduleLabel } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Bot,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AutomationRule {
  id: number;
  isTopup: boolean;
  isActive: boolean;
  token: string;
  recipient: string;
  amount: string;
  threshold: string;
  maxBalance: string;
  schedule: number;
  lastExecuted: number;
  nextExecution: number;
  minPrice: string;
  maxPrice: string;
}

export default function RulesPage() {
  const { address, isConnected } = useAccount();
  const { data: ruleCount } = useUserRuleCount();
  const { write: createRule, isLoading: isCreatingRule } = useCreateRule();
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);

  // Mock rules data - in production, this would come from your contract
  const mockRules: AutomationRule[] = [
    {
      id: 0,
      isTopup: true,
      isActive: true,
      token: '0x0000000000000000000000000000000000000000',
      recipient: '0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8',
      amount: '0.5',
      threshold: '0.1',
      maxBalance: '2.0',
      schedule: 86400, // Daily
      lastExecuted: Date.now() - 3600000, // 1 hour ago
      nextExecution: Date.now() + 82800000, // 23 hours from now
      minPrice: '1800',
      maxPrice: '2200',
    },
    {
      id: 1,
      isTopup: false,
      isActive: true,
      token: '0x1234567890123456789012345678901234567890',
      recipient: '0x1234567890123456789012345678901234567890',
      amount: '100',
      threshold: '500',
      maxBalance: '1000',
      schedule: 604800, // Weekly
      lastExecuted: Date.now() - 86400000, // 1 day ago
      nextExecution: Date.now() + 518400000, // 6 days from now
      minPrice: '0.99',
      maxPrice: '1.01',
    },
  ];

  useEffect(() => {
    const loadRules = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRules(mockRules);
      setLoading(false);
    };

    if (isConnected) {
      loadRules();
    }
  }, [isConnected, ruleCount]);

  const getTokenInfo = (tokenAddress: string) => {
    return TOKENS.find(token => token.address === tokenAddress) || {
      symbol: 'UNKNOWN',
      name: 'Unknown Token',
      decimals: 18,
    };
  };

  const toggleRuleStatus = async (ruleId: number) => {
    try {
      // In production, call the contract function to update rule status
      setRules(prev => prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, isActive: !rule.isActive }
          : rule
      ));
      
      toast.success(`Rule ${rules.find(r => r.id === ruleId)?.isActive ? 'paused' : 'activated'}`);
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast.error('Failed to update rule status');
    }
  };

  const deleteRule = async (ruleId: number) => {
    if (!confirm('Are you sure you want to delete this rule?')) {
      return;
    }

    try {
      // In production, call the contract function to delete rule
      setRules(prev => prev.filter(rule => rule.id !== ruleId));
      toast.success('Rule deleted successfully');
    } catch (error) {
      console.error('Error deleting rule:', error);
      toast.error('Failed to delete rule');
    }
  };

  const createNewRule = async (ruleData: Partial<AutomationRule>) => {
    try {
      // In production, call the contract function to create rule
      const newRule: AutomationRule = {
        id: rules.length,
        isTopup: ruleData.isTopup || false,
        isActive: true,
        token: ruleData.token || TOKENS[0].address,
        recipient: ruleData.recipient || '',
        amount: ruleData.amount || '0',
        threshold: ruleData.threshold || '0',
        maxBalance: ruleData.maxBalance || '0',
        schedule: ruleData.schedule || 86400,
        lastExecuted: 0,
        nextExecution: Date.now() + (ruleData.schedule || 86400) * 1000,
        minPrice: ruleData.minPrice || '0',
        maxPrice: ruleData.maxPrice || '0',
      };

      setRules(prev => [...prev, newRule]);
      setShowCreateForm(false);
      toast.success('Rule created successfully');
    } catch (error) {
      console.error('Error creating rule:', error);
      toast.error('Failed to create rule');
    }
  };

  if (!isConnected) {
    return (
      <>
        <Head>
          <title>Rules & Settings - Tevra</title>
        </Head>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400">
                Connect your wallet to manage your automation rules.
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
        <title>Rules & Settings - Tevra</title>
      </Head>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Rules & Settings
                </h1>
                <p className="text-gray-400">
                  Manage your automation rules and bot configuration.
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Rule
              </button>
            </div>
          </div>

          {/* Bot Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Rules</p>
                  <p className="text-2xl font-bold text-white">{rules.length}</p>
                </div>
                <Bot className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Rules</p>
                  <p className="text-2xl font-bold text-white">
                    {rules.filter(rule => rule.isActive).length}
                  </p>
                </div>
                <Play className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Paused Rules</p>
                  <p className="text-2xl font-bold text-white">
                    {rules.filter(rule => !rule.isActive).length}
                  </p>
                </div>
                <Pause className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">99.9%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Rules List */}
          <div className="card">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-400">Loading rules...</span>
              </div>
            ) : rules.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  No automation rules found
                </h3>
                <p className="text-gray-400 mb-6">
                  Create your first automation rule to get started
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary flex items-center mx-auto"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Your First Rule
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {rules.map((rule) => {
                  const tokenInfo = getTokenInfo(rule.token);
                  return (
                    <div key={rule.id} className="border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${rule.isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
                          <h3 className="text-lg font-semibold text-white">
                            {rule.isTopup ? 'Auto Top-up' : 'Auto Withdraw'} - {tokenInfo.symbol}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rule.isActive 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-gray-900 text-gray-300'
                          }`}>
                            {rule.isActive ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => toggleRuleStatus(rule.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              rule.isActive 
                                ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                                : 'bg-green-600 hover:bg-green-700 text-white'
                            }`}
                          >
                            {rule.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => setEditingRule(rule)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteRule(rule.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Amount</p>
                          <p className="text-white font-medium">{rule.amount} {tokenInfo.symbol}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Threshold</p>
                          <p className="text-white font-medium">{rule.threshold} {tokenInfo.symbol}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Schedule</p>
                          <p className="text-white font-medium">{getScheduleLabel(rule.schedule)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Recipient</p>
                          <p className="text-white font-medium">{formatAddress(rule.recipient)}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <p className="text-gray-400">Price Range</p>
                          <p className="text-white font-medium">
                            ${rule.minPrice} - ${rule.maxPrice}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Next Execution</p>
                          <p className="text-white font-medium">
                            {rule.nextExecution > 0 ? formatDate(rule.nextExecution / 1000) : 'Not scheduled'}
                          </p>
                        </div>
                      </div>
                      
                      {rule.lastExecuted > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <p className="text-gray-400 text-sm">Last Executed</p>
                          <p className="text-white text-sm">{formatDate(rule.lastExecuted / 1000)}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Create Rule Modal */}
          {showCreateForm && (
            <CreateRuleModal
              onClose={() => setShowCreateForm(false)}
              onSubmit={createNewRule}
            />
          )}

          {/* Edit Rule Modal */}
          {editingRule && (
            <EditRuleModal
              rule={editingRule}
              onClose={() => setEditingRule(null)}
              onSubmit={(updatedRule) => {
                setRules(prev => prev.map(rule => 
                  rule.id === updatedRule.id ? updatedRule : rule
                ));
                setEditingRule(null);
                toast.success('Rule updated successfully');
              }}
            />
          )}
        </div>
      </Layout>
    </>
  );
}

// Create Rule Modal Component
function CreateRuleModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (rule: Partial<AutomationRule>) => void }) {
  const [formData, setFormData] = useState({
    isTopup: true,
    token: TOKENS[0].address,
    recipient: '',
    amount: '',
    threshold: '',
    maxBalance: '',
    schedule: 86400,
    minPrice: '',
    maxPrice: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Rule</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rule Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Rule Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isTopup"
                  checked={formData.isTopup}
                  onChange={(e) => setFormData(prev => ({ ...prev, isTopup: true }))}
                  className="mr-2"
                />
                <span className="text-white">Auto Top-up</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="isTopup"
                  checked={!formData.isTopup}
                  onChange={(e) => setFormData(prev => ({ ...prev, isTopup: false }))}
                  className="mr-2"
                />
                <span className="text-white">Auto Withdraw</span>
              </label>
            </div>
          </div>

          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Recipient Address</label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
              className="input-field"
              placeholder="0x..."
              required
            />
          </div>

          {/* Token */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Token</label>
            <select
              value={formData.token}
              onChange={(e) => setFormData(prev => ({ ...prev, token: e.target.value }))}
              className="input-field"
            >
              {TOKENS.map((token) => (
                <option key={token.address} value={token.address}>
                  {token.symbol} - {token.name}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
            <input
              type="number"
              step="0.000001"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="input-field"
              placeholder="0.0"
              required
            />
          </div>

          {/* Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Threshold</label>
            <input
              type="number"
              step="0.000001"
              value={formData.threshold}
              onChange={(e) => setFormData(prev => ({ ...prev, threshold: e.target.value }))}
              className="input-field"
              placeholder="0.0"
              required
            />
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Schedule</label>
            <select
              value={formData.schedule}
              onChange={(e) => setFormData(prev => ({ ...prev, schedule: parseInt(e.target.value) }))}
              className="input-field"
            >
              {SCHEDULE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={formData.minPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))}
                className="input-field"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={formData.maxPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="input-field"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              Create Rule
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Edit Rule Modal Component
function EditRuleModal({ 
  rule, 
  onClose, 
  onSubmit 
}: { 
  rule: AutomationRule; 
  onClose: () => void; 
  onSubmit: (rule: AutomationRule) => void;
}) {
  const [formData, setFormData] = useState({
    isActive: rule.isActive,
    amount: rule.amount,
    threshold: rule.threshold,
    maxBalance: rule.maxBalance,
    schedule: rule.schedule,
    minPrice: rule.minPrice,
    maxPrice: rule.maxPrice,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...rule,
      ...formData,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Rule</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Active Status */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-white">Rule is active</span>
            </label>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
            <input
              type="number"
              step="0.000001"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          {/* Threshold */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Threshold</label>
            <input
              type="number"
              step="0.000001"
              value={formData.threshold}
              onChange={(e) => setFormData(prev => ({ ...prev, threshold: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          {/* Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Schedule</label>
            <select
              value={formData.schedule}
              onChange={(e) => setFormData(prev => ({ ...prev, schedule: parseInt(e.target.value) }))}
              className="input-field"
            >
              {SCHEDULE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={formData.minPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Max Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={formData.maxPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              Update Rule
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
