import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, ClipboardCheck, Brain, FileText, Gift, MonitorPlay, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

const featuresList = [
  {
    icon: BookOpen,
    titleKey: 'features.f1Title',
    descKey: 'features.f1Desc',
    defaultTitle: 'Concept Clear Teaching',
    defaultDesc: 'Basic থেকে Concept ক্লিয়ার করে পাঠদান'
  },
  {
    icon: ClipboardCheck,
    titleKey: 'features.f2Title',
    descKey: 'features.f2Desc',
    defaultTitle: 'Weekly Examination',
    defaultDesc: 'প্রতি সপ্তাহে নিয়মিত পরীক্ষা ও অগ্রগতি মূল্যায়ন'
  },
  {
    icon: Brain,
    titleKey: 'features.f3Title',
    descKey: 'features.f3Desc',
    defaultTitle: 'Extra Problem Solving',
    defaultDesc: 'Extra Problem Solving Class এর ব্যবস্থা'
  },
  {
    icon: FileText,
    titleKey: 'features.f4Title',
    descKey: 'features.f4Desc',
    defaultTitle: 'Lecture Materials',
    defaultDesc: 'প্রতি ক্লাসে Lecture Material প্রদান'
  },
  {
    icon: Gift,
    titleKey: 'features.f5Title',
    descKey: 'features.f5Desc',
    defaultTitle: 'Free Demo Class',
    defaultDesc: 'প্রথম সপ্তাহ সম্পূর্ণ ফ্রি ডেমো ক্লাস'
  },
  {
    icon: MonitorPlay,
    titleKey: 'features.f6Title',
    descKey: 'features.f6Desc',
    defaultTitle: 'Smart Digital Classroom',
    defaultDesc: 'প্রজেক্টরের মাধ্যমে স্মার্ট ডিজিটাল ক্লাস'
  },
  {
    icon: Award,
    titleKey: 'features.f7Title',
    descKey: 'features.f7Desc',
    defaultTitle: 'Special Exam Preparation',
    defaultDesc: 'পরীক্ষার পূর্বে বিশেষ প্রস্তুতি ক্লাস'
  }
];

export default function FeaturesSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="features" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-hind"
          >
            {t('features.sectionTitle', 'কেন A-Cube Academy?')}
          </motion.h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto"
        >
          {featuresList.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants} 
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex"
            >
              <Card className="w-full border border-slate-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-slate-50 group-hover:bg-primary/5 flex items-center justify-center mb-4 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 font-hind">
                    {t(feature.titleKey, feature.defaultTitle)}
                  </h3>
                  <p className="text-slate-600 text-sm font-hind">
                    {t(feature.descKey, feature.defaultDesc)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
