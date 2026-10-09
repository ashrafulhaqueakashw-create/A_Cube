import { Request, Response, NextFunction } from 'express';
import Material from '../models/Material.js';
import DownloadLog from '../models/DownloadLog.js';
import Subject from '../models/Subject.js';
import { uploadToS3, deleteFromS3, getPresignedDownloadUrl } from '../utils/s3Utils.js';
import { AppError } from '../middleware/errorHandler.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export const getMaterials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (req.query.subject) query.subjectId = req.query.subject;
    if (req.query.category) query.category = req.query.category;
    if (req.query.batch) query.batchId = req.query.batch;
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: 'i' };
    }
    if ((req as any).user.role === 'student') {
      query.isActive = true;
      query.$or = [{ visibility: 'public' }, { visibility: 'students' }];
    }

    const sort = req.query.sort === 'popular' ? { downloadCount: -1 } : { createdAt: -1 };

    const [materials, total] = await Promise.all([
      Material.find(query).populate('subjectId', 'name namebn').skip(skip).limit(limit).sort(sort as any),
      Material.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: materials,
      pagination: {
        page, limit, total, totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) { next(error); }
};

export const getMaterialById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await Material.findById(req.params.id).populate('subjectId', 'name namebn');
    if (!material) return next(new AppError('Material not found', 404));
    res.json({ success: true, data: material });
  } catch (error) { next(error); }
};

export const createMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) return next(new AppError('File is required', 400));
    
    const fileExt = path.extname(req.file.originalname);
    const key = `materials/${uuidv4()}${fileExt}`;
    
    await uploadToS3(key, req.file.buffer, req.file.mimetype);

    if (!req.body.subjectId && req.body.subject) {
      const subj = await Subject.findOne({ $or: [{ slug: req.body.subject.toLowerCase() }, { name: new RegExp(req.body.subject, 'i') }] });
      if (subj) req.body.subjectId = subj._id;
    }

    const material = await Material.create({
      ...req.body,
      fileKey: key,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      uploadedBy: (req as any).user._id
    });

    res.status(201).json({ success: true, data: material });
  } catch (error) { next(error); }
};

export const updateMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let material = await Material.findById(req.params.id);
    if (!material) return next(new AppError('Material not found', 404));

    if (req.file) {
      await deleteFromS3(material.fileKey);
      const fileExt = path.extname(req.file.originalname);
      const key = `materials/${uuidv4()}${fileExt}`;
      await uploadToS3(key, req.file.buffer, req.file.mimetype);
      
      req.body.fileKey = key;
      req.body.fileName = req.file.originalname;
      req.body.fileType = req.file.mimetype;
      req.body.fileSize = req.file.size;
    }

    material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: material });
  } catch (error) { next(error); }
};

export const deleteMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return next(new AppError('Material not found', 404));

    await deleteFromS3(material.fileKey);
    await material.deleteOne();
    
    res.json({ success: true, message: 'Material deleted' });
  } catch (error) { next(error); }
};

export const downloadMaterial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) return next(new AppError('Material not found', 404));
    
    const url = await getPresignedDownloadUrl(material.fileKey, material.fileName);
    
    material.downloadCount += 1;
    await material.save();
    
    await DownloadLog.create({
      materialId: material._id,
      userId: (req as any).user._id,
      ipAddress: req.ip
    });

    res.json({ success: true, url });
  } catch (error) { next(error); }
};

export const getMaterialsBySubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await Subject.findOne({ slug: req.params.slug });
    if (!subject) return next(new AppError('Subject not found', 404));

    const materials = await Material.find({ subjectId: subject._id, isActive: true })
      .populate('subjectId', 'name namebn')
      .sort({ createdAt: -1 });
      
    res.json({ success: true, data: materials });
  } catch (error) { next(error); }
};
