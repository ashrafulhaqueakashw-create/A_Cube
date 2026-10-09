import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { UserPlus, BookOpen, Download, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const steps = [
  {
    icon: UserPlus,
    titleKey: 'howItWorks.step1',
    descKey: 'howItWorks.step1Desc',
    title: 'A-Cube Academy-তে যোগ দিন',
    desc: 'Register করে আপনার একাউন্ট তৈরি করুন'
  },
  {
    icon: BookOpen,
    titleKey: 'howItWorks.step2',
    descKey: 'howItWorks.step2Desc',
    title: 'ক্লাসে অংশ নিন',
    desc: 'নিয়মিত ক্লাসে অংশগ্রহণ করুন'
  },
  {
    icon: Download,
    titleKey: 'howItWorks.step3',
    descKey: 'howItWorks.step3Desc',
    title: 'Materials অ্যাক্সেস করুন',
    desc: 'Lecture notes, PDF ও resources ডাউনলোড করুন'
  },
  {
    icon: TrendingUp,
    titleKey: 'howItWorks.step4',
    descKey: 'howItWorks.step4Desc',
    title: 'অগ্রগতি ট্র্যাক করুন',
    desc: 'পরীক্ষার ফলাফল ও অগ্রগতি দেখুন'
  }
];

export default function HowItWorksSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-hind"
          >
            {t('howItWorks.title', 'কীভাবে শুরু করবেন?')}
          </motion.h2>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-5xl mx-auto"
        >
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-slate-200" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {steps.map((step, idx) => (
              <motion.div key={idx} variants={itemVariants} className="relative flex flex-col items-center text-center">
                {/* Connecting Line (Mobile) */}
                {idx !== steps.length - 1 && (
                  <div className="md:hidden absolute top-24 bottom-[-3rem] left-1/2 w-0.5 bg-slate-200 -translate-x-1/2" />
                )}
                
                <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center relative z-10 mb-6">
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-md">
                    {idx + 1}
                  </div>
                  <step.icon className="w-10 h-10 text-secondary" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-hind">
                  {t(step.titleKey, step.title)}
                </h3>
                <p className="text-slate-500 font-hind">
                  {t(step.descKey, step.desc)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
