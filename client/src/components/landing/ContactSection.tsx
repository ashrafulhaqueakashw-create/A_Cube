import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 font-hind"
          >
            {t('contact.title', 'যোগাযোগ করুন')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 font-hind max-w-2xl mx-auto"
          >
            {t('contact.subtitle', 'যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন অথবা সরাসরি ভিজিট করুন আমাদের একাডেমি।')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-hind">A-Cube Academy</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 font-hind">
                      {t('contact.addressTitle', 'ঠিকানা')}
                    </h4>
                    <p className="text-slate-600 font-hind">
                      {t('contact.addressValue', 'ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 font-hind">
                      {t('contact.phoneTitle', 'ফোন নাম্বার')}
                    </h4>
                    <p className="text-slate-600 font-medium">01781-760998</p>
                    <p className="text-slate-600 font-medium">01995-516182</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1 font-hind">
                      {t('contact.emailTitle', 'ইমেইল')}
                    </h4>
                    <p className="text-slate-600">contact@acube.academy</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white font-hind cursor-pointer" asChild>
                  <a href="tel:01781760998">
                    <Phone className="w-4 h-4 mr-2" /> {t('contact.callNow', 'কল করুন')}
                  </a>
                </Button>
                <Button className="bg-[#25D366] hover:bg-[#20b858] text-white font-hind cursor-pointer" asChild>
                  <a href="https://wa.me/8801781760998" target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" /> {t('contact.whatsapp', 'হোয়াটসঅ্যাপ')}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-slate-200 rounded-2xl overflow-hidden h-[400px] lg:h-auto min-h-[400px] relative shadow-md"
          >
            <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Khilkhet,Dhaka&zoom=14&size=800x800&sensor=false')] bg-cover bg-center opacity-40 grayscale blur-[1px]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center max-w-sm border border-slate-100">
                <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 mb-2 font-hind">
                  {t('contact.visitUs', 'সরাসরি ভিজিট করুন')}
                </h4>
                <p className="text-sm text-slate-600 mb-4 font-hind leading-relaxed">
                  {t('contact.addressValue', 'ধুমনী পশ্চিম পাড়া (মসজিদ সংলগ্ন), খিলক্ষেত, ঢাকা-১২২৯')}
                </p>
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold font-hind">
                  {t('contact.khilkhetLocation', 'খিলক্ষেত ব্রাঞ্চ, ঢাকা')}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
