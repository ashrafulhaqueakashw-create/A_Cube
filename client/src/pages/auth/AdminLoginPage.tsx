import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Shield, ArrowLeft, Loader2 } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SEOHead } from '@/components/common/SEOHead';

const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid admin email' }),
  password: z.string().min(6, { message: 'Password is required' }),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: AdminLoginFormValues) => {
    setIsLoading(true);
    try {
      await adminLogin(data.email, data.password);
      toast.success('Admin login successful!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      const msg = typeof error?.response?.data === 'string'
        ? error.response.data
        : (error?.response?.data?.message || error?.message || 'Failed to authenticate admin');
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Admin Login - A-Cube Academy" description="Administrator portal login" />
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full border-[100px] border-slate-800"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full border-[80px] border-slate-800"></div>
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="mb-6">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <Card className="border-slate-800 bg-slate-900/80 backdrop-blur-sm shadow-2xl text-slate-100">
            <CardHeader className="space-y-3 pb-6">
              <div className="flex justify-center mb-2">
                <div className="p-3 bg-blue-600/20 rounded-full border border-blue-500/30">
                  <Shield className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center font-bold text-white">Admin Portal</CardTitle>
              <CardDescription className="text-center text-slate-400">
                Authorized personnel only. Please sign in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">Admin Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@a-cube.edu" 
                    {...register('email')}
                    className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-300">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    {...register('password')}
                    className={`bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500 ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6 py-5" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    'Secure Login'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-slate-800 pt-6">
              <p className="text-xs text-slate-500">
                &copy; {new Date().getFullYear()} A-Cube Academy. All rights reserved.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
