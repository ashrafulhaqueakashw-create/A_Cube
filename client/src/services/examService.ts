import api from '@/lib/axios';
import { API } from '@/lib/constants';

export const examService = {
  getExams: async (params?: any) => {
    const { data } = await api.get(API.EXAMS.BASE, { params });
    return data;
  },
  createExam: async (examData: any) => {
    const { data } = await api.post(API.EXAMS.BASE, examData);
    return data.exam;
  },
  updateExam: async (id: string, examData: any) => {
    const { data } = await api.patch(`${API.EXAMS.BASE}/${id}`, examData);
    return data.exam;
  },
  deleteExam: async (id: string) => {
    await api.delete(`${API.EXAMS.BASE}/${id}`);
  }
};
