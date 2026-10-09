import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Loader2, GraduationCap } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SEOHead } from '@/components/common/SEOHead';

const registerSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name is required' }),
  phone: z.string().min(11, { message: 'Valid phone number is required' }).max(15),
  email: z.string().email({ message: 'Invalid email address' }),
  hscBatch: z.string().min(4, { message: 'HSC Batch is required' }),
  group: z.string().min(2, { message: 'Group is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await registerUser({
        name: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        hscBatch: data.hscBatch,
        group: data.group
      });
      toast.success('Registration successful! Your account is pending admin approval.', { duration: 5000 });
      navigate('/login');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Register - A-Cube Academy" description="Create a new student account" />
      <div className="min-h-screen bg-slate-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8 justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center text-blue-600 mb-4">
            <GraduationCap size={48} />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Join A-Cube Academy
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl"
        >
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    {...register('fullName')}
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="01XXXXXXXXX" 
                    {...register('phone')}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hscBatch">HSC Batch</Label>
                  <Select onValueChange={(val) => setValue('hscBatch', val)}>
                    <SelectTrigger className={errors.hscBatch ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HSC 2026">HSC 2026</SelectItem>
                      <SelectItem value="HSC 2027">HSC 2027</SelectItem>
                      <SelectItem value="HSC 2028">HSC 2028</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.hscBatch && <p className="text-xs text-red-500">{errors.hscBatch.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="group">Group</Label>
                  <Select onValueChange={(val) => setValue('group', val)}>
                    <SelectTrigger className={errors.group ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Commerce">Commerce</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.group && <p className="text-xs text-red-500">{errors.group.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    {...register('password')}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••" 
                    {...register('confirmPassword')}
                    className={errors.confirmPassword ? 'border-red-500' : ''}
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full py-6 text-base" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Register Account'
                  )}
                </Button>
              </div>
              
              <div className="text-xs text-center text-gray-500 mt-4">
                By registering, you agree to our Terms of Service and Privacy Policy.
                Note that your account will require admin approval before you can access materials.
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
