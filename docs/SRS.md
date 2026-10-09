# 📑 Software Requirements Specification (SRS)
## Project: A-Cube Academy Web Application
**Standard Compliance:** IEEE Std 830-1998 Format  
**Document Version:** 1.0.0  
**Status:** Approved for Production Deployment  
**Organization:** A-Cube Academy (Khilkhet, Dhaka, Bangladesh)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) establishes the complete functional and non-functional specifications for the **A-Cube Academy** web platform. It serves as the definitive contractual and technical reference for developers, quality assurance engineers, system administrators, and academy stakeholders.

### 1.2 Scope of the Software
The software is a full-stack web application designed for **A-Cube Academy**, an academic coaching institute in Khilkhet, Dhaka, Bangladesh offering Higher Secondary Certificate (**HSC**) and University Admission preparation in:
* **Physics (পদার্থবিজ্ঞান)**
* **Higher Mathematics (উচ্চতর গণিত)**
* **Information & Communication Technology (ICT / তথ্য ও যোগাযোগ প্রযুক্তি)**

The platform encompasses:
1. A public, SEO-optimized marketing web portal presenting authentic faculty credentials, pedagogical features from the official leaflet, subject offerings, and direct contact avenues.
2. A secure, role-based Student Learning Portal facilitating access to subject-categorized lecture notes, problem sheets, formula sheets, announcements, and examination routines.
3. An Administrative Management Console empowering authority personnel to verify/approve student registrations, manage study assets via private cloud storage (AWS S3 / Cloudflare R2), schedule tests, and maintain public institute configurations.

### 1.3 Definitions, Acronyms, and Abbreviations
* **ACL:** Access Control List
* **API:** Application Programming Interface
* **CORS:** Cross-Origin Resource Sharing
* **CSRF:** Cross-Site Request Forgery
* **HSC:** Higher Secondary Certificate (Grades 11–12 in Bangladesh)
* **JWT:** JSON Web Token
* **LMS:** Learning Management System
* **MIME:** Multipurpose Internet Mail Extensions
* **ODM:** Object Data Modeling (Mongoose)
* **RBAC:** Role-Based Access Control
* **SPA:** Single Page Application
* **SRS:** Software Requirements Specification
* **XSS:** Cross-Site Scripting

### 1.4 References
* Official A-Cube Academy Physical Information Leaflet (Dhumnee Paschim Para, Khilkhet, Dhaka).
* IEEE Std 830-1998: *IEEE Recommended Practice for Software Requirements Specifications*.
* OWASP Top 10 Web Application Security Risks (2021).
* W3C Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

---

## 2. Overall Description

### 2.1 Product Perspective
A-Cube Academy is an autonomous, self-contained web platform operating under a client-server architecture. The frontend Single Page Application (SPA) runs within modern desktop and mobile web browsers, interfacing asynchronously with an Express.js REST API over secure HTTPS protocols. The backend coordinates with a managed MongoDB database cluster and an S3-compatible object storage repository.

```
┌─────────────────────────────────┐
│     Client Web Browser (SPA)    │
│  React 18 + Vite + Tailwind v4  │
└────────────────┬────────────────┘
                 │ HTTPS / Cookies
                 ▼
┌─────────────────────────────────┐
│     Backend Application API     │
│   Node.js / Express.js / Zod    │
└────────┬───────────────┬────────┘
         │               │
         ▼               ▼
┌─────────────────┐ ┌─────────────────┐
│  MongoDB Atlas  │ │ AWS S3 / R2 Bucket│
│ (Metadata & DB) │ │ (Private Assets)│
└─────────────────┘ └─────────────────┘
```

### 2.2 Product Functions
* **Public Information Broadcasting:** Dynamic presentation of institutional identity, teacher qualifications, syllabus overviews, and physical address.
* **Identity & Access Management:** User registration, password encryption, cookie-based dual-token session management, and role-based route protection.
* **Student Verification Workflow:** Administrative approval pipeline transitioning student accounts from `pending` to `active` or `suspended`.
* **Educational Asset Repository:** Categorical cataloging of lecture sheets, slides, and model tests with search, sorting, and presigned private cloud download links.
* **Institutional Communication:** Publication and priority tagging of notices and examination routines.
* **Administrative Analytics:** Visual metrics on student enrollment statuses and subject material counts via interactive charts.

### 2.3 User Classes and Characteristics
1. **Public Visitor / Prospective Student & Parent:** Unauthenticated user evaluating coaching quality, teacher credentials, and physical location. Technical expertise: Basic smartphone/web browsing.
2. **Enrolled Student:** Authenticated user with `role: 'student'` and `status: 'active'`. Accesses subject learning materials, schedules, and profile settings. Technical expertise: Moderate.
3. **Academy Administrator / Instructor:** Authenticated authority with `role: 'admin'`. Oversees student approvals, uploads files, publishes exam schedules, and edits public content. Technical expertise: Moderate to Advanced.

### 2.4 Operating Environment
* **Server Runtime:** Node.js v18.0.0 or higher on Linux (Ubuntu/Debian) or containerized environments (Docker, Render, Railway).
* **Database Engine:** MongoDB v6.0+ (Atlas hosted replica set).
* **Client Environment:** Modern evergreen web browsers supporting ES2020+ (Chrome, Firefox, Safari, Edge, Mobile Chrome, Mobile Safari).

### 2.5 Design and Implementation Constraints
* **Language & Localization:** Bengali must be the primary language of interface communication with native fonts (*Hind Siliguri*), with a full English toggle available throughout.
* **Storage Cost & Security:** Proprietary PDFs must not reside in public storage. Presigned download URLs must expire within 3600 seconds.
* **File Upload Threshold:** Single file uploads capped at 50MB.

---

## 3. Specific Requirements

### 3.1 External Interface Requirements

#### 3.1.1 User Interfaces
* **Responsive Breakpoints:** Fully functional at 320px, 375px, 768px, 1024px, 1280px, and 1440px.
* **Typography:** Hind Siliguri for Bengali typography; Inter for numeric metadata and English text.
* **Color Schemes:** Deep Navy (`#1e3a5f`), Sky Blue (`#38bdf8`), Cyan (`#06b6d4`), Pure White (`#ffffff`), Slate neutrals.

#### 3.1.2 Software Interfaces
* **Database Driver:** Mongoose v8.2+ connecting via MongoDB Wire Protocol over TLS.
* **Cloud Storage API:** AWS S3 SDK v3 using standard S3 REST protocol (`PutObjectCommand`, `GetObjectCommand`, `DeleteObjectCommand`).

#### 3.1.3 Communications Interfaces
* Communication between client and server executed exclusively over HTTPS using JSON request/response envelopes.
* Cross-domain cookie delivery secured via `SameSite=Strict`, `Secure` (production), and `HttpOnly` flags.

---

### 3.2 Functional Requirements

#### Module 1: Authentication & Access Control
* **REQ-AUTH-01:** The system shall allow new students to register with Name, Phone, Email, Password, HSC Batch, and Group.
* **REQ-AUTH-02:** All newly registered student accounts shall automatically initialize with `status: 'pending'`.
* **REQ-AUTH-03:** The system shall hash passwords using Bcrypt with 12 salt rounds before database persistence.
* **REQ-AUTH-04:** The system shall issue a 15-minute Access Token and a 7-day Refresh Token upon valid login, transmitted strictly via `httpOnly` cookies.
* **REQ-AUTH-05:** The system shall provide an endpoint (`POST /api/v1/auth/refresh-token`) to transparently renew expired access tokens.
* **REQ-AUTH-06:** The system shall prevent students with `status: 'pending'` from accessing the learning material repository, rendering a clear pending verification screen.
* **REQ-AUTH-07:** The system shall block accounts with `status: 'suspended'` from logging into any portal.
* **REQ-AUTH-08:** The system shall provide an administrative login route (`POST /api/v1/auth/admin/login`) that rejects users without `role: 'admin'`.

#### Module 2: Public Marketing Portal
* **REQ-PUB-01:** The landing page shall feature the authentic headline *"HSC + Admission প্রস্তুতির নতুন ঠিকানা"* and official hotline numbers `01781-760998` and `01995-516182`.
* **REQ-PUB-02:** The landing page shall showcase the 3 core subjects (Physics, Math, ICT) with dedicated cards linking to the student portal.
* **REQ-PUB-03:** The landing page shall display faculty profile cards for *Ashraful Haque Akash* (BRAC CSE), *Mosfer Hosen Sabbir* (BUTEX TMDM), and *Azmain Hasan Ahsun* (IUB CSE).
* **REQ-PUB-04:** The landing page shall display the 7 core features from the official leaflet.
* **REQ-PUB-05:** The landing page shall feature direct telephonic dialing (`tel:`) and WhatsApp click-to-chat integration.
* **REQ-PUB-06:** The system shall support runtime language switching between Bengali (`bn`) and English (`en`) without requiring page reload.

#### Module 3: Student Learning Portal
* **REQ-STU-01:** The student dashboard shall display aggregate counts for Enrolled Subjects, Available Materials, Active Announcements, and Upcoming Exams.
* **REQ-STU-02:** The system shall provide dedicated material portals for `/student/physics`, `/student/math`, and `/student/ict`.
* **REQ-STU-03:** The student portal shall allow filtering study materials by categories: Lecture Notes, PDFs, Class Slides, Problem Sheets, Assignments, Question Banks, Model Tests, and Previous Questions.
* **REQ-STU-04:** The student portal shall provide debounced live text search querying material titles and descriptions.
* **REQ-STU-05:** The system shall allow authorized students to request presigned download URLs for active materials.
* **REQ-STU-06:** The student portal shall present official announcements categorized by priority (`urgent`, `high`, `medium`, `low`).
* **REQ-STU-07:** The student portal shall display examination routines categorized into Upcoming and Past exams.
* **REQ-STU-08:** The student shall have the ability to update their phone number and change their password.

#### Module 4: Administrative Management Console
* **REQ-ADM-01:** The admin dashboard shall display real-time counters for Total Students, Active Students, Pending Students, Total Materials, Total Teachers, and Announcements.
* **REQ-ADM-02:** The admin dashboard shall render a bar chart displaying materials distribution across subjects and a pie chart showing student status distribution.
* **REQ-ADM-03:** The admin console shall provide a student management table supporting search, filtering by status (`pending`, `active`, `suspended`), and batch.
* **REQ-ADM-04:** The admin console shall enable one-click approval of pending students, immediately granting them portal access.
* **REQ-ADM-05:** The admin console shall enable suspension and administrative password resets for student accounts.
* **REQ-ADM-06:** The admin console shall provide a drag-and-drop file upload form supporting documents up to 50MB, targeting specific subjects, categories, and batches.
* **REQ-ADM-07:** The admin console shall allow full CRUD management of faculty teacher profiles, subjects, announcements, exam routines, and institute contact settings.

#### Module 5: Storage & Cloud Asset Streaming
* **REQ-STR-01:** Uploaded files shall be streamed to a private S3-compatible cloud storage bucket with unique UUID keys.
* **REQ-STR-02:** The system shall restrict file uploads to standard document and image MIME types (`.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.xls`, `.xlsx`, `.zip`, images).
* **REQ-STR-03:** Material download links shall be generated via cryptographically signed presigned URLs valid for 3600 seconds.
* **REQ-STR-04:** Every download event shall increment the material's `downloadCount` and record an entry in the `downloadlogs` collection.
* **REQ-STR-05:** Deleting a material record shall delete both the cloud storage object and the MongoDB database record.

---

### 3.3 Non-Functional Requirements

#### 3.3.1 Security Requirements
* **SEC-01:** Zero storage of clear-text passwords; Bcrypt hashing enforced with 12 rounds.
* **SEC-02:** NoSQL injection prevention via `express-mongo-sanitize`.
* **SEC-03:** Rate limiting enforced: maximum 10 authentication attempts per 15 minutes per IP.
* **SEC-04:** Strict Cross-Origin Resource Sharing (CORS) allowlist matching frontend origin.
* **SEC-05:** Standard HTTP security headers applied via Helmet.

#### 3.3.2 Performance Requirements
* **PERF-01:** API response times for cached student queries shall remain under 150ms under normal load.
* **PERF-02:** First Contentful Paint (FCP) of the public landing page shall remain under 1.5 seconds on standard 4G networks.
* **PERF-03:** Frontend client bundle size shall remain under 400 kB gzipped.

#### 3.3.3 Reliability & Availability
* **REL-01:** The platform shall target 99.9% uptime during academic operating hours (07:00 – 23:00 BST).
* **REL-02:** MongoDB database connections shall implement automatic reconnection backoff upon transient network drops.

#### 3.3.4 Maintainability & Extensibility
* **MNT-01:** Strict TypeScript static typing across 100% of codebase files.
* **MNT-02:** Modular route and controller architecture allowing effortless addition of new subjects or academic branches.

---

## 4. Verification & Traceability Matrix

| Requirement ID | Verification Method | Acceptance Criteria | Status |
| :--- | :--- | :--- | :--- |
| **REQ-AUTH-01** | Functional Integration Test | Submitting valid form creates a user document in MongoDB with `status: 'pending'`. | **PASSED** (Suite 3) |
| **REQ-AUTH-04** | Security Inspection | HTTP response contains `Set-Cookie` headers with `HttpOnly` and `SameSite=Strict`. | **PASSED** (Suite 4 & 5) |
| **REQ-AUTH-06** | Role Guard Test | Logging in as a pending student rejects with HTTP 403; access to private materials blocked. | **PASSED** (Suite 3) |
| **REQ-PUB-01** | Visual UI Inspection | Landing page displays correct phone numbers, address, and headline from the leaflet. | **PASSED** (Suite 1 & 2) |
| **REQ-STU-05** | Functional End-to-End Test | Clicking download returns HTTP 200 with presigned S3 URL; download count increments by 1. | **PASSED** (Suite 5) |
| **REQ-ADM-04** | Administrative Flow Test | Admin clicks "Approve"; target student's status updates to `active`; student can immediately download files. | **PASSED** (Suite 4) |
| **REQ-STR-02** | Validation Unit Test | Uploading invalid file formats or excessive payloads rejected by middleware. | **PASSED** (Zod & Multer) |
| **REQ-RBAC-01** | RBAC Isolation Test | Authenticated students accessing admin routes rejected with HTTP 403 Forbidden. | **PASSED** (Suite 6) |
| **REQ-I18N-01** | UI Dynamic Localization | Segmented language pill switches UI instantaneously between Bengali and English. | **PASSED** (Vite & i18next) |
| **REQ-UI-01** | Layout Symmetry Test | 7-item leaflet feature cards render in balanced 4+3 centered layout without orphaned rows. | **PASSED** (Flexbox Centered) |
| **REQ-AUTH-07** | Auth Loop Guard & Resilience | Bypasses 401 refresh on auth endpoints; sets JSON rate limit error payloads; cross-portal redirect to dashboard. | **PASSED** (Suite 4 & Axios) |
| **REQ-TC-01** | Teacher Cards & Poster Lightbox | Official poster graphics rendered in Subject cards and Teacher section with interactive lightbox modal. | **PASSED** (React & Radix Dialog) |
| **REQ-UI-02** | Mobile Navbar & Favicon Branding | Sticky navbar with solid frosted glass and `whitespace-nowrap` title prevents mobile clipping; browser tab renders branded SVG favicon. | **PASSED** (React & SVG) |
| **REQ-DEP-01** | 100% Free Production Deployment | Zero-cost deployment architecture (Vercel + Render + MongoDB Atlas M0) with cross-origin cookie authentication. | **PASSED** (Configured & Verified) |
| **MNT-01** | Build Verification | `npm run build` runs `tsc` on server and client, exiting with code 0 without type errors. | **PASSED** (Zero Errors) |
