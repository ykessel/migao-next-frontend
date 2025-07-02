This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Recommended Folder Structure for Next.js

```
/migao-next-frontend
│
├── app/                # Next.js app directory (routing, layouts, pages)
│   ├── (routes)/       # Route groups (optional, for organization)
│   ├── page.tsx        # Main entry page
│   ├── layout.tsx      # Root layout
│   └── ...
│
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── types/              # TypeScript type definitions
├── constants/          # App-wide constants and enums
├── services/           # API and business logic services
├── utils/              # Utility functions
├── providers/          # App-wide providers (e.g., QueryClientProvider)
├── lib/                # Library code (e.g., axios, query clients)
├── public/             # Static assets (images, icons, etc.)
├── styles/             # Global and modular styles (if not in app/)
├── package.json        # Project dependencies
└── ...
```

- **Place all reusable code (components, hooks, etc.) at the root for easy import.**
- **Keep route-specific code inside the `app/` directory.**
- **Static assets go in `public/`.**
- **Use `styles/` for gloclearbal CSS if not colocated in `app/`.**
