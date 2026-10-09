# 🛠️ Technical Requirements Document (TRD)
## Project: A-Cube Academy Web Application
**Document Version:** 1.0.0  
**Target Release:** Production v1.0  
**Stack Architecture:** Monorepo (Express TypeScript REST API + React Vite TypeScript SPA)

---

## 1. Technical Stack & Architectural Decisions

### 1.1 Complete Technology Matrix

| Layer | Technology | Version | Architectural Rationale |
| :--- | :--- | :--- | :--- |
| **Monorepo Manager** | Concurrently | `^8.2.2` | Orchestrates parallel client (`:5173`) and server (`:5000`) compilation without complex tooling overhead. |
| **Frontend Framework** | React + Vite | `React 18.2`, `Vite 5.4` | Ultra-fast HMR during development, optimized ESM rollups for production, low bundle latency. |
| **Language** | TypeScript | `^5.2.2` | Full static type safety across both frontend and backend entities, preventing runtime null pointer exceptions. |
| **Styling Engine** | Tailwind CSS v4 | `@tailwindcss/vite ^4.0` | Next-gen CSS-first configuration via `@theme`, zero PostCSS configuration boilerplate, minimal production CSS bundle (~73 kB minified). |
| **UI Primitives** | Radix UI | Standard Primitives | Headless accessible components (Dialog, DropdownMenu, Select, Tabs, Avatar, AlertDialog) complying with WCAG 2.1 AA. |
| **Animation Engine** | Framer Motion | `^11.0.24` | Declarative physics-based animations, stagger effects, and smooth scroll transitions matching modern EdTech aesthetics. |
| **Server Framework** | Express.js | `^4.19.2` | Battle-tested, lightweight Node.js HTTP framework with modular router pipelines. |
| **Database** | MongoDB Atlas | MongoDB 6.0+ / Mongoose `^8.2.4` | Flexible document modeling well-suited for varied educational metadata, populated relational references, and rapid schema iteration. |
| **Data Fetching** | TanStack React Query | `^5.28.9` | Declarative server-state caching, automatic cache invalidation, deduplication, and background synchronization. |
| **Form Validation** | React Hook Form + Zod | `RHF ^7.51`, `Zod ^3.22` | Performant uncontrolled form inputs with strict runtime schema parsing matching backend Zod validators. |
| **Cloud Storage** | AWS S3 Client SDK v3 | `@aws-sdk/client-s3 ^3.540` | S3-compatible cloud storage SDK interoperable with AWS S3, Cloudflare R2, MinIO, or Supabase Storage. |
| **Presigned URLs** | `@aws-sdk/s3-request-presigner` | `^3.540.0` | Generates short-lived, authenticated download signatures for zero-trust private bucket access. |
| **Internationalization** | `react-i18next` + `i18next` | `^14.1.0` | Clean JSON-based bilingual localization (`bn` default, `en` fallback) with browser language persistence. |
| **Visualization** | Recharts | `^2.12.3` | Composable SVG chart components for student distribution and subject resource metrics in the admin dashboard. |

---

## 2. Monorepo Structure & Organization

```text
g:/A_Cube/
├── package.json                   # Root monorepo orchestrator
├── .gitignore                     # Monorepo ignores (node_modules, dist, .env)
├── .env.example                   # Full monorepo environment template
├── README.md                      # Complete developer & deployment manual
├── docs/                          # Comprehensive specification docs
│   ├── PROJECT_CONTEXT.md
│   ├── PRD.md
│   ├── TRD.md
│   ├── APP_FLOW.md
│   ├── UI_UX_DESIGN_BRIEF.md
│   ├── BACKEND_SCHEMA.md
│   ├── IMPLEMENTATION_PLAN.md
│   └── SRS.md
│
├── server/                        # Express.js REST API
│   ├── package.json
│   ├── tsconfig.json              # ES2020, NodeNext module resolution
│   ├── .env.example
│   └── src/
│       ├── index.ts               # Server bootstrap, middleware pipeline
│       ├── config/
│       │   ├── db.ts              # Mongoose connection with retry handling
│       │   ├── env.ts             # Zod environment variable parsing
│       │   └── s3.ts              # AWS S3 / Cloudflare R2 client setup
│       ├── models/                # 10 Mongoose schemas (User, Material, etc.)
│       ├── controllers/           # HTTP controllers with AppError handling
│       ├── routes/                # Route definitions prefixed with /api/v1
│       ├── middleware/            # JWT auth, RBAC, error handler, rateLimiter
│       ├── validators/            # Zod request validation schemas
│       ├── utils/                 # JWT signers, S3 presigners, constants
│       └── seed/                  # Database seeder with authentic leaflet data
│
└── client/                        # React Vite SPA
    ├── package.json
    ├── vite.config.ts             # React plugin, Tailwind v4 plugin, /api proxy
    ├── tsconfig.json              # TypeScript configuration with @/ path alias
    ├── index.html                 # Entry HTML with Hind Siliguri & Inter fonts
    └── src/
        ├── main.tsx               # DOM mount, strict mode
        ├── App.tsx                # React Router v6 setup, providers
        ├── index.css              # Tailwind v4 @theme token specifications
        ├── vite-env.d.ts          # Vite client types declaration
        ├── lib/
        │   ├── axios.ts           # Axios instance with 401 refresh interceptor
        │   ├── constants.ts       # API endpoints, categories, subjects
        │   └── utils.ts           # cn() clsx + twMerge utility
        ├── i18n/                  # i18next setup, bn.json, en.json
        ├── contexts/              # AuthContext (user, login, logout, roles)
        ├── hooks/                 # useAuth, useTranslation, custom hooks
        ├── services/              # API clients (auth, material, student, admin)
        ├── components/
        │   ├── ui/                # Accessible Radix/Tailwind components
        │   ├── layout/            # Navbar, Footer, Public, Student, Admin Layouts
        │   ├── landing/           # Landing page sections (Hero, About, Teachers)
        │   └── common/            # ProtectedRoute, FileUpload, StatCard, SEOHead
        └── pages/
            ├── public/            # HomePage, About, Subjects, Teachers, Contact
            ├── auth/              # LoginPage, AdminLoginPage, RegisterPage
            ├── student/           # StudentDashboard, SubjectMaterials, Exams
            └── admin/             # AdminDashboard, StudentsManagement, Upload
```

---

## 3. Authentication & Security Architecture

### 3.1 Dual-Token Cookie Architecture
The application rejects insecure storage mechanisms (`localStorage` or `sessionStorage` are vulnerable to Cross-Site Scripting). Authentication is managed entirely via HTTP cookies.

```
Client (Browser)                           Server (Express API)
   │                                              │
   ├─────── POST /api/v1/auth/login ─────────────►│
   │        (email, password)                     │  1. Verify credentials via bcrypt
   │                                              │  2. Generate Access Token (15 min)
   │                                              │  3. Generate Refresh Token (7 days)
   │                                              │  4. Store Refresh Token in DB
   │◄────── 200 OK + Set-Cookie Header ───────────┤
   │        Cookie: accessToken (httpOnly)        │
   │        Cookie: refreshToken (httpOnly)       │
   │                                              │
   │─────── GET /api/v1/materials ───────────────►│
   │        (Browser auto-attaches cookies)       │  5. Validate Access Token in auth middleware
   │◄────── 200 OK (Protected Data) ──────────────┤
   │                                              │
   │  ... (15 minutes elapse - Access Token expires)
   │                                              │
   │─────── GET /api/v1/materials ───────────────►│
   │◄────── 401 Unauthorized ─────────────────────┤
   │                                              │
   │  [Axios Interceptor Catches 401]             │
   │─────── POST /api/v1/auth/refresh-token ─────►│
   │        (Browser attaches refreshToken)       │  6. Validate Refresh Token against DB
   │                                              │  7. Issue new Access Token
   │◄────── 200 OK + Set-Cookie (new AccessToken)─┤
   │                                              │
   │─────── Retry GET /api/v1/materials ─────────►│
   │◄────── 200 OK (Success) ─────────────────────┤
```

### 3.2 Cookie Parameters
```typescript
res.cookie('accessToken', accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000 // 15 minutes
});

res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
```

### 3.3 Security Middleware Suite
1. **Helmet (`helmet`):** Configures HTTP security headers (X-Frame-Options, X-Content-Type-Options, DNS Prefetch Control, Strict-Transport-Security).
2. **CORS Allowlist (`cors`):** Enforces origin restriction matching `process.env.CLIENT_URL` with `credentials: true`.
3. **Rate Limiting (`express-rate-limit`):**
   * **General API limiter:** 5000 req/15 min in development; 1000 req/15 min in production. Returns JSON `{ success: false, message: 'Too many requests from this IP...' }`.
   * **Authentication limiter:** 500 attempts/15 min in development; 30 attempts/15 min in production.
   * **File upload limiter:** 500 uploads/hour in development; 50 uploads/hour in production.
   * **Axios Interceptor Loop Guard:** Bypasses token refresh for authentication routes (`/auth/login`, `/auth/admin/login`, `/auth/me`, etc.) to prevent infinite reload loops upon unauthenticated states.
4. **NoSQL Injection Defense (`express-mongo-sanitize`):** Strips keys starting with `$` or containing `.` from request parameters and body.
5. **Schema Validation (`validate` middleware):** Evaluates all incoming `req.body`, `req.query`, and `req.params` against compiled Zod schemas before reaching business logic controllers.

---

## 4. File Storage & Cloud Download Architecture

### 4.1 Private Bucket Strategy
Educational materials (lecture notes, exam sheets) are proprietary assets. Files are NEVER stored in public buckets with static URLs.
* Bucket provider: AWS S3 or Cloudflare R2 (S3-compatible API).
* Direct bucket ACL: **Private** (all public reads disabled).

### 4.2 Upload Protocol (Admin)
1. Admin selects a file on the frontend (validated client-side for MIME type and 50MB size).
2. Frontend submits `multipart/form-data` to `POST /api/v1/materials`.
3. Backend parses the stream using `multer` with `memoryStorage()`.
4. File is assigned a unique UUID key: `materials/${uuidv4()}${extension}`.
5. `uploadToS3(key, buffer, mimetype)` streams the payload to the cloud bucket using `PutObjectCommand`.
6. File metadata (key, name, MIME type, size in bytes, subject, category, batch) is persisted in the MongoDB `materials` collection.

### 4.3 Secure Download Protocol (Student/Admin)
1. User clicks "Download" on a material card.
2. Frontend calls `GET /api/v1/materials/:id/download`.
3. Middleware verifies that:
   * The user is authenticated.
   * If the user is a student, their status is `active` (not `pending` or `suspended`).
4. Backend executes `getSignedUrl` from `@aws-sdk/s3-request-presigner`:
   ```typescript
   const command = new GetObjectCommand({
     Bucket: env.S3_BUCKET,
     Key: material.fileKey,
     ResponseContentDisposition: `attachment; filename="${material.fileName}"`,
   });
   const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
   ```
5. Material `downloadCount` is incremented, an audit event is logged in `downloadlogs`, and the short-lived presigned URL is returned to the client for direct, authenticated download.

---

## 5. API Design & Communication Standards

### 5.1 Base Routing
All REST API endpoints are strictly versioned under `/api/v1/*`:
* `/api/v1/auth` — Identity & session management
* `/api/v1/student` — Student profile and dashboard metrics
* `/api/v1/admin` — Administrative supervision, metrics, student operations
* `/api/v1/materials` — Educational material catalogue and download links
* `/api/v1/subjects` — Subject and syllabus endpoints
* `/api/v1/teachers` — Instructor directory
* `/api/v1/announcements` — Official notice board
* `/api/v1/exams` — Exam routines and schedules
* `/api/v1/settings` — Public academy configurations

### 5.2 Uniform Response Envelope
All API controllers return a standardized JSON structure:

#### Success Response:
```json
{
  "success": true,
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

#### Error Response:
```json
{
  "success": false,
  "message": "Human-readable error description",
  "errors": [ ... ]
}
```

### 5.3 HTTP Status Code Mapping
* `200 OK`: Successful resource query, update, or deletion.
* `201 Created`: Successful creation of user, material, announcement, or exam.
* `400 Bad Request`: Zod validation failure or malformed payload.
* `401 Unauthorized`: Unauthenticated request or expired token.
* `403 Forbidden`: Insufficient role permissions or account in pending/suspended state.
* `404 Not Found`: Resource does not exist.
* `429 Too Many Requests`: Rate limit exceeded.
* `500 Internal Server Error`: Unhandled server exception (caught by global error handler).

### 5.4 Teacher & Instructor Data Schema
The `/api/v1/teachers` endpoint serves instructor profiles extended with rich promotional asset metadata:
* `photo` / `cardImage`: Static asset URL pointing to `/images/teachers/*` (e.g. `akash-physics.jpg`).
* `experience`: Authentic teaching tenure (e.g. `4+ years of experience as a Physics teacher`).
* `punchline`: Subject slogan (e.g. `Physics নিয়ে no চিন্তা`).
* `university`: Academic pedigree (`BRAC University (CSE)`, `BUTEX (TMDM)`, `IUB (CSE)`).

---

## 6. Frontend Build & Performance Optimizations

### 6.1 Bundle Splitting & Vite Configuration
* Development proxy configures `/api` forwarding to `http://localhost:5000` to avoid CORS issues locally.
* Production build outputs minified ESM modules to `client/dist`.
* Tailwind v4 native `@theme` integration compiles directly through `@tailwindcss/vite` without PostCSS overhead.

### 6.2 Data Caching Strategy
* TanStack Query manages client cache with a 5-minute stale window:
  ```typescript
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
  ```
* Mutations automatically invalidate corresponding cache keys (`['materials']`, `['admin-materials']`, `['student-dashboard']`), triggering background re-fetches without manual page reloads.

### 6.3 Bilingual Localization Architecture (`react-i18next`)
* **Default Language:** Bengali (`bn`), fallback to English (`en`).
* **Detection & Persistence:** `LanguageDetector` paired with explicit `localStorage.getItem('i18nextLng')` check on startup. When language switches, choice is stored in `localStorage` under `i18nextLng`.
* **Language Switcher Component:** Segmented pill toggle (`[ বাং | EN ]`) with active state visual highlight, eliminating ambiguous two-letter toggle confusion.
* **Component Localization:** All public landing sections (`Navbar`, `Hero`, `About`, `Subjects`, `Features`, `Teachers`, `HowItWorks`, `CTA`, `Contact`, `Footer`) utilize reactive `useTranslation()` hooks for instantaneous client-side re-rendering upon toggle.

---

## 7. Deployment & Infrastructure Pipeline

```
                              ┌───────────────────────────────────┐
                              │     GitHub Repository (Main)      │
                              └───────────────┬───────────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │                                               │
             [Vercel (Hobby Free)]                           [Render (Free Web)]
            (Frontend Client SPA)                             (Backend Node API)
             Directory: /client                                Directory: /server
             Build: npm run build                              Build: npm install && npm run build
             Output: dist                                      Start: npm run start
             Config: client/vercel.json                        Config: render.yaml
                      │                                               │
                      │                                 ┌─────────────┴─────────────┐
                      │                                 │                           │
                      ▼                                 ▼                           ▼
          [Global Edge CDN (HTTPS)]           [MongoDB Atlas M0 Free]       [Cloudflare R2 / S3]
          - Single Page App Routing           - 512 MB Storage Free         - Private Cloud Bucket
          - Assets Gzip / Brotli              - Connection String URI       - Zero-trust Presigned URLs
```

### 7.1 Cross-Domain Production Auth & CORS Strategy
1. **Frontend Direct Routing:** `client/src/lib/axios.ts` adapts dynamically via `import.meta.env.VITE_API_URL` pointing to the Render backend (`https://a-cube-academy-api.onrender.com/api/v1`).
2. **Cross-Origin Cookie Security:** In production (`NODE_ENV === 'production'`), authentication cookies (`accessToken`, `refreshToken`) use `sameSite: 'none'` and `secure: true`, enabling secure cookie dispatch between `vercel.app` and `onrender.com`.
3. **CORS Allowlist:** Backend Express middleware permits requests matching `env.CLIENT_URL` and all dynamic `*.vercel.app` preview domains with `credentials: true`.
4. **Declarative Infrastructure (`render.yaml` & `vercel.json`):**
   * `client/vercel.json` enforces SPA rewrites ensuring route refreshes (`/admin/dashboard`, `/login`) never yield HTTP 404s.
   * `render.yaml` declares the backend web service specifications, health check path (`/health`), and environment variable contracts.
