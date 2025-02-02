import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              MemeToken Claim
            </h1>
          </div>
          <nav className="flex items-center space-x-6">
            <a
              href="https://solscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Explorer
            </a>
            <WalletMultiButton />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 