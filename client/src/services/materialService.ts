import api from '@/lib/axios';
import { API } from '@/lib/constants';

export interface Material {
  _id: string;
  id: string;
  title: string;
  description?: string;
  subject: string;
  category: string;
  fileUrl: string;
  fileSize?: string;
  mimeType?: string;
  uploadedAt: string;
  downloadCount: number;
}

interface GetMaterialsParams {
  page?: number;
  limit?: number;
  search?: string;
  subject?: string;
  category?: string;
  sort?: string;
}

export const materialService = {
  getMaterials: async (params?: GetMaterialsParams) => {
    const { data } = await api.get(API.MATERIALS.BASE, { params });
    return data;
  },
  getMaterialById: async (id: string): Promise<any> => {
    const { data } = await api.get(`${API.MATERIALS.BASE}/${id}`);
    return data.material || data.data;
  },
  getMaterial: async (id: string): Promise<any> => {
    return materialService.getMaterialById(id);
  },
  getMaterialsBySubject: async (slug: string, params?: GetMaterialsParams) => {
    const { data } = await api.get(`${API.MATERIALS.BY_SUBJECT}/${slug}`, { params });
    return data;
  },
  createMaterial: async (formData: FormData | any): Promise<any> => {
    const headers = formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const { data } = await api.post(API.MATERIALS.BASE, formData, { headers });
    return data.material || data.data;
  },
  updateMaterial: async (id: string, formData: FormData | any): Promise<any> => {
    const headers = formData instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : {};
    const { data } = await api.put(`${API.MATERIALS.BASE}/${id}`, formData, { headers });
    return data.material || data.data;
  },
  deleteMaterial: async (id: string): Promise<void> => {
    await api.delete(`${API.MATERIALS.BASE}/${id}`);
  },
  downloadMaterial: async (id: string): Promise<{ url: string }> => {
    const { data } = await api.get(`${API.MATERIALS.BASE}/${id}/download`);
    return data;
  }
};
