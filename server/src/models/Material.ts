import mongoose from 'mongoose';
import { CATEGORIES } from '../utils/constants.js';

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  category: { type: String, enum: CATEGORIES, required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
  fileKey: { type: String, required: true },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  thumbnailKey: { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visibility: { type: String, enum: ['public', 'students', 'batch'], default: 'students' },
  downloadCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isSample: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Material', materialSchema);
