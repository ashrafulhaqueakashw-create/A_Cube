import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Atom, Calculator, Monitor, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const subjects = [
  {
    id: 'physics',
    name: 'Physics',
    bnName: 'পদার্থবিজ্ঞান',
    icon: Atom,
    description: 'গতিবিদ্যা, নিউটনিয়ান বলবিদ্যা থেকে শুরু করে আধুনিক পদার্থবিজ্ঞান পর্যন্ত বেসিক টু এডভান্সড কনসেপ্ট।',
    teacher: 'Ashraful Haque Akash',
    university: 'BRAC University (CSE)',
    teacherImage: '/images/teachers/akash-physics.jpg',
    punchline: 'Physics নিয়ে no চিন্তা',
    experience: '4+ Years Exp',
    color: 'blue'
  },
  {
    id: 'math',
    name: 'Mathematics',
    bnName: 'উচ্চতর গণিত',
    icon: Calculator,
    description: 'ক্যালকুলাস, ত্রিকোণমিতি, জ্যামিতি - শর্টকাট ট্রিকস ও বেসিক কনসেপ্টের সমন্বয়ে স্পেশাল কেয়ার।',
    teacher: 'Mosfer Hosen Sabbir',
    university: 'BUTEX (TMDM)',
    teacherImage: '/images/teachers/sabbir-math.jpg',
    punchline: 'এখন Mathematics হবে আরও Easy',
    experience: '3.5+ Years Exp',
    color: 'green'
  },
  {
    id: 'ict',
    name: 'ICT',
    bnName: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    icon: Monitor,
    description: 'C Programming, HTML, Database ও লজিক গেটস এর প্রাক্টিক্যাল ও থিওরিটিক্যাল ক্লাস।',
    teacher: 'Azmain Hasan Ahsun',
    university: 'IUB (CSE)',
    teacherImage: '/images/teachers/ahsun-ict.jpg',
    punchline: 'HTML থেকে Programming, ICT একদম সহজ',
    experience: '3+ Years Exp',
    color: 'purple'
  }
];

const colorStyles = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', hover: 'hover:border-blue-300' },
  green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100', hover: 'hover:border-green-300' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', hover: 'hover:border-purple-300' },
};

export default function SubjectSection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubjectClick = (subjectId: string) => {
    if (isAuthenticated) {
      navigate(`/student/${subjectId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <section id="subjects" className="py-20 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-hind"
          >
            {t('subjects.title', 'আমাদের বিষয়সমূহ')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-hind max-w-2xl mx-auto"
          >
            {t('subjects.subtitle', 'বিজ্ঞানের মূল বিষয়গুলোতে সর্বোচ্চ প্রস্তুতি নিশ্চিত করতে আমাদের রয়েছে অভিজ্ঞ মেন্টর প্যানেল।')}
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {subjects.map((subject, idx) => {
            const styles = colorStyles[subject.color as keyof typeof colorStyles];
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <Card className={`h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-2 ${styles.border} ${styles.hover} rounded-3xl`}>
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className={`p-8 ${styles.bg}`}>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl bg-white shadow-sm ${styles.text}`}>
                          <subject.icon className="w-8 h-8" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-1 font-hind">
                        {t(`subjects.${subject.id}`, subject.name)}
                      </h3>
                      <p className="text-sm font-medium text-slate-500 mb-4 font-hind">
                        {subject.name}
                      </p>
                      <p className="text-slate-600 font-hind mb-6 h-20 line-clamp-3">
                        {t(`subjects.${subject.id}Desc`, subject.description)}
                      </p>
                    </div>

                    <div className="p-7 bg-white border-t border-slate-100 flex flex-col justify-between flex-1">
                      <div className="mb-5">
                        <div className="flex items-center gap-3.5 mb-3">
                          <img 
                            src={subject.teacherImage} 
                            alt={subject.teacher} 
                            className="w-12 h-12 rounded-2xl object-cover object-top border-2 border-white shadow-md ring-2 ring-slate-100 shrink-0"
                          />
                          <div>
                            <p className="text-xs text-slate-500 font-medium font-hind">
                              {t('subjects.instructor', 'Course Instructor')}
                            </p>
                            <p className="font-bold text-slate-900 leading-tight font-hind">{subject.teacher}</p>
                            <p className="text-xs text-slate-500">{subject.university}</p>
                          </div>
                        </div>
                        
                        <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700 font-hind">✨ "{subject.punchline}"</span>
                          <span className="text-[11px] font-bold text-slate-500">{subject.experience}</span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleSubjectClick(subject.id)}
                        className="w-full justify-between group font-hind cursor-pointer rounded-xl h-11"
                        variant="outline"
                      >
                        {t('subjects.viewMaterials', 'View Materials')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
