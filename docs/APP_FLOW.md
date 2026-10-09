# 🗺️ App Flow & User Journey Map
## Project: A-Cube Academy Web Application
**Document Version:** 1.0.0  
**Scope:** Complete Navigation Pathways, State Transitions, Screen Interactions, and Guard Behavior

---

## 1. Global Sitemap & Route Hierarchy

```text
/ (Public Website)
├── / (Home / Landing Page)
│    ├── #home (Hero Section)
│    ├── #about (Academy Pedagogical Mission)
│    ├── #subjects (Physics, Math, ICT Cards)
│    ├── #features (7 Authentic Leaflet Features)
│    ├── #teachers (Faculty Credentials)
│    ├── #how-it-works (4-Step Learning Journey)
│    ├── #cta (Student Portal Promotion)
│    └── #contact (Location, Phone, WhatsApp, Maps)
│
├── /login (Student Authentication Gateway)
├── /admin/login (Dedicated Administrator Authentication Gateway)
├── /register (Student Enrollment Registration)
├── /forgot-password (Password Recovery Initiation)
└── /reset-password/:token (Secure Password Reset Form)

/student/* (Student Portal - Guarded: Requires role: 'student' & status: 'active')
├── /student/dashboard (Personalized Dashboard, Metrics, Recent Files)
├── /student/profile (Profile dossier, Batch update, Password change)
├── /student/physics (Physics Library: Lecture Notes, Problem Sheets, Slides)
├── /student/math (Math Library: Formulas, Calculus, Geometry Sheets)
├── /student/ict (ICT Library: Digital Devices, C-Programming Notes)
├── /student/materials (Consolidated All-Subject Resource Directory)
├── /student/announcements (Official Academy Notice Board)
├── /student/exams (Exam Schedules: Upcoming & Past Test Routines)
└── /student/settings (UI Preferences & Security)

/admin/* (Admin Console - Guarded: Requires role: 'admin')
├── /admin/dashboard (Executive Overview, Analytics Charts, Live Feeds)
├── /admin/students (Student Directory: Search, Filter, Approve, Suspend)
├── /admin/students/:id (Detailed Student Dossier & Password Reset)
├── /admin/materials (Material Catalogue, File Previews, Downloads, Deletions)
├── /admin/materials/upload (S3 Cloud Upload Form with Progress Bar)
├── /admin/materials/:id/edit (Material Metadata Editor)
├── /admin/teachers (Faculty Profiles CRUD)
├── /admin/subjects (Subject Configuration & Ordering)
├── /admin/announcements (Notice Publisher & Priority Tagger)
├── /admin/exams (Exam Routine Scheduler & Marks Definition)
├── /admin/settings (Institute Metadata: Name, Hotline, Address)
└── /admin/profile (Admin Account & Security Settings)

/error/* (System Pages)
├── /unauthorized (403 Forbidden Error Screen)
└── /* (404 Page Not Found Screen)
```

---

## 2. End-to-End User Journeys

### 2.1 Journey 1: Public Prospective Student / Guardian
**Goal:** Discover A-Cube Academy, inspect faculty credentials, understand teaching methodology, and initiate contact or enrollment.

```mermaid
flowchart TD
    Start([Visitor lands on /]) --> Hero[Views Hero: Headline, Tagline, Badges]
    Start --> LangToggle{Clicks Language Pill [বাং | EN]}
    LangToggle --> SwitchLang[Instant UI translation via react-i18next & saved to localStorage]
    Hero --> ScrollDown{Visitor Scrolls Down}
    
    ScrollDown --> About[Reads Concept-First Teaching Philosophy]
    About --> Subjects[Inspects Physics, Math, and ICT Cards]
    
    Subjects --> ClickSubjectMaterial{Clicks 'View Materials' on Card}
    ClickSubjectMaterial -- Logged In --> SubjectPortal[Navigates to /student/:subject]
    ClickSubjectMaterial -- Not Logged In --> RedirectLogin[Redirects to /login with notice]
    
    ScrollDown --> Features[Reviews 7 Authentic Leaflet Points in Symmetrical 4+3 Grid]
    Features --> Teachers[Validates Faculty: Akash BRAC, Sabbir BUTEX, Ahsun IUB]
    Teachers --> ClickPoster{Clicks 'View Official Poster' / Card}
    ClickPoster --> OpenPosterModal[Opens High-Resolution Poster Lightbox Modal]
    OpenPosterModal --> CloseModal[Closes Modal & Continues Browsing]
    CloseModal --> HowItWorks[Understands 4-Step Student Journey]
    Teachers --> HowItWorks
    
    HowItWorks --> CTA{Views Call to Action}
    CTA -- Interested in Materials --> ClickPortal[Clicks 'Student Portal' -> /login]
    CTA -- Wants Admission --> ClickContact[Clicks 'Admission চলছে' -> Scrolls to #contact]
    
    ScrollDown --> Contact[Views Contact & Location in Khilkhet]
    Contact --> Call[Clicks Hotline -> Initiates Phone Call]
    Contact --> WhatsApp[Clicks WhatsApp -> Opens Direct Chat]
    Contact --> Map[Inspects Location Map at Dhumnee Paschim Para]
```

---

### 2.2 Journey 2: Student Registration & Administrative Verification
**Goal:** Sign up for an account and obtain administrative verification to access proprietary coaching resources.

```mermaid
sequenceDiagram
    autonumber
    actor Student as Prospective Student
    participant Client as Frontend SPA
    participant Server as Backend API (/api/v1)
    participant DB as MongoDB Atlas
    actor Admin as Academy Authority

    Student->>Client: Navigates to /register
    Student->>Client: Fills Name, Phone, Email, Batch (HSC 2026/2027), Group (Science), Password
    Student->>Client: Submits Registration Form
    Client->>Server: POST /auth/register (payload)
    Server->>DB: Create User (status: 'pending', role: 'student')
    Server-->>Client: 201 Created ("Registration successful. Waiting for admin approval.")
    Client-->>Student: Displays success toast and redirects to /login

    Note over Student, Client: Student tries to log in immediately
    Student->>Client: Enters credentials at /login
    Client->>Server: POST /auth/login (email, password)
    Server-->>Client: 200 OK (User authenticated, but status: 'pending')
    Client->>Client: ProtectedRoute evaluates user.status === 'pending'
    Client-->>Student: Renders "Account Pending Approval" informative screen

    Note over Admin, Server: Admin reviews registration in office
    Admin->>Client: Logs in to /admin/login
    Admin->>Client: Navigates to /admin/students
    Client->>Server: GET /admin/students?status=pending
    Server-->>Client: Returns list of pending students
    Admin->>Client: Clicks "Approve" button on Student row
    Client->>Server: POST /admin/students/:id/approve
    Server->>DB: Update User (status: 'active')
    Server-->>Client: 200 OK ("Student approved successfully")

    Note over Student, Client: Student refreshes or logs in again
    Student->>Client: Accesses /student/dashboard
    Client->>Client: ProtectedRoute evaluates status === 'active'
    Client-->>Student: Granted full access to dashboard & study sheets!
```

---

### 2.3 Journey 3: Active Student Daily Learning Routine
**Goal:** Retrieve lecture materials for Physics, search past problem sets, download notes, and check upcoming exams.

```mermaid
flowchart TD
    Login[Student logs in at /login] --> Dashboard[Lands on /student/dashboard]
    Dashboard --> ViewStats[Checks Available Materials, Announcements, Upcoming Exams]
    
    Dashboard --> SelectAction{Student Action}
    
    SelectAction -- Choose Subject --> SubNav[Clicks 'Physics' in sidebar or card]
    SubNav --> SubjectPage[Navigates to /student/physics]
    
    SubjectPage --> FilterOptions{Filtering Resources}
    FilterOptions -- Category Filter --> SelectCat[Filters by 'Lecture Notes' or 'Problem Sheets']
    FilterOptions -- Search Filter --> SearchBar[Types 'Newtonian' or 'Vector']
    FilterOptions -- Sort Order --> SortSelect[Selects 'Newest First']
    
    SelectCat & SearchBar & SortSelect --> UpdatedList[Displays filtered Material Cards]
    
    UpdatedList --> CardAction{Action on Material}
    CardAction -- View Document --> ClickView[Clicks 'View' -> Opens PDF preview in new tab]
    CardAction -- Download File --> ClickDownload[Clicks 'Download']
    
    ClickDownload --> RequestPresigned[Frontend calls GET /materials/:id/download]
    RequestPresigned --> GenURL[Backend validates active status, logs download, generates S3 presigned URL]
    GenURL --> BrowserDownload[Browser automatically downloads file attachment directly from S3/R2]
    
    SelectAction -- Check Notices --> AnnouncePage[Clicks 'Announcements' -> Views priority notices]
    SelectAction -- Check Tests --> ExamsPage[Clicks 'Exams' -> Views Upcoming/Past Exam Routine]
    SelectAction -- Change Password --> ProfilePage[Clicks 'Profile' -> Updates mobile number / password]
```

---

### 2.4 Journey 4: Administrator Daily Operations Routine
**Goal:** Supervise centre operations, upload new post-lecture materials, schedule exams, and manage students.

```mermaid
flowchart TD
    AdminLogin[Admin logs in at /admin/login] --> AdminDash[Lands on /admin/dashboard]
    AdminDash --> ReviewMetrics[Inspects Total Students, Materials by Subject, Status Charts]
    
    AdminDash --> AdminChoice{Select Workflow}
    
    AdminChoice -- Upload Material --> UploadNav[Clicks 'Upload Material' button]
    UploadNav --> UploadForm[Navigates to /admin/materials/upload]
    UploadForm --> FormInputs[Enters Title, Description, Subject, Category, Batch]
    FormInputs --> DropFile[Drags & Drops PDF/Slide file <= 50MB into FileUpload zone]
    DropFile --> SubmitUpload[Clicks 'Upload Material']
    SubmitUpload --> S3Stream[File uploaded to S3 private bucket, metadata saved in MongoDB]
    S3Stream --> UploadDone[Redirects to /admin/materials with success toast]
    
    AdminChoice -- Manage Students --> StudentNav[Clicks 'Students' in sidebar]
    StudentNav --> StudentTable[Views filterable student table]
    StudentTable --> RowActions{Row Action}
    RowActions -- Approve Pending --> ClickApprove[Clicks 'Approve' -> Student activated]
    RowActions -- Suspend Student --> ClickSuspend[Clicks 'Suspend' -> Student blocked]
    RowActions -- Reset Password --> ClickReset[Opens modal -> Sets new student password]
    
    AdminChoice -- Post Announcement --> AnnounceNav[Clicks 'Announcements']
    AnnounceNav --> NewNotice[Clicks 'Add Announcement' -> Enters Title, Body, Priority]
    NewNotice --> NoticePublished[Instantly appears on Student Dashboards]
    
    AdminChoice -- Schedule Exam --> ExamNav[Clicks 'Exams']
    ExamNav --> NewExam[Clicks 'Create Exam' -> Selects Subject, Date, Duration, Marks]
    NewExam --> ExamPublished[Appears on Student Exam Schedules]
```

---

## 3. Route Guard & Access Control Decision Engine

Every route in the Single Page Application is guarded by `ProtectedRoute.tsx`:

```mermaid
flowchart TD
    Req[Incoming URL Request] --> CheckAuth{Is User Authenticated?}
    
    CheckAuth -- No --> CheckPath{Does path start with /admin?}
    CheckPath -- Yes --> RedirectAdminLogin[Redirect to /admin/login with return state]
    CheckPath -- No, starts with /student --> RedirectStudentLogin[Redirect to /login with return state]
    CheckPath -- Public Route --> RenderPublic[Render Public Component]
    
    CheckAuth -- Yes --> RoleCheck{Does user role match route requirements?}
    
    RoleCheck -- Student trying to access /admin/* --> Render403[Redirect to /unauthorized]
    RoleCheck -- Admin trying to access /student/* --> AllowAdmin[Granted Access or redirect to /admin]
    
    RoleCheck -- Student on /student/* --> StatusCheck{What is student account status?}
    StatusCheck -- status === 'pending' --> PendingScreen[Render 'Account Pending Approval' Screen]
    StatusCheck -- status === 'suspended' --> SuspendedScreen[Render 'Account Suspended' Alert Screen]
    StatusCheck -- status === 'active' --> RenderStudentRoute[Render Requested Student Page Component]
```

---

## 4. Edge Cases & Exception Navigation

| Scenario | Trigger / Cause | System Behavior & UX Resolution |
| :--- | :--- | :--- |
| **Invalid Credentials** | Incorrect password on `/login` or `/admin/login`. | Form button resets loading state; red toast notification displays: *"Invalid credentials"*; form inputs remain intact for editing. |
| **Admin on Student Login** | Administrator logs in via `/login` instead of `/admin/login`. | Authenticates successfully; client identifies `role: 'admin'` and seamlessly routes to `/admin/dashboard`. |
| **Non-Admin on Admin Login** | Student attempts to log in via `/admin/login`. | Backend checks `role === 'admin'`; returns HTTP 401; toast displays: *"Invalid admin credentials"*; no access token granted. |
| **Unauthenticated Session Check** | Unauthenticated user opens app or refreshes. | Initial `/auth/me` returns 401; Axios interceptor ignores auth endpoints, avoids refresh loops, and retains public page state. |
| **Token Expiration during Browsing** | 15-minute access token expires while reading a lecture sheet. | Axios interceptor catches HTTP 401, sends `/auth/refresh-token` in background, receives new access token cookie, and transparently retries original request without user interruption. |
| **Expired Refresh Token** | User returns after 7 days of inactivity. | Refresh attempt fails (HTTP 401); client clears auth state and smoothly redirects to `/login`. |
| **Attempted S3 Tampering** | User attempts to guess or scrape direct S3 storage URLs. | S3 bucket blocks public read requests with HTTP 403 Forbidden. Downloads must originate via `/api/v1/materials/:id/download`. |
| **File Exceeds 50MB** | Admin drops an oversized video/zip file. | Client-side `FileUpload` validator halts upload immediately with notice: *"File size exceeds 50MB limit"*; prevents wasted network bandwidth. |
| **Non-Existent URL** | User navigates to `/unknown-path`. | Catch-all `*` route captures request and renders [NotFoundPage.tsx](file:///g:/A_Cube/client/src/pages/NotFoundPage.tsx) with a *"Return to Home"* button. |
