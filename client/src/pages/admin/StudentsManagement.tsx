import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Eye, ShieldAlert, CheckCircle, Trash, Search, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

import SEOHead from '@/components/common/SEOHead';
import SearchInput from '@/components/common/SearchInput';
import Pagination from '@/components/common/Pagination';
import EmptyState from '@/components/common/EmptyState';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { adminService } from '@/services/adminService';

export default function StudentsManagement() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');

  const [studentToApprove, setStudentToApprove] = useState<string | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [studentToSuspend, setStudentToSuspend] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['students', page, search, statusFilter, batchFilter],
    queryFn: () => adminService.getStudents({ page, limit: 10, search, status: statusFilter !== 'all' ? statusFilter : undefined, batch: batchFilter !== 'all' ? batchFilter : undefined }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => adminService.updateStudentStatus(id, status),
    onSuccess: () => {
      toast.success('Student status updated successfully');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setStudentToApprove(null);
      setStudentToSuspend(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update student status');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminService.deleteStudent(id),
    onSuccess: () => {
      toast.success('Student deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setStudentToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete student');
    }
  });

  const handleApprove = (id: string) => updateStatusMutation.mutate({ id, status: 'active' });
  const handleSuspend = (id: string) => updateStatusMutation.mutate({ id, status: 'suspended' });
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Pending</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Manage Students | A-Cube Academy" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">
            Manage your academy's students {data?.total ? <Badge className="ml-2" variant="outline">{data.total}</Badge> : null}
          </p>
        </div>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchInput 
            placeholder="Search by name, email, or phone..." 
            value={search} 
            onChange={setSearch} 
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Select value={batchFilter} onValueChange={setBatchFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Batches</SelectItem>
            <SelectItem value="HSC 2024">HSC 2024</SelectItem>
            <SelectItem value="HSC 2025">HSC 2025</SelectItem>
            <SelectItem value="HSC 2026">HSC 2026</SelectItem>
            <SelectItem value="SSC 2024">SSC 2024</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 inline-block rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : data?.students?.length > 0 ? (
                data.students.map((student: any) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>
                      <div className="text-sm">{student.email}</div>
                      <div className="text-xs text-muted-foreground">{student.phone}</div>
                    </TableCell>
                    <TableCell>{student.batch}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>{new Date(student.createdAt).toLocaleDateString()}</TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/students/${student.id}`}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {student.status === 'pending' && (
                            <DropdownMenuItem onClick={() => setStudentToApprove(student.id)}>
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Approve
                            </DropdownMenuItem>
                          )}
                          {student.status === 'active' && (
                            <DropdownMenuItem onClick={() => setStudentToSuspend(student.id)}>
                              <ShieldAlert className="mr-2 h-4 w-4 text-yellow-500" /> Suspend
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setStudentToDelete(student.id)}
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
                      title="No students found" 
                      description="Try adjusting your search or filters." 
                      icon={Filter}
                    />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {data?.totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={data.totalPages} 
          onPageChange={setPage} 
        />
      )}

      {/* Confirmation Dialogs */}
      <AlertDialog open={!!studentToApprove} onOpenChange={(open) => !open && setStudentToApprove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Student?</AlertDialogTitle>
            <AlertDialogDescription>
              This will grant the student access to the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => studentToApprove && handleApprove(studentToApprove)}>
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!studentToSuspend} onOpenChange={(open) => !open && setStudentToSuspend(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Suspend Student?</AlertDialogTitle>
            <AlertDialogDescription>
              This will revoke the student's access to the platform until unsuspended.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => studentToSuspend && handleSuspend(studentToSuspend)} className="bg-yellow-600 hover:bg-yellow-700">
              Suspend
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!studentToDelete} onOpenChange={(open) => !open && setStudentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the student account and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => studentToDelete && handleDelete(studentToDelete)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
