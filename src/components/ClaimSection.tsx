import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

const ClaimSection: React.FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isEligible, setIsEligible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [claimAmount, setClaimAmount] = useState<number>(0);
  const [lastClaimTime, setLastClaimTime] = useState<number>(0);
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'signing' | 'confirming' | 'success' | 'error'>('idle');

  const TOKEN_MINT_ADDRESS = process.env.REACT_APP_TOKEN_MINT_ADDRESS;
  if (!TOKEN_MINT_ADDRESS) {
    throw new Error('TOKEN_MINT_ADDRESS is not configured');
  }

  useEffect(() => {
    const checkEligibility = async () => {
      if (!publicKey) return;
      
      try {
        setLoading(true);
        // Here you would typically check against your backend or smart contract
        // This is a placeholder that always returns eligible
        setIsEligible(true);
        setClaimAmount(1000); // Example amount
      } catch (error) {
        console.error('Error checking eligibility:', error);
        setIsEligible(false);
      } finally {
        setLoading(false);
      }
    };

    checkEligibility();
  }, [publicKey]);

  const handleClaim = async () => {
    const now = Date.now();
    const COOLDOWN_PERIOD = 60000; // 1 minute

    if (now - lastClaimTime < COOLDOWN_PERIOD) {
      alert('Please wait before claiming again');
      return;
    }

    if (!publicKey) return;

    try {
      setLoading(true);
      setTransactionStatus('signing');
      
      // Add transaction timeout
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(TOKEN_MINT_ADDRESS),
          lamports: LAMPORTS_PER_SOL * 0.001,
        })
      );

      // Add retry logic
      const signature = await sendTransaction(transaction, connection);
      
      // Add more specific confirmation options
      const confirmation = await connection.confirmTransaction(signature, {
        maxRetries: 3,
        skipPreflight: false
      });

      if (confirmation.value.err) {
        throw new Error('Transaction failed');
      }

      setTransactionStatus('confirming');
      alert('Tokens claimed successfully!');
      setTransactionStatus('success');
    } catch (error) {
      console.error('Error claiming tokens:', error);
      // More specific error messages
      if (error instanceof Error) {
        alert(`Failed to claim tokens: ${error.message}`);
      } else {
        alert('Failed to claim tokens. Please try again.');
      }
      setTransactionStatus('error');
    } finally {
      setLoading(false);
      setLastClaimTime(now);
    }
  };

  if (!publicKey) {
    return (
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <p className="text-center text-gray-400">
          Please connect your wallet to check eligibility and claim tokens.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
      <h3 className="text-xl font-semibold mb-6 text-center">Token Claim Portal</h3>
      
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-300 mb-2">Wallet Address:</p>
            <p className="font-mono text-sm break-all bg-gray-700 p-2 rounded">
              {publicKey.toString()}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-gray-300 mb-2">Claim Status:</p>
            <p className={`font-semibold ${isEligible ? 'text-green-500' : 'text-red-500'}`}>
              {isEligible ? 'Eligible' : 'Not Eligible'}
            </p>
          </div>

          {isEligible && (
            <div className="mb-6">
              <p className="text-gray-300 mb-2">Available to Claim:</p>
              <p className="text-2xl font-bold text-purple-400">
                {claimAmount.toLocaleString()} MEME
              </p>
            </div>
          )}

          <button
            onClick={handleClaim}
            disabled={!isEligible || loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold ${
              isEligible && !loading
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            } transition-colors`}
          >
            {loading ? 'Processing...' : 'Claim Tokens'}
          </button>
        </>
      )}
    </div>
  );
};

export default ClaimSection; 