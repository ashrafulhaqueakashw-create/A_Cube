import express from 'express';
import { getExams, createExam, updateExam, deleteExam } from '../controllers/examController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createExamSchema, updateExamSchema } from '../validators/examValidators.js';

const router = express.Router();

router.use(protect);

router.get('/', getExams);
router.post('/', authorize('admin'), validate(createExamSchema), createExam);
router.put('/:id', authorize('admin'), validate(updateExamSchema), updateExam);
router.patch('/:id', authorize('admin'), validate(updateExamSchema), updateExam);
router.delete('/:id', authorize('admin'), deleteExam);

export default router;
