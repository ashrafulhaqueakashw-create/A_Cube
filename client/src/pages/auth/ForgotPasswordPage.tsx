import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ArrowLeft, KeyRound, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { SEOHead } from '@/components/common/SEOHead';
import { api } from '@/lib/axios';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await api.post('/auth/forgot-password', data);
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Forgot Password - A-Cube Academy" description="Reset your password" />
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-slate-100">
            <CardHeader className="space-y-2 text-center pb-6 pt-8">
              <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <KeyRound className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
              <CardDescription className="text-base">
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center space-y-4 py-4">
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
                    If an account exists for that email, we have sent password reset instructions.
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login">Return to Login</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your registered email" 
                      {...register('email')}
                      className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full mt-4" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Link...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
            {!isSubmitted && (
              <CardFooter className="flex justify-center border-t border-slate-100 pt-6 pb-8">
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
