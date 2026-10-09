import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import LanguageToggle from '@/components/common/LanguageToggle';

const navLinks = [
  { key: 'home', label: 'Home', href: '#home' },
  { key: 'about', label: 'About', href: '#about' },
  { key: 'subjects', label: 'Subjects', href: '#subjects' },
  { key: 'teachers', label: 'Teachers', href: '#teachers' },
  { key: 'features', label: 'Features', href: '#features' },
  { key: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, isStudent, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl md:text-2xl text-primary tracking-tight">
            A-Cube Academy
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-slate-700 hover:text-primary transition-colors font-hind cursor-pointer"
            >
              {t(`nav.${link.key}`, link.label)}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          {isAuthenticated ? (
            <Button
              onClick={() =>
                navigate(isAdmin ? '/admin/dashboard' : '/student/dashboard')
              }
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white font-hind"
            >
              {t('nav.dashboard', 'Dashboard')}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => navigate('/admin/login')}
                className="text-primary border-primary hover:bg-primary/5 hidden lg:inline-flex font-hind"
              >
                {t('nav.admin', 'Admin')}
              </Button>
              <Button
                onClick={() => navigate('/login')}
                className="bg-primary hover:bg-primary/90 text-white font-hind"
              >
                <User className="w-4 h-4 mr-2" /> {t('nav.studentLogin', 'Student Login')}
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 p-1"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b shadow-lg overflow-hidden absolute top-full left-0 w-full"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left py-2 text-slate-700 font-medium border-b border-slate-100 last:border-0 font-hind"
                >
                  {t(`nav.${link.key}`, link.label)}
                </button>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100">
                {isAuthenticated ? (
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate(isAdmin ? '/admin/dashboard' : '/student/dashboard');
                    }}
                    className="w-full bg-primary text-white font-hind"
                  >
                    {t('nav.dashboard', 'Dashboard')}
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/admin/login');
                      }}
                      className="w-full text-primary border-primary font-hind"
                    >
                      {t('nav.adminLogin', 'Admin Login')}
                    </Button>
                    <Button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full bg-primary text-white font-hind"
                    >
                      {t('nav.studentLogin', 'Student Login')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
