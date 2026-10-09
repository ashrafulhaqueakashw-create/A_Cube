import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, MoreHorizontal, Edit, Trash, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import SEOHead from '@/components/common/SEOHead';
import EmptyState from '@/components/common/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

import { teacherService } from '@/services/teacherService';

const teacherSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  subject: z.string().min(2, 'Subject is required'),
  university: z.string().min(2, 'University is required'),
  designation: z.string().min(2, 'Designation is required'),
  bio: z.string().optional(),
  displayOrder: z.coerce.number().min(0).default(0),
  isActive: z.boolean().default(true),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

export default function TeachersManagement() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<any | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<string | null>(null);

  const { data: teachers, isLoading } = useQuery({
    queryKey: ['admin-teachers'],
    queryFn: () => teacherService.getTeachers(),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      isActive: true,
      displayOrder: 0,
    }
  });

  const isActiveWatch = watch('isActive');

  const createMutation = useMutation({
    mutationFn: (data: TeacherFormValues) => teacherService.createTeacher(data),
    onSuccess: () => {
      toast.success('Teacher added successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-teachers'] });
      setIsDialogOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to add teacher');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: TeacherFormValues }) => teacherService.updateTeacher(id, data),
    onSuccess: () => {
      toast.success('Teacher updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-teachers'] });
      setIsDialogOpen(false);
      setTeacherToEdit(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update teacher');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => teacherService.deleteTeacher(id),
    onSuccess: () => {
      toast.success('Teacher deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-teachers'] });
      setTeacherToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete teacher');
    }
  });

  const openAddDialog = () => {
    setTeacherToEdit(null);
    reset({
      name: '',
      subject: '',
      university: '',
      designation: '',
      bio: '',
      displayOrder: 0,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (teacher: any) => {
    setTeacherToEdit(teacher);
    setValue('name', teacher.name);
    setValue('subject', teacher.subject);
    setValue('university', teacher.university);
    setValue('designation', teacher.designation);
    setValue('bio', teacher.bio || '');
    setValue('displayOrder', teacher.displayOrder || 0);
    setValue('isActive', teacher.isActive !== false);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: TeacherFormValues) => {
    if (teacherToEdit) {
      updateMutation.mutate({ id: teacherToEdit.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <SEOHead title="Manage Teachers | A-Cube Academy" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teachers Management</h1>
          <p className="text-muted-foreground">Add and edit faculty members</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Teacher
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 inline-block rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : teachers?.length > 0 ? (
                teachers.map((teacher: any) => (
                  <TableRow key={teacher.id || teacher._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img 
                          src={teacher.photo || teacher.cardImage || (teacher.name?.includes('Akash') ? '/images/teachers/akash-physics.jpg' : teacher.name?.includes('Sabbir') ? '/images/teachers/sabbir-math.jpg' : '/images/teachers/ahsun-ict.jpg')} 
                          alt={teacher.name} 
                          className="w-10 h-10 rounded-xl object-cover object-top border border-slate-200 shadow-sm shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">{teacher.name}</div>
                          {teacher.punchline && <div className="text-xs text-blue-600 font-hind">"{teacher.punchline}"</div>}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.designation}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.university}</TableCell>
                    <TableCell>{teacher.displayOrder || 0}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${teacher.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {teacher.isActive !== false ? 'Active' : 'Inactive'}
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
                          <DropdownMenuItem onClick={() => openEditDialog(teacher)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setTeacherToDelete(teacher.id)}
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
                  <TableCell colSpan={7} className="h-32 text-center">
                    <EmptyState 
                      title="No teachers found" 
                      description="Add faculty members to display on the public site." 
                      icon={Filter}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{teacherToEdit ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" {...register('name')} />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Physics" {...register('subject')} />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" placeholder="Instructor" {...register('designation')} />
                  {errors.designation && <p className="text-sm text-red-500">{errors.designation.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University/Institution</Label>
                <Input id="university" placeholder="BUET" {...register('university')} />
                {errors.university && <p className="text-sm text-red-500">{errors.university.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio (Optional)</Label>
                <Textarea id="bio" placeholder="A brief description about the teacher..." className="resize-none" {...register('bio')} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="displayOrder">Display Order</Label>
                  <Input id="displayOrder" type="number" {...register('displayOrder')} />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="isActive"
                    checked={isActiveWatch}
                    onCheckedChange={(checked) => setValue('isActive', checked)}
                  />
                  <Label htmlFor="isActive">Active (Visible)</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Teacher'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!teacherToDelete} onOpenChange={(open) => !open && setTeacherToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Teacher?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this teacher? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => teacherToDelete && deleteMutation.mutate(teacherToDelete)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
