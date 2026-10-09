import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Bell, Calendar, Download, ChevronRight, AlertCircle } from 'lucide-react';

import { useAuth } from '@/hooks/useAuth';
import { SEOHead } from '@/components/common/SEOHead';
import { StatCard } from '@/components/common/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/axios';

export default function StudentDashboard() {
  const { user } = useAuth();

  const { data: dashboardData, isLoading, error } = useQuery<any>({
    queryKey: ['student-dashboard'],
    queryFn: async () => {
      const res = await api.get('/student/dashboard');
      return res.data?.data || res.data;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <SEOHead title="Dashboard - A-Cube Academy" />
      <div className="space-y-8 pb-8">
        {/* Welcome Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-slate-500 text-lg">
              Ready to learn something new today? Check out your latest study materials.
            </p>
          </div>
          <div className="hidden md:block">
            {/* Optional: Add an illustration here */}
            <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center border-4 border-blue-100">
              <BookOpen className="w-12 h-12 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-xl" />)}
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <motion.div variants={item}>
              <StatCard 
                icon={<BookOpen />} 
                value={dashboardData?.stats?.enrolledSubjects || 3} 
                label="Enrolled Subjects" 
                color="bg-blue-500" 
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard 
                icon={<FileText />} 
                value={dashboardData?.stats?.availableMaterials || 0} 
                label="Available Materials" 
                color="bg-indigo-500" 
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard 
                icon={<Bell />} 
                value={dashboardData?.stats?.announcements || 0} 
                label="New Announcements" 
                color="bg-amber-500" 
              />
            </motion.div>
            <motion.div variants={item}>
              <StatCard 
                icon={<Calendar />} 
                value={dashboardData?.stats?.upcomingExams || 0} 
                label="Upcoming Exams" 
                color="bg-emerald-500" 
              />
            </motion.div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area: Recent Materials */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Recently Added Materials</h2>
              <Button variant="ghost" asChild size="sm" className="text-blue-600">
                <Link to="/student/materials">View All <ChevronRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
              </div>
            ) : error ? (
              <div className="p-6 bg-red-50 text-red-600 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5" />
                <span>Failed to load materials. Please try again later.</span>
              </div>
            ) : dashboardData?.recentMaterials?.length === 0 ? (
              <div className="p-8 bg-slate-50 text-slate-500 rounded-xl text-center border border-slate-100 border-dashed">
                <FileText className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p>No new materials available yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {dashboardData?.recentMaterials?.map((material: any) => (
                  <Card key={material._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600 mt-1 sm:mt-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 truncate max-w-[250px] sm:max-w-xs">{material.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs bg-slate-100">{material.subject}</Badge>
                            <span className="text-xs text-slate-500">
                              {new Date(material.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center gap-2" asChild>
                        <a href={material.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4" /> Download
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Quick Access Subjects */}
            <div className="pt-4">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Quick Access</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Physics', path: '/student/physics', color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-100 text-indigo-700' },
                  { name: 'Mathematics', path: '/student/math', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100 text-emerald-700' },
                  { name: 'ICT', path: '/student/ict', color: 'bg-blue-50 hover:bg-blue-100 border-blue-100 text-blue-700' }
                ].map((subject) => (
                  <Link key={subject.name} to={subject.path}>
                    <div className={`p-4 rounded-xl border transition-colors flex items-center justify-between ${subject.color}`}>
                      <span className="font-semibold">{subject.name}</span>
                      <ChevronRight className="w-5 h-5 opacity-70" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area: Announcements & Exams */}
          <div className="space-y-6">
            <Card className="border-slate-100 shadow-sm">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Announcements</CardTitle>
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <Link to="/student/announcements"><ChevronRight className="w-4 h-4" /></Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-4 space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                ) : dashboardData?.announcements?.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    No recent announcements.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {dashboardData?.announcements?.slice(0, 3).map((ann: any) => (
                      <div key={ann._id} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-slate-900 text-sm line-clamp-1">{ann.title}</h4>
                          <Badge variant="outline" className={`ml-2 text-[10px] border px-1.5 py-0 ${getPriorityColor(ann.priority)}`}>
                            {ann.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-2">{ann.content}</p>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(ann.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-sm bg-gradient-to-br from-indigo-600 to-blue-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 opacity-80" /> Upcoming Exam
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-20 w-full bg-white/20" />
                ) : dashboardData?.upcomingExam ? (
                  <div>
                    <h3 className="font-bold text-xl mb-1">{dashboardData.upcomingExam.title}</h3>
                    <div className="flex justify-between text-blue-100 text-sm mt-3">
                      <span>{dashboardData.upcomingExam.subject}</span>
                      <span>{new Date(dashboardData.upcomingExam.date).toLocaleDateString()}</span>
                    </div>
                    <Button className="w-full mt-4 bg-white text-indigo-700 hover:bg-slate-100" asChild>
                      <Link to="/student/exams">View Details</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="text-blue-100 py-4 text-center">
                    No upcoming exams scheduled.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
