import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import Material from '../models/Material.js';
import Announcement from '../models/Announcement.js';
import { AppError } from '../middleware/errorHandler.js';
import bcrypt from 'bcryptjs';

import Exam from '../models/Exam.js';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ success: true, data: (req as any).user });
  } catch (error) { next(error); }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate((req as any).user._id, req.body, { new: true }).select('-password');
    res.json({ success: true, data: user });
  } catch (error) { next(error); }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById((req as any).user._id).select('+password');
    if (!user) return next(new AppError('User not found', 404));
    
    if (!(await (user as any).matchPassword(req.body.currentPassword))) {
      return next(new AppError('Incorrect current password', 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated' });
  } catch (error) { next(error); }
};

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalMaterials = await Material.countDocuments({ isActive: true });
    const recentMaterials = await Material.find({ isActive: true })
      .populate('subjectId', 'name namebn')
      .sort({ createdAt: -1 })
      .limit(5);
    const announcements = await Announcement.find({ isActive: true }).sort({ createdAt: -1 }).limit(3);
    const upcomingExams = await Exam.countDocuments({ isActive: true, date: { $gte: new Date() } });
    
    res.json({
      success: true,
      data: {
        stats: {
          enrolledSubjects: 3,
          availableMaterials: totalMaterials,
          announcements: announcements.length,
          upcomingExams: upcomingExams
        },
        recentMaterials,
        announcements
      }
    });
  } catch (error) { next(error); }
};
