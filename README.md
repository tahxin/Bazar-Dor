# 🛒 BazarDor (বাজার দর)

> **দৈনন্দিন নিত্যপণ্যের বাজার দর এক নজরে — Daily Essential Commodity Price Tracker for Bangladesh**

**BazarDor** is a modern, high-performance web application built to provide transparent, real-time tracking and comparative analysis of daily essential commodity prices across Bangladesh. The platform tracks prices for rice, lentils, edible oils, vegetables, fish, meat, eggs, and spices, offering consumers historical price trends, percentage fluctuations, division-wise comparisons, and market-specific breakdowns.

🌐 **Live Demo:** [https://bazar-dor-teal.vercel.app](https://bazar-dor-teal.vercel.app)

---

## 🛠️ Tech Stack & Architecture

| Layer              | Technologies                                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Framework**      | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Partial Prerendering)                                |
| **Language**       | [TypeScript 5](https://www.typescriptlang.org/) (Strict type-checking)                                         |
| **Styling & UI**   | [Tailwind CSS v4](https://tailwindcss.com/), [DaisyUI v5](https://daisyui.com/), [HeroUI](https://heroui.com/) |
| **Authentication** | [Better Auth](https://www.better-auth.com/) (Email/Password, Google OAuth, GitHub OAuth)                       |
| **Database**       | [MongoDB](https://www.mongodb.com/) via `@better-auth/mongo-adapter`                                           |
| **Typography**     | `Noto Serif Bengali` (`next/font/google`)                                                                      |
| **Notifications**  | [React Hot Toast](https://react-hot-toast.com/)                                                                |
| **Data Source**    | RESTful Cloudflare Workers API with resilient fallback architecture                                            |

---

##  5 Key Features

### 1.  Real-Time Infinite Marquee Price Ticker
- An animated ticker positioned right below the header displays live commodity prices and percentage changes (▲ green for price drops, ▼ red for price hikes) in real-time.
- Supports interactive hover-pause functionality and seamless infinite looping.

### 2.  Market Trends: Top Risers, Fallers & Comprehensive Catalog
- **দাম বেড়েছে (Price Hiked)**: Dedicated section showcasing the top price risers of the day with exact percentage increases.
- **দাম কমেছে (Price Dropped)**: Highlighting items that experienced daily price decreases.
- **সব পণ্যের বাজার দর (All Commodities)**: Responsive catalog view displaying commodity cards with current prices, units, and yesterday's baseline prices.

### 3.  Category Filtering & Numeric Price Sorting
- Quick category navigation covering 8 major essential commodity groups: চাল (Rice), ডাল (Lentils), তেল (Oil), শাক-সবজি (Vegetables), মাছ (Fish), মাংস (Meat), ডিম (Eggs), and মসলা (Spices).
- Dynamic client-side sorting:
  - **ডিফল্ট (Default)**
  - **দাম: কম থেকে বেশি (Price: Low to High)**
  - **দাম: বেশি থেকে কম (Price: High to Low)**
  - **দামের পরিবর্তন (Price Change %)**
- Accurately converts Bengali numerals and currency strings into numeric values for precise sorting.

### 4.  Division & Market-Wise Granular Price Breakdown
- In-depth product detail page (`/product/[slug]`) calculating:
  - **সর্বনিম্ন (Minimum)**, **সর্বোচ্চ (Maximum)**, and **গড় (Average)** market prices.
  - **Historical trends**: Today vs. Yesterday vs. Last Week vs. Last Month.
  - **Division comparisons**: Breakdown across administrative divisions (Dhaka, Chattogram, Rajshahi, Khulna, Barishal, Sylhet, Rangpur, Mymensingh).
  - **Market-level breakdown**: Specific retail and wholesale market prices (Karwan Bazar, Mirpur, Mohakhali, etc.).

### 5.  Robust Authentication, Profile Management & Smooth UX
- Secure user authentication powered by **Better Auth** with MongoDB session persistence.
- Supports standard **Email/Password** sign-in/sign-up as well as **Google** and **GitHub** OAuth integrations.
- Protected user profile dashboard (`/profile`) and update page (`/profile/update`) to update display name and avatar.
- Comprehensive skeleton loaders across all routes (`loading.tsx`) and Suspense boundaries for zero layout shift during data fetching.

---

## 📡 API Architecture & Endpoints

To guarantee uninterrupted service, BazarDor implements a dual-tier API fetching strategy with automatic fallback:

- **Primary API**: `https://api.api-store.workers.dev/api/bazardor`
- **Backup API**: `https://api.abcz.workers.dev/api/bazardor`

### Endpoints Used:
- `GET /products` — Fetch all tracked commodity items and prices
- `GET /products/:slug` — Fetch specific commodity details by slug or ID
- `GET /categories` — Fetch all product categories
- `GET /products?category=:slug` — Filter products by category
- `GET /categories/:slug` — Fetch metadata for a specific category

### Internal Authentication Endpoints:
- `POST /api/auth/sign-in/email` — Email & password authentication
- `POST /api/auth/sign-up/email` — User registration
- `POST /api/auth/sign-out` — Session revocation
- `GET /api/auth/get-session` — Session status retrieval
- `POST /api/auth/update-user` — User profile updating

---

## 📁 Project Structure

```text
bazar-dor/
├── public/                 # Static assets (logo, hero illustrations, etc.)
├── src/
│   ├── app/                # Next.js 16 App Router
│   │   ├── api/auth/       # Better Auth catch-all API handler
│   │   ├── category/       # Category dynamic routing (/category/[slug])
│   │   ├── product/        # Product detail dynamic routing (/product/[slug])
│   │   ├── profile/        # User profile & profile update pages
│   │   ├── signin/         # User login page
│   │   ├── signup/         # User registration page
│   │   ├── globals.css     # Tailwind CSS & global animations
│   │   ├── layout.tsx      # Root layout (Noto Serif Bengali font, Toaster)
│   │   ├── loading.tsx     # Route fallback skeleton
│   │   ├── not-found.tsx   # Custom 404 error page
│   │   └── page.tsx        # Homepage (Hero, Ticker, Trends, Catalog)
│   ├── components/         # Reusable modular UI components & skeletons
│   │   ├── Header.tsx      # Main navigation with cart logo & date
│   │   ├── PriceTicker.tsx # Continuous scrolling price ticker
│   │   ├── HeroSection.tsx # Hero banner with CTA and date badge
│   │   ├── CommodityCard.tsx # Product card with price trend badges
│   │   └── ...             # Skeletons (CardSkeleton, HeaderSkeleton, etc.)
│   ├── lib/
│   │   ├── api.ts          # API client with primary/backup fallback
│   │   ├── auth.ts         # Server-side Better Auth & MongoDB initialization
│   │   ├── auth-client.ts  # Client-side Better Auth React hooks & client
│   │   ├── mongodb.ts      # MongoDB connection helper
│   │   └── utils.ts        # Bengali numeral formatting & price converters
│   └── types/              # TypeScript interface & type definitions
├── .env.example            # Environment variables template
├── next.config.ts          # Next.js build configuration (PPR, turbopack)
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

##  Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version `v18.18.0` or higher recommended)
- [npm](https://www.npmjs.com/) (version `9+` or `10+`)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) database connection URI

### 1. Clone the Repository
```bash
git clone https://github.com/tahxin/Bazar-Dor.git
cd Bazar-Dor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```

Populate the `.env` file with your credentials:
```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=better-auth-db

# Better Auth Configuration
BETTER_AUTH_SECRET=your_random_secure_secret_key
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Social OAuth Providers (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

##  Available NPM Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack on port `3000`.
- `npm run build`: Compiles the application and generates the optimized production build.
- `npm run start`: Runs the built production server.
- `npm run lint`: Runs ESLint to verify code quality and enforce project style rules.

---

## 🔒 Security & Best Practices

- **CSRF & Session Validation**: Better Auth provides secure cookie management, state validation, and CSRF protection.
- **Fail-safe API Redundancy**: Dual-tier Cloudflare Workers integration prevents data outages.
- **Hydration Resilient**: Date rendering and formatting use hydration-safe wrappers preventing client/server mismatch.
- **Accessible & Semantic HTML**: Uses semantic HTML5 landmarks, responsive layouts, and accessible color contrasts.




