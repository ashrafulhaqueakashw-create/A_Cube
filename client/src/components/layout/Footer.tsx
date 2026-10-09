import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Youtube, GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-[#0f172a] text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white">
              <GraduationCap className="h-8 w-8 text-secondary" />
              <span className="font-bold text-2xl tracking-tight">
                A-Cube Academy
              </span>
            </Link>
            <p className="text-sm text-slate-400 font-hind">
              {t('footer.tagline', 'HSC + Admission পূর্ণাঙ্গ প্রস্তুতি')}
            </p>
            <p className="text-sm mt-4 font-hind leading-relaxed">
              {t('footer.description', 'Physics, Math ও ICT — Basic থেকে Advanced পর্যন্ত Concept Clear করে Smart ও Structured Learning.')}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Youtube" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-hind">
              {t('footer.quickLinks', 'প্রয়োজনীয় লিংক')}
            </h3>
            <ul className="space-y-2 font-hind">
              <li><Link to="/" className="hover:text-secondary transition-colors text-sm">{t('footer.home', 'Home')}</Link></li>
              <li><a href="#about" className="hover:text-secondary transition-colors text-sm">{t('footer.about', 'About Us')}</a></li>
              <li><a href="#features" className="hover:text-secondary transition-colors text-sm">{t('footer.features', 'Features')}</a></li>
              <li><a href="#teachers" className="hover:text-secondary transition-colors text-sm">{t('footer.teachers', 'Teachers')}</a></li>
              <li><Link to="/login" className="hover:text-secondary transition-colors text-sm">{t('footer.studentPortal', 'Student Portal')}</Link></li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-hind">
              {t('footer.subjectsTitle', 'বিষয়সমূহ')}
            </h3>
            <ul className="space-y-2 font-hind">
              <li><a href="#subjects" className="hover:text-secondary transition-colors text-sm">{t('subjects.physics', 'Physics')}</a></li>
              <li><a href="#subjects" className="hover:text-secondary transition-colors text-sm">{t('subjects.math', 'Mathematics')}</a></li>
              <li><a href="#subjects" className="hover:text-secondary transition-colors text-sm">{t('subjects.ict', 'ICT')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 font-hind">
              {t('footer.contactTitle', 'যোগাযোগ')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm font-hind">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span>{t('footer.address', 'ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯')}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>01781-760998, 01995-516182</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>contact@acube.academy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-hind">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} A-Cube Academy. {t('footer.rights', 'All Rights Reserved.')}
          </p>
          <div className="flex gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy', 'Privacy Policy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms', 'Terms of Service')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
