# BazarDor (বাজার দর)

BazarDor is a modern web application designed for tracking and analyzing daily essential commodity prices across Bangladesh. It provides transparent, real-time insights into market prices for rice, lentils, oil, vegetables, fish, meat, eggs, and spices, featuring historical trends, division-wise market breakdowns, and price fluctuation tracking.

---

## 🛠️ Technologies Used

- **Next.js 16 (App Router)**: High-performance React framework with Partial Prerendering and streaming SSR
- **TypeScript**: End-to-end type safety and maintainable codebase
- **Tailwind CSS & DaisyUI**: Responsive, accessible, and modern user interface styling
- **Better Auth**: Authentication system supporting email/password and social OAuth providers
- **MongoDB & @better-auth/mongo-adapter**: Scalable database for user profiles and authentication sessions
- **React Hot Toast**: Real-time interactive toast notifications for user actions

---

## ✨ 5 Key Features

1. **Live Infinite Marquee Price Ticker**  
   A continuous scrolling ticker beneath the navbar displays real-time price updates and percentage changes (▲ / ▼) for daily essential commodities.

2. **Top Risers, Fallers & Full Catalog**  
   Dedicated homepage sections highlight the top 6 price risers and top 6 price fallers of the day, followed by a responsive grid showcasing all commodities.

3. **Category Navigation & Accurate Numeric Sorting**  
   Fast category-based filtering (Rice, Lentils, Oil, Vegetables, Fish, Meat, Eggs, Spices) with numeric price sorting (Default, Low to High, High to Low) properly evaluating numeric values regardless of Bengali numeral rendering.

4. **Division & Market-Wise Detailed Breakdown**  
   Protected product detail pages provide market summaries, minimum, maximum, and average prices, historical trends (today, yesterday, last week, last month), and granular price comparisons grouped by administrative division.

5. **Authentication, Profile Management & Skeleton Loading**  
   Complete authentication flow with protected routes, social login readiness (Google & GitHub), dynamic profile information updates via Better Auth, and animated skeleton loaders across every route transition.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=better-auth-db
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```
