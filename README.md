# 🎓 A-Cube Academy (এ-কিউব একাডেমি)
> **HSC + Admission পূর্ণাঙ্গ প্রস্তুতি** — Physics, Math ও ICT | Concept-Clear Digital Learning Platform

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

---

## 📌 1. Project Overview

**A-Cube Academy** is a modern, production-grade EdTech platform built for a premier coaching centre in Bangladesh specializing in **HSC and University Admission Preparation** for Science students in three core subjects:

1. **Physics (পদার্থবিজ্ঞান)**
2. **Higher Math (উচ্চতর গণিত)**
3. **ICT (তথ্য ও যোগাযোগ প্রযুক্তি)**

Inspired by leading modern EdTech platforms (such as Programming Hero) with smooth interactions and premium aesthetics, the application offers a complete two-sided experience:
- **Public Portal:** High-converting, responsive landing page with authentic academy details, instructor profiles, leaflet feature highlights, and interactive course exploration.
- **Student Portal:** Authenticated learning space for accessing subject-wise lecture notes, PDFs, class slides, problem sheets, model tests, question banks, exams, and notices.
- **Admin & Authority Dashboard:** SaaS-grade management console for student approvals/suspensions, material uploads (with drag-and-drop S3 file management), instructor profiles, announcements, exams, and institute settings.

---

## 📚 Project Documentation Suite

> ⚠️ **MANDATORY PROTOCOL:** Each time any modification is made to the codebase, the corresponding document(s) in `/docs` must be immediately updated. See [Documentation Maintenance Protocol](docs/DOCUMENTATION_MAINTENANCE_PROTOCOL.md).

* 📖 **[PRD — Product Requirements Document](docs/PRD.md):** Detailed feature catalog, personas, and requirements.
* ⚙️ **[TRD — Technical Requirements Document](docs/TRD.md):** Tech stack, JWT cookie architecture, S3 presigned URLs, and API standards.
* 🗺️ **[App Flow & User Journeys](docs/APP_FLOW.md):** Route sitemaps, user flow diagrams, and route guards.
* 🎨 **[UI/UX Design Brief](docs/UI_UX_DESIGN_BRIEF.md):** Color tokens, typography, component styling, and screen hierarchy.
* 💾 **[Backend Schema](docs/BACKEND_SCHEMA.md):** MongoDB Atlas Mongoose schemas, ERD, and indexing.
* 🏗️ **[Implementation Plan](docs/IMPLEMENTATION_PLAN.md):** 11-phase development roadmap and verification gates.
* 🏛️ **[Project Context](docs/PROJECT_CONTEXT.md):** Leaflet data, faculty credentials, and institutional background.
* 📑 **[SRS — Software Requirements Specification](docs/SRS.md):** IEEE 830-compliant requirements and traceability matrix.

---

## 🏢 2. Brand Identity & Leaflet Information

* **Academy Name:** A-Cube Academy
* **Main Tagline:** `HSC + Admission পূর্ণাঙ্গ প্রস্তুতি`
* **Headline:** *"Physics, Math ও ICT — Basic থেকে Advanced পর্যন্ত Concept Clear করে Smart ও Structured Learning."*
* **Location:** ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯
* **Phone Numbers:** `01781-760998`, `01995-516182`

### Core Leaflet Features Implemented:
1. **Basic থেকে Concept ক্লিয়ার করে পাঠদান** (Concept-first pedagogy)
2. **প্রতি সপ্তাহে নিয়মিত পরীক্ষা ও অগ্রগতি মূল্যায়ন** (Weekly assessments and progress tracking)
3. **Extra Problem Solving Class এর ব্যবস্থা** (Dedicated problem-solving sessions)
4. **প্রতি ক্লাসে Lecture Material প্রদান** (Lecture notes and sheets after each class)
5. **প্রথম সপ্তাহ সম্পূর্ণ ফ্রি ডেমো ক্লাসের ব্যবস্থা** (1-week free demo class)
6. **প্রজেক্টরের মাধ্যমে স্মার্ট ডিজিটাল ক্লাস** (Digital multimedia classrooms)
7. **প্রতিষ্ঠানিক পরীক্ষার পূর্বে বিশেষ ক্লাসের ব্যবস্থা** (Special pre-exam preparation batches)

### Faculty & Instructors:
| Instructor Name | Subject | Role | Academic Background |
| :--- | :--- | :--- | :--- |
| **Ashraful Haque Akash** | Physics | Physics Instructor | **BRAC University (CSE)** |
| **Mosfer Hosen Sabbir** | Math | Math Instructor | **BUTEX (TMDM)** |
| **Azmain Hasan Ahsun** | ICT | ICT Instructor | **IUB (CSE)** |

---

## 🛠️ 3. Full-Stack Tech Stack

### Frontend (`/client`)
* **Framework:** React 18 with Vite & TypeScript
* **Styling:** Tailwind CSS v4, `@tailwindcss/vite`
* **Design System:** Custom Radix UI primitives (shadcn-inspired components)
* **Animations:** Framer Motion (page transitions, scroll triggers, interactive cards)
* **Icons:** Lucide React
* **State & Data Fetching:** TanStack React Query v5 + Axios
* **Form Management:** React Hook Form + Zod schema validation
* **Internationalization:** `react-i18next` (Bilingual: Bengali default, English toggle)
* **Typography:** Hind Siliguri (Bengali) + Inter (English)
* **Charts:** Recharts
* **SEO & Meta:** React Helmet Async

### Backend (`/server`)
* **Runtime:** Node.js + Express (REST API with TypeScript)
* **Database:** MongoDB Atlas + Mongoose ODM
* **Authentication:** JWT (Short-lived access token + rotating refresh token) stored in `httpOnly`, `secure`, `sameSite: strict` cookies
* **Password Security:** Salted Bcrypt hashing (12 rounds)
* **Validation:** Zod request schema validation (body, query, params)
* **Security Middleware:** Helmet, CORS (configurable allow-list), Express Rate Limit, Express Mongo Sanitize
* **File Uploads & Storage:** Multer (memory buffer) + AWS S3 / Cloudflare R2 with secure presigned download URLs

---

## 📁 4. Architecture & Monorepo Structure

```text
g:/A_Cube/
├── package.json              # Root workspace scripts (dev, build, seed)
├── .gitignore                # Global git ignore
├── .env.example              # Monorepo environment variable template
├── README.md                 # Complete documentation
│
├── server/                   # Backend Express + TypeScript API
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── src/
│       ├── index.ts          # Express entrypoint & middleware pipeline
│       ├── config/           # MongoDB connection, AWS S3 / R2, Zod env
│       ├── models/           # Mongoose schemas (User, Subject, Teacher, Material, etc.)
│       ├── controllers/      # Business logic (auth, student, admin, materials, etc.)
│       ├── routes/           # REST endpoints (/api/v1/*)
│       ├── middleware/       # JWT auth, RBAC, error handler, rate limiters, multer
│       ├── validators/       # Zod schemas for all requests
│       ├── utils/            # JWT helpers, S3 presigned URLs, constants
│       └── seed/             # Database seeding script with leaflet data
│
└── client/                   # Frontend Vite + React + TypeScript
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── main.tsx          # React application root
        ├── App.tsx           # React Router route hierarchy & guards
        ├── index.css         # Tailwind v4 theme & font declarations
        ├── lib/              # Axios instance, constants, cn() utility
        ├── i18n/             # i18next configuration + bn.json / en.json
        ├── contexts/         # AuthContext (sessions, current user)
        ├── hooks/            # useAuth, custom utility hooks
        ├── services/         # Axios API services (auth, material, student, admin)
        ├── components/
        │   ├── ui/           # Button, Card, Dialog, Table, Tabs, Select, Input, etc.
        │   ├── layout/       # Navbar, Footer, PublicLayout, StudentLayout, AdminLayout
        │   ├── landing/      # HeroSection, AboutSection, SubjectSection, Features, etc.
        │   └── common/       # ProtectedRoute, FileUpload, StatCard, SearchInput, Pagination
        └── pages/
            ├── public/       # HomePage, About, Subjects, Teachers, Contact
            ├── auth/         # LoginPage, AdminLoginPage, RegisterPage, Forgot/ResetPassword
            ├── student/      # StudentDashboard, SubjectMaterials, AllMaterials, Profile
            └── admin/        # AdminDashboard, StudentsManagement, Materials, Upload, etc.
```

---

## 💾 5. Database Schema & Data Models

### 1. `User`
* `name`: string
* `email`: string (unique, indexed)
* `phone`: string
* `password`: string (hashed with bcrypt, excluded by default)
* `role`: `'student' | 'admin'`
* `status`: `'pending' | 'active' | 'suspended'`
* `hscBatch`: string (e.g. `'HSC 2026'`, `'HSC 2027'`)
* `group`: string (e.g. `'Science'`)
* `refreshToken`: string (nullified on logout)
* `profileImage`: string

### 2. `Subject`
* `name`: string (`Physics`, `Math`, `ICT`)
* `namebn`: string (`পদার্থবিজ্ঞান`, `গণিত`, `তথ্য ও যোগাযোগ প্রযুক্তি`)
* `slug`: string (`physics`, `math`, `ict`)
* `description`: string
* `icon`: string
* `order`: number
* `isActive`: boolean

### 3. `Teacher`
* `name`: string
* `subject`: string
* `university`: string
* `designation`: string
* `bio`: string
* `photo`: string
* `displayOrder`: number
* `isActive`: boolean

### 4. `Material`
* `title`: string
* `description`: string
* `subjectId`: ObjectId (ref `Subject`)
* `category`: enum (`lecture-notes`, `pdf`, `class-slides`, `problem-sheets`, `assignments`, `question-banks`, `model-tests`, `previous-questions`, `other`)
* `fileKey`: string (S3 object key)
* `fileName`: string (original file name)
* `fileType`: string (MIME type)
* `fileSize`: number (bytes)
* `visibility`: `'public' | 'students' | 'batch'`
* `downloadCount`: number
* `isSample`: boolean
* `isActive`: boolean

### 5. `Announcement`
* `title`: string
* `description`: string
* `date`: Date
* `priority`: `'low' | 'medium' | 'high' | 'urgent'`
* `targetAudience`: `'all' | 'students' | 'batch'`
* `isActive`: boolean

### 6. `Exam`
* `title`: string
* `subject`: ObjectId (ref `Subject`)
* `date`: Date
* `totalMarks`: number
* `duration`: number (minutes)
* `description`: string
* `isActive`: boolean

### 7. `Settings`
* Key-value institute configuration (`academyName`, `address`, `phone1`, `phone2`, `tagline`, `email`)

---

## 🚀 6. Installation & Quickstart

### Prerequisites
* **Node.js** v18+ and **npm** v9+
* **MongoDB** (Local instance `mongodb://127.0.0.1:27017/acube-academy` or free MongoDB Atlas URI)

### Step 1: Clone & Install Dependencies
Run from the root repository directory:
```bash
# Install root, backend, and frontend dependencies
npm run install:all
```
*(Or individually: `npm install` in root, `cd server && npm install`, and `cd client && npm install`)*

---

### Step 2: Configure Environment Variables

1. In `/server/.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/acube-academy
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_characters_here!
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_characters_here!
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@acube.academy
ADMIN_PASSWORD=AdminPass123!
S3_BUCKET=acube-materials
S3_REGION=auto
S3_ENDPOINT=https://<your_account_id>.r2.cloudflarestorage.com
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
PRESIGNED_URL_EXPIRY=3600
MAX_FILE_SIZE=52428800
```

2. In `/client/.env`:
```env
VITE_API_URL=/api/v1
```

---

### Step 3: Seed the Database
Populate the database with the official leaflet data (Subjects, Teachers, Batches, Settings, Sample Notes):
```bash
npm run seed
```

Output:
```text
MongoDB Connected for Seeding
Database Seeded Successfully!
```

---

### Step 4: Run the Development Server
Run both client and server simultaneously using concurrently:
```bash
npm run dev
```

* **Client:** `http://localhost:5173`
* **Server API:** `http://localhost:5000/api/v1`

---

## 🔑 7. Default Credentials & Role Testing

### 🛡️ Admin Access
* **Login URL:** `http://localhost:5173/admin/login`
* **Email:** `admin@acube.academy`
* **Password:** `AdminPass123!`

### 🎓 Student Access
* **Registration URL:** `http://localhost:5173/register`
* **Login URL:** `http://localhost:5173/login`
* When a student registers, their status is set to `pending`.
* An admin can log into the Admin Dashboard (`/admin/students`), inspect their profile, and click **Approve** or **Suspend**.

---

## 🌐 8. REST API Endpoints Overview

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Public | Student signup (creates `pending` student) |
| `POST` | `/api/v1/auth/login` | Public | Student login with JWT cookies |
| `POST` | `/api/v1/auth/admin/login` | Public | Admin login with JWT cookies |
| `POST` | `/api/v1/auth/logout` | Authenticated | Clears cookies & invalidates session |
| `GET` | `/api/v1/auth/me` | Authenticated | Returns current authenticated profile |
| `GET` | `/api/v1/materials` | Authenticated | Paginated, searchable, filtered materials |
| `GET` | `/api/v1/materials/subject/:slug` | Authenticated | Subject-specific learning materials |
| `GET` | `/api/v1/materials/:id/download` | Authenticated | Generates secure presigned download URL |
| `POST` | `/api/v1/materials` | Admin | Upload file to S3 and save metadata |
| `PUT` | `/api/v1/materials/:id` | Admin | Update material metadata / replace file |
| `DELETE` | `/api/v1/materials/:id` | Admin | Delete file from S3 and database |
| `GET` | `/api/v1/teachers` | Public | List of instructors from leaflet |
| `GET` | `/api/v1/announcements` | Authenticated | Active student announcements |
| `GET` | `/api/v1/admin/dashboard` | Admin | System statistics, counts, and charts |
| `GET` | `/api/v1/admin/students` | Admin | Filterable, paginated student directory |
| `POST` | `/api/v1/admin/students/:id/approve` | Admin | Approve pending student registration |
| `POST` | `/api/v1/admin/students/:id/suspend` | Admin | Suspend active student account |

---

## 🔒 9. Security Architecture

1. **Token Security:** Access tokens (15m expiry) and refresh tokens (7d expiry) are never stored in `localStorage` or `sessionStorage` (preventing XSS theft). They are delivered strictly via `httpOnly`, `secure`, and `sameSite: strict` cookies.
2. **Password Protection:** Encrypted with Bcrypt with 12 rounds of salt hashing. Passwords are set with `select: false` on Mongoose schemas to avoid accidental leakage.
3. **Role-Based Access Control (RBAC):** Backend route middleware (`protect`, `authorize('admin')`) and React route guards (`ProtectedRoute role="admin" | "student"`) enforce strict privilege separation.
4. **Input Validation:** All incoming HTTP requests are validated using strict Zod schemas.
5. **NoSQL Injection & DoS Defense:** Integrated with `express-mongo-sanitize`, `helmet`, and `express-rate-limit`.
6. **Zero-Trust Private Storage:** Cloud storage buckets (Cloudflare R2 or AWS S3) are private. Material downloads are routed through short-lived presigned download URLs with logged access.

---

## 🚢 10. 100% Free Production Deployment Guide (Vercel + Render + MongoDB Atlas)

This entire platform can be hosted completely **FREE** forever with zero monthly charges using:
* **Frontend:** [Vercel](https://vercel.com) (Hobby Free Tier)
* **Backend:** [Render](https://render.com) (Free Web Service)
* **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (M0 Free Tier, 512MB)

---

### Step 1: Push Project to GitHub

1. Create a new repository on your GitHub account (e.g. `a-cube-academy`).
2. Run these commands from your local `A_Cube` root directory:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Set Up Free Database (MongoDB Atlas)

1. Sign up / Log in to [MongoDB Atlas](https://www.mongodb.com/atlas) (Free).
2. Click **Create Deployment** → Select **M0 (Free)** cluster (AWS or Google Cloud region).
3. **Database Access:** Create a user (e.g., `acubeadmin`) with a secure password.
4. **Network Access:** Add IP Address `0.0.0.0/0` (Allow Access from Anywhere) so Render can connect.
5. Click **Connect** → **Drivers** (Node.js) → Copy the connection string:
   `mongodb+srv://acubeadmin:<password>@cluster0.xxxx.mongodb.net/acube-academy?retryWrites=true&w=majority`

---

### Step 3: Deploy Backend on Render (Free Web Service)

1. Sign up / Log in to [Render](https://render.com) using your GitHub account.
2. Click **New +** → **Web Service** → Select your `a-cube-academy` GitHub repository.
3. Configure settings:
   * **Name:** `a-cube-academy-api`
   * **Region:** Singapore / Frankfurt / Oregon (any free region)
   * **Root Directory:** `server`
   * **Runtime:** `Node`
   * **Build Command:** `npm install --include=dev && npm run build`
   * **Start Command:** `npm run start`
   * **Instance Type:** `Free`
4. Add **Environment Variables** (under *Environment* tab):
   * `NODE_ENV` = `production`
   * `PORT` = `10000`
   * `MONGODB_URI` = *(Your MongoDB Atlas URI from Step 2)*
   * `JWT_ACCESS_SECRET` = `acube_super_access_secret_key_prod_32_chars!`
   * `JWT_REFRESH_SECRET` = `acube_super_refresh_secret_key_prod_32_chars!`
   * `CLIENT_URL` = `https://a-cube-academy.vercel.app` *(or your Vercel URL once generated)*
   * `ADMIN_EMAIL` = `admin@acube.academy`
   * `ADMIN_PASSWORD` = `AdminPass123!`
5. Click **Create Web Service**. Wait 2-3 minutes for deployment to finish.
6. Copy your Render backend URL: `https://a-cube.onrender.com`.

---

### Step 4: Seed Database with Leaflet Data (One-Time)

The live database has been seeded with authentic teachers, subjects, batches, and sample materials via Atlas connection!

---

### Step 5: Deploy Frontend on Vercel (Free)

1. Sign up / Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New...** → **Project** → Import your `A_Cube` repository.
3. In the project setup screen:
   * **Root Directory:** Click *Edit* and select **`client`**.
   * **Framework Preset:** `Vite` (automatically detected).
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. In **Environment Variables**:
   * Name: `VITE_API_URL`
   * Value: `https://a-cube.onrender.com/api/v1`
5. Click **Deploy**.
6. In about 30 seconds, Vercel will give you a live production URL (e.g. `https://a-cube-academy.vercel.app`)!

---

### Step 6: Final Verification
* Open your Vercel URL.
* Test language toggle (`[ বাং | EN ]`).
* Test Teacher cards and poster preview modals.
* Log in as Admin (`admin@acube.academy` / `AdminPass123!`) at `/admin/login`.
* Log in as Student (`student@acube.academy` / `StudentPass123!`) at `/login`.

---

## ✅ 11. Testing & Verification Checklist

- [x] **Database Seeding:** Verified with authentic teachers, subjects, batches, and sample materials.
- [x] **Default Admin Credentials:** `admin@acube.academy` / `AdminPass123!` at `/admin/login`.
- [x] **Default Student Credentials:** `student@acube.academy` / `StudentPass123!` at `/login`.
- [x] **Backend Build:** Verified TypeScript compilation (`tsc`) exits with code 0.
- [x] **Frontend Build:** Verified Vite production bundle (`tsc && vite build`) builds with 0 errors.
- [x] **Automated E2E Test Suite (`test-e2e.mjs`):** 24/24 test assertions passed across public endpoints, auth, pending guards, admin approvals, student portal, and presigned downloads.
- [x] **Authentication Loop Guard:** Bypasses 401 refresh on auth routes; eliminates infinite reload loops during unauthenticated visits.
- [x] **Role Access Control:** Protected routes block unauthorized roles and redirect unauthenticated users.
- [x] **Pending Approval Flow:** Students in `pending` state receive an informational hold screen until approved by Admin.
- [x] **Bilingual Support:** Complete Bengali (`bn.json`) and English (`en.json`) translations with dynamic runtime toggle.
- [x] **Official Teacher Poster Cards:** Integrated official high-resolution photography, signature punchlines, experience badges, and interactive poster lightbox modal.
- [x] **Responsive Mobile Layout:** Navigation hamburger drawer, adaptable grid layouts, and mobile-friendly touch targets.

---

© 2026 **A-Cube Academy**. All Rights Reserved.  
*ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯* | *01781-760998, 01995-516182*
