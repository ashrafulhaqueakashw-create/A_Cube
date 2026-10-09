import mongoose from 'mongoose';

const downloadLogSchema = new mongoose.Schema({
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  downloadedAt: { type: Date, default: Date.now },
  ipAddress: { type: String }
}, { timestamps: true });

export default mongoose.model('DownloadLog', downloadLogSchema);
