import api from '@/lib/axios';
import { API } from '@/lib/constants';

export const settingsService = {
  getSettings: async () => {
    const { data } = await api.get(API.SETTINGS.BASE);
    return data.settings;
  },
  updateSettings: async (settingsData: any) => {
    const { data } = await api.patch(API.SETTINGS.BASE, settingsData);
    return data.settings;
  }
};
