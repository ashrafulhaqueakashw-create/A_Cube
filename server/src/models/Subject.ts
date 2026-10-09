import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  namebn: { type: String, required: true },
  description: { type: String },
  descriptionBn: { type: String },
  icon: { type: String },
  slug: { type: String, required: true, unique: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);
