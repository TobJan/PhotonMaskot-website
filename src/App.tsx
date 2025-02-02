import React, { useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import ClaimSection from './components/ClaimSection';
import Header from './components/Header';

require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  const network = (process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Devnet;
  if (process.env.NODE_ENV === 'production' && network !== WalletAdapterNetwork.Mainnet) {
    console.warn('Warning: Not running on mainnet');
  }

  const commitment = 'confirmed';
  const endpoint = useMemo(() => ({
    endpoint: clusterApiUrl(network),
    commitment
  }), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                  <h2 className="text-2xl font-bold mb-4 text-center">Connect Your Wallet</h2>
                  <WalletMultiButton className="mx-auto" />
                </div>
                <ClaimSection />
              </div>
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
