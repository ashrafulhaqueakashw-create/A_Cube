import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Save } from 'lucide-react';

import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

import { settingsService } from '@/services/settingsService';

const settingsSchema = z.object({
  academyName: z.string().min(2, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  phone1: z.string().min(5, 'Primary phone is required'),
  phone2: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  facebookUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  youtubeUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function AdminSettings() {
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => settingsService.getSettings(),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    values: settings || {
      academyName: 'A-Cube Academy',
      address: '',
      phone1: '',
      phone2: '',
      email: '',
      facebookUrl: '',
      youtubeUrl: '',
    }
  });

  const updateMutation = useMutation({
    mutationFn: (data: SettingsFormValues) => settingsService.updateSettings(data),
    onSuccess: () => {
      toast.success('Settings saved successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['public-settings'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to save settings');
    }
  });

  const onSubmit = (data: SettingsFormValues) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-4xl">
        <Skeleton className="h-10 w-48" />
        <Card>
          <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SEOHead title="System Settings | Admin Dashboard" />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground">Manage academy information and public site configuration.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>This information is displayed publicly on the website.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="academyName">Academy Name</Label>
              <Input id="academyName" {...register('academyName')} />
              {errors.academyName && <p className="text-sm text-red-500">{errors.academyName.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Input id="address" {...register('address')} />
              {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone1">Primary Phone</Label>
                <Input id="phone1" {...register('phone1')} />
                {errors.phone1 && <p className="text-sm text-red-500">{errors.phone1.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone2">Secondary Phone (Optional)</Label>
                <Input id="phone2" {...register('phone2')} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
            <CardDescription>Links to official social media pages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook Page URL</Label>
              <Input id="facebookUrl" placeholder="https://facebook.com/..." {...register('facebookUrl')} />
              {errors.facebookUrl && <p className="text-sm text-red-500">{errors.facebookUrl.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtubeUrl">YouTube Channel URL</Label>
              <Input id="youtubeUrl" placeholder="https://youtube.com/..." {...register('youtubeUrl')} />
              {errors.youtubeUrl && <p className="text-sm text-red-500">{errors.youtubeUrl.message}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending} size="lg">
            {updateMutation.isPending ? 'Saving...' : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
