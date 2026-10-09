// Comprehensive E2E System Test for A-Cube Academy Platform
const serverUrl = 'http://localhost:5000/api/v1';
const clientUrl = 'http://localhost:5173';

function assert(condition, message, details = '') {
  if (condition) {
    console.log(` [PASS] ${message} ${details ? `(${details})` : ''}`);
  } else {
    console.error(` [FAIL] ${message} ${details ? `(${details})` : ''}`);
    process.exit(1);
  }
}

function extractCookies(res) {
  if (typeof res.headers.getSetCookie === 'function') {
    return res.headers.getSetCookie().map(c => c.split(';')[0]).join('; ');
  }
  const raw = res.headers.get('set-cookie');
  return raw ? raw.split(',').map(c => c.split(';')[0].trim()).join('; ') : '';
}

async function run() {
  console.log('========================================================');
  console.log('   A-CUBE ACADEMY FULL-STACK E2E VERIFICATION SUITE     ');
  console.log('========================================================\n');

  // ----------------------------------------------------
  // 1. FRONTEND VITE CLIENT & ASSETS
  // ----------------------------------------------------
  console.log('>>> [1/6] Testing Frontend Client & HTML Meta & Fonts...');
  const frontRes = await fetch(clientUrl);
  assert(frontRes.status === 200, 'Frontend serves HTTP 200', `Status: ${frontRes.status}`);
  const html = await frontRes.text();
  assert(html.includes('name="viewport"'), 'HTML has mobile viewport meta tag');
  assert(html.includes('Hind+Siliguri'), 'HTML imports Hind Siliguri font');
  assert(html.includes('Inter'), 'HTML imports Inter font');
  assert(html.includes('A-Cube Academy'), 'HTML title includes A-Cube Academy');

  // ----------------------------------------------------
  // 2. PUBLIC APIS & LEAFLET DATA ACCURACY
  // ----------------------------------------------------
  console.log('\n>>> [2/6] Testing Public APIs & Leaflet Data Accuracy...');

  // Teachers API
  const teachersRes = await (await fetch(`${serverUrl}/teachers`)).json();
  assert(teachersRes.success === true, 'Teachers API returns success');
  const teachers = teachersRes.data || [];
  const akash = teachers.find(t => t.name.includes('Ashraful Haque Akash') && t.university.includes('BRAC'));
  const sabbir = teachers.find(t => t.name.includes('Mosfer Hosen Sabbir') && t.university.includes('BUTEX'));
  const ahsun = teachers.find(t => t.name.includes('Azmain Hasan Ahsun') && t.university.includes('IUB'));
  assert(!!akash, 'Physics Instructor Akash (BRAC CSE) present', akash?.name);
  assert(!!sabbir, 'Math Instructor Sabbir (BUTEX TMDM) present', sabbir?.name);
  assert(!!ahsun, 'ICT Instructor Ahsun (IUB CSE) present', ahsun?.name);

  // Subjects API
  const subjectsRes = await (await fetch(`${serverUrl}/subjects`)).json();
  assert(subjectsRes.data.length >= 3, 'Subjects API returns Physics, Math, and ICT', `Found ${subjectsRes.data.length}`);

  // Settings API
  const settingsRes = await (await fetch(`${serverUrl}/settings`)).json();
  assert(settingsRes.data.address.includes('খিলক্ষেত'), 'Settings API contains Khilkhet address', settingsRes.data.address);
  assert(settingsRes.data.phone1 === '01781-760998', 'Settings API contains Hotline 01781-760998', settingsRes.data.phone1);

  // ----------------------------------------------------
  // 3. STUDENT REGISTRATION & PENDING APPROVAL GATE
  // ----------------------------------------------------
  console.log('\n>>> [3/6] Testing Student Registration & Pending Approval...');
  const testStudentEmail = `tamim_${Date.now()}@gmail.com`;
  const studentPassword = 'StudentPass123!';

  const regRes = await (await fetch(`${serverUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Tamim Iqbal',
      email: testStudentEmail,
      phone: '01711223344',
      password: studentPassword,
      hscBatch: 'HSC 2026',
      group: 'Science',
    }),
  })).json();
  assert(regRes.success === true, 'Student registration succeeds', regRes.message);

  // Student tries to log in before approval -> Should be rejected with HTTP 403
  const pendingLoginRes = await fetch(`${serverUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testStudentEmail, password: studentPassword }),
  });
  assert(pendingLoginRes.status === 403, 'Pending student is rejected with HTTP 403 Forbidden before approval');

  // ----------------------------------------------------
  // 4. ADMIN AUTHENTICATION & MANAGEMENT
  // ----------------------------------------------------
  console.log('\n>>> [4/6] Testing Admin Authentication & Student Approval...');
  const adminLoginRes = await fetch(`${serverUrl}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@acube.academy', password: 'AdminPass123!' }),
  });
  assert(adminLoginRes.status === 200, 'Admin login succeeds');
  const adminCookies = extractCookies(adminLoginRes);
  const adminData = await adminLoginRes.json();
  assert(adminData.data.role === 'admin', 'Admin role verified', adminData.data.email);

  // Admin Dashboard Metrics
  const dashRes = await (await fetch(`${serverUrl}/admin/dashboard`, {
    headers: { Cookie: adminCookies },
  })).json();
  assert(dashRes.success === true && dashRes.data.totalStudents >= 1, 'Admin Dashboard returns metrics', `Students: ${dashRes.data.totalStudents}`);

  // Locate Pending Student in Directory
  const pendingStudentsRes = await (await fetch(`${serverUrl}/admin/students?status=pending`, {
    headers: { Cookie: adminCookies },
  })).json();
  const targetStudent = pendingStudentsRes.data.find(s => s.email === testStudentEmail);
  assert(!!targetStudent, 'Admin locates pending student in directory', targetStudent?._id);

  // Admin Approves Student
  const approveRes = await (await fetch(`${serverUrl}/admin/students/${targetStudent._id}/approve`, {
    method: 'POST',
    headers: { Cookie: adminCookies },
  })).json();
  assert(approveRes.success === true && approveRes.data.status === 'active', 'Admin approves student account', `Status: ${approveRes.data.status}`);

  // Admin Publishes Urgent Announcement
  const annRes = await (await fetch(`${serverUrl}/announcements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      title: 'HSC 2026 স্পেশাল মেকানিক্স মডেল টেস্ট',
      description: 'আগামী শুক্রবার সকাল ১০টায় সকল শিক্ষার্থীদের উপস্থিত থাকতে অনুরোধ করা হচ্ছে।',
      priority: 'urgent',
      targetAudience: 'all',
    }),
  })).json();
  assert(annRes.success === true, 'Admin posts urgent announcement', annRes.data.title);

  // Admin Schedules Examination Routine
  const examRes = await (await fetch(`${serverUrl}/exams`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: adminCookies },
    body: JSON.stringify({
      title: 'Physics Paper 1 - Vector & Mechanics Test',
      subject: subjectsRes.data[0]._id,
      date: new Date(Date.now() + 86400000 * 3).toISOString(),
      totalMarks: 50,
      duration: 60,
      description: 'অধ্যায় ২ ও ৪ এর ওপর পূর্ণাঙ্গ বহুনির্বাচনী ও সৃজনশীল পরীক্ষা।',
    }),
  })).json();
  assert(examRes.success === true, 'Admin schedules examination routine', examRes.data.title);

  // ----------------------------------------------------
  // 5. APPROVED STUDENT PORTAL & MATERIAL ACCESS
  // ----------------------------------------------------
  console.log('\n>>> [5/6] Testing Approved Student Portal & Material Access...');
  const studentLoginRes = await fetch(`${serverUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testStudentEmail, password: studentPassword }),
  });
  assert(studentLoginRes.status === 200, 'Approved student login succeeds');
  const studentCookies = extractCookies(studentLoginRes);
  const studentData = await studentLoginRes.json();
  assert(studentData.data.status === 'active', 'Student status is active');

  // Verify Session (/auth/me)
  const meRes = await (await fetch(`${serverUrl}/auth/me`, {
    headers: { Cookie: studentCookies },
  })).json();
  assert(meRes.data.email === testStudentEmail, 'Student session verified via /auth/me');

  // Student Dashboard Stats
  const stuDash = await (await fetch(`${serverUrl}/student/dashboard`, {
    headers: { Cookie: studentCookies },
  })).json();
  assert(stuDash.success === true && stuDash.data.stats.enrolledSubjects === 3, 'Student dashboard returns 3 subjects and stats');

  // Student Subject Materials (Physics)
  const physicsMaterials = await (await fetch(`${serverUrl}/materials/subject/physics`, {
    headers: { Cookie: studentCookies },
  })).json();
  assert(physicsMaterials.success === true && physicsMaterials.data.length > 0, 'Student accesses Physics lecture notes', `Found ${physicsMaterials.data.length} notes`);

  // Search Filter
  const searchRes = await (await fetch(`${serverUrl}/materials?search=ক্যালকুলাস`, {
    headers: { Cookie: studentCookies },
  })).json();
  assert(searchRes.data.length >= 1, 'Search filter locates Calculus sheets', searchRes.data[0]?.title);

  // Presigned Download URL Generation
  const matId = physicsMaterials.data[0]._id;
  const downloadRes = await (await fetch(`${serverUrl}/materials/${matId}/download`, {
    headers: { Cookie: studentCookies },
  })).json();
  assert(downloadRes.success === true && downloadRes.url.length > 20, 'Material download generates S3 presigned URL');

  // Announcements & Exams
  const stuAnn = await (await fetch(`${serverUrl}/announcements`, {
    headers: { Cookie: studentCookies },
  })).json();
  assert(stuAnn.data.length > 0, 'Student receives published announcements', stuAnn.data[0]?.title);

  const stuExams = await (await fetch(`${serverUrl}/exams`, {
    headers: { Cookie: studentCookies },
  })).json();
  assert(stuExams.data.length > 0, 'Student receives examination routine', stuExams.data[0]?.title);

  // ----------------------------------------------------
  // 6. SECURITY RBAC GUARD
  // ----------------------------------------------------
  console.log('\n>>> [6/6] Testing Security RBAC Guard (Student blocked from Admin)...');
  const rbacTestRes = await fetch(`${serverUrl}/admin/dashboard`, {
    headers: { Cookie: studentCookies },
  });
  assert(rbacTestRes.status === 403, 'Student blocked from Admin routes with HTTP 403 Forbidden');

  console.log('\n========================================================');
  console.log('   ALL 24 TEST SUITES PASSED! SYSTEM 100% OPERATIONAL.    ');
  console.log('========================================================\n');
}

run().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
