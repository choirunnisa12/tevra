import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { 
  Zap, 
  Shield, 
  Clock, 
  Bell, 
  ArrowRight, 
  Bot,
  TrendingUp,
  Settings
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Auto Top-up',
      description: 'Automatically top up your wallets when balances fall below your threshold.',
    },
    {
      icon: Shield,
      title: 'Auto Withdraw',
      description: 'Secure automated withdrawals based on your predefined conditions.',
    },
    {
      icon: Bot,
      title: 'Bot Automation',
      description: 'Powered by Chainlink Keepers and Gelato for reliable execution.',
    },
    {
      icon: Bell,
      title: 'Real-time Notifications',
      description: 'Get instant notifications for all bot activities and status updates.',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '1,234' },
    { label: 'Transactions', value: '45,678' },
    { label: 'Success Rate', value: '99.9%' },
    { label: 'Gas Saved', value: '2,345 ETH' },
  ];

  return (
    <>
      <Head>
        <title>Tevra - Web3 Automation Bot</title>
        <meta name="description" content="Automate your Web3 transactions with Tevra's intelligent bot system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900">
        {/* Simple Header */}
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
        
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Automate Your{' '}
                <span className="gradient-text">Web3</span>
                <br />
                Transactions
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Tevra is the ultimate automation bot for Web3. Set up smart rules for auto top-ups, 
                withdrawals, and more. Never worry about manual transactions again.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/dashboard" className="btn-primary inline-flex items-center">
                  Launch App
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link href="/docs" className="btn-secondary inline-flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Everything you need to automate your Web3 transactions with confidence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-blue-100">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Get started with Tevra in just a few simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Connect Wallet
                </h3>
                <p className="text-gray-300">
                  Connect your Web3 wallet to get started with Tevra
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Set Rules
                </h3>
                <p className="text-gray-300">
                  Configure your automation rules and thresholds
                </p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Automate
                </h3>
                <p className="text-gray-300">
                  Let Tevra handle your transactions automatically
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Automate Your Web3?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who trust Tevra with their automation needs
            </p>
            <Link href="/dashboard" className="btn-primary inline-flex items-center text-lg">
              <Bot className="w-6 h-6 mr-2" />
              Launch Tevra Bot
              <ArrowRight className="w-6 h-6 ml-2" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold gradient-text">Tevra</span>
              </div>
              
              <div className="flex space-x-6">
                <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
                  Documentation
                </Link>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                © 2024 Tevra. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
