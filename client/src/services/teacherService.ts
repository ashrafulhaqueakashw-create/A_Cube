import api from '@/lib/axios';
import { API } from '@/lib/constants';

export const teacherService = {
  getTeachers: async () => {
    const { data } = await api.get(API.TEACHERS.BASE);
    return data.teachers || data.data || [];
  },
  getTeacherById: async (id: string) => {
    const { data } = await api.get(`${API.TEACHERS.BASE}/${id}`);
    return data.teacher || data.data;
  },
  createTeacher: async (formData: FormData | any) => {
    const headers = formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const { data } = await api.post(API.TEACHERS.BASE, formData, { headers });
    return data.teacher || data.data;
  },
  updateTeacher: async (id: string, formData: FormData | any) => {
    const headers = formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const { data } = await api.put(`${API.TEACHERS.BASE}/${id}`, formData, { headers });
    return data.teacher || data.data;
  },
  deleteTeacher: async (id: string) => {
    await api.delete(`${API.TEACHERS.BASE}/${id}`);
  }
};
