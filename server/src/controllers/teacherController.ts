import { Request, Response, NextFunction } from 'express';
import Teacher from '../models/Teacher.js';
import { AppError } from '../middleware/errorHandler.js';

export const getTeachers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = (req as any).user?.role === 'admin' ? {} : { isActive: true };
    const teachers = await Teacher.find(query).sort({ displayOrder: 1 });
    res.json({ success: true, data: teachers });
  } catch (error) { next(error); }
};

export const createTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, data: teacher });
  } catch (error) { next(error); }
};

export const updateTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return next(new AppError('Teacher not found', 404));
    res.json({ success: true, data: teacher });
  } catch (error) { next(error); }
};

export const deleteTeacher = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return next(new AppError('Teacher not found', 404));
    res.json({ success: true, message: 'Teacher deleted' });
  } catch (error) { next(error); }
};
