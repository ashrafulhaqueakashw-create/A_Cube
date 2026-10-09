import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, Calendar as CalendarIcon, Info } from 'lucide-react';

import { SEOHead } from '@/components/common/SEOHead';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { api } from '@/lib/axios';

export default function AnnouncementsPage() {
  const { data: announcements, isLoading, error } = useQuery<any[]>({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await api.get('/announcements');
      return res.data?.data || res.data?.announcements || [];
    },
  });

  const getPriorityStyles = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return <Bell className="w-5 h-5 text-red-600" />;
      case 'high': return <Bell className="w-5 h-5 text-orange-600" />;
      default: return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <>
      <SEOHead title="Announcements - A-Cube Academy" />
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Notice Board</h1>
            <p className="text-slate-500 text-sm">Stay updated with the latest news and announcements.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="border-slate-100 shadow-sm">
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-3 w-32 mt-4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100">
            Failed to load announcements. Please try again.
          </div>
        ) : announcements?.length === 0 ? (
          <EmptyState 
            icon={<Bell className="w-12 h-12 text-slate-300" />}
            title="No Announcements"
            description="There are currently no active announcements to display."
          />
        ) : (
          <div className="space-y-4">
            {(announcements || []).map((announcement: any) => (
              <Card key={announcement._id} className="border-slate-200 shadow-sm hover:shadow transition-shadow overflow-hidden">
                <div className={`h-1 w-full ${
                  announcement.priority.toLowerCase() === 'urgent' ? 'bg-red-500' : 
                  announcement.priority.toLowerCase() === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {getPriorityIcon(announcement.priority)}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{announcement.title}</h2>
                        <div className="flex items-center gap-2 mt-1.5 text-sm text-slate-500">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <Badge className={`px-2.5 py-0.5 rounded-full border ${getPriorityStyles(announcement.priority)}`}>
                      {announcement.priority}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-100 whitespace-pre-wrap leading-relaxed">
                    {announcement.content}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
