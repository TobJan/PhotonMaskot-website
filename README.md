# Solana Memecoin Claim Website

A modern web application for claiming memecoin tokens on the Solana blockchain.

## Features

- Connect Solana wallet (Phantom, Solflare, etc.)
- Check eligibility for token claims
- Claim memecoin tokens
- View claim history
- Modern UI with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_SOLANA_NETWORK=devnet  # or mainnet-beta for production
REACT_APP_TOKEN_MINT_ADDRESS=your_token_mint_address
```

## Security

- Never share your private keys
- Always verify transaction details before signing
- Use environment variables for sensitive data

## License

MIT 