import { z } from 'zod';

export const createTeacherSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    subject: z.string().min(1, 'Subject is required'),
    university: z.string().optional(),
    designation: z.string().optional(),
    bio: z.string().optional(),
    displayOrder: z.number().optional(),
    isActive: z.boolean().optional()
  })
});

export const updateTeacherSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    subject: z.string().min(1).optional(),
    university: z.string().optional(),
    designation: z.string().optional(),
    bio: z.string().optional(),
    displayOrder: z.number().optional(),
    isActive: z.boolean().optional()
  })
});
