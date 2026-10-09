# 📋 Product Requirements Document (PRD)
## Project: A-Cube Academy Web Application
**Document Version:** 1.0.0  
**Target Release:** Production v1.0  
**Product Category:** EdTech / Coaching Centre Management & Learning Portal

---

## 1. Executive Product Overview

### 1.1 Product Vision
A-Cube Academy is a modern, high-performance web platform designed to serve as both the public marketing gateway and the central digital learning management system (LMS) for **A-Cube Academy**—an academic coaching centre in Khilkhet, Dhaka, Bangladesh offering comprehensive HSC and admission preparation in Physics, Higher Mathematics, and ICT.

### 1.2 Core Problem Statement
* Traditional coaching centres rely on unorganized social media groups (e.g., Facebook/Telegram) or paper printouts for lecture sheets, leading to lost materials, broken links, lack of structure, and intellectual property leakage.
* Students lack a single organized repository to retrieve past lecture notes, problem sets, and formula sheets by subject and category.
* Administration has no automated way to restrict proprietary study sheets strictly to verified, paying students while maintaining an authoritative public presence that attracts new admissions.

### 1.3 Key Value Proposition
* **Organized Categorical Archive:** Study materials indexed strictly by subject (Physics, Math, ICT) and category (Lecture Notes, PDFs, Class Slides, Problem Sheets, Question Banks, Model Tests).
* **Controlled Access Control:** Two-tiered user hierarchy where students register publicly but cannot access proprietary educational downloads until verified and approved by the academy administration.
* **Modern EdTech Experience:** Smooth animations, bilingual Bengali-first UX, clean responsive interfaces across smartphones and desktops, and private cloud storage downloads.

---

## 2. User Personas

| Persona | Role & Attributes | Core Needs & Goals | Pain Points |
| :--- | :--- | :--- | :--- |
| **Tamim (HSC Candidate)** | 11th/12th grade Science student; primarily uses Android smartphone. | Needs organized lecture notes, formula banks, and homework problem sheets directly after class. | Hard to find old sheets in cluttered Messenger groups; misses test routines. |
| **Sultana (Parent/Guardian)** | Parent exploring coaching options in Khilkhet area. | Wants to evaluate faculty qualifications, check syllabus coverage, physical location, and demo class availability. | Skeptical of random coaching centres without verifiable teacher credentials. |
| **Ashraful / Sabbir / Ahsun (Instructors)** | University student instructors conducting daily classes. | Need a fast, secure portal to upload lecture slides and problem sets after classes without worrying about unauthorized public scraping. | Answering repetitive student messages asking for lost PDFs. |
| **Academy Authority / Super Admin** | Centre management / administrative staff. | Manage student registrations, approve enrolled students, suspend defaulting students, publish instant exam routines. | Manual paper registers and unauthorized access to coaching materials. |

---

## 3. Product Features & Detailed Functional Requirements

### 3.1 Public Marketing Portal (Unauthenticated)

#### FR-PUB-01: Sticky Navigation Bar
* **Branding:** Displays the "A-Cube Academy" logo text and graduation icon.
* **Navigation Links:** Smooth scroll anchors to `#home`, `#about`, `#subjects`, `#teachers`, `#features`, `#contact`.
* **Action CTAs:** Prominent "Student Login" (filled primary) and "Admin Login" (outline) buttons.
* **Language Switcher:** Interactive button to toggle between Bengali (`BN`) and English (`EN`) across the entire website.
* **Mobile Drawer:** Hamburger icon triggers a slide-out navigation sheet on viewport width < 1024px.
* **State Behavior:** Transitions from transparent/light to frosted shadow blur upon scroll offset > 20px.

#### FR-PUB-02: Hero Section
* **Headline:** *"HSC + Admission প্রস্তুতির নতুন ঠিকানা"*
* **Supporting Tagline:** *"Physics, Math ও ICT — Basic থেকে Advanced পর্যন্ত Concept Clear করে Smart ও Structured Learning."*
* **CTAs:** Primary CTA "Student Portal" (directs to login/dashboard), Secondary CTA "Admission চলছে" (scrolls to contact/admission details).
* **Subject Pills:** Floating interactive badges highlighting Physics, Math, and ICT.
* **Visual Aesthetic:** Framer motion stagger animations, subtle gradient backdrop, professional academic tone.

#### FR-PUB-03: Academy Introduction ("About")
* **Concept Clarification:** Highlights the core pedagogical philosophy—concept clarity before formula memorization.
* **Visual Grid:** Feature cards detailing smart projector classrooms, weekly evaluations, and special pre-exam revision batches.

#### FR-PUB-04: Subject Cards Section
Three distinct cards representing the coaching centre's core offerings:
1. **Physics Card:** Atom icon, instructor Ashraful Haque Akash (BRAC University CSE), overview of Mechanics & Modern Physics.
2. **Math Card:** Calculator icon, instructor Mosfer Hosen Sabbir (BUTEX TMDM), overview of Calculus & Geometry.
3. **ICT Card:** Monitor icon, instructor Azmain Hasan Ahsun (IUB CSE), overview of Digital Systems & C Programming.
* **Action:** Each card contains a "View Materials" button. If the user is unauthenticated, they are redirected to `/login` with an informational notice.

#### FR-PUB-05: Leaflet Value Proposition ("Why A-Cube")
Displays the 7 authentic leaflet offerings in a symmetrical, responsive 4+3 centered flex layout with full bilingual localization support:
1. Basic থেকে Concept ক্লিয়ার করে পাঠদান (Concept Clear Teaching)
2. প্রতি সপ্তাহে নিয়মিত পরীক্ষা ও অগ্রগতি মূল্যায়ন (Weekly Examination)
3. Extra Problem Solving Class এর ব্যবস্থা (Extra Problem Solving)
4. প্রতি ক্লাসে Lecture Material প্রদান (Lecture Materials)
5. প্রথম সপ্তাহ সম্পূর্ণ ফ্রি ডেমো ক্লাসের ব্যবস্থা (Free Demo Class)
6. প্রজেক্টরের মাধ্যমে স্মার্ট ডিজিটাল ক্লাস (Smart Digital Classroom)
7. প্রতিষ্ঠানিক পরীক্ষার পূর্বে বিশেষ ক্লাসের ব্যবস্থা (Special Exam Preparation)
* **Layout Design:** Row 1 contains 4 cards; Row 2 contains 3 cards centered horizontally beneath, preventing awkward row breaks or orphaned items. Fully reactive to dynamic EN/BN language toggle.

#### FR-PUB-06: Faculty & Instructor Profiles
* **Card Details:** Official high-resolution card photography (`/images/teachers/`), full name, assigned subject, academic institution, experience chips (`4+ Years Exp`, `3.5+ Years Exp`, `3+ Years Exp`), signature punchline quote box, and concise pedagogical bio.
* **Punchlines & Slogans:**
  - Akash (Physics): *"Physics নিয়ে no চিন্তা"*
  - Sabbir (Math): *"এখন Mathematics হবে আরও Easy"*
  - Ahsun (ICT): *"HTML থেকে Programming, ICT এখন একদম সহজ"*
* **Interactive Lightbox Modal:** Users can click on any teacher card or the *"View Official Poster"* button to inspect the full promotional poster graphic in high resolution.
* **Authentic Credentials:** Strictly utilizes genuine leaflet faculty data (Ashraful Haque Akash - BRAC CSE; Mosfer Hosen Sabbir - BUTEX TMDM; Azmain Hasan Ahsun - IUB CSE).

#### FR-PUB-07: How It Works (Student Journey)
A 4-step horizontal visual timeline (collapses vertically on mobile):
1. **Join A-Cube Academy:** Register online or at the office.
2. **Attend Classes:** Smart digital classroom lectures and concept sessions.
3. **Access Materials:** Download subject-specific notes and question banks from the portal.
4. **Track Progress:** Sit for weekly evaluations and monitor exam performance.

#### FR-PUB-08: Student Portal Promotion (CTA Banner)
* High-impact gradient banner: *"আপনার প্রয়োজনীয় Lecture Materials এখন হাতের মুঠোয়"*.
* Lists direct student benefits: instant PDF download, organized archives, batch updates.
* Action button linking to Student Login.

#### FR-PUB-09: Contact & Location Section
* **Physical Location:** ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯.
* **Direct Telephony:** One-tap `tel:` call button for `01781-760998` and `01995-516182`.
* **WhatsApp Direct:** Link to initiate a WhatsApp inquiry conversation.
* **Interactive Map:** Google Maps interactive embed placeholder focused on Khilkhet, Dhaka.

#### FR-PUB-10: Footer
* Academy branding, quick navigation links, subject shortcuts, contact summary, and copyright notice (`© A-Cube Academy. All Rights Reserved.`).

---

### 3.2 Authentication & User Lifecycle

#### FR-AUTH-01: Student Registration (`/register`)
* **Required Fields:**
  * Full Name (min 2 characters)
  * Phone Number (11-digit Bangladeshi mobile format, e.g., `01XXXXXXXXX`)
  * Email Address (unique, valid email format)
  * Password (minimum 6 characters)
  * Confirm Password (must match password)
  * HSC Batch (Selectable: HSC 2026, HSC 2027, Admission Special)
  * Academic Group (Fixed to 'Science')
* **Lifecycle State:** New student registrations default immediately to `status: 'pending'`.
* **User Feedback:** Upon registration, displays clear guidance: *"Registration successful. Your account is pending admin approval."*

#### FR-AUTH-02: Student Login (`/login`)
* **Credentials:** Email and Password.
* **Pre-seeded Demo Student:** `student@acube.academy` / `StudentPass123!` (Active status).
* **Account Status Validation:**
  * If `status === 'pending'`: Authentication succeeds, but redirect routes to a dedicated "Account Pending Approval" screen explaining that an administrator must activate the account.
  * If `status === 'suspended'`: Access is blocked with an alert: *"Your account has been suspended. Please contact the academy office."*
  * If `status === 'active'`: System sets `httpOnly` JWT cookies and redirects to `/student/dashboard`.

#### FR-AUTH-03: Admin Login (`/admin/login`)
* Separate dedicated portal interface with elevated security branding.
* Enforces role verification on the backend: accounts with `role !== 'admin'` are rejected with `401 Unauthorized`.
* Redirects authenticated administrators to `/admin/dashboard`. If an administrator signs in via the standard `/login` route, the client detects the administrative role and automatically routes them to `/admin/dashboard`.
* Initial unauthenticated `/auth/me` checks are handled silently without triggering redirect or refresh loops.

#### FR-AUTH-04: Session Management & Logout
* Employs dual-token authentication: 15-minute Access Token + 7-day Refresh Token.
* Transparent token renewal on frontend via Axios interceptor on HTTP 401 response for non-auth API routes.
* Logout endpoint clears both cookies on the client and nullifies the stored refresh token in the MongoDB User document.

#### FR-AUTH-05: Password Recovery
* **Forgot Password (`/forgot-password`):** Generates a crypto-secure token with 1-hour expiry.
* **Reset Password (`/reset-password/:token`):** Validates the token and updates the Bcrypt password hash.

---

### 3.3 Student Portal & Educational Resources

#### FR-STU-01: Student Dashboard (`/student/dashboard`)
* **Personalized Greeting:** *"Welcome back, [Student Name]! 👋"*.
* **Metric Stat Cards:**
  1. Enrolled Subjects (3 - Physics, Math, ICT)
  2. Available Materials (Real-time count of active resources)
  3. Active Announcements (Count of unread/active notices)
  4. Upcoming Exams (Count of upcoming tests)
* **Quick Access Grid:** Direct shortcut cards to Physics, Math, and ICT resource libraries.
* **Recent Materials Feed:** Displays the latest 5 uploaded resources with file type icons and instant download links.
* **Important Announcements:** Displays top 3 recent academy notices with color-coded priority badges.

#### FR-STU-02: Subject-Specific Resource Library (`/student/:subject`)
* **Dedicated Subject Routes:** `/student/physics`, `/student/math`, `/student/ict`.
* **Categorical Filtering:** Filter by:
  * Lecture Notes (লেকচার নোটস)
  * PDF (পিডিএফ)
  * Class Slides (ক্লাস স্লাইড)
  * Problem Sheets (প্রবলেম শিট)
  * Assignments (অ্যাসাইনমেন্ট)
  * Question Banks (প্রশ্ন ব্যাংক)
  * Model Tests (মডেল টেস্ট)
  * Previous Questions (বিগত প্রশ্ন)
  * Other (অন্যান্য)
* **Live Search:** Debounced real-time text search querying material titles and descriptions.
* **Sorting Options:** Newest First, Oldest First, Most Downloaded.
* **Resource Cards:** Display title, description, category badge, file type (PDF/Word/PPT/Image), file size in MB, upload date, and instructor name.
* **View Action:** Opens document preview in a new tab.
* **Download Action:** Generates a secure, expiring presigned URL, increments the download counter, and logs the user download event.
* **Pagination:** Standard pagination supporting large resource libraries.

#### FR-STU-03: Consolidated Resource Library (`/student/materials`)
* Offers an all-in-one view across all three subjects with an additional Subject Filter dropdown.

#### FR-STU-04: Announcements Page (`/student/announcements`)
* Complete chronological listing of official notices.
* Priority Indicators: Urgent (Red), High (Orange), Medium (Blue), Low (Gray).

#### FR-STU-05: Examination Routine Page (`/student/exams`)
* Tabbed view: **Upcoming Exams** vs **Past Exams**.
* Details: Exam Title, Subject, Date & Time, Duration in Minutes, Total Marks, and Syllabus Description.

#### FR-STU-06: Profile & Settings (`/student/profile`, `/student/settings`)
* View student info (Name, Email, Phone, Batch, Roll).
* Update contact phone number and academic batch.
* Secure password change form with current password verification.
* Bilingual UI preference and notification preference toggles.

---

### 3.4 Admin & Authority Management Console

#### FR-ADM-01: Analytics Dashboard (`/admin/dashboard`)
* **Overview Stat Cards:** Total Students, Active Students, Pending Students, Total Materials, Total Teachers, Total Announcements.
* **Interactive Visualizations (Recharts):**
  * Materials Distribution by Subject (Bar chart)
  * Student Status Distribution (Pie chart)
* **Recent Activity Stream:** Real-time log of the latest 5 uploads and the latest 5 student registrations.
* **Quick Action Controls:** Instant modal shortcuts for "Upload Material" and "Review Pending Students".

#### FR-ADM-02: Student Management (`/admin/students`)
* **Filterable Data Table:** Search by name/email/phone; filter by status (`All`, `Pending`, `Active`, `Suspended`) and HSC Batch.
* **Column Fields:** Student Name, Email, Phone, Batch, Account Status Badge, Registration Date, Actions.
* **Administrative Operations:**
  * **Approve:** Transitions student from `pending` to `active`, granting immediate library access.
  * **Suspend:** Revokes portal access for fee defaulting or misconduct.
  * **Delete:** Soft/hard removal with safety confirmation dialog.
  * **Reset Password:** Administrative modal to assign a new temporary password.
  * **View Detail (`/admin/students/:id`):** Detailed student dossier.

#### FR-ADM-03: Study Material Management (`/admin/materials`)
* **Search & Filter Table:** Filter materials by subject and category.
* **Columns:** Title, Subject, Category, File Type, File Size, Download Count, Upload Date, Actions.
* **Row Actions:** Preview, Direct Download, Edit Metadata, Delete (removes file from cloud storage and database).

#### FR-ADM-04: Material Upload Form (`/admin/materials/upload`)
* **Inputs:** Title, Detailed Description, Subject dropdown, Category dropdown, Target Batch dropdown, Visibility setting (`Students Only`, `Public`, `Specific Batch`).
* **File Upload Component:** Drag-and-drop zone with MIME-type restriction (`.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.xls`, `.xlsx`, `.zip`, images) and 50MB file size ceiling.
* **Upload Progress:** Visual percentage progress bar and toast notifications upon completion.

#### FR-ADM-05: Faculty Management (`/admin/teachers`)
* Complete CRUD interface for instructor cards displayed on the public landing page.
* Fields: Name, Subject, Designation, Academic University, Bio, Display Order, Active Status.
* Pre-seeded with the 3 authentic instructors from the leaflet.

#### FR-ADM-06: Subject & Syllabus Management (`/admin/subjects`)
* Manage subject information, Bengali translations, order, and descriptions.

#### FR-ADM-07: Announcement Publisher (`/admin/announcements`)
* Create/Edit/Delete notices with title, body, priority rating (`urgent`, `high`, `medium`, `low`), and target audience (`all`, `students`, `specific batch`).

#### FR-ADM-08: Exam Routine Scheduler (`/admin/exams`)
* Publish upcoming exam schedules with date, time, total marks, duration, and subject mapping.

#### FR-ADM-09: Institute Settings (`/admin/settings`)
* Update academy name, official hotline numbers, physical address, and contact email without code modification.

---

## 4. Non-Functional Requirements (NFR)

* **NFR-SEC-01 (Zero Clear-Text Passwords):** All passwords encrypted using Bcrypt with 12 salt rounds.
* **NFR-SEC-02 (Cookie Hardening):** Tokens stored exclusively in `httpOnly`, `secure` (production), `sameSite: 'strict'` cookies to mitigate XSS and CSRF attack vectors.
* **NFR-SEC-03 (Private Storage & Presigned URLs):** Educational assets are stored in private S3 buckets. Public URLs are never exposed; download links expire automatically after 3600 seconds.
* **NFR-PERF-01 (Sub-Second Page Loads):** Client bundle code-split with Vite; cached API queries with TanStack Query (5-minute stale window).
* **NFR-RESP-01 (Mobile-First Responsiveness):** Flawless presentation across 320px, 375px, 768px, 1024px, and 1440px+ without horizontal scrollbars.
* **NFR-A11Y-01 (Accessibility):** WCAG 2.1 AA compliant color contrast ratios, screen-reader accessible Radix UI dialogs/modals, and keyboard-navigable forms.
* **NFR-I18N-01 (Bilingual Fidelity):** Full localization coverage without awkward machine translations, prioritizing culturally accurate Bangladeshi academic terminology.
