import api from '@/lib/axios';
import { API } from '@/lib/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'superadmin';
  status?: 'active' | 'pending' | 'suspended';
  hscBatch?: string;
  group?: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
  phone: string;
  hscBatch: string;
  group: string;
}

const normalizeUser = (raw: any): User => {
  if (!raw) return raw;
  return {
    ...raw,
    id: raw.id || raw._id || '',
    name: raw.name || '',
    email: raw.email || '',
    role: raw.role || 'student',
    status: raw.status || 'active',
  };
};

export const authService = {
  login: async (email: string, password?: string): Promise<User> => {
    const { data } = await api.post(API.AUTH.LOGIN, { email, password });
    return normalizeUser(data.user || data.data);
  },
  adminLogin: async (email: string, password?: string): Promise<User> => {
    const { data } = await api.post(API.AUTH.ADMIN_LOGIN, { email, password });
    return normalizeUser(data.user || data.data);
  },
  register: async (data: RegisterData): Promise<User> => {
    const { data: responseData } = await api.post(API.AUTH.REGISTER, data);
    return normalizeUser(responseData.user || responseData.data);
  },
  logout: async (): Promise<void> => {
    await api.post(API.AUTH.LOGOUT);
  },
  refreshToken: async (): Promise<void> => {
    await api.post(API.AUTH.REFRESH);
  },
  getMe: async (): Promise<User> => {
    const { data } = await api.get(API.AUTH.ME);
    return normalizeUser(data.user || data.data);
  },
  forgotPassword: async (email: string): Promise<void> => {
    await api.post(API.AUTH.FORGOT_PASSWORD, { email });
  },
  resetPassword: async (token: string, password?: string): Promise<void> => {
    await api.post(API.AUTH.RESET_PASSWORD, { token, password });
  }
};
