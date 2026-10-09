import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  university: { type: String },
  designation: { type: String },
  bio: { type: String },
  photo: { type: String },
  cardImage: { type: String },
  experience: { type: String },
  punchline: { type: String },
  displayOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);
