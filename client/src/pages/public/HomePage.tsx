import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import SubjectSection from '@/components/landing/SubjectSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TeacherSection from '@/components/landing/TeacherSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CTASection from '@/components/landing/CTASection';
import ContactSection from '@/components/landing/ContactSection';
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>A-Cube Academy | HSC & Admission Preparation</title>
        <meta name="description" content="Physics, Math and ICT - Concept clear teaching for HSC and Admission test preparation." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <AboutSection />
        <SubjectSection />
        <FeaturesSection />
        <TeacherSection />
        <HowItWorksSection />
        <CTASection />
        <ContactSection />
      </div>
    </>
  );
}
