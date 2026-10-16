# ESSP Backend (Employee / Enterprise Self-Service Portal)

A modular, clean-architecture backend REST API built with **Node.js**, **Express**, **TypeScript**, **MySQL**, and **Drizzle ORM**.

---

## 📁 Project Structure

```text
ESSP-backend/
├── drizzle/                    # Generated SQL migrations (Drizzle Kit)
├── src/
│   ├── config/                 # Environment variables and validation (Zod)
│   │   └── env.ts
│   ├── controllers/            # Request handlers / HTTP layer
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── request.controller.ts
│   │   └── health.controller.ts
│   ├── db/                     # Drizzle ORM setup & schemas
│   │   ├── index.ts            # Connection pool & Drizzle instance
│   │   └── schema/             # Database table schemas & relations
│   │       ├── users.ts
│   │       ├── profiles.ts
│   │       ├── requests.ts
│   │       └── index.ts
│   ├── models/                 # Data access layer (Drizzle queries)
│   │   ├── user.model.ts       # User table operations & queries
│   │   ├── profile.model.ts    # Profile queries & updates
│   │   ├── request.model.ts    # Service request queries & statuses
│   │   └── index.ts
│   ├── middlewares/            # Custom Express middlewares
│   │   ├── auth.middleware.ts  # JWT verification & role authorization
│   │   ├── validate.middleware.ts # Zod request validation
│   │   ├── error.middleware.ts # Centralized error handler
│   │   └── notFound.middleware.ts # 404 handler
│   ├── routes/                 # Express route definitions
│   │   ├── v1/
│   │   │   ├── auth.routes.ts
│   │   │   ├── user.routes.ts
│   │   │   ├── request.routes.ts
│   │   │   ├── health.routes.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── services/               # Core business logic layer
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── request.service.ts
│   ├── types/                  # TypeScript types and declarations
│   │   ├── index.ts
│   │   └── express.d.ts        # Augmented Express Request
│   ├── utils/                  # Helper utilities & logging
│   │   ├── apiResponse.ts      # Standardized API response format
│   │   ├── apiError.ts         # Operational error classes
│   │   ├── asyncHandler.ts     # Wrapper for async controllers
│   │   └── logger.ts           # Console logger
│   ├── app.ts                  # Express application configuration
│   └── server.ts               # Server startup & graceful shutdown
├── .env.example                # Environment variables template
├── .env                        # Local environment variables
├── .gitignore                  # Git ignore rules
├── drizzle.config.ts           # Drizzle Kit configuration
├── package.json                # Project dependencies & scripts
├── tsconfig.json               # TypeScript compiler configuration
└── README.md                   # Documentation
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (>= 18)
- **Language:** TypeScript
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Drizzle ORM (`drizzle-orm`, `mysql2`)
- **Validation:** Zod
- **Security:** Helmet, CORS, bcryptjs, jsonwebtoken
- **Development Tooling:** `tsx`, `drizzle-kit`

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Edit `.env` with your MySQL database credentials:

```env
PORT=5000
NODE_ENV=development
API_PREFIX=/api/v1
CORS_ORIGIN=http://localhost:3000

# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="mysql://root:password@localhost:3306/essp_db"

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
```

### 3. Database Migration with Drizzle ORM

Make sure your MySQL server is running, then run:

```bash
# Push schema directly to database (ideal for development)
npm run db:push

# OR generate SQL migrations and apply
npm run db:generate
npm run db:migrate

# Open Drizzle Studio to view database GUI
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Server runs by default at `http://localhost:5000`.

---

## 📡 API Endpoints

### Health
- `GET /api/v1/health` - Check API and MySQL database connection status

### Authentication (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login with email & password (returns JWT token)
- `GET /me` - Get current authenticated user payload (*Requires Bearer token*)

### Users (`/api/v1/users`)
- `GET /` - List all users (*Admin / Manager only*)
- `GET /:id` - Get user by ID (*Admin / Manager only*)
- `PATCH /profile` - Update own user profile (*Requires Bearer token*)

### Service Requests (`/api/v1/requests`)
- `POST /` - Create a service request (*Requires Bearer token*)
- `GET /my-requests` - View user's service requests (*Requires Bearer token*)
- `GET /` - View all service requests (*Admin / Manager only*)
- `PATCH /:id/status` - Update status (`PENDING` | `APPROVED` | `REJECTED`) (*Admin / Manager only*)
