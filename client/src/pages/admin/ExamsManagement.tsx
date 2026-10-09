import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, MoreHorizontal, Edit, Trash, Calendar as CalendarIcon, Clock } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

import { examService } from '@/services/examService';
import { SUBJECTS } from '@/lib/constants';

const examSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  subject: z.string().min(1, 'Subject is required'),
  date: z.string().min(1, 'Date is required'),
  duration: z.coerce.number().min(1, 'Duration is required'),
  totalMarks: z.coerce.number().min(1, 'Total marks is required'),
  description: z.string().optional(),
});

type ExamFormValues = z.infer<typeof examSchema>;

export default function ExamsManagement() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [examToEdit, setExamToEdit] = useState<any | null>(null);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);

  const { data: exams, isLoading } = useQuery({
    queryKey: ['admin-exams'],
    queryFn: () => examService.getExams(),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ExamFormValues>({
    resolver: zodResolver(examSchema),
  });

  const createMutation = useMutation({
    mutationFn: (data: ExamFormValues) => examService.createExam(data),
    onSuccess: () => {
      toast.success('Exam created successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-exams'] });
      setIsDialogOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create exam');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: ExamFormValues }) => examService.updateExam(id, data),
    onSuccess: () => {
      toast.success('Exam updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-exams'] });
      setIsDialogOpen(false);
      setExamToEdit(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update exam');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => examService.deleteExam(id),
    onSuccess: () => {
      toast.success('Exam deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-exams'] });
      setExamToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete exam');
    }
  });

  const openAddDialog = () => {
    setExamToEdit(null);
    reset({
      title: '',
      subject: '',
      date: '',
      duration: 60,
      totalMarks: 100,
      description: '',
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (exam: any) => {
    setExamToEdit(exam);
    setValue('title', exam.title);
    setValue('subject', exam.subject);
    setValue('date', new Date(exam.date).toISOString().slice(0, 16));
    setValue('duration', exam.duration);
    setValue('totalMarks', exam.totalMarks);
    setValue('description', exam.description || '');
    setIsDialogOpen(true);
  };

  const onSubmit = (values: ExamFormValues) => {
    if (examToEdit) {
      updateMutation.mutate({ id: examToEdit.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <SEOHead title="Manage Exams | A-Cube Academy" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exams Management</h1>
          <p className="text-muted-foreground">Schedule and manage upcoming exams.</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Add Exam
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 inline-block rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : exams?.length > 0 ? (
                exams.map((exam: any) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium max-w-sm truncate" title={exam.title}>
                      {exam.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{SUBJECTS.find(s => s.value === exam.subject)?.label || exam.subject}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                        {new Date(exam.date).toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        {exam.duration} mins
                      </div>
                    </TableCell>
                    <TableCell>{exam.totalMarks}</TableCell>
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
                          <DropdownMenuItem onClick={() => openEditDialog(exam)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setExamToDelete(exam.id)}
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
                  <TableCell colSpan={6} className="h-32 text-center">
                    <EmptyState 
                      title="No exams scheduled" 
                      description="Add an exam to display to students." 
                      icon={CalendarIcon}
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
            <DialogTitle>{examToEdit ? 'Edit Exam' : 'Add New Exam'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g. Physics Chapter 3 Class Test" {...register('title')} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select 
                  defaultValue={examToEdit?.subject || ""} 
                  onValueChange={(val) => setValue('subject', val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((sub) => (
                      <SelectItem key={sub.value} value={sub.value}>{sub.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date & Time</Label>
                <Input id="date" type="datetime-local" {...register('date')} />
                {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input id="duration" type="number" {...register('duration')} />
                  {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input id="totalMarks" type="number" {...register('totalMarks')} />
                  {errors.totalMarks && <p className="text-sm text-red-500">{errors.totalMarks.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Syllabus or instructions..." 
                  className="resize-none" 
                  {...register('description')} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Exam'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!examToDelete} onOpenChange={(open) => !open && setExamToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Exam?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this exam? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => examToDelete && deleteMutation.mutate(examToDelete)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
