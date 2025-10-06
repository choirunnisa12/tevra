import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { useAccount } from 'wagmi';
import { useCreateRule } from '@/hooks/useContract';
import { TOKENS, SCHEDULE_OPTIONS, DEFAULT_FORM_VALUES } from '@/lib/constants';
import { parseBalance, formatBalance } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  Wallet, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface TopupFormData {
  recipient: string;
  token: string;
  amount: string;
  threshold: string;
  maxBalance: string;
  schedule: number;
  minPrice: string;
  maxPrice: string;
}

export default function TopupPage() {
  const { address, isConnected } = useAccount();
  const { write: createRule, isLoading, error } = useCreateRule();
  const [formData, setFormData] = useState<TopupFormData>({
    recipient: '',
    token: DEFAULT_FORM_VALUES.token,
    amount: '',
    threshold: '',
    maxBalance: '',
    schedule: DEFAULT_FORM_VALUES.schedule,
    minPrice: '',
    maxPrice: '',
  });

  const handleInputChange = (field: keyof TopupFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.recipient) {
      toast.error('Please enter recipient address');
      return false;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return false;
    }
    if (!formData.threshold || parseFloat(formData.threshold) <= 0) {
      toast.error('Please enter a valid threshold');
      return false;
    }
    if (!formData.maxBalance || parseFloat(formData.maxBalance) <= 0) {
      toast.error('Please enter a valid max balance');
      return false;
    }
    if (!formData.minPrice || parseFloat(formData.minPrice) <= 0) {
      toast.error('Please enter a valid minimum price');
      return false;
    }
    if (!formData.maxPrice || parseFloat(formData.maxPrice) <= 0) {
      toast.error('Please enter a valid maximum price');
      return false;
    }
    if (parseFloat(formData.minPrice) >= parseFloat(formData.maxPrice)) {
      toast.error('Minimum price must be less than maximum price');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const selectedToken = TOKENS.find(token => token.address === formData.token);
      if (!selectedToken) {
        toast.error('Invalid token selected');
        return;
      }

      // Convert amounts to proper decimals
      const amount = parseBalance(formData.amount, selectedToken.decimals);
      const threshold = parseBalance(formData.threshold, selectedToken.decimals);
      const maxBalance = parseBalance(formData.maxBalance, selectedToken.decimals);
      const minPrice = parseBalance(formData.minPrice, 8); // Price in USD * 1e8
      const maxPrice = parseBalance(formData.maxPrice, 8);

      await createRule({
        args: [
          true, // isTopup
          formData.token,
          formData.recipient,
          amount,
          threshold,
          maxBalance,
          BigInt(formData.schedule),
          minPrice,
          maxPrice,
        ],
      });

      toast.success('Auto top-up rule created successfully!');
      
      // Reset form
      setFormData({
        recipient: '',
        token: DEFAULT_FORM_VALUES.token,
        amount: '',
        threshold: '',
        maxBalance: '',
        schedule: DEFAULT_FORM_VALUES.schedule,
        minPrice: '',
        maxPrice: '',
      });
    } catch (err) {
      console.error('Error creating rule:', err);
      toast.error('Failed to create auto top-up rule');
    }
  };

  if (!isConnected) {
    return (
      <>
        <Head>
          <title>Auto Top-up - Tevra</title>
        </Head>
        <Layout>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-white mb-2">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400">
                Connect your wallet to create auto top-up rules.
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
        <title>Auto Top-up - Tevra</title>
      </Head>
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create Auto Top-up Rule
            </h1>
            <p className="text-gray-400">
              Set up automated top-ups when your balance falls below the threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="card">
                <div className="space-y-6">
                  {/* Recipient Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      value={formData.recipient}
                      onChange={(e) => handleInputChange('recipient', e.target.value)}
                      placeholder="0x742d35Cc6634C0532925a3b8D0b2f5C0b4C8C8C8"
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Token Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Token
                    </label>
                    <select
                      value={formData.token}
                      onChange={(e) => handleInputChange('token', e.target.value)}
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
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Top-up Amount
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={formData.amount}
                      onChange={(e) => handleInputChange('amount', e.target.value)}
                      placeholder="0.0"
                      className="input-field"
                      required
                    />
                  </div>

                  {/* Threshold */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Balance Threshold
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={formData.threshold}
                      onChange={(e) => handleInputChange('threshold', e.target.value)}
                      placeholder="0.0"
                      className="input-field"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Trigger top-up when balance falls below this amount
                    </p>
                  </div>

                  {/* Max Balance */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Maximum Balance
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      value={formData.maxBalance}
                      onChange={(e) => handleInputChange('maxBalance', e.target.value)}
                      placeholder="0.0"
                      className="input-field"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Stop top-ups when balance reaches this amount
                    </p>
                  </div>

                  {/* Schedule */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Schedule
                    </label>
                    <select
                      value={formData.schedule}
                      onChange={(e) => handleInputChange('schedule', parseInt(e.target.value))}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Minimum Price (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.minPrice}
                        onChange={(e) => handleInputChange('minPrice', e.target.value)}
                        placeholder="0.00"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Maximum Price (USD)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.maxPrice}
                        onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                        placeholder="0.00"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Rule...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Create Auto Top-up Rule
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Info Panel */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  How It Works
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>• Monitor your wallet balance continuously</p>
                  <p>• Automatically top-up when balance falls below threshold</p>
                  <p>• Respect price range conditions for execution</p>
                  <p>• Follow your specified schedule</p>
                  <p>• Stop when maximum balance is reached</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
                  Important Notes
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>• Ensure you have sufficient funds for top-ups</p>
                  <p>• Monitor gas prices for cost-effective execution</p>
                  <p>• Set realistic price ranges to avoid missed opportunities</p>
                  <p>• Test your rules with small amounts first</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-blue-400" />
                  Cost Estimation
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span>Gas Cost (per execution):</span>
                    <span className="text-white">~0.001 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bot Fee:</span>
                    <span className="text-white">0.1%</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700 pt-2">
                    <span className="font-medium">Total per execution:</span>
                    <span className="text-white font-medium">~$5-10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
