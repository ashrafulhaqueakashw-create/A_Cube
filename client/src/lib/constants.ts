export const API = {
  AUTH: {
    LOGIN: '/auth/login',
    ADMIN_LOGIN: '/auth/admin/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh-token',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  STUDENTS: { BASE: '/admin/students', DASHBOARD: '/student/dashboard', PROFILE: '/student/profile' },
  MATERIALS: { BASE: '/materials', BY_SUBJECT: '/materials/subject' },
  TEACHERS: { BASE: '/teachers' },
  SUBJECTS: { BASE: '/subjects' },
  ANNOUNCEMENTS: { BASE: '/announcements' },
  EXAMS: { BASE: '/exams' },
  SETTINGS: { BASE: '/settings' },
};

export const CATEGORIES = [
  { value: 'lecture-notes', label: 'Lecture Notes', labelBn: 'লেকচার নোটস' },
  { value: 'pdf', label: 'PDF', labelBn: 'পিডিএফ' },
  { value: 'class-slides', label: 'Class Slides', labelBn: 'ক্লাস স্লাইড' },
  { value: 'problem-sheets', label: 'Problem Sheets', labelBn: 'প্রবলেম শিট' },
  { value: 'assignments', label: 'Assignments', labelBn: 'অ্যাসাইনমেন্ট' },
  { value: 'question-banks', label: 'Question Banks', labelBn: 'প্রশ্ন ব্যাংক' },
  { value: 'model-tests', label: 'Model Tests', labelBn: 'মডেল টেস্ট' },
  { value: 'previous-questions', label: 'Previous Questions', labelBn: 'বিগত প্রশ্ন' },
  { value: 'other', label: 'Other', labelBn: 'অন্যান্য' },
];

export const SUBJECTS = [
  { slug: 'physics', value: 'physics', name: 'Physics', label: 'Physics', nameBn: 'পদার্থবিজ্ঞান', color: '#3b82f6', icon: 'Atom' },
  { slug: 'math', value: 'math', name: 'Math', label: 'Math', nameBn: 'গণিত', color: '#10b981', icon: 'Calculator' },
  { slug: 'ict', value: 'ict', name: 'ICT', label: 'ICT', nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', color: '#8b5cf6', icon: 'Monitor' },
];
