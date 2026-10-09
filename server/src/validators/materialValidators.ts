import { z } from 'zod';
import { CATEGORIES } from '../utils/constants.js';

export const createMaterialSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    subjectId: z.string().optional(),
    subject: z.string().optional(),
    category: z.enum(CATEGORIES),
    batchId: z.string().optional(),
    batch: z.string().optional(),
    visibility: z.enum(['public', 'students', 'batch']).default('students'),
    isActive: z.union([z.boolean(), z.string().transform(val => val === 'true')]).optional(),
    isSample: z.union([z.boolean(), z.string().transform(val => val === 'true')]).optional()
  })
});

export const updateMaterialSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    subjectId: z.string().min(1).optional(),
    category: z.enum(CATEGORIES).optional(),
    batchId: z.string().optional(),
    visibility: z.enum(['public', 'students', 'batch']).optional(),
    isActive: z.union([z.boolean(), z.string().transform(val => val === 'true')]).optional(),
    isSample: z.union([z.boolean(), z.string().transform(val => val === 'true')]).optional()
  })
});

export const materialQuerySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional().transform(Number),
    limit: z.string().regex(/^\d+$/).optional().transform(Number),
    search: z.string().optional(),
    subject: z.string().optional(),
    category: z.enum(CATEGORIES).optional(),
    batch: z.string().optional(),
    sort: z.string().optional()
  })
});
