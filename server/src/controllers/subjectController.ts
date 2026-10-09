import { Request, Response, NextFunction } from 'express';
import Subject from '../models/Subject.js';
import { AppError } from '../middleware/errorHandler.js';
import { slugify } from '../utils/helpers.js';

export const getSubjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = (req as any).user?.role === 'admin' ? {} : { isActive: true };
    const subjects = await Subject.find(query).sort({ order: 1 });
    res.json({ success: true, data: subjects });
  } catch (error) { next(error); }
};

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.slug = slugify(req.body.name);
    const subject = await Subject.create(req.body);
    res.status(201).json({ success: true, data: subject });
  } catch (error) { next(error); }
};

export const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name);
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) return next(new AppError('Subject not found', 404));
    res.json({ success: true, data: subject });
  } catch (error) { next(error); }
};

export const deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return next(new AppError('Subject not found', 404));
    res.json({ success: true, message: 'Subject deleted' });
  } catch (error) { next(error); }
};
