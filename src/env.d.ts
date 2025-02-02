declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_SOLANA_NETWORK: 'devnet' | 'testnet' | 'mainnet-beta';
    REACT_APP_TOKEN_MINT_ADDRESS: string;
  }
} 