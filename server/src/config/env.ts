import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/acube-academy'),
  JWT_ACCESS_SECRET: z.string().min(32).default('acube_jwt_super_access_secret_key_min_32_chars!'),
  JWT_REFRESH_SECRET: z.string().min(32).default('acube_jwt_super_refresh_secret_key_min_32_chars!'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  CLIENT_URL: z.string().default('http://localhost:5173'),
  ADMIN_EMAIL: z.string().email().default('admin@acube.academy'),
  ADMIN_PASSWORD: z.string().default('AdminPass123!'),
  S3_BUCKET: z.string().default('acube-materials'),
  S3_REGION: z.string().default('auto'),
  S3_ENDPOINT: z.string().default('https://dummy-account.r2.cloudflarestorage.com'),
  S3_ACCESS_KEY: z.string().default('dummy-s3-access-key'),
  S3_SECRET_KEY: z.string().default('dummy-s3-secret-key'),
  PRESIGNED_URL_EXPIRY: z.coerce.number().default(3600),
  MAX_FILE_SIZE: z.coerce.number().default(52428800),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.format());
  process.exit(1);
}
export const env = parsed.data;
