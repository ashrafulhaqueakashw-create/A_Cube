import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import Material from '../models/Material.js';
import Announcement from '../models/Announcement.js';
import Teacher from '../models/Teacher.js';
import Subject from '../models/Subject.js';
import { AppError } from '../middleware/errorHandler.js';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeStudents = await User.countDocuments({ role: 'student', status: 'active' });
    const pendingStudents = await User.countDocuments({ role: 'student', status: 'pending' });
    const suspendedStudents = await User.countDocuments({ role: 'student', status: 'suspended' });
    const totalMaterials = await Material.countDocuments();
    const totalTeachers = await Teacher.countDocuments({ isActive: true });
    const totalAnnouncements = await Announcement.countDocuments({ isActive: true });

    const subjects = await Subject.find();
    const materialsBySubject = await Promise.all(
      subjects.map(async (s) => ({
        subject: s.name,
        count: await Material.countDocuments({ subjectId: s._id })
      }))
    );

    const recentMaterials = await Material.find().sort({ createdAt: -1 }).limit(5);
    const recentStudents = await User.find({ role: 'student' }).select('-password').sort({ createdAt: -1 }).limit(5);
    
    res.json({
      success: true,
      data: {
        totalStudents,
        activeStudents,
        pendingStudents,
        suspendedStudents,
        totalMaterials,
        totalTeachers,
        totalAnnouncements,
        materialsBySubject,
        recentMaterials,
        recentStudents
      }
    });
  } catch (error) { next(error); }
};

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = { role: 'student' };
    if (req.query.status) query.status = req.query.status;
    if (req.query.batch) query.hscBatch = req.query.batch;
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } },
        { phone: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const [students, total] = await Promise.all([
      User.find(query).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: students,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) { next(error); }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await User.findById(req.params.id).select('-password');
    if (!student) return next(new AppError('Student not found', 404));
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!student) return next(new AppError('Student not found', 404));
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
};

export const approveStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await User.findByIdAndUpdate(req.params.id, { status: 'active' }, { new: true }).select('-password');
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
};

export const suspendStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await User.findByIdAndUpdate(req.params.id, { status: 'suspended' }, { new: true }).select('-password');
    res.json({ success: true, data: student });
  } catch (error) { next(error); }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Student deleted' });
  } catch (error) { next(error); }
};

export const resetStudentPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return next(new AppError('Student not found', 404));
    student.password = req.body.newPassword || req.body.password;
    await student.save();
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) { next(error); }
};
