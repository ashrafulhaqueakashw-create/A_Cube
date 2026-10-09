import express from 'express';
import { getTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createTeacherSchema, updateTeacherSchema } from '../validators/teacherValidators.js';

const router = express.Router();

router.get('/', getTeachers); // Public
router.post('/', protect, authorize('admin'), validate(createTeacherSchema), createTeacher);
router.put('/:id', protect, authorize('admin'), validate(updateTeacherSchema), updateTeacher);
router.delete('/:id', protect, authorize('admin'), deleteTeacher);

export default router;
