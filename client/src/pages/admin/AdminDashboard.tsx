import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  UserPlus,
  FileText,
  GraduationCap,
  Bell,
  Upload,
  Eye,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import SEOHead from '@/components/common/SEOHead';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { adminService } from '@/services/adminService';
import { cn } from '@/lib/utils';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: adminService.getDashboardStats,
  });

  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery<any>({
    queryKey: ['adminDashboardActivity'],
    queryFn: adminService.getDashboardActivity,
  });

  const statCards = [
    { title: 'Total Students', value: stats?.totalStudents || 0, icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Students', value: stats?.activeStudents || 0, icon: UserCheck, color: 'bg-green-100 text-green-600' },
    { title: 'Pending Students', value: stats?.pendingStudents || 0, icon: UserPlus, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Total Materials', value: stats?.totalMaterials || 0, icon: FileText, color: 'bg-purple-100 text-purple-600' },
    { title: 'Total Teachers', value: stats?.totalTeachers || 0, icon: GraduationCap, color: 'bg-pink-100 text-pink-600' },
    { title: 'Announcements', value: stats?.totalAnnouncements || 0, icon: Bell, color: 'bg-orange-100 text-orange-600' },
  ];

  const materialData = [
    { name: 'Physics', value: stats?.materialsBySubject?.physics || 0 },
    { name: 'Math', value: stats?.materialsBySubject?.math || 0 },
    { name: 'ICT', value: stats?.materialsBySubject?.ict || 0 },
  ];

  const studentStatusData = [
    { name: 'Active', value: stats?.activeStudents || 0 },
    { name: 'Pending', value: stats?.pendingStudents || 0 },
    { name: 'Suspended', value: stats?.suspendedStudents || 0 },
  ];

  return (
    <div className="space-y-6">
      <SEOHead title="Admin Dashboard | A-Cube Academy" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your academy.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/admin/students">
              <Eye className="mr-2 h-4 w-4" /> View Pending
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/materials/upload">
              <Upload className="mr-2 h-4 w-4" /> Upload Material
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
          : statCards.map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                    </div>
                    <div className={cn("p-3 rounded-full", stat.color)}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Materials by Subject</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={materialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="w-full h-full" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {studentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Materials</CardTitle>
            <CardDescription>Latest 5 uploaded materials</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingActivity ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity?.recentMaterials?.map((material: any) => (
                  <div key={material.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{material.title}</p>
                      <p className="text-xs text-muted-foreground">{material.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(material.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {(!recentActivity?.recentMaterials || recentActivity.recentMaterials.length === 0) && (
                  <p className="text-sm text-muted-foreground">No recent materials.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Registrations</CardTitle>
            <CardDescription>Latest 5 student signups</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingActivity ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity?.recentStudents?.map((student: any) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {(!recentActivity?.recentStudents || recentActivity.recentStudents.length === 0) && (
                  <p className="text-sm text-muted-foreground">No recent registrations.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
