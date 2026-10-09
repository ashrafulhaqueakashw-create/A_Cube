import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { Save, ArrowLeft } from 'lucide-react';

import SEOHead from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { materialService } from '@/services/materialService';
import { SUBJECTS, CATEGORIES } from '@/lib/constants';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
  category: z.string().min(1, 'Please select a category'),
  batch: z.string().min(1, 'Please select a batch'),
  visibility: z.enum(['public', 'students', 'batch']),
});

export default function MaterialEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: material, isLoading, isError } = useQuery({
    queryKey: ['material', id],
    queryFn: () => materialService.getMaterial(id!),
    enabled: !!id,
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (material) {
      reset({
        title: material.title,
        description: material.description || '',
        subject: material.subject,
        category: material.category,
        batch: material.batch || 'all',
        visibility: material.visibility || 'students',
      });
    }
  }, [material, reset]);

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => materialService.updateMaterial(id!, data),
    onSuccess: () => {
      toast.success('Material updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-materials'] });
      queryClient.invalidateQueries({ queryKey: ['material', id] });
      navigate('/admin/materials');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update material');
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card><CardContent className="p-6 h-[400px]"><Skeleton className="h-full w-full" /></CardContent></Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-2">Material Not Found</h2>
        <Button onClick={() => navigate('/admin/materials')}>Back to Materials</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SEOHead title="Edit Material | Admin Dashboard" />
      
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/admin/materials')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Edit Material</h1>
          <p className="text-muted-foreground">Update metadata for {material?.title}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Material Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
              <Input id="title" {...register('title')} />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject <span className="text-red-500">*</span></Label>
                <Select defaultValue={material?.subject} onValueChange={(v) => setValue('subject', v)}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((subject) => (
                      <SelectItem key={subject.value} value={subject.value}>{subject.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Category <span className="text-red-500">*</span></Label>
                <Select defaultValue={material?.category} onValueChange={(v) => setValue('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Target Batch <span className="text-red-500">*</span></Label>
                <Select defaultValue={material?.batch || 'all'} onValueChange={(v) => setValue('batch', v)}>
                  <SelectTrigger><SelectValue placeholder="Select batch" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    <SelectItem value="HSC 2024">HSC 2024</SelectItem>
                    <SelectItem value="HSC 2025">HSC 2025</SelectItem>
                    <SelectItem value="HSC 2026">HSC 2026</SelectItem>
                    <SelectItem value="SSC 2024">SSC 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Visibility <span className="text-red-500">*</span></Label>
                <Select defaultValue={material?.visibility || 'students'} onValueChange={(v) => setValue('visibility', v as any)}>
                  <SelectTrigger><SelectValue placeholder="Select visibility" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public (Anyone)</SelectItem>
                    <SelectItem value="students">All Registered Students</SelectItem>
                    <SelectItem value="batch">Specific Batch Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea 
                id="description" 
                className="resize-none" 
                {...register('description')} 
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate('/admin/materials')} disabled={updateMutation.isPending}>
            Cancel
          </Button>
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending && <Save className="mr-2 h-4 w-4 animate-spin" />}
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
