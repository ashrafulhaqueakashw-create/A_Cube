import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';

import { SEOHead } from '@/components/common/SEOHead';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { api } from '@/lib/axios';

export default function ExamsPage() {
  const { data: exams, isLoading, error } = useQuery<any[]>({
    queryKey: ['student-exams'],
    queryFn: async () => {
      const res = await api.get('/exams');
      return res.data?.data || res.data?.exams || [];
    },
  });

  const now = new Date();
  
  const upcomingExams = exams?.filter((e: any) => new Date(e.date) >= now) || [];
  const pastExams = exams?.filter((e: any) => new Date(e.date) < now) || [];

  return (
    <>
      <SEOHead title="Exams - A-Cube Academy" />
      
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Examinations</h1>
            <p className="text-slate-500 text-sm">View your scheduled mock tests and past results.</p>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="upcoming" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Upcoming & Active
            </TabsTrigger>
            <TabsTrigger value="past" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Past Exams
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="upcoming">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
                </div>
              ) : upcomingExams.length === 0 ? (
                <EmptyState 
                  icon={<Calendar className="w-12 h-12 text-slate-300" />}
                  title="No Upcoming Exams"
                  description="You don't have any exams scheduled at the moment. Enjoy your free time!"
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingExams.map((exam: any) => (
                    <Card key={exam._id} className="border-emerald-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full -z-10"></div>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none">
                            {exam.subject}
                          </Badge>
                          <Badge variant="outline" className="bg-white">Total Marks: {exam.totalMarks}</Badge>
                        </div>
                        <CardTitle className="text-lg mt-3">{exam.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-slate-600 line-clamp-2">{exam.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-emerald-500" />
                            {new Date(exam.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-emerald-500" />
                            {exam.duration} mins
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map(i => <Skeleton key={i} className="h-48 rounded-xl" />)}
                </div>
              ) : pastExams.length === 0 ? (
                <EmptyState 
                  icon={<CheckCircle className="w-12 h-12 text-slate-300" />}
                  title="No Past Exams"
                  description="You haven't participated in any exams yet."
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pastExams.map((exam: any) => (
                    <Card key={exam._id} className="border-slate-200 shadow-none bg-slate-50/50">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className="bg-slate-200 text-slate-700">
                            {exam.subject}
                          </Badge>
                          <Badge variant="outline" className="text-slate-500">Completed</Badge>
                        </div>
                        <CardTitle className="text-lg mt-3 text-slate-700">{exam.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(exam.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-4 h-4" />
                            Total Marks: {exam.totalMarks}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          View Results
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
}
