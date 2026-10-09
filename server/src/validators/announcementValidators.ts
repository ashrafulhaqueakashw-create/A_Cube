import { z } from 'zod';

export const createAnnouncementSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    content: z.string().optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    targetAudience: z.enum(['all', 'students', 'batch']).optional(),
    batchId: z.string().optional(),
    isActive: z.boolean().optional()
  }).refine((data) => !!(data.description || data.content), {
    message: 'Description or content is required',
    path: ['description']
  })
});

export const updateAnnouncementSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    targetAudience: z.enum(['all', 'students', 'batch']).optional(),
    batchId: z.string().optional(),
    isActive: z.boolean().optional()
  })
});
