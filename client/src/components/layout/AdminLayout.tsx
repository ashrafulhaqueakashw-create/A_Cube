import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  GraduationCap,
  Bell,
  CheckSquare,
  Settings,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import LanguageToggle from '@/components/common/LanguageToggle';

const navGroups = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    ]
  },
  {
    label: 'Management',
    items: [
      { label: 'Students', path: '/admin/students', icon: Users },
      { label: 'Materials', path: '/admin/materials', icon: FileText },
      { label: 'Subjects', path: '/admin/subjects', icon: BookOpen },
      { label: 'Teachers', path: '/admin/teachers', icon: GraduationCap },
    ]
  },
  {
    label: 'Communication',
    items: [
      { label: 'Announcements', path: '/admin/announcements', icon: Bell },
      { label: 'Exams', path: '/admin/exams', icon: CheckSquare },
    ]
  },
  {
    label: 'System',
    items: [
      { label: 'Profile', path: '/admin/profile', icon: UserIcon },
      { label: 'Settings', path: '/admin/settings', icon: Settings },
    ]
  }
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
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
          'fixed top-0 left-0 h-full w-[280px] bg-slate-900 text-slate-300 z-50 flex flex-col transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-indigo-600 text-white flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-white leading-tight">Admin Panel</h3>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">A-Cube Academy</p>
            </div>
          </div>
          <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {navGroups.map((group) => (
            <div key={group.label}>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                {group.label}
              </h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border-l-2',
                          isActive
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500'
                            : 'border-transparent hover:bg-slate-800/50 hover:text-slate-200'
                        )}
                      >
                        <item.icon className={cn('h-5 w-5', isActive ? 'text-indigo-400' : 'text-slate-500')} />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
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
      <div className="flex-1 lg:ml-[280px] flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Breadcrumb pseudo */}
            <div className="hidden sm:flex items-center text-sm text-slate-500">
               <span className="font-medium text-slate-800">Admin</span>
               <span className="mx-2">/</span>
               <span className="capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <LanguageToggle />
            <div className="flex items-center gap-3 pl-5 border-l border-slate-200">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-semibold text-slate-800 leading-tight">{user?.name || 'Administrator'}</p>
                 <p className="text-xs text-slate-500">Super Admin</p>
               </div>
               <div className="h-9 w-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                 {user?.name?.charAt(0) || 'A'}
               </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
