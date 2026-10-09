import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Target, Video, Users, CheckCircle, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Target,
    titleKey: 'about.f1Title',
    descKey: 'about.f1Desc',
    defaultTitle: 'Concept-based Teaching',
    defaultDesc: 'মুখস্থ নয়, বেসিক ক্লিয়ার করে শেখার ওপর জোর দেওয়া হয়।',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: CheckCircle,
    titleKey: 'about.f2Title',
    descKey: 'about.f2Desc',
    defaultTitle: 'Regular Assessment',
    defaultDesc: 'সাপ্তাহিক ও মাসিক পরীক্ষার মাধ্যমে নিয়মিত অগ্রগতি যাচাই।',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Users,
    titleKey: 'about.f3Title',
    descKey: 'about.f3Desc',
    defaultTitle: 'Problem Solving Class',
    defaultDesc: 'স্টুডেন্টদের ডাউট ক্লিয়ার করার জন্য এক্সট্রা প্রবলেম সলভিং সেশন।',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Video,
    titleKey: 'about.f4Title',
    descKey: 'about.f4Desc',
    defaultTitle: 'Digital Classroom',
    defaultDesc: 'স্মার্ট প্রজেক্টর ও আধুনিক প্রযুক্তির মাধ্যমে পাঠদান।',
    color: 'text-rose-600',
    bgColor: 'bg-rose-100'
  },
  {
    icon: BookOpen,
    titleKey: 'about.f5Title',
    descKey: 'about.f5Desc',
    defaultTitle: 'Rich Lecture Materials',
    defaultDesc: 'প্রতিটি ক্লাসের জন্য সাজানো গুছানো লেকচার শিট ও নোটস।',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100'
  },
  {
    icon: Award,
    titleKey: 'about.f6Title',
    descKey: 'about.f6Desc',
    defaultTitle: 'HSC + Admission Focus',
    defaultDesc: 'HSC এর পাশাপাশি এডমিশন স্ট্যান্ডার্ড প্রস্তুতি।',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100'
  }
];

export default function AboutSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 font-hind"
          >
            {t('about.title', 'A-Cube Academy সম্পর্কে')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-hind leading-relaxed"
          >
            {t('about.description', 'A-Cube Academy একটি আধুনিক শিক্ষাপ্রতিষ্ঠান যা শিক্ষার্থীদের HSC এবং ভর্তি পরীক্ষার জন্য সম্পূর্ণ প্রস্তুত করে তোলে। আমরা বিশ্বাস করি সঠিক গাইডলাইন এবং কনসেপ্ট ক্লিয়ারিংয়ের মাধ্যমে যে কোনো শিক্ষার্থী তার কাঙ্ক্ষিত লক্ষ্যে পৌঁছাতে পারে।')}
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full border-slate-100 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-5`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 font-hind">
                    {t(feature.titleKey, feature.defaultTitle)}
                  </h3>
                  <p className="text-slate-600 font-hind">
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
