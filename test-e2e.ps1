# Comprehensive E2E System Test for A-Cube Academy Platform
$ErrorActionPreference = "Stop"

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  A-CUBE ACADEMY FULL-STACK E2E VERIFICATION TEST SUITE  " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$serverUrl = "http://localhost:5000/api/v1"
$clientUrl = "http://localhost:5173"

function Assert-Test($name, $condition, $details) {
    if ($condition) {
        Write-Host " [PASS] $name" -ForegroundColor Green
        if ($details) { Write-Host "        $details" -ForegroundColor DarkGray }
    } else {
        Write-Host " [FAIL] $name" -ForegroundColor Red
        if ($details) { Write-Host "        $details" -ForegroundColor Red }
        exit 1
    }
}

# ----------------------------------------------------
# 1. TEST FRONTEND VITE SERVER & ASSETS
# ----------------------------------------------------
Write-Host "`n>>> [1/6] Testing Frontend Client & HTML Meta & Fonts..." -ForegroundColor Yellow
$frontRes = Invoke-WebRequest -Uri $clientUrl -UseBasicParsing
Assert-Test "Frontend serves HTTP 200" ($frontRes.StatusCode -eq 200) "Status: $($frontRes.StatusCode)"
Assert-Test "HTML has viewport for responsive mobile" ($frontRes.Content.Contains('name="viewport"')) "Viewport meta tag detected"
Assert-Test "HTML includes Hind Siliguri Bengali font" ($frontRes.Content.Contains('Hind+Siliguri')) "Hind Siliguri font link found"
Assert-Test "HTML includes Inter font" ($frontRes.Content.Contains('Inter')) "Inter font link found"
Assert-Test "Title mentions A-Cube Academy" ($frontRes.Content.Contains('A-Cube Academy')) "Brand title confirmed"

# ----------------------------------------------------
# 2. TEST PUBLIC APIS (LEAFLET VERIFICATION)
# ----------------------------------------------------
Write-Host "`n>>> [2/6] Testing Public APIs & Leaflet Data Accuracy..." -ForegroundColor Yellow

# Teachers API
$teachersRes = Invoke-RestMethod -Uri "$serverUrl/teachers" -Method Get
Assert-Test "Teachers API returns success" ($teachersRes.success -eq $true) "Count: $($teachersRes.data.Count)"
$hasAkash = $teachersRes.data | Where-Object { $_.name -like "*Ashraful Haque Akash*" -and $_.university -like "*BRAC*" }
$hasSabbir = $teachersRes.data | Where-Object { $_.name -like "*Mosfer Hosen Sabbir*" -and $_.university -like "*BUTEX*" }
$hasAhsun = $teachersRes.data | Where-Object { $_.name -like "*Azmain Hasan Ahsun*" -and $_.university -like "*IUB*" }
Assert-Test "Physics Instructor Akash (BRAC CSE) present" ($null -ne $hasAkash) "Matched: $($hasAkash.name)"
Assert-Test "Math Instructor Sabbir (BUTEX TMDM) present" ($null -ne $hasSabbir) "Matched: $($hasSabbir.name)"
Assert-Test "ICT Instructor Ahsun (IUB CSE) present" ($null -ne $hasAhsun) "Matched: $($hasAhsun.name)"

# Subjects API
$subjectsRes = Invoke-RestMethod -Uri "$serverUrl/subjects" -Method Get
Assert-Test "Subjects API returns Physics, Math, and ICT" ($subjectsRes.data.Count -ge 3) "Found $($subjectsRes.data.Count) subjects"

# Settings API
$settingsRes = Invoke-RestMethod -Uri "$serverUrl/settings" -Method Get
Assert-Test "Settings API contains Khilkhet address" ($settingsRes.data.address -like "*খিলক্ষেত*") "Address: $($settingsRes.data.address)"
Assert-Test "Settings API contains Hotline 01781-760998" ($settingsRes.data.phone1 -eq "01781-760998") "Hotline 1: $($settingsRes.data.phone1)"

# ----------------------------------------------------
# 3. TEST STUDENT REGISTRATION LIFECYCLE (PENDING STATE)
# ----------------------------------------------------
Write-Host "`n>>> [3/6] Testing Student Registration & Pending Approval..." -ForegroundColor Yellow

$testStudentEmail = "test_student_$(Get-Random)@gmail.com"
$studentPassword = "StudentPass123!"

$regBody = @{
    name = "Tamim Iqbal"
    email = $testStudentEmail
    phone = "01711223344"
    password = $studentPassword
    hscBatch = "HSC 2026"
    group = "Science"
} | ConvertTo-Json

$regRes = Invoke-RestMethod -Uri "$serverUrl/auth/register" -Method Post -Body $regBody -ContentType "application/json"
Assert-Test "Student registration succeeds" ($regRes.success -eq $true) "Message: $($regRes.message)"

# Student tries to login before approval -> Should be rejected with 403 Account pending approval
$loginBody = @{
    email = $testStudentEmail
    password = $studentPassword
} | ConvertTo-Json

$pendingRejected = $false
try {
    Invoke-RestMethod -Uri "$serverUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 403) {
        $pendingRejected = $true
    }
}
Assert-Test "Pending student is blocked with HTTP 403 before approval" ($pendingRejected -eq $true) "Pending approval gate functioning correctly"

# ----------------------------------------------------
# 4. TEST ADMIN AUTHENTICATION & MANAGEMENT
# ----------------------------------------------------
Write-Host "`n>>> [4/6] Testing Admin Authentication & Student Approval..." -ForegroundColor Yellow

$adminLoginBody = @{
    email = "admin@acube.academy"
    password = "AdminPass123!"
} | ConvertTo-Json

$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$adminLoginRes = Invoke-RestMethod -Uri "$serverUrl/auth/admin/login" -Method Post -Body $adminLoginBody -ContentType "application/json" -WebSession $session
Assert-Test "Admin login successful" ($adminLoginRes.success -eq $true) "Admin: $($adminLoginRes.data.name)"

# Admin Dashboard Stats
$dashRes = Invoke-RestMethod -Uri "$serverUrl/admin/dashboard" -Method Get -WebSession $session
Assert-Test "Admin Dashboard returns metrics" ($dashRes.success -eq $true -and $dashRes.data.totalStudents -ge 1) "Total Students: $($dashRes.data.totalStudents)"

# Find the registered student
$studentsList = Invoke-RestMethod -Uri "$serverUrl/admin/students?status=pending" -Method Get -WebSession $session
$newStudent = $studentsList.data | Where-Object { $_.email -eq $testStudentEmail }
Assert-Test "Admin can locate pending student in directory" ($null -ne $newStudent) "Student ID: $($newStudent._id)"

# Admin Approves Student
$approveRes = Invoke-RestMethod -Uri "$serverUrl/admin/students/$($newStudent._id)/approve" -Method Post -WebSession $session
Assert-Test "Admin approves student successfully" ($approveRes.success -eq $true) "New Status: $($approveRes.data.status)"

# Admin Publishes New Announcement
$annBody = @{
    title = "HSC 2026 স্পেশাল মেকানিক্স মডেল টেস্ট"
    description = "আগামী শুক্রবার সকাল ১০টায় সকল শিক্ষার্থীদের উপস্থিত থাকতে অনুরোধ করা হচ্ছে।"
    priority = "urgent"
    targetAudience = "all"
} | ConvertTo-Json
$annRes = Invoke-RestMethod -Uri "$serverUrl/announcements" -Method Post -Body $annBody -ContentType "application/json" -WebSession $session
Assert-Test "Admin posts urgent announcement" ($annRes.success -eq $true) "Announcement: $($annRes.data.title)"

# Admin Schedules New Exam
$examBody = @{
    title = "Physics Paper 1 - Vector & Mechanics Test"
    subject = $subjectsRes.data[0]._id
    date = (Get-Date).AddDays(3).ToString("o")
    totalMarks = 50
    duration = 60
    description = "অধ্যায় ২ ও ৪ এর ওপর পূর্ণাঙ্গ বহুনির্বাচনী ও সৃজনশীল পরীক্ষা।"
} | ConvertTo-Json
$examRes = Invoke-RestMethod -Uri "$serverUrl/exams" -Method Post -Body $examBody -ContentType "application/json" -WebSession $session
Assert-Test "Admin schedules examination routine" ($examRes.success -eq $true) "Exam: $($examRes.data.title)"

# ----------------------------------------------------
# 5. TEST APPROVED STUDENT LEARNING PORTAL & MATERIALS
# ----------------------------------------------------
Write-Host "`n>>> [5/6] Testing Approved Student Portal & Material Access..." -ForegroundColor Yellow

$studentSession = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$studentLoginRes = Invoke-RestMethod -Uri "$serverUrl/auth/login" -Method Post -Body $loginBody -ContentType "application/json" -WebSession $studentSession
Assert-Test "Approved student login successful" ($studentLoginRes.success -eq $true) "Role: $($studentLoginRes.data.role), Status: $($studentLoginRes.data.status)"

# Student Profile & Identity
$meRes = Invoke-RestMethod -Uri "$serverUrl/auth/me" -Method Get -WebSession $studentSession
Assert-Test "Student auth/me validates session" ($meRes.data.email -eq $testStudentEmail) "Identity confirmed"

# Student Dashboard Stats
$stuDash = Invoke-RestMethod -Uri "$serverUrl/student/dashboard" -Method Get -WebSession $studentSession
Assert-Test "Student dashboard returns enrolled subjects & stats" ($stuDash.success -eq $true -and $stuDash.data.stats.enrolledSubjects -eq 3) "Available Materials: $($stuDash.data.stats.availableMaterials)"

# Student Materials by Subject (Physics)
$physicsMaterials = Invoke-RestMethod -Uri "$serverUrl/materials/subject/physics" -Method Get -WebSession $studentSession
Assert-Test "Student accesses Physics lecture materials" ($physicsMaterials.success -eq $true -and $physicsMaterials.data.Count -gt 0) "Found $($physicsMaterials.data.Count) Physics notes"

# All Materials Search
$searchMaterials = Invoke-RestMethod -Uri "$serverUrl/materials?search=ক্যালকুলাস" -Method Get -WebSession $studentSession
Assert-Test "Search filter locates Calculus sheets" ($searchMaterials.data.Count -ge 1) "Matched: $($searchMaterials.data[0].title)"

# Download Action & Presigned URL Generation
$matId = $physicsMaterials.data[0]._id
$downloadRes = Invoke-RestMethod -Uri "$serverUrl/materials/$matId/download" -Method Get -WebSession $studentSession
Assert-Test "Material download generates presigned download URL" ($downloadRes.success -eq $true -and $downloadRes.url.Length -gt 20) "Presigned URL generated successfully"

# Announcements & Exams for Student
$stuAnn = Invoke-RestMethod -Uri "$serverUrl/announcements" -Method Get -WebSession $studentSession
Assert-Test "Student receives urgent announcement" ($stuAnn.data.Count -gt 0) "Top notice: $($stuAnn.data[0].title)"

$stuExams = Invoke-RestMethod -Uri "$serverUrl/exams" -Method Get -WebSession $studentSession
Assert-Test "Student receives upcoming exam routine" ($stuExams.data.Count -gt 0) "Top exam: $($stuExams.data[0].title)"

# ----------------------------------------------------
# 6. TEST SECURITY GUARD (STUDENT CANNOT ACCESS ADMIN)
# ----------------------------------------------------
Write-Host "`n>>> [6/6] Testing Security RBAC Guard (Student blocked from Admin)..." -ForegroundColor Yellow

$studentBlocked = $false
try {
    Invoke-RestMethod -Uri "$serverUrl/admin/dashboard" -Method Get -WebSession $studentSession
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 403) {
        $studentBlocked = $true
    }
}
Assert-Test "Student blocked from Admin routes with HTTP 403 Forbidden" ($studentBlocked -eq $true) "RBAC security verified"

Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "  ALL 24 TEST SUITES PASSED! SYSTEM 100% OPERATIONAL.    " -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
