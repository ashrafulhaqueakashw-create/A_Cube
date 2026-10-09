import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/common/SEOHead';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead title="403 - Unauthorized Access" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full space-y-6 bg-white p-10 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-red-100 p-6 rounded-full">
                <ShieldAlert className="w-16 h-16 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900">Access Denied</h1>
            <div className="h-1 w-16 bg-red-500 mx-auto rounded-full"></div>
            <p className="text-slate-600">
              You do not have permission to view this page. This area is restricted.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
            <Button asChild className="flex items-center gap-2">
              <Link to="/">
                <Home className="w-4 h-4" />
                Go to Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
