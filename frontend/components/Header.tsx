import React from 'react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      "bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold gradient-text">Tevra</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              href="/topup" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Top-up
            </Link>
            <Link 
              href="/withdraw" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Withdraw
            </Link>
            <Link 
              href="/history" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              History
            </Link>
            <Link 
              href="/rules" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Rules
            </Link>
            <Link 
              href="/docs" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Docs
            </Link>
          </nav>

          {/* Wallet Connect */}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}
