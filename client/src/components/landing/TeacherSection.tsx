import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Award, Sparkles, Maximize2, ExternalLink, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface TeacherItem {
  name: string;
  subject: string;
  subjectKey: string;
  university: string;
  experience: string;
  expBadge: string;
  expKey: string;
  punchline: string;
  punchlineKey: string;
  image: string;
  bioKey: string;
  bio: string;
  accent: {
    badge: string;
    border: string;
    quoteBg: string;
    quoteBorder: string;
    quoteText: string;
  };
}

const teachers: TeacherItem[] = [
  {
    name: 'Ashraful Haque Akash',
    subject: 'Physics',
    subjectKey: 'physics',
    university: 'BRAC University (CSE)',
    experience: '4+ years of experience as a Physics teacher',
    expBadge: '4+ Years Exp',
    expKey: 'teachers.akashExp',
    punchline: 'Physics নিয়ে no চিন্তা',
    punchlineKey: 'teachers.akashPunchline',
    image: '/images/teachers/akash-physics.jpg',
    bioKey: 'teachers.akashBio',
    bio: 'BRAC University (CSE) থেকে অধ্যয়নরত। পদার্থবিজ্ঞানের প্রতিটি জটিল কনসেপ্ট সহজ ও বাস্তব উদাহরণের মাধ্যমে হৃদয়ঙ্গম করাতে প্রতিশ্রুতিবদ্ধ।',
    accent: {
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      border: 'border-blue-200 hover:border-blue-400',
      quoteBg: 'bg-gradient-to-r from-blue-50 to-indigo-50/60',
      quoteBorder: 'border-blue-200/80',
      quoteText: 'text-blue-900'
    }
  },
  {
    name: 'Mosfer Hosen Sabbir',
    subject: 'Mathematics',
    subjectKey: 'math',
    university: 'BUTEX (TMDM)',
    experience: '3.5+ Years of Experience as a Math Teacher',
    expBadge: '3.5+ Years Exp',
    expKey: 'teachers.sabbirExp',
    punchline: 'এখন Mathematics হবে আরও Easy',
    punchlineKey: 'teachers.sabbirPunchline',
    image: '/images/teachers/sabbir-math.jpg',
    bioKey: 'teachers.sabbirBio',
    bio: 'BUTEX (TMDM) থেকে অধ্যয়নরত। গণিতের মূল ভিত্তি ও শর্টকাট টেকনিক সমৃদ্ধ সমস্যা সমাধানের দক্ষ নির্দেশক।',
    accent: {
      badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
      border: 'border-amber-200 hover:border-amber-400',
      quoteBg: 'bg-gradient-to-r from-amber-50 to-yellow-50/60',
      quoteBorder: 'border-amber-200/80',
      quoteText: 'text-amber-900'
    }
  },
  {
    name: 'Azmain Hasan Ahsun',
    subject: 'ICT',
    subjectKey: 'ict',
    university: 'IUB (CSE)',
    experience: '3+ years of experience as an ICT teacher',
    expBadge: '3+ Years Exp',
    expKey: 'teachers.ahsunExp',
    punchline: 'HTML থেকে Programming, ICT এখন একদম সহজ',
    punchlineKey: 'teachers.ahsunPunchline',
    image: '/images/teachers/ahsun-ict.jpg',
    bioKey: 'teachers.ahsunBio',
    bio: 'IUB (CSE) থেকে অধ্যয়নরত। আধুনিক তথ্যপ্রযুক্তি ও প্রোগ্রামিংয়ের বাস্তবমুখী শিক্ষাদানে নিবেদিতপ্রাণ।',
    accent: {
      badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
      border: 'border-indigo-200 hover:border-indigo-400',
      quoteBg: 'bg-gradient-to-r from-indigo-50 to-purple-50/60',
      quoteBorder: 'border-indigo-200/80',
      quoteText: 'text-indigo-900'
    }
  }
];

export default function TeacherSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="teachers" className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-4 font-hind shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>a³ Academy Expert Mentors</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-hind"
          >
            {t('teachers.title', 'আমাদের অভিজ্ঞ শিক্ষকবৃন্দ')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-hind max-w-2xl mx-auto"
          >
            {t('teachers.subtitle', 'দেশের সেরা বিশ্ববিদ্যালয়গুলোতে অধ্যয়নরত অভিজ্ঞ মেন্টরদের গাইডলাইনে তোমার প্রস্তুতি হবে ১০০% পারফেক্ট।')}
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {teachers.map((teacher, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className={`h-full border-2 ${teacher.accent.border} shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl overflow-hidden bg-white flex flex-col group`}>
                
                {/* Official Card Visual Container */}
                <div 
                  className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  <img 
                    src={teacher.image} 
                    alt={teacher.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Visual gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 backdrop-blur-md shadow-md">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {teacher.expBadge}
                    </span>
                  </div>

                  {/* Subject Tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ${teacher.accent.badge}`}>
                      {t(`subjects.${teacher.subjectKey}`, teacher.subject)}
                    </span>
                  </div>

                  {/* Hover Quick Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-slate-900 font-semibold text-xs shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5 text-primary" />
                      {t('teachers.viewCard', 'অফিশিয়াল পোস্টার দেখুন')}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <CardContent className="p-6 md:p-7 flex flex-col flex-1">
                  {/* Instructor Identity */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5 font-hind">
                      {teacher.name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                      <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                      <span>{teacher.university}</span>
                    </div>
                  </div>

                  {/* Signature Punchline Banner */}
                  <div className={`p-3.5 rounded-2xl border ${teacher.accent.quoteBorder} ${teacher.accent.quoteBg} mb-4 relative`}>
                    <p className={`text-sm font-bold font-hind ${teacher.accent.quoteText} leading-snug`}>
                      ✨ "{t(teacher.punchlineKey, teacher.punchline)}"
                    </p>
                    <p className="text-[11px] text-slate-500 font-hind mt-1 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-500" />
                      {t(teacher.expKey, teacher.experience)}
                    </p>
                  </div>

                  {/* Pedagogical Bio */}
                  <p className="text-slate-600 font-hind text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {t(teacher.bioKey, teacher.bio)}
                  </p>

                  {/* Action Button: View Full Poster Card */}
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedTeacher(teacher)}
                    className="w-full justify-center gap-2 font-hind rounded-xl hover:bg-slate-100 border-slate-200 text-slate-700 font-medium cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                    <span>{t('teachers.viewCard', 'অফিশিয়াল পোস্টার দেখুন')}</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* High-Resolution Poster Card Preview Modal */}
      <Dialog open={!!selectedTeacher} onOpenChange={(open) => !open && setSelectedTeacher(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden bg-slate-950 border-slate-800 text-white rounded-3xl shadow-2xl">
          {selectedTeacher && (
            <div>
              <div className="relative aspect-[3/4] w-full max-h-[75vh] bg-slate-900">
                <img 
                  src={selectedTeacher.image} 
                  alt={selectedTeacher.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 bg-slate-900/90 border-t border-slate-800">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 mb-1">
                      {selectedTeacher.subject} Instructor
                    </span>
                    <h3 className="text-xl font-bold text-white font-hind">{selectedTeacher.name}</h3>
                    <p className="text-sm text-slate-400">{selectedTeacher.university}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-400/20 text-amber-300">
                      <Award className="w-3.5 h-3.5" />
                      {selectedTeacher.expBadge}
                    </span>
                  </div>
                </div>
                <div className="mt-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <p className="text-sm font-semibold text-blue-300 font-hind">
                    ✨ "{t(selectedTeacher.punchlineKey, selectedTeacher.punchline)}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
