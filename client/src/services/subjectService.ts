import api from '@/lib/axios';
import { API } from '@/lib/constants';

export const subjectService = {
  getSubjects: async () => {
    const { data } = await api.get(API.SUBJECTS.BASE);
    return data.subjects;
  },
  createSubject: async (subjectData: any) => {
    const { data } = await api.post(API.SUBJECTS.BASE, subjectData);
    return data.subject;
  },
  updateSubject: async (id: string, subjectData: any) => {
    const { data } = await api.patch(`${API.SUBJECTS.BASE}/${id}`, subjectData);
    return data.subject;
  },
  deleteSubject: async (id: string) => {
    await api.delete(`${API.SUBJECTS.BASE}/${id}`);
  }
};
