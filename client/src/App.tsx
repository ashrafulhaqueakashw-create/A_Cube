import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import '@/i18n';

// Layouts
import PublicLayout from '@/components/layout/PublicLayout';
import StudentLayout from '@/components/layout/StudentLayout';
import AdminLayout from '@/components/layout/AdminLayout';

// Common
import ProtectedRoute from '@/components/common/ProtectedRoute';
import ScrollToTop from '@/components/common/ScrollToTop';

// Public pages
import HomePage from '@/pages/public/HomePage';

// Auth pages
import LoginPage from '@/pages/auth/LoginPage';
import AdminLoginPage from '@/pages/auth/AdminLoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';

// Student pages
import StudentDashboard from '@/pages/student/StudentDashboard';
import StudentProfile from '@/pages/student/StudentProfile';
import SubjectMaterialsPage from '@/pages/student/SubjectMaterialsPage';
import AllMaterialsPage from '@/pages/student/AllMaterialsPage';
import AnnouncementsPage from '@/pages/student/AnnouncementsPage';
import ExamsPage from '@/pages/student/ExamsPage';
import StudentSettings from '@/pages/student/StudentSettings';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import StudentsManagement from '@/pages/admin/StudentsManagement';
import StudentDetail from '@/pages/admin/StudentDetail';
import MaterialsManagement from '@/pages/admin/MaterialsManagement';
import MaterialUpload from '@/pages/admin/MaterialUpload';
import MaterialEdit from '@/pages/admin/MaterialEdit';
import TeachersManagement from '@/pages/admin/TeachersManagement';
import SubjectsManagement from '@/pages/admin/SubjectsManagement';
import AnnouncementsManagement from '@/pages/admin/AnnouncementsManagement';
import ExamsManagement from '@/pages/admin/ExamsManagement';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminProfile from '@/pages/admin/AdminProfile';

// Error pages
import NotFoundPage from '@/pages/NotFoundPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Toaster position='top-right' />
            <Routes>
              {/* Public routes */}
              <Route element={<PublicLayout />}>
                <Route path='/' element={<HomePage />} />
              </Route>

              {/* Auth routes */}
              <Route path='/login' element={<LoginPage />} />
              <Route path='/admin/login' element={<AdminLoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/forgot-password' element={<ForgotPasswordPage />} />
              <Route path='/reset-password/:token' element={<ResetPasswordPage />} />

              {/* Student routes */}
              <Route element={<ProtectedRoute role='student' />}>
                <Route element={<StudentLayout />}>
                  <Route path='/student/dashboard' element={<StudentDashboard />} />
                  <Route path='/student/profile' element={<StudentProfile />} />
                  <Route path='/student/physics' element={<SubjectMaterialsPage />} />
                  <Route path='/student/math' element={<SubjectMaterialsPage />} />
                  <Route path='/student/ict' element={<SubjectMaterialsPage />} />
                  <Route path='/student/materials' element={<AllMaterialsPage />} />
                  <Route path='/student/announcements' element={<AnnouncementsPage />} />
                  <Route path='/student/exams' element={<ExamsPage />} />
                  <Route path='/student/settings' element={<StudentSettings />} />
                </Route>
              </Route>

              {/* Admin routes */}
              <Route element={<ProtectedRoute role='admin' />}>
                <Route element={<AdminLayout />}>
                  <Route path='/admin/dashboard' element={<AdminDashboard />} />
                  <Route path='/admin/students' element={<StudentsManagement />} />
                  <Route path='/admin/students/:id' element={<StudentDetail />} />
                  <Route path='/admin/materials' element={<MaterialsManagement />} />
                  <Route path='/admin/materials/upload' element={<MaterialUpload />} />
                  <Route path='/admin/materials/:id/edit' element={<MaterialEdit />} />
                  <Route path='/admin/subjects' element={<SubjectsManagement />} />
                  <Route path='/admin/teachers' element={<TeachersManagement />} />
                  <Route path='/admin/announcements' element={<AnnouncementsManagement />} />
                  <Route path='/admin/exams' element={<ExamsManagement />} />
                  <Route path='/admin/settings' element={<AdminSettings />} />
                  <Route path='/admin/profile' element={<AdminProfile />} />
                </Route>
              </Route>

              {/* Error routes */}
              <Route path='/unauthorized' element={<UnauthorizedPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
