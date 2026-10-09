import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, LogIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CTASection() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const benefits = [
    t('cta.b1', 'সকল লেকচার শিট ও নোটস একসাথে'),
    t('cta.b2', 'বিগত বছরের প্রশ্ন ও সমাধান'),
    t('cta.b3', 'এক্সাম রেজাল্ট এনালাইসিস'),
    t('cta.b4', 'গুরুত্বপূর্ণ নোটিশ ও এনাউন্সমেন্ট')
  ];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent z-0" />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-hind leading-tight">
                {t('cta.title', 'আপনার প্রয়োজনীয় Lecture Materials এখন হাতের মুঠোয়')}
              </h2>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/90 font-hind text-lg">
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center md:justify-end"
            >
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-2 font-hind">
                  {t('cta.cardTitle', 'স্টুডেন্ট পোর্টালে লগইন করুন')}
                </h3>
                <p className="text-slate-500 mb-6 text-sm font-hind">
                  {t('cta.cardSubtitle', 'আপনার সকল ম্যাটেরিয়ালস পেতে একাউন্টে লগইন করুন')}
                </p>
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg rounded-xl font-hind cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="w-5 h-5 mr-2" /> {t('cta.cardButton', 'Student Login')}
                </Button>
                <p className="text-xs text-slate-400 mt-4 font-hind">
                  {t('cta.cardFooter', 'একাউন্ট না থাকলে এডমিন বা শিক্ষকের সাথে যোগাযোগ করুন')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
