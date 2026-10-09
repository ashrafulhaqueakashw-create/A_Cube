import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, FileText, Download, Trash, Edit, Filter } from 'lucide-react';
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

import { materialService } from '@/services/materialService';
import { SUBJECTS, CATEGORIES } from '@/lib/constants';

export default function MaterialsManagement() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-materials', page, search, subjectFilter, categoryFilter],
    queryFn: () => materialService.getMaterials({ 
      page, 
      limit: 10, 
      search, 
      subject: subjectFilter !== 'all' ? subjectFilter : undefined, 
      category: categoryFilter !== 'all' ? categoryFilter : undefined 
    }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => materialService.deleteMaterial(id),
    onSuccess: () => {
      toast.success('Material deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['admin-materials'] });
      setMaterialToDelete(null);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to delete material');
    }
  });

  const handleDelete = (id: string) => deleteMutation.mutate(id);

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <SEOHead title="Manage Materials | A-Cube Academy" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Material Management</h1>
          <p className="text-muted-foreground">
            Manage course materials and resources
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/materials/upload">
            <Plus className="mr-2 h-4 w-4" /> Upload Material
          </Link>
        </Button>
      </div>

      <Card className="p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchInput 
            placeholder="Search by title..." 
            value={search} 
            onChange={setSearch} 
          />
        </div>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {SUBJECTS.map((sub) => (
              <SelectItem key={sub.value} value={sub.value}>{sub.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>File Info</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 inline-block rounded-md" /></TableCell>
                  </TableRow>
                ))
              ) : data?.materials?.length > 0 ? (
                data.materials.map((material: any) => (
                  <TableRow key={material.id}>
                    <TableCell className="font-medium max-w-xs truncate" title={material.title}>
                      {material.title}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{SUBJECTS.find(s => s.value === material.subject)?.label || material.subject}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{CATEGORIES.find(c => c.value === material.category)?.label || material.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{material.fileType?.split('/')[1]?.toUpperCase() || 'PDF'}</div>
                      <div className="text-xs text-muted-foreground">{formatFileSize(material.fileSize)}</div>
                    </TableCell>
                    <TableCell>{material.downloadsCount || 0}</TableCell>
                    <TableCell>{new Date(material.createdAt).toLocaleDateString()}</TableCell>
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
                            <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4" /> Download
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/materials/${material.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => setMaterialToDelete(material.id)}
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
                      title="No materials found" 
                      description="Upload a new material or change filters." 
                      icon={FileText}
                      action={
                        <Button asChild className="mt-4">
                          <Link to="/admin/materials/upload">Upload Material</Link>
                        </Button>
                      }
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

      <AlertDialog open={!!materialToDelete} onOpenChange={(open) => !open && setMaterialToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Material?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the material and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => materialToDelete && handleDelete(materialToDelete)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
