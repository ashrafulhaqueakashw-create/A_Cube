# 🏗️ Implementation Plan & Build Order
## Project: A-Cube Academy Web Application
**Document Version:** 1.0.0  
**Methodology:** Incremental Phase-by-Phase Construction with Continuous Verification

---

## 1. Development Sequence Roadmap

The application follows a strict 11-phase build sequence ensuring that foundational layers (architecture, database models, and authentication) are fully operational and verified before building dependent features (student portal, material streaming, and administrative operations).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DEVELOPMENT ROADMAP                             │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Monorepo Setup, Tooling & Design System Primitives            │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 2: Public Marketing Portal & Authentic Leaflet Identity          │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 3: Database Modeling, Mongoose Schemas & Leaflet Data Seeding    │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 4: Secure Authentication Gateway & RBAC Pipeline                 │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 5: Student Learning Portal & Categorized Subject Libraries       │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 6: Cloud Storage, Multer Buffering & Presigned S3 Downloads      │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 7: Administrative Console, Analytics & Student Verification      │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 8: Notice Board, Exam Routine & Institute Settings CRUD          │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 9: Security Hardening, Rate Limiting & Input Sanitization        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 10: Responsive Mobile Optimization, Bilingual i18n & A11y        │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 11: End-to-End Build Verification & Production Deployment        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase-by-Phase Technical Breakdown

### Phase 1: Monorepo Setup, Tooling & Design System Primitives
* **Objective:** Establish the development environment, package management, and reusable UI foundation.
* **Actions:**
  1. Configure root `package.json` with `concurrently` orchestration (`dev`, `build`, `seed`, `install:all`).
  2. Bootstrap `/server` with Node.js, Express, TypeScript (`tsconfig.json`), and nodemon/tsx.
  3. Bootstrap `/client` with Vite, React 18, TypeScript, and `@tailwindcss/vite` (Tailwind CSS v4).
  4. Implement font loader in `index.html` importing Google Fonts *Hind Siliguri* (Bengali) and *Inter* (English).
  5. Define `@theme` design tokens in [index.css](file:///g:/A_Cube/client/src/index.css) (Deep Navy `#1e3a5f`, Sky Blue `#38bdf8`, Cyan `#06b6d4`).
  6. Build headless Radix UI wrapper primitives (`Button`, `Card`, `Input`, `Dialog`, `Select`, `Table`, `Tabs`, `Avatar`, `Badge`, `Skeleton`).
  7. Configure `react-i18next` with `bn.json` (Bengali default) and `en.json` (English toggle).
* **Verification Gate:** `npm run dev` launches client on `:5173` and server on `:5000` without errors.

---

### Phase 2: Public Marketing Portal & Authentic Leaflet Identity
* **Objective:** Build a high-converting public landing page reflecting the authentic leaflet specifications.
* **Actions:**
  1. Construct sticky frosted [Navbar.tsx](file:///g:/A_Cube/client/src/components/layout/Navbar.tsx) with language toggle and slide-out mobile drawer.
  2. Build [HeroSection.tsx](file:///g:/A_Cube/client/src/components/landing/HeroSection.tsx) featuring the headline *"HSC + Admission প্রস্তুতির নতুন ঠিকানা"*, animated subject badges, and dual action CTAs.
  3. Create [AboutSection.tsx](file:///g:/A_Cube/client/src/components/landing/AboutSection.tsx) detailing concept-based pedagogy and digital classrooms.
  4. Develop [SubjectSection.tsx](file:///g:/A_Cube/client/src/components/landing/SubjectSection.tsx) with interactive cards for Physics, Math, and ICT.
  5. Implement [FeaturesSection.tsx](file:///g:/A_Cube/client/src/components/landing/FeaturesSection.tsx) displaying the 7 authentic leaflet offerings.
  6. Construct [TeacherSection.tsx](file:///g:/A_Cube/client/src/components/landing/TeacherSection.tsx) with authentic faculty profiles:
     * *Ashraful Haque Akash* — Physics (BRAC University CSE)
     * *Mosfer Hosen Sabbir* — Math (BUTEX TMDM)
     * *Azmain Hasan Ahsun* — ICT (IUB CSE)
  7. Assemble [HowItWorksSection.tsx](file:///g:/A_Cube/client/src/components/landing/HowItWorksSection.tsx) (4-step visual student timeline).
  8. Build [CTASection.tsx](file:///g:/A_Cube/client/src/components/landing/CTASection.tsx) promoting the Student Portal.
  9. Implement [ContactSection.tsx](file:///g:/A_Cube/client/src/components/landing/ContactSection.tsx) with Khilkhet address, one-tap hotline dialing (`01781-760998`, `01995-516182`), WhatsApp integration, and map placeholder.
  10. Create [Footer.tsx](file:///g:/A_Cube/client/src/components/layout/Footer.tsx).
* **Verification Gate:** Visual review across desktop and mobile; all leaflet information accurately represented; no broken anchors.

---

### Phase 3: Database Modeling, Mongoose Schemas & Leaflet Data Seeding
* **Objective:** Establish persistent MongoDB storage and populate baseline records.
* **Actions:**
  1. Initialize MongoDB connection in [db.ts](file:///g:/A_Cube/server/src/config/db.ts) with retry and error listeners.
  2. Implement Mongoose schemas: `User`, `Subject`, `Teacher`, `Material`, `Batch`, `Announcement`, `Exam`, `ExamResult`, `DownloadLog`, `Settings`.
  3. Write database seeder in [seed.ts](file:///g:/A_Cube/server/src/seed/seed.ts):
     * Default Admin: `admin@acube.academy` / `AdminPass123!` (Bcrypt hashed).
     * 3 Core Subjects: Physics (`physics`), Math (`math`), ICT (`ict`) with Bengali titles.
     * 3 Authentic Instructors from leaflet with bios and credentials.
     * Batches: HSC 2026, HSC 2027.
     * Institute Settings: Address, hotline phones, official email.
     * Curated sample study sheets across all 3 subjects (Vectors, Calculus, C-Programming).
* **Verification Gate:** `npm run seed` connects to MongoDB and populates all collections cleanly.

---

### Phase 4: Secure Authentication Gateway & RBAC Pipeline
* **Objective:** Implement full authentication lifecycle with strict role separation.
* **Actions:**
  1. Implement [jwt.ts](file:///g:/A_Cube/server/src/utils/jwt.ts) to generate and verify Access (15m) and Refresh (7d) tokens.
  2. Build [authController.ts](file:///g:/A_Cube/server/src/controllers/authController.ts):
     * `register`: Creates student with `role: 'student'` and `status: 'pending'`.
     * `login`: Validates credentials, checks account status, signs tokens, dispatches `httpOnly` cookies.
     * `adminLogin`: Validates credentials, enforces `role === 'admin'`.
     * `refreshToken`: Verifies refresh cookie, rotates access token.
     * `logout`: Invalidates refresh token in DB, clears cookies.
     * `getMe`: Returns current user identity.
  3. Implement [auth.ts](file:///g:/A_Cube/server/src/middleware/auth.ts) middleware with `protect` and `authorize(...roles)`.
  4. Build frontend [AuthContext.tsx](file:///g:/A_Cube/client/src/contexts/AuthContext.tsx) and [useAuth.ts](file:///g:/A_Cube/client/src/hooks/useAuth.ts).
  5. Configure Axios 401 response interceptor in [axios.ts](file:///g:/A_Cube/client/src/lib/axios.ts).
  6. Implement [ProtectedRoute.tsx](file:///g:/A_Cube/client/src/components/common/ProtectedRoute.tsx) handling unauthenticated redirects, role mismatch (403), and pending/suspended account states.
  7. Build authentication pages: [LoginPage.tsx](file:///g:/A_Cube/client/src/pages/auth/LoginPage.tsx), [AdminLoginPage.tsx](file:///g:/A_Cube/client/src/pages/auth/AdminLoginPage.tsx), [RegisterPage.tsx](file:///g:/A_Cube/client/src/pages/auth/RegisterPage.tsx).
* **Verification Gate:** Student cannot access `/admin`; student with `pending` status is held at approval screen; admin logs in to `/admin/dashboard`.

---

### Phase 5: Student Learning Portal & Categorized Subject Libraries
* **Objective:** Enable authenticated students to browse and access subject-specific study sheets.
* **Actions:**
  1. Build [StudentLayout.tsx](file:///g:/A_Cube/client/src/components/layout/StudentLayout.tsx) with responsive sidebar, active route indicators, and mobile bottom bar/drawer.
  2. Create [StudentDashboard.tsx](file:///g:/A_Cube/client/src/pages/student/StudentDashboard.tsx) displaying metric cards, subject fast-lanes, recent materials, and announcements.
  3. Implement reusable [SubjectMaterialsPage.tsx](file:///g:/A_Cube/client/src/pages/student/SubjectMaterialsPage.tsx) mapped to `/student/physics`, `/student/math`, `/student/ict`.
  4. Implement live search, category filtering (Lecture Notes, PDFs, Class Slides, Problem Sheets, etc.), and sort selector.
  5. Build [AllMaterialsPage.tsx](file:///g:/A_Cube/client/src/pages/student/AllMaterialsPage.tsx) with combined subject filtering.
  6. Implement [AnnouncementsPage.tsx](file:///g:/A_Cube/client/src/pages/student/AnnouncementsPage.tsx) and [ExamsPage.tsx](file:///g:/A_Cube/client/src/pages/student/ExamsPage.tsx).
  7. Construct [StudentProfile.tsx](file:///g:/A_Cube/client/src/pages/student/StudentProfile.tsx) with batch updates and password change.
* **Verification Gate:** Students can browse materials, switch categories, search topics, and view exam routines with sub-second TanStack Query response.

---

### Phase 6: Cloud Storage, Multer Buffering & Presigned S3 Downloads
* **Objective:** Implement zero-trust private cloud storage for all educational assets.
* **Actions:**
  1. Configure AWS S3 Client SDK v3 in [s3.ts](file:///g:/A_Cube/server/src/config/s3.ts).
  2. Implement [s3Utils.ts](file:///g:/A_Cube/server/src/utils/s3Utils.ts) with `uploadToS3`, `deleteFromS3`, and `getPresignedDownloadUrl`.
  3. Configure Multer memory storage in [upload.ts](file:///g:/A_Cube/server/src/middleware/upload.ts) with MIME-type filtering and 50MB ceiling.
  4. Implement `GET /api/v1/materials/:id/download` endpoint verifying active student status, incrementing `downloadCount`, logging the download audit trail in `downloadlogs`, and returning a 1-hour presigned URL.
  5. Connect frontend "Download" buttons directly to the presigned URL streaming endpoint.
* **Verification Gate:** Clicking download initiates a direct file download from the cloud bucket; public unauthenticated downloads are rejected.

---

### Phase 7: Administrative Console, Analytics & Student Verification
* **Objective:** Build the complete authority control panel for coaching centre staff.
* **Actions:**
  1. Build [AdminLayout.tsx](file:///g:/A_Cube/client/src/components/layout/AdminLayout.tsx) with SaaS-grade sidebar navigation.
  2. Construct [AdminDashboard.tsx](file:///g:/A_Cube/client/src/pages/admin/AdminDashboard.tsx) with Recharts bar chart (materials by subject) and pie chart (student status breakdown).
  3. Implement [StudentsManagement.tsx](file:///g:/A_Cube/client/src/pages/admin/StudentsManagement.tsx) data table with search, status filter (`Pending`, `Active`, `Suspended`), batch filter, and actions:
     * Approve: Calls `POST /admin/students/:id/approve` -> Student status becomes `active`.
     * Suspend: Calls `POST /admin/students/:id/suspend` -> Student status becomes `suspended`.
     * Reset Password: Modal to issue temporary password.
     * Delete: Guarded by Radix `AlertDialog` confirmation.
  4. Develop [MaterialUpload.tsx](file:///g:/A_Cube/client/src/pages/admin/MaterialUpload.tsx) form with drag-and-drop file upload, subject/category selection, and upload progress feedback.
  5. Implement [MaterialsManagement.tsx](file:///g:/A_Cube/client/src/pages/admin/MaterialsManagement.tsx) and [MaterialEdit.tsx](file:///g:/A_Cube/client/src/pages/admin/MaterialEdit.tsx).
* **Verification Gate:** Admin approves a pending student; student instantly gains access to previously locked study materials.

---

### Phase 8: Notice Board, Exam Routine & Institute Settings CRUD
* **Objective:** Enable dynamic updates to faculty, notices, exams, and institute contact details.
* **Actions:**
  1. Implement [TeachersManagement.tsx](file:///g:/A_Cube/client/src/pages/admin/TeachersManagement.tsx) for managing public faculty cards.
  2. Implement [SubjectsManagement.tsx](file:///g:/A_Cube/client/src/pages/admin/SubjectsManagement.tsx).
  3. Build [AnnouncementsManagement.tsx](file:///g:/A_Cube/client/src/pages/admin/AnnouncementsManagement.tsx) for publishing notices with priority levels (`urgent`, `high`, `medium`, `low`).
  4. Build [ExamsManagement.tsx](file:///g:/A_Cube/client/src/pages/admin/ExamsManagement.tsx) for scheduling exam dates, durations, and marks.
  5. Implement [AdminSettings.tsx](file:///g:/A_Cube/client/src/pages/admin/AdminSettings.tsx) for modifying institute name, hotline numbers, and physical address.
* **Verification Gate:** Updating an announcement or contact number in the admin console immediately reflects on the student dashboard and public landing page.

---

### Phase 9: Security Hardening, Rate Limiting & Input Sanitization
* **Objective:** Protect the application against common web vulnerabilities.
* **Actions:**
  1. Integrate Helmet HTTP headers in Express pipeline.
  2. Configure CORS allowlist restricting requests to `process.env.CLIENT_URL` with credentials allowed.
  3. Apply rate limiters in [rateLimiter.ts](file:///g:/A_Cube/server/src/middleware/rateLimiter.ts) for general routes, authentication endpoints, and file uploads.
  4. Integrate `express-mongo-sanitize` to neutralize NoSQL injection patterns.
  5. Enforce compiled Zod validators on all request payloads.
  6. Implement centralized error handler in [errorHandler.ts](file:///g:/A_Cube/server/src/middleware/errorHandler.ts) masking internal stack traces in production.
* **Verification Gate:** Rapid sequential login attempts trigger HTTP 429; malformed inputs return structured Zod error messages.

---

### Phase 10: Responsive Mobile Optimization, Bilingual i18n & A11y
* **Objective:** Ensure seamless UX across devices, languages, and accessibility standards.
* **Actions:**
  1. Verify zero horizontal scrolling across viewports: 320px, 375px, 768px, 1024px, 1440px.
  2. Implement segmented interactive language toggle (`[ বাং | EN ]`) with persistent `localStorage` saving.
  3. Wire dynamic `useTranslation()` localization across all public landing sections and navigation bars.
  4. Optimize Leaflet feature grid (`Why A-Cube`) into a symmetrical 4+3 centered flex layout eliminating asymmetric orphaned rows.
  5. Refine Axios 401 response interceptor with authentication endpoint bypass to prevent infinite reload loops during unauthenticated visits.
  6. Harden rate limiters with JSON structured payloads and high local development allowances.
  7. Integrate official teacher promotional card photography (`/images/teachers/`) across Hero mentor panel, Subject cards, and Teacher section.
  8. Implement interactive high-resolution poster lightbox modal in Teacher section with signature punchlines and experience chips.
  9. Validate WCAG 2.1 AA color contrast ratios for text on dark navy and sky blue backgrounds.
  10. Ensure accessible keyboard navigation and ARIA attributes on modals, tabs, and form controls.
* **Verification Gate:** Flawless mobile rendering on smartphone viewports; language toggle updates UI strings instantly; feature section displays in clean 4+3 balance; teacher promotional cards and punchlines render crisply with functional modal previews; admin and student logins authenticate reliably.

---

### Phase 11: End-to-End Build Verification & 100% Free Production Deployment
* **Objective:** Validate end-to-end production readiness and configure 100% free hosting infrastructure (Vercel + Render + MongoDB Atlas).
* **Actions:**
  1. Execute `npm run build` in `/server` to verify TypeScript compilation exits with code 0.
  2. Execute `npm run build` in `/client` to verify Vite bundle optimization succeeds with code 0.
  3. Formulate SPA rewrite rules in `client/vercel.json` and root `vercel.json` to prevent 404s on route refresh.
  4. Formulate Infrastructure-as-Code manifest in `render.yaml` for zero-cost Render Web Service deployments.
  5. Configure dynamic Axios base URL (`import.meta.env.VITE_API_URL || '/api/v1'`) and cross-domain production cookie security (`sameSite: 'none'`, `secure: true`) for seamless Vercel-to-Render communication.
  6. Add MongoDB Atlas M0 (512MB free) cluster provisioning and one-time database seeding instructions.
  7. Formulate a step-by-step zero-cost deployment manual in [README.md](file:///g:/A_Cube/README.md).
* **Verification Gate:** Clean build output; all automated checks pass; production configuration handles cross-origin cookies and dynamic routing.

---

## 3. Implementation Verification & Test Results

### 3.1 Automated E2E Test Suite Execution (`test-e2e.mjs`)
The complete system was verified using the end-to-end testing script spanning all 6 major tiers:
- **Suite 1: Frontend Client & Meta:** HTML serves HTTP 200, mobile viewport tag present, Hind Siliguri and Inter fonts imported, title includes A-Cube Academy. (5/5 PASS)
- **Suite 2: Public APIs & Leaflet Data Accuracy:** Teachers API returns 3 authentic faculty members (Ashraful Haque Akash - BRAC, Mosfer Hosen Sabbir - BUTEX, Azmain Hasan Ahsun - IUB). Subjects API returns Physics, Math, ICT. Settings API returns Khilkhet address and official hotlines (`01781-760998`, `01995-516182`). (7/7 PASS)
- **Suite 3: Student Registration & Pending Approval:** Registration endpoint creates user with `pending` status. Login prior to admin approval is rejected with HTTP 403 Forbidden. (2/2 PASS)
- **Suite 4: Admin Authentication & Student Approval:** Admin logs in via `/api/v1/auth/admin/login`, verifies admin metrics, locates student in pending directory, approves student to `active` status, posts urgent notice, and schedules model test exam. (6/6 PASS)
- **Suite 5: Approved Student Portal & Material Access:** Approved student logs in, verifies active status via `/api/v1/auth/me`, views enrolled subjects & dashboard stats, browses Physics lecture notes, filters Calculus sheets, generates secure S3 presigned download URL, and receives announcements & exam routines. (8/8 PASS)
- **Suite 6: Security RBAC Guard:** Authenticated student attempting to access administrative endpoints (`/api/v1/admin/dashboard`) is rejected with HTTP 403 Forbidden. (1/1 PASS)

**Total Assertions:** 24/24 Passed (100% Success Rate).

### 3.2 Production Build Verification
- **Backend TypeScript Compilation:** `npm run build` in `/server` executed `tsc` with exit code 0 and zero type errors.
- **Frontend Production Bundle:** `npm run build` in `/client` executed `tsc && vite build` with exit code 0, producing minified and optimized production assets in `/dist`.
