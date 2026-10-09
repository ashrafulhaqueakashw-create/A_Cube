import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../config/s3.js';
import { env } from '../config/env.js';

export const uploadToS3 = async (key: string, body: Buffer, contentType: string) => {
  const command = new PutObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  await s3Client.send(command);
  return key;
};

export const deleteFromS3 = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
  });
  await s3Client.send(command);
};

export const getPresignedDownloadUrl = async (key: string, fileName?: string) => {
  const command = new GetObjectCommand({
    Bucket: env.S3_BUCKET,
    Key: key,
    ResponseContentDisposition: fileName ? `attachment; filename="${fileName}"` : 'attachment',
  });
  return getSignedUrl(s3Client, command, { expiresIn: env.PRESIGNED_URL_EXPIRY });
};
