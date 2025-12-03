# MVI Launchpad DApp - Deployment & Integration Guide

## Overview

The Micro Ventures Initiative (MVI) Launchpad is a decentralized application (DApp) built with React, Express, tRPC, and Tailwind CSS. It enables users to discover vetted social ventures, connect their Web3 wallets, swap assets, and contribute to projects while receiving verifiable Impact Tokens.

## Project Architecture

### Technology Stack

- **Frontend:** React 19, Tailwind CSS 4, Wouter (routing)
- **Backend:** Express 4, tRPC 11, Drizzle ORM
- **Database:** MySQL/TiDB
- **Authentication:** Manus OAuth
- **Web3 Integration:** MetaMask/WalletConnect (to be implemented)

### Project Structure

```
mvi-launchpad/
├── client/                    # React frontend
│   ├── src/
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Landing page with project listing
│   │   │   ├── ProjectDetail.tsx  # Full project page
│   │   │   └── NotFound.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useWalletConnection.ts
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts
│   │   ├── lib/              # Utilities and libraries
│   │   ├── App.tsx           # Main app component with routing
│   │   └── main.tsx          # Entry point
│   └── public/               # Static assets
├── server/                   # Express backend
│   ├── db.ts                 # Database query helpers
│   ├── routers.ts            # tRPC procedure definitions
│   └── _core/                # Framework-level code
├── drizzle/                  # Database schema and migrations
│   ├── schema.ts             # Table definitions
│   └── migrations/           # SQL migration files
├── shared/                   # Shared types and constants
│   └── mvi-constants.ts      # MVI configuration
└── seed-db.mjs              # Database seeding script
```

## Database Schema

### Tables

#### `users`
Stores user information and authentication state.

#### `projects`
Stores MVI project information.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary key |
| `name` | VARCHAR(255) | Project name |
| `description` | TEXT | Project description |
| `status` | ENUM | "coming_soon", "live", or "completed" |
| `targetAmount` | INT | Target funding amount (in smallest unit) |
| `raisedAmount` | INT | Currently raised amount |
| `contributionTokenAddress` | VARCHAR(255) | Smart contract address for contribution token |
| `impactTokenAddress` | VARCHAR(255) | Smart contract address for Impact Token |
| `projectDetails` | TEXT | JSON string with projections and targets |
| `imageUrl` | VARCHAR(512) | Project image URL |

#### `contributions`
Tracks user contributions to projects.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary key |
| `userId` | INT | Foreign key to users table |
| `projectId` | INT | Foreign key to projects table |
| `walletAddress` | VARCHAR(255) | User's wallet address |
| `contributionAmount` | INT | Contribution amount |
| `impactTokensReceived` | INT | Impact Tokens earned |
| `transactionHash` | VARCHAR(255) | Blockchain transaction hash |
| `status` | ENUM | "pending", "confirmed", or "failed" |

#### `walletConnections`
Tracks external wallets connected by users.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INT | Primary key |
| `userId` | INT | Foreign key to users table |
| `walletAddress` | VARCHAR(255) | Connected wallet address |
| `chainId` | INT | Blockchain chain ID |
| `connectedAt` | TIMESTAMP | Connection timestamp |

## API Endpoints (tRPC Procedures)

### Projects Router

- **`projects.list`** (public query): Fetch all projects
- **`projects.getById`** (public query): Fetch a specific project by ID
- **`projects.getByStatus`** (public query): Fetch projects by status

### Contributions Router

- **`contributions.getByProjectId`** (public query): Fetch contributions for a project
- **`contributions.getByUserId`** (protected query): Fetch user's contributions
- **`contributions.create`** (protected mutation): Record a new contribution

### Wallet Router

- **`wallet.connect`** (protected mutation): Connect an external wallet to user account

## Smart Contract Integration Points

### Required Smart Contracts

1. **Asset Swap Contract**
   - Enables users to swap their native assets (ETH, USDC) into the project's contribution token
   - Location: `MVI_CONSTANTS.CONTRACTS.ASSET_SWAP`

2. **Contribution Pool Contract**
   - Manages the collection and allocation of contributions
   - Tracks contribution amounts and distributes Impact Tokens
   - Location: `MVI_CONSTANTS.CONTRACTS.CONTRIBUTION_POOL`

3. **Impact Token Contract**
   - ERC-20 token representing verifiable ownership of project outcomes
   - Location: `MVI_CONSTANTS.CONTRACTS.IMPACT_TOKEN`

### Integration Implementation

#### Step 1: Update Smart Contract Addresses

Edit `shared/mvi-constants.ts` with your deployed contract addresses:

```typescript
CONTRACTS: {
  ASSET_SWAP: "0x...",
  CONTRIBUTION_POOL: "0x...",
  IMPACT_TOKEN: "0x...",
}
```

#### Step 2: Implement Web3 Provider Integration

The `useWalletConnection` hook in `client/src/hooks/useWalletConnection.ts` provides the foundation for wallet connectivity. Enhance it with:

- MetaMask provider detection
- Chain switching logic
- Transaction signing and submission

#### Step 3: Add Smart Contract Interaction Functions

Create a new file `client/src/lib/web3.ts` with functions for:

```typescript
// Asset Swap
async function swapAssets(fromToken, toToken, amount, walletAddress) {
  // Call asset swap contract
}

// Contribution
async function contributeToProject(projectId, amount, walletAddress) {
  // Call contribution pool contract
  // Receive Impact Tokens
}

// Impact Token Balance
async function getImpactTokenBalance(walletAddress) {
  // Query Impact Token contract
}
```

#### Step 4: Update Frontend Components

Integrate smart contract calls into:

- **Home.tsx:** Asset swap functionality
- **ProjectDetail.tsx:** Contribution submission and Impact Token calculation

## Deployment Instructions

### Prerequisites

- Node.js 18+
- pnpm package manager
- MySQL/TiDB database
- Environment variables configured

### Environment Variables

Create a `.env` file with:

```
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your_jwt_secret
VITE_APP_TITLE=Micro Ventures Initiative (MVI) Launchpad
VITE_APP_LOGO=/logo.svg
```

### Setup & Installation

```bash
# Install dependencies
pnpm install

# Push database schema
pnpm db:push

# Seed sample data
node seed-db.mjs

# Start development server
pnpm dev
```

### Production Deployment

```bash
# Build frontend
pnpm build

# Start production server
pnpm start
```

### Hosting Options

- **Vercel:** Recommended for React frontend
- **Railway/Render:** For Express backend
- **AWS/Google Cloud:** For production-grade deployment

## Testing

### Manual Testing Checklist

- [ ] Landing page loads with project listing
- [ ] Wallet connection works (MetaMask/WalletConnect)
- [ ] Asset swap interface is functional
- [ ] Clicking "Contribute" navigates to project detail page
- [ ] Contribution form calculates Impact Tokens correctly
- [ ] Contribution submission records in database
- [ ] Project progress bar updates after contribution
- [ ] User can view their contribution history

### Database Testing

```bash
# Connect to database
mysql -u user -p database_name

# Verify tables
SHOW TABLES;

# Check seeded projects
SELECT * FROM projects;

# View contributions
SELECT * FROM contributions;
```

## Security Considerations

1. **Smart Contract Audits:** All contracts must be audited before mainnet deployment
2. **Rate Limiting:** Implement rate limiting on contribution endpoints
3. **Input Validation:** Validate all user inputs on frontend and backend
4. **CORS Configuration:** Restrict API access to authorized domains
5. **Private Keys:** Never commit private keys or sensitive credentials
6. **SSL/TLS:** Use HTTPS in production

## Monitoring & Maintenance

### Key Metrics to Monitor

- Active user count
- Total contributions
- Project funding progress
- Transaction success rate
- API response times

### Regular Maintenance Tasks

- Update dependencies monthly
- Monitor database performance
- Review and optimize slow queries
- Backup database regularly
- Monitor smart contract events

## Support & Documentation

For additional information, refer to:

- **Libertas Alpha Whitepaper:** Provided in project root
- **tRPC Documentation:** https://trpc.io
- **Drizzle ORM:** https://orm.drizzle.team
- **React Documentation:** https://react.dev

## Troubleshooting

### Issue: Database Connection Failed

**Solution:** Verify `DATABASE_URL` environment variable and database credentials.

### Issue: Wallet Connection Not Working

**Solution:** Ensure MetaMask is installed and the user is on a supported network.

### Issue: Projects Not Displaying

**Solution:** Run `node seed-db.mjs` to populate the database with sample projects.

### Issue: Smart Contract Calls Failing

**Solution:** Verify contract addresses in `mvi-constants.ts` and ensure contracts are deployed on the correct network.

## Next Steps

1. Deploy smart contracts to testnet
2. Update contract addresses in configuration
3. Implement Web3 provider integration
4. Conduct security audit
5. Deploy to production
6. Monitor and optimize performance

---

**Project Version:** 1.0.0  
**Last Updated:** November 2025  
**Maintained by:** Libertas Alpha Development Forum
