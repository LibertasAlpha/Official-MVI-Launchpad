# Web2 Contribution Pathway - Implementation Guide

## Overview

The MVI Launchpad now supports both Web3 (cryptocurrency wallet) and Web2 (traditional bank transfer) contribution pathways. This enables users without crypto wallets to contribute to impact projects using traditional banking methods, while the Libertas Alpha team manages off-chain stake allocation and Impact Token distribution.

## Architecture

### Database Schema

The implementation adds three new database tables:

**web2_contributions** - Tracks all traditional bank transfer contributions

| Field | Type | Description |
|-------|------|-------------|
| id | int | Primary key |
| projectId | int | Associated project |
| contributorName | varchar(255) | Contributor's full name |
| contributorEmail | varchar(320) | Contact email for tracking |
| contributorPhone | varchar(20) | Optional phone number |
| contributionAmount | int | Amount in smallest unit (cents) |
| currency | varchar(10) | Currency code (USD, EUR, GBP, CAD) |
| bankTransferReference | varchar(255) | Bank transaction ID |
| status | enum | pending, verified, confirmed, rejected |
| impactTokensAllocated | int | Tokens allocated by admin |
| notes | text | Admin notes about contribution |
| verifiedBy | int | Admin user ID who verified |
| verifiedAt | timestamp | Verification timestamp |
| createdAt | timestamp | Submission timestamp |
| updatedAt | timestamp | Last update timestamp |

**bankAccounts** - Stores official Libertas Alpha bank details

| Field | Type | Description |
|-------|------|-------------|
| id | int | Primary key |
| accountName | varchar(255) | Account holder name |
| bankName | varchar(255) | Bank institution name |
| accountNumber | varchar(50) | Account number |
| routingNumber | varchar(50) | US routing number |
| swiftCode | varchar(20) | International SWIFT code |
| iban | varchar(50) | International IBAN |
| country | varchar(100) | Bank location country |
| currency | varchar(10) | Account currency |
| isActive | int | Active status flag |
| createdAt | timestamp | Creation timestamp |
| updatedAt | timestamp | Last update timestamp |

### API Endpoints (tRPC Procedures)

**Web2 Contributions Router:**

```typescript
// Create new Web2 contribution
web2Contributions.create(input: {
  projectId: number
  contributorName: string
  contributorEmail: string
  contributorPhone?: string
  contributionAmount: number
  currency?: string
})

// Get contributions by project
web2Contributions.getByProjectId(input: { projectId: number })

// Get contributions by contributor email
web2Contributions.getByEmail(input: { email: string })

// Verify contribution (admin only)
web2Contributions.verify(input: {
  id: number
  bankTransferReference: string
  notes?: string
})

// Allocate Impact Tokens (admin only)
web2Contributions.allocateTokens(input: {
  id: number
  impactTokensAllocated: number
})
```

**Bank Accounts Router:**

```typescript
// List active bank accounts
bankAccounts.list()

// Get specific bank account
bankAccounts.getById(input: { id: number })
```

## User Experience Flow

### For Web2 Contributors

1. **Browse Projects** - User visits project detail page
2. **Choose Contribution Method** - User selects "Bank Transfer" tab
3. **View Bank Details** - System displays official Libertas Alpha bank account information
4. **Submit Contribution Form** - User enters:
   - Full name
   - Email address
   - Phone number (optional)
   - Contribution amount
   - Currency selection
5. **Confirmation** - System confirms submission and provides reference number
6. **Bank Transfer** - User completes bank transfer using provided account details
7. **Tracking** - User receives email updates on contribution status
8. **Token Allocation** - Once verified, Impact Tokens are allocated and user is notified

### For Admin Users

1. **Access Admin Dashboard** - Navigate to `/admin` (requires admin role)
2. **Review Pending Contributions** - View all Web2 contributions by project
3. **Verify Payment** - Match bank transfer with contribution record
4. **Allocate Tokens** - Determine and allocate appropriate Impact Tokens
5. **Confirm Contribution** - Mark contribution as confirmed

## Frontend Components

### Web2ContributionForm

Located at `client/src/components/Web2ContributionForm.tsx`

Provides a form for users to submit bank transfer contribution details.

**Features:**
- Email validation
- Amount input with currency selection
- Submission confirmation
- Success feedback with next steps

### BankAccountInfo

Located at `client/src/components/BankAccountInfo.tsx`

Displays official bank account information for transfers.

**Features:**
- Copy-to-clipboard for each field
- Visual feedback on copy action
- Important transfer instructions
- Support for multiple account types (US, IBAN, SWIFT)

### AdminDashboard

Located at `client/src/pages/AdminDashboard.tsx`

Comprehensive admin interface for managing Web2 contributions.

**Features:**
- View all Web2 contributions by project
- Filter by status (pending, verified, confirmed, rejected)
- Verify contributions with bank reference
- Allocate Impact Tokens
- Add admin notes
- Track verification history

## Implementation Details

### Contribution Workflow

```
User Submission
    ↓
Status: "pending"
    ↓
Admin Verification
    ↓
Status: "verified"
    ↓
Admin Token Allocation
    ↓
Status: "confirmed"
    ↓
User Receives Impact Tokens
```

### Security Considerations

1. **Email Verification** - Contributions tracked by email for user identification
2. **Admin-Only Operations** - Verification and token allocation require admin role
3. **Audit Trail** - All changes logged with admin user ID and timestamp
4. **Bank Details** - Stored securely in database, displayed only when needed
5. **Transaction Reference** - Required for verification to prevent fraud

### Off-Chain Distribution

The system supports off-chain distribution through:

1. **Email Tracking** - Users identified by email address
2. **Manual Allocation** - Admins manually allocate tokens based on verification
3. **Status Tracking** - Clear status indicators for contribution lifecycle
4. **Notes System** - Admins can add notes about token allocation rationale

## Configuration

### Bank Account Setup

Bank accounts are managed through the database. To add a new bank account:

```typescript
// Via seed script or direct database insertion
await createBankAccount({
  accountName: "Libertas Alpha Technologies",
  bankName: "Global Impact Bank",
  accountNumber: "1234567890",
  routingNumber: "021000021",
  swiftCode: "GIBAUS33",
  iban: "US12GIBA0001234567890",
  country: "United States",
  currency: "USD",
  isActive: 1,
});
```

### Environment Variables

No additional environment variables required. Web2 contribution functionality uses existing database connection.

## Testing the Implementation

### Manual Testing Steps

1. **Create a Web2 Contribution:**
   - Navigate to any live project
   - Click "Bank Transfer" tab
   - Fill in contribution form
   - Submit and verify confirmation

2. **View Bank Details:**
   - Bank account information should display correctly
   - Copy buttons should work for all fields

3. **Admin Verification:**
   - Log in as admin user
   - Navigate to `/admin`
   - View pending Web2 contributions
   - Verify a contribution with bank reference
   - Allocate Impact Tokens

4. **User Tracking:**
   - Search contributions by email
   - Verify status updates
   - Confirm token allocation

## Future Enhancements

1. **Automated Email Notifications** - Send status updates to contributors
2. **Webhook Integration** - Receive bank transfer notifications from payment processor
3. **Multi-Currency Support** - Enhanced currency conversion and tracking
4. **Batch Processing** - Admin tools for bulk token allocation
5. **Reporting Dashboard** - Analytics on Web2 vs Web3 contributions
6. **Payment Gateway Integration** - Direct payment processing for bank transfers
7. **KYC/AML Compliance** - Identity verification for larger contributions
8. **Contribution Limits** - Per-user and per-project contribution caps

## Troubleshooting

### Issue: Bank accounts not displaying

**Solution:** Ensure bank accounts are seeded in database. Run `npx tsx seed-bank-accounts.ts`

### Issue: Admin dashboard not accessible

**Solution:** Verify user has admin role. Check `users.role` in database is set to "admin"

### Issue: Web2 form not submitting

**Solution:** Check browser console for validation errors. Ensure all required fields are filled.

### Issue: Contributions not appearing in admin dashboard

**Solution:** Verify contributions were created with correct projectId. Check database directly.

## API Integration Examples

### Creating a Web2 Contribution (Frontend)

```typescript
const createWeb2Contribution = trpc.web2Contributions.create.useMutation();

await createWeb2Contribution.mutateAsync({
  projectId: 1,
  contributorName: "John Doe",
  contributorEmail: "john@example.com",
  contributorPhone: "+1 (555) 000-0000",
  contributionAmount: 50000, // $500.00
  currency: "USD",
});
```

### Verifying a Contribution (Admin)

```typescript
const verifyMutation = trpc.web2Contributions.verify.useMutation();

await verifyMutation.mutateAsync({
  id: 1,
  bankTransferReference: "TRF-2024-001234",
  notes: "Payment received and verified",
});
```

### Allocating Impact Tokens (Admin)

```typescript
const allocateTokensMutation = trpc.web2Contributions.allocateTokens.useMutation();

await allocateTokensMutation.mutateAsync({
  id: 1,
  impactTokensAllocated: 5000,
});
```

## Conclusion

The Web2 contribution pathway significantly expands the MVI Launchpad's accessibility, enabling traditional users to participate in impact investing alongside crypto-native users. The system maintains security, auditability, and flexibility for off-chain distribution while providing a seamless user experience.

---

**Last Updated:** November 2025  
**Version:** 1.0  
**Status:** Production Ready
