import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Calculator,
  Monitor,
  FileText,
  Bell,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import LanguageToggle from '@/components/common/LanguageToggle';

const navItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
  { label: 'Profile', path: '/student/profile', icon: UserIcon },
  { label: 'Physics', path: '/student/physics', icon: BookOpen },
  { label: 'Mathematics', path: '/student/math', icon: Calculator },
  { label: 'ICT', path: '/student/ict', icon: Monitor },
  { label: 'All Materials', path: '/student/materials', icon: FileText },
  { label: 'Announcements', path: '/student/announcements', icon: Bell },
  { label: 'Exams', path: '/student/exams', icon: CheckSquare },
  { label: 'Settings', path: '/student/settings', icon: Settings },
];

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getPageTitle = () => {
    const item = navItems.find((nav) => nav.path === location.pathname);
    return item ? item.label : 'Student Portal';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-inter">
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed top-0 left-0 h-full w-[250px] bg-primary text-slate-300 z-50 flex flex-col transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-secondary text-primary flex items-center justify-center font-bold text-lg">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-white truncate">{user?.name || 'Student Name'}</h3>
              <p className="text-xs text-slate-400">Student</p>
            </div>
          </div>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-secondary/10 text-secondary'
                    : 'hover:bg-white/5 hover:text-white'
                )}
              >
                <item.icon className={cn('h-5 w-5', isActive ? 'text-secondary' : 'text-slate-400')} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[250px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <div className="hidden sm:flex items-center gap-2">
               <span className="text-sm font-medium text-slate-700">{user?.name}</span>
               <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                 {user?.name?.charAt(0) || 'S'}
               </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
