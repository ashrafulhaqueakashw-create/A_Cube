import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { FileText, Download, Filter, Search, ArrowDownToLine, Clock, User as UserIcon } from 'lucide-react';

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

export default function SubjectMaterialsPage() {
  const location = useLocation();
  const subjectSlug = location.pathname.split('/').pop() || 'all'; // e.g. 'physics', 'math'
  const subjectName = subjectSlug.charAt(0).toUpperCase() + subjectSlug.slice(1);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  const { data, isLoading, error } = useQuery<any>({
    queryKey: ['materials', subjectSlug, page, search, category, sort],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
      });
      if (search) params.append('search', search);
      if (category !== 'all') params.append('category', category);
      if (sort) params.append('sort', sort);
      
      const res = await api.get(`/materials/subject/${subjectSlug}?${params.toString()}`);
      return res.data;
    },
  });

  const getFileIcon = (_type: string) => {
    return <FileText className="w-8 h-8 text-blue-500" />;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset page on new search
  };

  return (
    <>
      <SEOHead title={`${subjectName} Materials - A-Cube Academy`} />
      
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-md">
          <h1 className="text-3xl font-bold mb-2">{subjectName} Study Materials</h1>
          <p className="text-blue-100 max-w-2xl">
            Access lecture notes, practice sheets, and previous year question papers specifically curated for {subjectName}.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <form onSubmit={handleSearch} className="flex w-full md:w-auto relative group flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input 
              placeholder="Search materials..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full bg-slate-50 border-transparent focus:bg-white"
            />
          </form>

          <div className="flex w-full md:w-auto gap-3">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[150px] bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Notes">Notes</SelectItem>
                <SelectItem value="Assignments">Assignments</SelectItem>
                <SelectItem value="Question Bank">Question Bank</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full md:w-[150px] bg-slate-50">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="a-z">Title (A-Z)</SelectItem>
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
                <div className="p-4 bg-slate-50 border-t flex justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-8 rounded-full" />
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
            action={<Button variant="outline" onClick={() => { setSearch(''); setCategory('all'); }}>Clear Filters</Button>}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.data || data?.materials || []).map((material: any) => (
              <Card key={material._id} className="group hover:shadow-lg transition-all duration-300 flex flex-col">
                <CardContent className="p-5 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      {getFileIcon(material.fileType)}
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                      {material.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {material.title}
                  </h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4 h-10">
                    {material.description || 'No description provided.'}
                  </p>

                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(material.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-3.5 h-3.5" />
                      {material.uploadedBy?.name || 'Admin'}
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
                    <Button size="sm" className="gap-2" asChild>
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
