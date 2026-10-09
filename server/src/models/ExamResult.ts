import mongoose from 'mongoose';

const examResultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  marks: { type: Number, required: true },
  grade: { type: String },
  remarks: { type: String }
}, { timestamps: true });

export default mongoose.model('ExamResult', examResultSchema);
