# MVI Launchpad DApp - Project TODO

## Phase 1: Project Structure & Database Schema
- [x] Define database schema for projects, contributions, and impact tokens
- [x] Create tRPC procedures for fetching projects and contribution data
- [x] Set up constants and shared types for the DApp

## Phase 2: Landing Page Development
- [x] Create header component with Connect Wallet button
- [x] Implement asset swap UI component
- [x] Create project listing component with tiles
- [x] Add project status tags (Live/Coming Soon)
- [x] Implement project tile navigation to full project page

## Phase 3: Full Project Page Development
- [x] Create project details page layout
- [x] Implement progress bar showing funding status
- [x] Create contribution module with input field
- [x] Display estimated Impact Tokens calculation
- [x] Implement Contribute button with transaction handling

## Phase 4: Smart Contract Integration
- [x] Create smart contract interaction utilities (useWalletConnection hook)
- [x] Implement wallet connection logic (MetaMask integration ready)
- [ ] Integrate asset swap contract calls (awaiting contract deployment)
- [ ] Integrate contribution pool contract calls (awaiting contract deployment)
- [ ] Implement Impact Token allocation logic (awaiting contract deployment)

## Phase 5: Finalization & Deployment
- [x] Test all features end-to-end
- [x] Optimize performance
- [x] Prepare for hosting
- [x] Create deployment documentation (MVI_DEPLOYMENT_GUIDE.md)

## Phase 6: UX Audit & Enhancement
- [x] Redesign landing page hero section with compelling visuals
- [x] Add sticky header with breadcrumbs and improved navigation
- [x] Implement project search and filtering functionality
- [x] Enhance asset swap interface with real-time rates and validation
- [x] Add transaction preview and confirmation modals
- [x] Create user dashboard with contribution history
- [x] Implement loading states and skeleton screens
- [x] Add toast notifications for user feedback
- [x] Improve mobile responsiveness
- [ ] Add accessibility features (ARIA labels, keyboard navigation)
- [ ] Create onboarding tooltips and help section
- [x] Add micro-interactions and smooth transitions
- [x] Create comprehensive footer with links and social media
- [x] Add breadcrumb navigation throughout the app
- [x] Implement project statistics and metrics display

## Phase 7: Web2 Contribution Pathway
- [x] Update database schema with web2_contributions table
- [x] Create Web2 contribution form component
- [x] Add bank transfer payment instructions modal
- [x] Build admin dashboard for stake management
- [x] Implement contribution verification system
- [x] Create hybrid contribution flow (Web2 + Web3)
- [x] Add Web2 contribution tracking to user dashboard
- [ ] Implement off-chain distribution tracking
- [ ] Create admin notification system for new Web2 contributions
- [x] Add Web2 contribution history to project pages

## Phase 8: MVI Infrastructure Donation Feature
- [ ] Update database schema with donations table
- [ ] Create donation tRPC procedures
- [ ] Design and implement donation messaging
- [ ] Create donation modal/form component
- [ ] Add donation CTA to landing page and project pages
- [ ] Implement donation tracking and analytics
- [ ] Create donation confirmation flow
- [ ] Add donation history to user dashboard
- [ ] Write unit tests for donation functionality
- [ ] Create donation documentation
