# 🎨 UI/UX Design Brief & Visual Identity Guide
## Project: A-Cube Academy Web Application
**Document Version:** 1.0.0  
**Design Reference:** Modern EdTech aesthetic inspired by the professionalism, clarity, and motion design of Programming Hero, tailored specifically to A-Cube Academy's authentic leaflet identity.

---

## 1. Design Philosophy & Visual Metaphor

**A-Cube Academy** balances two essential design principles:
1. **Academic Authority:** Clean, structured, trustworthy, and distraction-free—reassuring parents and serious HSC/admission candidates.
2. **Modern EdTech Fluidity:** Vibrant gradients, soft shadows, rounded corners, subtle particle motion, and micro-interactions—engaging high-school students on mobile devices.

### Core Design Pillars
* **Mobile-First Ergonomics:** In Bangladesh, over 80% of students browse via smartphones. Touch targets are minimum 44x44px; cards are comfortably padded; inputs never trigger horizontal overflow.
* **Content Clarity:** No overwhelming clutter. High white-space allocation separates sections with clear visual rhythm.
* **Bengali-First Hierarchy:** Bengali is the primary language of instruction. Bengali typography is rendered with optimal letter-spacing, line-height, and font weights to eliminate clipping or awkward rendering.
* **Authenticity First:** No fake achievement counters or generic stock photos. Genuine leaflet teacher credentials, exact institutional locations, and realistic study material categories build real credibility.

---

## 2. Color Palette & Token Architecture

The color system is derived from the academy's branding: deep oceanic navy symbolizing academic depth, paired with vibrant sky blue and cyan accents representing modern digital learning.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             PRIMARY PALETTE                                 │
├───────────────────┬───────────────────┬───────────────────┬─────────────────┤
│ Deep Navy         │ Sky Blue          │ Cyan Accent       │ Pure White      │
│ #1e3a5f           │ #38bdf8           │ #06b6d4           │ #ffffff         │
│ (Brand & Headings)│ (Interactive CTAs)│ (Highlights/Glow) │ (Base Surfaces) │
└───────────────────┴───────────────────┴───────────────────┴─────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           FUNCTIONAL / SUBJECT CODES                        │
├───────────────────┬───────────────────┬───────────────────┬─────────────────┤
│ Physics Blue      │ Math Emerald      │ ICT Violet        │ Warning Amber   │
│ #3b82f6           │ #10b981           │ #8b5cf6           │ #f59e0b         │
│ (Atom/Mechanics)  │ (Calculus/Logic)  │ (Code/Devices)    │ (Pending state) │
└───────────────────┴───────────────────┴───────────────────┴─────────────────┘
```

### 2.1 Complete Token Specification (Tailwind CSS v4 `@theme`)
```css
@theme {
  /* Brand Tokens */
  --color-primary: #1e3a5f;                /* Deep Navy */
  --color-primary-foreground: #f8fafc;     /* Slate 50 */
  --color-secondary: #38bdf8;              /* Sky Blue */
  --color-secondary-foreground: #0f172a;   /* Slate 900 */
  --color-accent: #06b6d4;                 /* Bright Cyan */
  --color-accent-foreground: #0f172a;

  /* Surfaces & Neutral Tokens */
  --color-background: #ffffff;             /* Clean Canvas */
  --color-foreground: #0f172a;             /* High-contrast Text */
  --color-card: #ffffff;
  --color-card-foreground: #0f172a;
  --color-popover: #ffffff;
  --color-popover-foreground: #0f172a;
  --color-muted: #f1f5f9;                  /* Slate 100 for subtle fills */
  --color-muted-foreground: #64748b;        /* Slate 500 for secondary text */
  --color-border: #e2e8f0;                 /* Slate 200 */
  --color-input: #e2e8f0;
  --color-ring: #1e3a5f;

  /* Status Colors */
  --color-success: #10b981;                /* Emerald for Active/Approved */
  --color-warning: #f59e0b;                /* Amber for Pending Approvals */
  --color-destructive: #ef4444;            /* Red for Suspended/Deletions */

  /* Typography Families */
  --font-hind: "Hind Siliguri", sans-serif;
  --font-inter: "Inter", sans-serif;
}
```

---

## 3. Typography Hierarchy

The platform pairs **Hind Siliguri** (a clean, highly legible Bengali typeface) with **Inter** (an industry-standard geometric sans-serif for numbers, code, and English UI tags).

| Typographic Level | Font Family | Size (Desktop / Mobile) | Weight | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | Hind Siliguri | `3.25rem (52px)` / `2.25rem (36px)` | Bold (700) | `1.2` | Hero section main headline |
| **Section Title (H2)** | Hind Siliguri | `2.25rem (36px)` / `1.75rem (28px)` | Bold (700) | `1.3` | Section headings ("আমাদের বিষয়সমূহ", "কেন A-Cube") |
| **Card Header (H3)** | Hind Siliguri | `1.25rem (20px)` / `1.125rem (18px)` | SemiBold (600) | `1.4` | Subject cards, Material titles, Teacher names |
| **Subheadings (H4)** | Hind Siliguri | `1.125rem (18px)` / `1.0rem (16px)` | Medium (500) | `1.4` | Stat card titles, Notice headers |
| **Body Text** | Hind Siliguri | `1.0rem (16px)` / `0.938rem (15px)` | Regular (400) | `1.6` | Paragraph descriptions, Leaflet feature text |
| **UI Labels / Buttons** | Hind Siliguri / Inter | `0.875rem (14px)` | Medium (500) | `1.0` | Form labels, navigation links, button text |
| **Badges / Metadata** | Inter | `0.75rem (12px)` | SemiBold (600) | `1.0` | File sizes (e.g. `2.4 MB`), dates, status badges |

---

## 4. UI Components & Design System Primitives

### 4.1 Buttons
* **Primary Button:** Deep navy background (`bg-primary`), white text, `rounded-lg`, subtle hover elevation with `hover:bg-primary/90`, active scale `98%`.
* **Secondary / Action Button:** Sky blue background (`bg-secondary`), dark text, high contrast for primary conversion goals (e.g., "Student Portal").
* **Outline Button:** Transparent background, `border border-input`, subtle slate hover fill (`hover:bg-accent hover:text-accent-foreground`).
* **Destructive Button:** Crimson red background (`bg-destructive`), white text, used for irreversible operations (Delete Material, Suspend Student).
* **Sizes:** `sm` (h-9, px-3, text-xs), `default` (h-10, px-4, text-sm), `lg` (h-11, px-8, text-base), `icon` (h-10, w-10).

### 4.2 Cards & Surfaces
* **Standard Container Card:** `bg-card`, `border border-slate-200`, `rounded-xl`, `shadow-sm`.
* **Interactive Hover Card:** Smooth CSS transition (`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200`).
* **Subject-Themed Accent Header:** 4px gradient accent line at the top border of cards (Blue for Physics, Emerald for Math, Purple for ICT).

### 4.3 Form Elements
* **Inputs & Textareas:** `border border-slate-300`, `rounded-lg`, `bg-white`, focus ring `focus:ring-2 focus:ring-primary focus:border-transparent`.
* **Select Dropdown:** Styled via Radix UI Select with custom chevron icon, smooth fade-in dropdown popover, and clearly separated items.
* **File Upload Area:** 2px dashed border (`border-2 border-dashed border-slate-300`), drag-over active state highlights in soft cyan tint (`border-primary bg-primary/5`).

### 4.4 Status Badges
* **Active / Approved:** `bg-green-100 text-green-700 border-green-200`
* **Pending Verification:** `bg-yellow-100 text-yellow-800 border-yellow-200`
* **Suspended:** `bg-red-100 text-red-700 border-red-200`
* **Priority Urgent:** `bg-red-500 text-white`
* **Priority High:** `bg-orange-500 text-white`
* **Priority Medium:** `bg-blue-500 text-white`

---

## 5. Screen-by-Screen Layout Specifications

### 5.1 Public Landing Page (`/`)
* **Navbar:** Frosted glass effect (`backdrop-blur-md bg-white/90 border-b border-slate-100`), logo on the left, centered navigation anchors with bilingual translations, segmented interactive language pill toggle (`[ বাং | EN ]`) with active state and localStorage persistence, and "Student Login" / "Admin Login" CTAs on the right.
* **Hero Section:** Deep gradient background (`from-slate-900 via-[#1e293b] to-[#1e3a8a]`), large centered Bengali headline in crisp white, floating subject badges with icons, dual CTAs ("Student Portal" & "Admission চলছে"), animated background circles, and an authentic **Mentor Panel Avatar Strip** showing high-resolution instructor portraits with "BRAC • BUTEX • IUB Mentor Panel | ৩-৪+ বছর অভিজ্ঞতা".
* **Subject Cards (3-Column Grid):**
  * **Physics:** Soft blue icon badge, Atom illustration, Instructor Akash (BRAC CSE), core topics, official photo avatar, signature punchline badge: *"Physics নিয়ে no চিন্তা"* (4+ Years Exp), and "View Materials" button.
  * **Math:** Soft emerald icon badge, Calculator illustration, Instructor Sabbir (BUTEX TMDM), core topics, official photo avatar, signature punchline badge: *"এখন Mathematics হবে আরও Easy"* (3.5+ Years Exp), and "View Materials" button.
  * **ICT:** Soft purple icon badge, Monitor illustration, Instructor Ahsun (IUB CSE), core topics, official photo avatar, signature punchline badge: *"HTML থেকে Programming, ICT একদম সহজ"* (3+ Years Exp), and "View Materials" button.
* **Why A-Cube (7 Leaflet Points):** Symmetrical, responsive 4+3 centered flex layout (`flex flex-wrap justify-center gap-6`). Row 1 hosts 4 balanced feature cards; Row 2 hosts the remaining 3 cards (Free Demo Class, Smart Digital Classroom, Special Exam Preparation) centered directly beneath Row 1, eliminating asymmetric orphaned rows and line breaks. Fully reactive to dynamic EN/BN language switching.
* **Instructor Section (`#teachers`):** 3 prominent EdTech-grade cards featuring official poster photography (`/images/teachers/`):
  * **Aspect Ratio Container:** `4:3` cropped portrait with hover zoom and hover reveal "View Official Poster" pill.
  * **Floating Badges:** Star experience chips (`4+ Years Exp`, `3.5+ Years Exp`, `3+ Years Exp`) and subject color tag.
  * **Signature Punchline Quote Box:** Distinctive gradient container emphasizing each instructor's memorable teaching slogan.
  * **Interactive Poster Lightbox:** Clicking any card or the "View Official Poster" button opens a high-resolution Dialog modal displaying the full promotional card in 3:4 aspect ratio with subject badges.
* **Contact & Location:** Split layout: Left column contains official hotlines (`01781-760998`, `01995-516182`) with direct tap-to-call buttons and physical address in Khilkhet. Right column hosts an interactive map placeholder with landmark cues.

### 5.2 Student Dashboard (`/student/dashboard`)
* **Sidebar (Desktop 250px):** Fixed left navigation with student avatar, name, and vertical nav items: Dashboard, Profile, Physics, Math, ICT, All Materials, Announcements, Exams, Settings, Logout.
* **Header Bar:** Page breadcrumbs, active language toggle, notification bell shortcut.
* **Welcome Banner:** Gradient card with personalized greeting: *"Welcome back, [Student Name]! 👋"*.
* **Metric Cards:** 4-column responsive stat cards displaying Enrolled Subjects (3), Available Materials, Active Announcements, and Upcoming Exams.
* **Subject Fast-Lane:** 3 visual cards for instant jumping into Physics, Math, or ICT libraries.
* **Recent Materials Table:** Clean list showing the 5 most recently uploaded sheets with file type badges and instant download action buttons.

### 5.3 Subject Material Library (`/student/:subject`)
* **Header:** Full-width gradient banner announcing the subject title, instructor in charge, and subject-specific syllabus description.
* **Interactive Control Bar:** Search input with live debouncing, category filter dropdown (Lecture Notes, PDFs, Class Slides, Problem Sheets, etc.), and sort selector.
* **Material Cards Grid (3 Columns):** Clean card layout showing document title, brief summary, category pill, file extension icon, size in MB, upload timestamp, and primary "Download" & "View" buttons.
* **Pagination:** Centered numeric pagination bar with next/previous controls.

### 5.4 Admin Management Console (`/admin/*`)
* **Executive Sidebar (280px):** SaaS-grade dark navy sidebar with grouped navigation categories: Main (Dashboard), Operations (Students, Materials, Subjects, Teachers), Communication (Announcements, Exams), and System (Settings, Profile).
* **Analytics Row:** Recharts Bar Chart illustrating material counts by subject alongside a Pie Chart showing student distribution (Active vs Pending vs Suspended).
* **Management Tables:** Fully sortable, filterable tables equipped with status badges, search inputs, and action menus (Approve, Suspend, Edit, Delete).
* **Destructive Confirmation Modals:** Radix AlertDialog popups guarding delete/suspend actions to prevent accidental data destruction.

---

## 6. Feedback, States & Micro-Interactions

### 6.1 Loading States
* **Full-Page Loading:** Centered spinner with pulsing *"Loading..."* caption ([LoadingPage.tsx](file:///g:/A_Cube/client/src/components/common/LoadingPage.tsx)).
* **Content Skeletons:** Animated gray pulse blocks ([Skeleton.tsx](file:///g:/A_Cube/client/src/components/ui/skeleton.tsx)) matching card and table row dimensions during TanStack Query background fetches.

### 6.2 Empty States
When a query returns zero records (e.g., no materials found for a filter or no active announcements):
* Render [EmptyState.tsx](file:///g:/A_Cube/client/src/components/common/EmptyState.tsx) with a soft circular icon backdrop, informative heading (*"No materials found"*), descriptive help text, and a *"Clear Filters"* action button.

### 6.3 Notification Feedback (Toast System)
Powered by `react-hot-toast` positioned at the top-right:
* **Success Toast (Green accent):** *"Material uploaded successfully"*, *"Student approved successfully"*.
* **Error Toast (Red accent):** *"Invalid credentials"*, *"File size exceeds 50MB limit"*.
* **Pending Approval Hold:** Dedicated informative screen for students whose registration awaits administrative review.
