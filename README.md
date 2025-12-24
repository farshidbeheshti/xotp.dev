# XOTP Demo (xotp-next)

This project is the official demo and playground website for [xotp](https://github.com/farshidbeheshti/xotp), a powerful One-Time Password (HOTP/TOTP) library for Node.js, Deno, and Bun.

Built with [Next.js](https://nextjs.org/) and [Material UI](https://mui.com/), this application demonstrates the capabilities of the `xotp` library in an interactive environment.

## Features

- **Interactive Configuration**: Customize TOTP parameters including:
  - **Algorithm**: SHA-1, SHA-256, SHA-512, SHA-3 variants, etc.
  - **Secret Key**: Custom secret management.
  - **Duration**: Adjustable time step (e.g., 30s, 60s).
  - **Digits**: 6, 8, or custom length tokens.
  - **Issuer & Account**: Set metadata for the authenticator entry.
- **Live Preview**: Real-time generation of TOTP tokens with a visual countdown timer showing the remaining validity time.
- **QR Code Support**: Automatically generates a QR code compatible with Google Authenticator, Authy, Microsoft Authenticator, and other 2FA apps.
- **Code Generation**: Instantly view and copy the TypeScript code snippet required to implement the current configuration using the `xotp` library.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Component Library**: [Material UI (MUI) v6](https://mui.com/)
- **Core Library**: [xotp](https://github.com/farshidbeheshti/xotp)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd xotp-next
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Related

- [xotp](https://github.com/farshidbeheshti/xotp) - The core OTP library used in this demo.
- [xotp.dev](https://xotp.dev) - The live version of this demo.
