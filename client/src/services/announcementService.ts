import api from '@/lib/axios';
import { API } from '@/lib/constants';

export const announcementService = {
  getAnnouncements: async (params?: any) => {
    const { data } = await api.get(API.ANNOUNCEMENTS.BASE, { params });
    return data;
  },
  createAnnouncement: async (announcementData: any) => {
    const { data } = await api.post(API.ANNOUNCEMENTS.BASE, announcementData);
    return data.announcement;
  },
  updateAnnouncement: async (id: string, announcementData: any) => {
    const { data } = await api.patch(`${API.ANNOUNCEMENTS.BASE}/${id}`, announcementData);
    return data.announcement;
  },
  deleteAnnouncement: async (id: string) => {
    await api.delete(`${API.ANNOUNCEMENTS.BASE}/${id}`);
  }
};
