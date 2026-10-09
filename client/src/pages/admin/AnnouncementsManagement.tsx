import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, MoreHorizontal, Edit, Trash, Megaphone } from 'lucide-react';
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

import { announcementService } from '@/services/announcementService';

const announcementSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  content: z.string().min(5, 'Content is required'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  targetAudience: z.string().min(1, 'Target audience is required'),
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

export default function AnnouncementsManagement() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [announcementToEdit, setAnnouncementToEdit] = useState<any | null>(null);
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['admin-announcements'],
    queryFn: () => announcementService.getAnnouncements(),
  });

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<AnnouncementFormValues>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      priority: 'medium',
      targetAudience: 'all',
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: AnnouncementFormValues) => announcementService.createAnnouncement(data),
    onSuccess: () => {
      toast.success('Announcement published successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      setIsDialogOpen(false);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to publish announcement');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: AnnouncementFormValues }) => announcementService.updateAnnouncement(id, data),
    onSuccess: () => {
      toast.success('Announcement updated successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      setIsDialogOpen(false);
      setAnnouncementToEdit(null);
      reset();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update announcement');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => announcementService.deleteAnnouncement(id),
    onSuccess: () => {
      toast.success('Announcement deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      setAnnouncementToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete announcement');
    }
  });

  const openAddDialog = () => {
    setAnnouncementToEdit(null);
    reset({
      title: '',
      content: '',
      priority: 'medium',
      targetAudience: 'all',
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (announcement: any) => {
    setAnnouncementToEdit(announcement);
    setValue('title', announcement.title);
    setValue('content', announcement.content);
    setValue('priority', announcement.priority);
    setValue('targetAudience', announcement.targetAudience);
    setIsDialogOpen(true);
  };

  const onSubmit = (values: AnnouncementFormValues) => {
    if (announcementToEdit) {
      updateMutation.mutate({ id: announcementToEdit.id, data: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return <Badge variant="destructive">Urgent</Badge>;
      case 'high': return <Badge className="bg-orange-500 hover:bg-orange-600">High</Badge>;
      case 'medium': return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Medium</Badge>;
      case 'low': return <Badge variant="outline">Low</Badge>;
      default: return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <SEOHead title="Announcements | A-Cube Academy" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground">Manage notifications sent to students.</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> New Announcement
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 inline-block rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : announcements?.length > 0 ? (
                announcements.map((announcement: any) => (
                  <TableRow key={announcement.id}>
                    <TableCell className="font-medium max-w-sm truncate" title={announcement.title}>
                      {announcement.title}
                    </TableCell>
                    <TableCell className="capitalize">{announcement.targetAudience}</TableCell>
                    <TableCell>{getPriorityBadge(announcement.priority)}</TableCell>
                    <TableCell>{new Date(announcement.createdAt).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem onClick={() => openEditDialog(announcement)}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setAnnouncementToDelete(announcement.id)}
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
                      title="No announcements" 
                      description="Create an announcement to notify students." 
                      icon={Megaphone}
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
            <DialogTitle>{announcementToEdit ? 'Edit Announcement' : 'New Announcement'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g. Exam Schedule Updated" {...register('title')} />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Details of the announcement..." 
                  className="min-h-[100px] resize-none" 
                  {...register('content')} 
                />
                {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select 
                    defaultValue={announcementToEdit?.priority || "medium"} 
                    onValueChange={(val) => setValue('priority', val as any)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Select 
                    defaultValue={announcementToEdit?.targetAudience || "all"} 
                    onValueChange={(val) => setValue('targetAudience', val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="HSC 2024">HSC 2024 Batch</SelectItem>
                      <SelectItem value="HSC 2025">HSC 2025 Batch</SelectItem>
                      <SelectItem value="HSC 2026">HSC 2026 Batch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Publishing...' : 'Publish'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!announcementToDelete} onOpenChange={(open) => !open && setAnnouncementToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this announcement? Students will no longer see it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => announcementToDelete && deleteMutation.mutate(announcementToDelete)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
