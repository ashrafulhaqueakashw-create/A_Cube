import { Request, Response, NextFunction } from 'express';
import ExamResult from '../models/ExamResult.js';
import { AppError } from '../middleware/errorHandler.js';

export const getResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = (req as any).user.role === 'admin' ? {} : { studentId: (req as any).user._id };
    const results = await ExamResult.find(query).populate('examId').populate('studentId', 'name studentId');
    res.json({ success: true, data: results });
  } catch (error) { next(error); }
};

export const createResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ExamResult.create(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const updateResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ExamResult.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) return next(new AppError('Result not found', 404));
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

export const deleteResult = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await ExamResult.findByIdAndDelete(req.params.id);
    if (!result) return next(new AppError('Result not found', 404));
    res.json({ success: true, message: 'Result deleted' });
  } catch (error) { next(error); }
};
