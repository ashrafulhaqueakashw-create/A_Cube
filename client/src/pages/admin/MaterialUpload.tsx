import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { SEOHead } from '@/components/common/SEOHead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileUpload } from '@/components/common/FileUpload';
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

type FormValues = z.infer<typeof formSchema>;

export default function MaterialUpload() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: 'physics',
      category: 'lecture-notes',
      batch: 'all',
      visibility: 'students',
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      if (!file) throw new Error('File is required');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', data.title);
      formData.append('description', data.description || '');
      formData.append('subject', data.subject);
      formData.append('category', data.category);
      formData.append('batch', data.batch);
      formData.append('visibility', data.visibility);

      return materialService.createMaterial(formData);
    },
    onSuccess: () => {
      toast.success('Material uploaded successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-materials'] });
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      navigate('/admin/materials');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error.message || 'Failed to upload material');
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }
    uploadMutation.mutate(values);
  };

  const selectedSubject = watch('subject');
  const selectedCategory = watch('category');
  const selectedBatch = watch('batch');
  const selectedVisibility = watch('visibility');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <SEOHead title="Upload Material | Admin Dashboard" />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Upload Material</h1>
        <p className="text-muted-foreground">Add new learning resources for students.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Material Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Material Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Newtonian Mechanics Lecture 01"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Provide details about what this material covers..."
                rows={3}
                {...register('description')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject *</Label>
                <Select
                  value={selectedSubject}
                  onValueChange={(val) => setValue('subject', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s.slug} value={s.slug}>
                        {s.name} ({s.nameBn})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(val) => setValue('category', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label} ({c.labelBn})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Batch Target *</Label>
                <Select
                  value={selectedBatch}
                  onValueChange={(val) => setValue('batch', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Batches</SelectItem>
                    <SelectItem value="hsc-2026">HSC 2026</SelectItem>
                    <SelectItem value="hsc-2027">HSC 2027</SelectItem>
                    <SelectItem value="admission">Admission Special</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Visibility *</Label>
                <Select
                  value={selectedVisibility}
                  onValueChange={(val: 'public' | 'students' | 'batch') =>
                    setValue('visibility', val)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="public">Public (Everyone)</SelectItem>
                    <SelectItem value="batch">Specific Batch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload
              onFileSelect={(selected) => setFile(selected)}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,image/*"
              maxSizeMB={50}
            />
            {file && (
              <p className="text-sm text-muted-foreground">
                Selected: <span className="font-medium text-foreground">{file.name}</span> (
                {(file.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/materials')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={uploadMutation.isPending}>
            {uploadMutation.isPending ? 'Uploading...' : 'Upload Material'}
          </Button>
        </div>
      </form>
    </div>
  );
}
