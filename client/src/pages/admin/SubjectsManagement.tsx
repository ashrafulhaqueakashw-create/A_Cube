import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, MoreHorizontal, Edit, Trash, BookOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import SEOHead from '@/components/common/SEOHead';
import EmptyState from '@/components/common/EmptyState';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { subjectService } from '@/services/subjectService';

const subjectSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  nameBn: z.string().min(2, 'Bengali Name is required'),
  teacher: z.string().min(2, 'Teacher Name is required'),
  isActive: z.boolean().default(true),
});

type SubjectFormValues = z.infer<typeof subjectSchema>;

export default function SubjectsManagement() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState<any | null>(null);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  const { data: subjects, isLoading } = useQuery({
    queryKey: ['admin-subjects'],
    queryFn: () => subjectService.getSubjects(),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      isActive: true,
    }
  });

  const isActiveWatch = watch('isActive');

  const createMutation = useMutation({
    mutationFn: (data: SubjectFormValues) => subjectService.createSubject(data),
    onSuccess: () => {
      toast.success('Subject added successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
      setIsDialogOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to add subject');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: SubjectFormValues }) => subjectService.updateSubject(id, data),
    onSuccess: () => {
      toast.success('Subject updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
      setIsDialogOpen(false);
      setSubjectToEdit(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update subject');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => subjectService.deleteSubject(id),
    onSuccess: () => {
      toast.success('Subject deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
      setSubjectToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete subject');
    }
  });

  const openAddDialog = () => {
    setSubjectToEdit(null);
    reset({
      name: '',
      nameBn: '',
      teacher: '',
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (subject: any) => {
    setSubjectToEdit(subject);
    setValue('name', subject.name);
    setValue('nameBn', subject.nameBn);
    setValue('teacher', subject.teacher);
    setValue('isActive', subject.isActive !== false);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: SubjectFormValues) => {
    if (subjectToEdit) {
      updateMutation.mutate({ id: subjectToEdit.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <SEOHead title="Manage Subjects | A-Cube Academy" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Subjects Management</h1>
          <p className="text-muted-foreground">Manage subjects available in the academy</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Subject
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name (English)</TableHead>
                <TableHead>Name (Bengali)</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 inline-block rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : subjects?.length > 0 ? (
                subjects.map((subject: any) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>{subject.nameBn}</TableCell>
                    <TableCell>{subject.teacher}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${subject.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {subject.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => openEditDialog(subject)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setSubjectToDelete(subject.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <EmptyState 
                      title="No subjects found" 
                      description="Add subjects to display on the platform." 
                      icon={BookOpen}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{subjectToEdit ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name (English)</Label>
                <Input id="name" placeholder="Physics" {...register('name')} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameBn">Name (Bengali)</Label>
                <Input id="nameBn" placeholder="পদার্থবিজ্ঞান" {...register('nameBn')} />
                {errors.nameBn && <p className="text-sm text-red-500">{errors.nameBn.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">Teacher Name</Label>
                <Input id="teacher" placeholder="John Doe" {...register('teacher')} />
                {errors.teacher && <p className="text-sm text-red-500">{errors.teacher.message}</p>}
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="isActive"
                  checked={isActiveWatch}
                  onCheckedChange={(checked) => setValue('isActive', checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Subject'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!subjectToDelete} onOpenChange={(open) => !open && setSubjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subject?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this subject? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => subjectToDelete && deleteMutation.mutate(subjectToDelete)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
