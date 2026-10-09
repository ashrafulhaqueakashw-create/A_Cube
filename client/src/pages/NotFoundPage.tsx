import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/common/SEOHead';

export default function NotFoundPage() {
  return (
    <>
      <SEOHead title="404 - Page Not Found" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-6"
        >
          <div className="relative">
            <h1 className="text-9xl font-extrabold text-slate-200 tracking-widest">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-4 rounded-full shadow-lg">
                <AlertTriangle className="w-12 h-12 text-amber-500" />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-slate-900">Page not found</h2>
            <p className="text-slate-500 text-lg">
              Oops! The page you are looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="pt-6">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Go Back Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
