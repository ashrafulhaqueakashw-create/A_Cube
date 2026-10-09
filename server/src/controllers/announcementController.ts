import { Request, Response, NextFunction } from 'express';
import Announcement from '../models/Announcement.js';
import { AppError } from '../middleware/errorHandler.js';

export const getAnnouncements = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = (req as any).user?.role === 'admin' ? {} : { isActive: true };
    const announcements = await Announcement.find(query).sort({ date: -1, createdAt: -1 });
    res.json({ success: true, data: announcements, announcements });
  } catch (error) { next(error); }
};

export const createAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.createdBy = (req as any).user._id;
    if (!req.body.date) {
      req.body.date = new Date();
    }
    if (!req.body.description && req.body.content) {
      req.body.description = req.body.content;
    }
    const announcement = await Announcement.create(req.body);
    res.status(201).json({ success: true, data: announcement, announcement });
  } catch (error) { next(error); }
};

export const updateAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.description && req.body.content) {
      req.body.description = req.body.content;
    }
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!announcement) return next(new AppError('Announcement not found', 404));
    res.json({ success: true, data: announcement, announcement });
  } catch (error) { next(error); }
};

export const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return next(new AppError('Announcement not found', 404));
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (error) { next(error); }
};
