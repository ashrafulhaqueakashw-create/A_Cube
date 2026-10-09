import { z } from 'zod';

export const createExamSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    subject: z.string().min(1, 'Subject is required'),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
    totalMarks: z.number().min(1, 'Total marks must be greater than 0'),
    duration: z.number().min(1, 'Duration must be greater than 0'),
    description: z.string().optional(),
    batchId: z.string().optional(),
    isActive: z.boolean().optional()
  })
});

export const updateExamSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    subject: z.string().min(1).optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }).optional(),
    totalMarks: z.number().min(1).optional(),
    duration: z.number().min(1).optional(),
    description: z.string().optional(),
    batchId: z.string().optional(),
    isActive: z.boolean().optional()
  })
});
