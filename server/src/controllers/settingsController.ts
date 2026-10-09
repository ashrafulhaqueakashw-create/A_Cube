import { Request, Response, NextFunction } from 'express';
import Settings from '../models/Settings.js';

export const getSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await Settings.find();
    const settingsObj = settings.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
    res.json({ success: true, data: settingsObj });
  } catch (error) { next(error); }
};

export const updateSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updates = Object.entries(req.body).map(([key, value]) => ({
      updateOne: {
        filter: { key },
        update: { $set: { value } },
        upsert: true
      }
    }));
    if (updates.length > 0) {
      await Settings.bulkWrite(updates as any);
    }
    res.json({ success: true, message: 'Settings updated' });
  } catch (error) { next(error); }
};
