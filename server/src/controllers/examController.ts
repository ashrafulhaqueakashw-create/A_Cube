import { Request, Response, NextFunction } from 'express';
import Exam from '../models/Exam.js';
import { AppError } from '../middleware/errorHandler.js';

export const getExams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = (req as any).user?.role === 'admin' ? {} : { isActive: true };
    const exams = await Exam.find(query).populate('subject').sort({ date: -1 });
    res.json({ success: true, data: exams, exams });
  } catch (error) { next(error); }
};

export const createExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.createdBy = (req as any).user._id;
    const exam = await Exam.create(req.body);
    res.status(201).json({ success: true, data: exam, exam });
  } catch (error) { next(error); }
};

export const updateExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exam) return next(new AppError('Exam not found', 404));
    res.json({ success: true, data: exam, exam });
  } catch (error) { next(error); }
};

export const deleteExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return next(new AppError('Exam not found', 404));
    res.json({ success: true, message: 'Exam deleted' });
  } catch (error) { next(error); }
};
