# Official MVI Launchpad

Micro Ventures Initiative Launchpad – A decentralized platform for crowd-funding and verified Social Impact token distribution.

## Project Structure

This monorepo is organized into three primary workspaces handling the blockchain logic, frontend interface, and backend services.

```text
mvi-launchpad/
├── contracts/      # Smart Contracts (Foundry environment)
├── client/         # Frontend Application (Next.js 15, Tailwind)
├── server/         # Backend API (Express.js, tRPC, Drizzle)
├── shared/         # Shared Types & Constants & Docs
└── .env            # Global Environment Variables
```

## Workspaces

### `contracts/` (Foundry)

- **Tech:** Solidity, Foundry (Forge/Cast).
- **Purpose:** Core blockchain logic for Asset Swaps, Contribution Pools, and MVI Token minting.
- **Key Command:** `forge test` to run contract tests.

### `client/` (Frontend)

- **Tech:** Next.js (App Router), Tailwind CSS, Wagmi/Viem.
- **Purpose:** User interface for browsing projects, connecting wallets, and managing dashboards.
- **Key Command:** `pnpm dev` starts the Next.js development server.

### `server/` (Backend)

- **Tech:** Express.js, tRPC, Drizzle ORM, MySQL.
- **Purpose:** Handles off-chain data (user profiles, project metadata), authentication, and Web2 bank transfer verification.
- **Key Command:** `pnpm dev` starts the Express server.

### `shared/`

- **Tech:** TypeScript.
- **Purpose:** Stores shared TypeScript interfaces and constant values (like Contract ABIs) to ensure type safety across the frontend and backend.
