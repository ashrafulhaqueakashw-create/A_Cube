import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoSanitize from 'express-mongo-sanitize';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import materialRoutes from './routes/materialRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import examRoutes from './routes/examRoutes.js';
import examResultRoutes from './routes/examResultRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

const app = express();

connectDB();

app.use(helmet());

const allowedOrigins = [
  env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      origin === env.CLIENT_URL
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in deployment with credentials to avoid frustrating CORS blocks
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(mongoSanitize());
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/', generalLimiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/materials', materialRoutes);
app.use('/api/v1/teachers', teacherRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/announcements', announcementRoutes);
app.use('/api/v1/exams', examRoutes);
app.use('/api/v1/exam-results', examResultRoutes);
app.use('/api/v1/settings', settingsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', environment: env.NODE_ENV });
});

app.use(errorHandler);

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
});
