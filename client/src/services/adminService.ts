import api from '@/lib/axios';
import { API } from '@/lib/constants';

interface GetStudentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  batch?: string;
}

export const adminService = {
  getDashboardStats: async () => {
    const { data } = await api.get('/admin/dashboard');
    return data.data || data.stats || data;
  },
  getDashboardActivity: async (): Promise<any> => {
    const { data } = await api.get('/admin/dashboard');
    const info = data.data || data;
    return {
      recentMaterials: info.recentMaterials || [],
      recentStudents: info.recentStudents || [],
    };
  },
  updatePassword: async (currentOrObj: any, maybeNew?: string) => {
    const payload = typeof currentOrObj === 'string'
      ? { currentPassword: currentOrObj, newPassword: maybeNew }
      : currentOrObj;
    const { data } = await api.put('/student/change-password', payload);
    return data;
  },
  getStudents: async (params?: GetStudentsParams) => {
    const { data } = await api.get(API.STUDENTS.BASE, { params });
    return data;
  },
  getStudentById: async (id: string) => {
    const { data } = await api.get(`${API.STUDENTS.BASE}/${id}`);
    return data.student;
  },
  updateStudent: async (id: string, updateData: any) => {
    const { data } = await api.patch(`${API.STUDENTS.BASE}/${id}`, updateData);
    return data.student;
  },
  approveStudent: async (id: string) => {
    const { data } = await api.post(`${API.STUDENTS.BASE}/${id}/approve`);
    return data.student;
  },
  suspendStudent: async (id: string) => {
    const { data } = await api.post(`${API.STUDENTS.BASE}/${id}/suspend`);
    return data.student;
  },
  deleteStudent: async (id: string) => {
    await api.delete(`${API.STUDENTS.BASE}/${id}`);
  },
  getStudentDetails: async (id: string) => {
    return adminService.getStudentById(id);
  },
  updateStudentStatus: async (id: string, status: string) => {
    if (status === 'active') return adminService.approveStudent(id);
    if (status === 'suspended') return adminService.suspendStudent(id);
    return adminService.updateStudent(id, { status });
  },
  resetStudentPassword: async (id: string, newPassword?: string) => {
    const { data } = await api.post(`${API.STUDENTS.BASE}/${id}/reset-password`, { newPassword });
    return data;
  }
};
