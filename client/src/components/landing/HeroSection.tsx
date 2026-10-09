import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Monitor, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <section id="home" className="relative min-h-[85vh] flex items-center pt-28 sm:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="mb-6 flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm border border-white/20 backdrop-blur-sm font-hind">
              <BookOpen className="w-4 h-4 text-blue-400" /> {t('hero.badgePhysics', 'Physics')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm border border-white/20 backdrop-blur-sm font-hind">
              <Calculator className="w-4 h-4 text-green-400" /> {t('hero.badgeMath', 'Math')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-sm border border-white/20 backdrop-blur-sm font-hind">
              <Monitor className="w-4 h-4 text-purple-400" /> {t('hero.badgeIct', 'ICT')}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight font-hind"
          >
            {t('hero.titleLine1', 'HSC + Admission প্রস্তুতির')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              {t('hero.titleLine2', 'নতুন ঠিকানা')}
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-hind leading-relaxed"
          >
            {t('hero.subtitle', 'Physics, Math ও ICT — Basic থেকে Advanced পর্যন্ত Concept Clear করে Smart ও Structured Learning. আমাদের অভিজ্ঞ শিক্ষকদের সাথে তোমার প্রস্তুতি হোক আরো সুদৃঢ়।')}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto text-base font-semibold bg-secondary hover:bg-secondary/90 text-[#0f172a] h-14 px-8 rounded-full font-hind cursor-pointer"
            >
              {t('hero.ctaPrimary', 'Student Portal')} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto text-base font-semibold border-white/30 text-slate-900 bg-white/90 hover:bg-white h-14 px-8 rounded-full font-hind cursor-pointer"
            >
              {t('hero.ctaSecondary', 'Admission চলছে')}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
