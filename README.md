# BazarDor (বাজার দর)

A web app to track daily commodity and market prices in Bangladesh.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Better Auth with MongoDB

## Features
- Daily market price tracking and price change ticker
- Category-wise product view (Rice, Lentils, Oil, Vegetables, Fish, Meat, Eggs, Spices)
- Price sorting (Low to High, High to Low)
- Detailed product page with market and division price breakdown
- User authentication (Sign In, Sign Up, Profile update)

## Setup & Running Locally

1. Install dependencies:
```bash
npm install
```

2. Add environment variables in `.env`:
```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=better-auth-db
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.
