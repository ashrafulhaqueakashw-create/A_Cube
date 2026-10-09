export const ROLES = {
  ADMIN: 'admin',
  STUDENT: 'student',
} as const;

export const STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
} as const;

export const CATEGORIES = [
  'lecture-notes',
  'pdf',
  'class-slides',
  'problem-sheets',
  'assignments',
  'question-banks',
  'model-tests',
  'previous-questions',
  'other'
] as const;

export const FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/zip',
  'image/jpeg',
  'image/png',
  'image/gif'
];
