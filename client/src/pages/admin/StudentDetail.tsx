import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, Calendar, User, ShieldAlert, CheckCircle, Key } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import SEOHead from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { adminService } from '@/services/adminService';

const passwordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);

  const { data: student, isLoading, isError } = useQuery({
    queryKey: ['student', id],
    queryFn: () => adminService.getStudentDetails(id!),
    enabled: !!id,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
  });

  const updateStatusMutation = useMutation({
    mutationFn: (status: string) => adminService.updateStudentStatus(id!, status),
    onSuccess: (data, status) => {
      toast.success(`Student status updated to ${status}`);
      queryClient.invalidateQueries({ queryKey: ['student', id] });
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update student status');
    }
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: z.infer<typeof passwordSchema>) => adminService.resetStudentPassword(id!, data.newPassword),
    onSuccess: () => {
      toast.success('Password reset successfully');
      setResetPasswordOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to reset password');
    }
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
        <p className="text-muted-foreground mb-4">The student you are looking for does not exist.</p>
        <Button onClick={() => navigate('/admin/students')}>Back to Students</Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500 text-sm">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500 text-white text-sm">Pending</Badge>;
      case 'suspended':
        return <Badge variant="destructive" className="text-sm">Suspended</Badge>;
      default:
        return <Badge variant="outline" className="text-sm">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SEOHead title="Student Profile | Admin Dashboard" />
      
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
          <Link to="/admin/students">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Students
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-2xl">
              {isLoading ? <Skeleton className="h-8 w-48" /> : student?.name}
            </CardTitle>
            <CardDescription>
              {isLoading ? <Skeleton className="h-4 w-32 mt-2" /> : `Student ID: ${student?.studentId || student?.id?.slice(-8).toUpperCase()}`}
            </CardDescription>
          </div>
          <div>
            {isLoading ? <Skeleton className="h-6 w-20 rounded-full" /> : student && getStatusBadge(student.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" /> Personal Information
              </h3>
              <div className="space-y-3 pl-7">
                <div className="flex items-center">
                  <Mail className="mr-3 h-4 w-4 text-muted-foreground" />
                  {isLoading ? <Skeleton className="h-4 w-40" /> : <span>{student?.email}</span>}
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 h-4 w-4 text-muted-foreground" />
                  {isLoading ? <Skeleton className="h-4 w-32" /> : <span>{student?.phone || 'N/A'}</span>}
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                  {isLoading ? <Skeleton className="h-4 w-32" /> : <span>Joined {new Date(student?.createdAt).toLocaleDateString()}</span>}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Academic Details</h3>
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Batch:</span>
                  <span className="font-medium">{isLoading ? <Skeleton className="h-4 w-20" /> : student?.batch}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Institution:</span>
                  <span className="font-medium">{isLoading ? <Skeleton className="h-4 w-32" /> : (student?.institution || 'N/A')}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Admin Actions</h3>
            <div className="flex flex-wrap gap-3">
              {student?.status === 'pending' && (
                <Button 
                  onClick={() => updateStatusMutation.mutate('active')}
                  disabled={updateStatusMutation.isPending}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Approve Registration
                </Button>
              )}
              {student?.status === 'active' && (
                <Button 
                  onClick={() => updateStatusMutation.mutate('suspended')}
                  disabled={updateStatusMutation.isPending}
                  variant="outline"
                  className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                >
                  <ShieldAlert className="mr-2 h-4 w-4" /> Suspend Student
                </Button>
              )}
              {student?.status === 'suspended' && (
                <Button 
                  onClick={() => updateStatusMutation.mutate('active')}
                  disabled={updateStatusMutation.isPending}
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50"
                >
                  <CheckCircle className="mr-2 h-4 w-4" /> Unsuspend
                </Button>
              )}
              
              <Button variant="secondary" onClick={() => setResetPasswordOpen(true)}>
                <Key className="mr-2 h-4 w-4" /> Reset Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={resetPasswordOpen} onOpenChange={setResetPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset Student Password</DialogTitle>
            <DialogDescription>
              Enter a new password for {student?.name}. The student will be able to log in with this new password immediately.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit((data) => resetPasswordMutation.mutate(data))}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  {...register('newPassword')} 
                  placeholder="Enter new password"
                />
                {errors.newPassword && (
                  <p className="text-sm text-red-500">{errors.newPassword.message}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setResetPasswordOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={resetPasswordMutation.isPending}>
                {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
