import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const isBangla = i18n.language?.startsWith('bn');

  const setLanguage = (lang: 'bn' | 'en') => {
    i18n.changeLanguage(lang);
    try {
      localStorage.setItem('i18nextLng', lang);
    } catch {
      // ignore
    }
  };

  return (
    <div className="inline-flex items-center bg-slate-100/90 dark:bg-slate-800 p-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
      <Globe className="w-3 h-3 ml-1.5 mr-0.5 text-slate-500 shrink-0 hidden xs:inline-block" />
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={cn(
          "px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer font-hind",
          isBangla
            ? "bg-primary text-white shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        )}
        aria-label="বাংলা নির্বাচন করুন"
      >
        বাং
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          "px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer",
          !isBangla
            ? "bg-primary text-white shadow-xs font-bold"
            : "text-slate-600 hover:text-slate-900"
        )}
        aria-label="Select English"
      >
        EN
      </button>
    </div>
  );
};

export { LanguageToggle };
export default LanguageToggle;
