import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ServerCrash, RefreshCcw, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/common/SEOHead';

export default function ServerErrorPage() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <SEOHead title="500 - Server Error" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg w-full space-y-8"
        >
          <div className="flex justify-center">
            <ServerCrash className="w-32 h-32 text-red-500/80 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
          </div>
          
          <div className="space-y-4 text-slate-200">
            <h1 className="text-5xl font-bold tracking-tight text-white">500</h1>
            <h2 className="text-2xl font-semibold">Something went wrong</h2>
            <p className="text-slate-400 text-lg max-w-sm mx-auto">
              Our servers are currently experiencing issues. Please try again in a few minutes.
            </p>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="default" 
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              onClick={handleReload}
            >
              <RefreshCcw className="w-5 h-5" />
              Retry Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2"
            >
              <Link to="/">
                <Home className="w-5 h-5" />
                Go to Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
