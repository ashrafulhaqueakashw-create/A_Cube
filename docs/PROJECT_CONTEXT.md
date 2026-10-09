# 📌 Project Context: A-Cube Academy Platform

---

## 1. Executive Summary

**A-Cube Academy** is a specialized, modern EdTech web platform designed for an authentic coaching centre situated in Khilkhet, Dhaka, Bangladesh. The academy provides comprehensive academic coaching and competitive admission guidance for Higher Secondary Certificate (**HSC**) Science students across three fundamental subjects:

1. **Physics (পদার্থবিজ্ঞান)**
2. **Higher Mathematics (উচ্চতর গণিত)**
3. **Information & Communication Technology (ICT / তথ্য ও যোগাযোগ প্রযুক্তি)**

The platform bridges physical classrooms with a digital educational ecosystem. It delivers a modern, high-converting public presence inspired by the visual design, interactive aesthetics, and responsiveness of premier EdTech websites (e.g., Programming Hero), while providing a secured, role-based dual portal system:
- **Student Portal:** For enrolled and approved students to access categorized lecture materials, class slides, problem sheets, question banks, announcements, and upcoming examination schedules.
- **Admin/Authority Console:** For academy teachers and management to approve/suspend student registrations, upload and manage study materials via cloud storage, post official notices, schedule tests, and maintain public institute configurations.

---

## 2. Authentic Institute Background (Leaflet Direct Data)

All institutional information, faculty credentials, contact numbers, and core offerings originate directly from the official **A-Cube Academy** informational leaflet.

### 2.1 Institutional Identification
* **Academy Name:** A-Cube Academy (এ-কিউব একাডেমি)
* **Core Tagline:** `HSC + Admission পূর্ণাঙ্গ প্রস্তুতি`
* **Public Headline:** *"Physics, Math ও ICT — Basic থেকে Advanced পর্যন্ত Concept Clear করে Smart ও Structured Learning."*
* **Physical Address:** ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯ (Dhumnee Paschim Para, Adjacent to Mosque, Khilkhet, Dhaka-1229)
* **Official Hotlines:**
  * `+880 1781-760998`
  * `+880 1995-516182`
* **Contact Email:** `contact@acube.academy` / `admin@acube.academy`

### 2.2 Academic Faculty & Instructors
The teaching faculty consists of qualified university students/graduates from premier Bangladeshi engineering and technology institutions:

| Instructor Name | Subject Specialization | Designation | Educational Institution | Profile Summary |
| :--- | :--- | :--- | :--- | :--- |
| **Ashraful Haque Akash** | Physics (পদার্থবিজ্ঞান) | Physics Instructor | **BRAC University (CSE)** | Specializes in conceptual physics, vector mechanics, electromagnetism, and mathematical derivation simplification for board exams & engineering admissions. |
| **Mosfer Hosen Sabbir** | Mathematics (উচ্চতর গণিত) | Math Instructor | **BUTEX (TMDM)** | Focuses on calculus, algebra, coordinate geometry, trigonometric shortcuts, and university admission problem-solving techniques. |
| **Azmain Hasan Ahsun** | ICT (তথ্য ও যোগাযোগ প্রযুক্তি) | ICT Instructor | **IUB (CSE)** | Dedicated instructor for number systems, digital logic gates, HTML/Web design, and C-programming problem solving. |

### 2.3 Unique Institutional Value Propositions (Leaflet Highlights)
1. **Basic থেকে Concept ক্লিয়ার করে পাঠদান:** Concept-first curriculum where mathematical derivations and scientific principles are clarified before attempting complex exercises.
2. **প্রতি সপ্তাহে নিয়মিত পরীক্ষা ও অগ্রগতি মূল্যায়ন:** Weekly evaluation examinations replicating board question patterns and admission standards with individual mark tracking.
3. **Extra Problem Solving Class এর ব্যবস্থা:** Dedicated supplementary classes focused entirely on resolving students' individual exercise doubts and challenging admission queries.
4. **প্রতি ক্লাসে Lecture Material প্রদান:** Printed and digital lecture notes, formula sheets, and practice sheets distributed after each lecture session.
5. **প্রথম সপ্তাহ সম্পূর্ণ ফ্রি ডেমো ক্লাসের ব্যবস্থা:** 1-week free demo class access allowing prospective students and guardians to assess teaching quality firsthand.
6. **প্রজেক্টরের মাধ্যমে স্মার্ট ডিজিটাল ক্লাস:** Digital classrooms equipped with multimedia projectors for interactive visualizations and slide presentations.
7. **প্রতিষ্ঠানিক পরীক্ষার পূর্বে বিশেষ ক্লাসের ব্যবস্থা:** Intensive crash revision and model test series preceding college mid-terms and terminal exams.

---

## 3. Platform Architecture & Ecosystem

```
                                  ┌────────────────────────┐
                                  │   Public Internet      │
                                  └───────────┬────────────┘
                                              │
                      ┌───────────────────────┴───────────────────────┐
                      │                                               │
             [Public Visitors]                              [Registered Users]
                      │                                               │
        ┌─────────────▼─────────────┐                   ┌─────────────▼─────────────┐
        │     Landing Page / SEO    │                   │   Authentication Gateway  │
        │ - Hero & Academy Mission  │                   │ - /login & /register      │
        │ - Subject Overviews       │                   │ - /admin/login            │
        │ - Faculty Credential Cards│                   │ - JWT httpOnly Cookies    │
        │ - 7 Leaflet Core Features │                   └─────────────┬─────────────┘
        │ - Direct Call & WhatsApp  │                                 │
        │ - Location Map Placeholder│                  ┌──────────────┴──────────────┐
        └───────────────────────────┘                  │                             │
                                               [Role: student]               [Role: admin]
                                                       │                             │
                                        ┌──────────────▼──────────────┐┌─────────────▼─────────────┐
                                        │       Student Portal        ││       Admin Console       │
                                        │ - Dashboard & Enrolled Subs ││ - Analytics & Charts      │
                                        │ - Subject Materials Library ││ - Student Approvals/Ban   │
                                        │ - Secure Presigned Download ││ - Material Upload (S3/R2) │
                                        │ - Announcements & Exams     ││ - Teacher & Notice CRUD   │
                                        │ - Profile & Password Change ││ - Institute Settings      │
                                        └─────────────────────────────┘└───────────────────────────┘
```

---

## 4. Business & Educational Objectives

1. **Brand Authority:** Establish A-Cube Academy as the most structured, technologically progressive coaching centre in the Khilkhet-Dhaka educational cluster.
2. **Elimination of Resource Scarcity:** Ensure no student loses notes or misses class materials; all slides, lecture sheets, and model test question banks are archived online.
3. **Access Control & Anti-Piracy:** Prevent unauthorized distribution of proprietary academy materials by mandating administrative enrollment verification (`pending` approval pipeline) and private bucket storage with expiring presigned download URLs.
4. **Frictionless Communication:** Enable immediate distribution of exam routines, emergency notices, and batch schedules via centralized announcements.
5. **Bilingual Accessibility:** Provide native Bengali typography (*Hind Siliguri*) as the default language while maintaining seamless one-click English toggles for terminology flexibility.

---

## 5. Current Implementation & Operational Status

* **Status:** **100% Complete & Production-Ready**
* **Active Daemons:**
  - Express REST Backend: Running on `http://localhost:5000` (API root: `/api/v1`)
  - Vite React Client: Running on `http://localhost:5173`
  - MongoDB Database: Connected to local MongoDB instance (`mongodb://127.0.0.1:27017/acube-academy`), fully seeded with authentic faculty and curriculum data.
* **Verification Metrics:**
  - Full E2E Test Suite (`test-e2e.mjs`): **24/24 passed** covering public endpoints, leaflet data, student registration, 403 pending rejection, admin login & approval, student login & S3 presigned downloads, and RBAC guards.
  - Backend Compilation (`tsc`): **0 errors**.
* **Recent UI/UX & i18n Refinements:**
  - **Bilingual Reactivity:** Wired `useTranslation()` dynamic translation across all public sections (`Navbar`, `Hero`, `About`, `Subjects`, `Features`, `Teachers`, `HowItWorks`, `CTA`, `Contact`, `Footer`).
  - **Language Switcher UX:** Upgraded `LanguageToggle` to an interactive segmented pill (`[ বাং | EN ]`) with persistent `localStorage` storage, replacing the ambiguous two-letter single button.
  - **Leaflet Feature Grid Symmetrical Layout:** Refactored `FeaturesSection` from a broken 4-col grid with an orphaned 3rd row into a mathematically balanced 4+3 centered flex layout (`flex flex-wrap justify-center gap-6`), aligning `Free Demo Class`, `Smart Digital Classroom`, and `Special Exam Preparation` side-by-side in Row 2 directly under Row 1.
  - **Authentication Pipeline Stability:** Refactored Axios interceptor to exclude auth endpoints (`/auth/me`, `/auth/login`, `/auth/admin/login`) from refresh loops, eliminating infinite reload loops on unauthenticated views. Relaxed development rate limit thresholds and formatted responses with structured JSON envelopes. Normalized user payloads across `authService` for seamless session hydration.
  - **Official Teacher Poster Cards & Punchlines:** Integrated high-resolution teacher poster graphics (`/images/teachers/`) into the Hero mentor strip, Subject cards, and Teacher section. Added signature slogans (*"Physics নিয়ে no চিন্তা"*, *"এখন Mathematics হবে আরও Easy"*, *"HTML থেকে Programming, ICT এখন একদম সহজ"*), real experience badges (`3-4+ years`), and an interactive high-resolution poster modal lightbox.
* **Default Admin Credentials:**
  - Email: `admin@acube.academy`
  - Password: `AdminPass123!`
  - Portal: `http://localhost:5173/admin/login`
* **Default Student Credentials:**
  - Email: `student@acube.academy`
  - Password: `StudentPass123!`
  - Portal: `http://localhost:5173/login`
  - Status: `active` (Pre-approved)
* **Documentation Maintenance:**
  - All 9 core documentation files maintained in `/docs` and `README.md` following the strict Documentation Maintenance Protocol.
