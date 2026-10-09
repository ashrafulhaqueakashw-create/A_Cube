import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, BookOpen, Shield, Loader2, Camera } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { SEOHead } from '@/components/common/SEOHead';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/axios';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(11, 'Valid phone required'),
  hscBatch: z.string().min(1, 'HSC Batch is required'),
  group: z.string().min(1, 'Group is required'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function StudentProfile() {
  const { user } = useAuth();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue,
    formState: { errors: profileErrors, isDirty: isProfileDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      hscBatch: user?.hscBatch || '',
      group: user?.group || '',
    }
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: ProfileFormValues) => {
    setIsUpdatingProfile(true);
    try {
      await api.put('/student/profile', data);
      toast.success('Profile updated successfully! Refreshing...');
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    setIsUpdatingPassword(true);
    try {
      await api.put('/auth/change-password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      toast.success('Password changed successfully!');
      resetPasswordForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to change password');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <>
      <SEOHead title="My Profile - A-Cube Academy" />
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar Profile Card */}
          <Card className="md:col-span-1 shadow-sm border-slate-100 border-t-4 border-t-blue-500">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative mb-4 group cursor-pointer">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-lg overflow-hidden">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <div className="flex items-center justify-center text-slate-500 mt-1 mb-4 gap-1.5 text-sm">
                <Mail className="w-4 h-4" />
                {user?.email}
              </div>
              <div className="w-full space-y-2 mt-4 text-left">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <Shield className="w-4 h-4 text-blue-500" /> Account Type
                  </div>
                  <span className="text-sm font-semibold capitalize">{user?.role}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <BookOpen className="w-4 h-4 text-blue-500" /> Batch
                  </div>
                  <span className="text-sm font-semibold">{user?.hscBatch || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                    <Phone className="w-4 h-4 text-blue-500" /> Phone
                  </div>
                  <span className="text-sm font-semibold">{user?.phone || 'N/A'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Edit Area */}
          <div className="md:col-span-2">
            <Card className="shadow-sm border-slate-100 h-full">
              <Tabs defaultValue="general" className="w-full">
                <CardHeader className="border-b border-slate-100 pb-0 pt-4 px-6">
                  <TabsList className="w-full justify-start bg-transparent border-b-0 space-x-4 h-auto p-0">
                    <TabsTrigger value="general" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-3 px-1 text-base">General Info</TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none pb-3 px-1 text-base">Security</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-6 px-6">
                  <TabsContent value="general" className="mt-0 outline-none">
                    <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input id="name" {...registerProfile('name')} className="pl-9" />
                          </div>
                          {profileErrors.name && <p className="text-xs text-red-500">{profileErrors.name.message}</p>}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input id="phone" {...registerProfile('phone')} className="pl-9" />
                          </div>
                          {profileErrors.phone && <p className="text-xs text-red-500">{profileErrors.phone.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input id="email" value={user?.email} disabled className="pl-9 bg-slate-50 cursor-not-allowed" />
                          </div>
                          <p className="text-xs text-slate-500">Email cannot be changed.</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="hscBatch">HSC Batch</Label>
                          <Select defaultValue={user?.hscBatch} onValueChange={(val) => setValue('hscBatch', val, { shouldDirty: true })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Batch" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="HSC 2026">HSC 2026</SelectItem>
                              <SelectItem value="HSC 2027">HSC 2027</SelectItem>
                              <SelectItem value="HSC 2028">HSC 2028</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="group">Group</Label>
                          <Select defaultValue={user?.group} onValueChange={(val) => setValue('group', val, { shouldDirty: true })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Science">Science</SelectItem>
                              <SelectItem value="Commerce">Commerce</SelectItem>
                              <SelectItem value="Arts">Arts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mt-8 flex justify-end">
                        <Button type="submit" disabled={!isProfileDirty || isUpdatingProfile}>
                          {isUpdatingProfile ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Changes'}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="security" className="mt-0 outline-none">
                    <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-5 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" {...registerPassword('currentPassword')} />
                        {passwordErrors.currentPassword && <p className="text-xs text-red-500">{passwordErrors.currentPassword.message}</p>}
                      </div>
                      
                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" {...registerPassword('newPassword')} />
                        {passwordErrors.newPassword && <p className="text-xs text-red-500">{passwordErrors.newPassword.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" {...registerPassword('confirmPassword')} />
                        {passwordErrors.confirmPassword && <p className="text-xs text-red-500">{passwordErrors.confirmPassword.message}</p>}
                      </div>

                      <div className="pt-4">
                        <Button type="submit" disabled={isUpdatingPassword}>
                          {isUpdatingPassword ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : 'Update Password'}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
