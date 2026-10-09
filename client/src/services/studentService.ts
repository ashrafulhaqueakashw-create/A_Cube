import api from '@/lib/axios';
import { API } from '@/lib/constants';

export const studentService = {
  getProfile: async () => {
    const { data } = await api.get(API.STUDENTS.PROFILE);
    return data.profile;
  },
  updateProfile: async (profileData: any) => {
    const { data } = await api.patch(API.STUDENTS.PROFILE, profileData);
    return data.profile;
  },
  changePassword: async (passwordData: any) => {
    const { data } = await api.post(`${API.STUDENTS.PROFILE}/password`, passwordData);
    return data;
  },
  getDashboardStats: async () => {
    const { data } = await api.get(API.STUDENTS.DASHBOARD);
    return data.stats;
  }
};
