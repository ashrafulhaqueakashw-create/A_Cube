import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, Download, Filter, Search, ArrowDownToLine, Clock, User as UserIcon, BookOpen } from 'lucide-react';

import { SEOHead } from '@/components/common/SEOHead';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/common/Pagination';
import { EmptyState } from '@/components/common/EmptyState';
import { api } from '@/lib/axios';

export default function AllMaterialsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('all');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['materials', 'all', page, search, subject, category, sort],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
      });
      if (search) params.append('search', search);
      if (subject !== 'all') params.append('subject', subject);
      if (category !== 'all') params.append('category', category);
      if (sort) params.append('sort', sort);
      
      const res = await api.get(`/materials?${params.toString()}`);
      return res.data;
    },
  });

  const getFileIcon = (_type: string) => {
    return <FileText className="w-8 h-8 text-indigo-500" />;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <>
      <SEOHead title="All Materials - A-Cube Academy" />
      
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Resource Library</h1>
            <p className="text-slate-500 text-sm">Browse all available study materials across subjects.</p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearch} className="flex w-full lg:w-1/3 relative group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <Input 
              placeholder="Search materials..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full bg-slate-50 focus:bg-white"
            />
          </form>

          <div className="flex flex-wrap w-full lg:w-2/3 gap-3 justify-end">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-[140px] bg-slate-50">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Math">Math</SelectItem>
                <SelectItem value="ICT">ICT</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[140px] bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Notes">Notes</SelectItem>
                <SelectItem value="Assignments">Assignments</SelectItem>
                <SelectItem value="Question Bank">Question Bank</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[140px] bg-slate-50">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Materials Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-5 space-y-4">
                  <div className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <Skeleton className="h-16 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500 bg-red-50 rounded-xl">
            Failed to load materials. Please try again later.
          </div>
        ) : (data?.data || data?.materials || []).length === 0 ? (
          <EmptyState 
            icon={<FileText className="w-12 h-12 text-slate-300" />}
            title="No materials found"
            description="We couldn't find any materials matching your criteria. Try adjusting your filters or search."
            action={<Button variant="outline" onClick={() => { setSearch(''); setSubject('all'); setCategory('all'); }}>Clear Filters</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.data || data?.materials || []).map((material: any) => (
              <Card key={material._id} className="group hover:shadow-lg transition-all duration-300 flex flex-col border-slate-200">
                <CardContent className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-indigo-50 p-3 rounded-xl">
                      {getFileIcon(material.fileType)}
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge variant="outline" className="bg-white border-indigo-200 text-indigo-700">
                        {typeof material.subjectId === 'object' ? material.subjectId?.name : (material.subject || 'Material')}
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] uppercase">
                        {material.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
                    {material.description || 'No description provided.'}
                  </p>

                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(material.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 bg-slate-50/50 border-t border-slate-100 flex gap-2 justify-between mt-auto">
                  <div className="text-xs font-medium text-slate-500 self-center">
                    {(material.fileSize / (1024 * 1024)).toFixed(2)} MB
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={material.fileUrl || `/api/v1/materials/${material._id}/download`} target="_blank" rel="noopener noreferrer">View</a>
                    </Button>
                    <Button size="sm" className="gap-2 bg-indigo-600 hover:bg-indigo-700" asChild>
                      <a href={material.fileUrl || `/api/v1/materials/${material._id}/download`} download>
                        <ArrowDownToLine className="w-4 h-4" /> Download
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {(data?.pagination?.totalPages || data?.totalPages || 0) > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination 
              page={page} 
              totalPages={data?.pagination?.totalPages || data?.totalPages || 1} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>
    </>
  );
}
