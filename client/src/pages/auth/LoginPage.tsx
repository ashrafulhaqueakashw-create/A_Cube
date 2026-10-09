import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Loader2 } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SEOHead } from '@/components/common/SEOHead';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const loggedUser = await login(data.email, data.password);
      toast.success('Successfully logged in!');
      if (loggedUser?.role === 'admin' || loggedUser?.role === 'superadmin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (error: any) {
      const msg = typeof error?.response?.data === 'string'
        ? error.response.data
        : (error?.response?.data?.message || error?.message || 'Failed to login');
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Login - A-Cube Academy" description="Login to your A-Cube Academy student account" />
      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
        {/* Left Side - Decorative */}
        <div className="hidden md:flex flex-1 flex-col justify-center bg-blue-600 text-white p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-900 opacity-90 z-0"></div>
          
          <div className="relative z-10 max-w-lg">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-white p-2 rounded-lg text-blue-600">
                  <GraduationCap size={32} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">A-Cube Academy</h1>
              </div>
              <h2 className="text-3xl font-semibold mb-4 leading-tight">
                Empowering your journey to academic excellence.
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Access exclusive study materials, track your progress, and stay updated with the latest announcements.
              </p>
              
              <div className="space-y-4 text-blue-100">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/30 p-2 rounded-full"><ArrowRight size={16} /></div>
                  <span>Premium HSC & Admission Guidelines</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/30 p-2 rounded-full"><ArrowRight size={16} /></div>
                  <span>Structured Learning Materials</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/30 p-2 rounded-full"><ArrowRight size={16} /></div>
                  <span>Interactive Mock Exams</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 animate-blob"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 z-0 animate-blob animation-delay-2000"></div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative">
          <div className="w-full max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-center md:text-left mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-500">Please enter your details to sign in.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    {...register('email')}
                    className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    {...register('password')}
                    className={errors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full py-6 text-lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-8 text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-800 hover:underline">
                    Register here
                  </Link>
                </p>
                
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Secure access for staff</span>
                  </div>
                </div>
                
                <Link 
                  to="/admin/login" 
                  className="inline-flex items-center justify-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Admin Login
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
