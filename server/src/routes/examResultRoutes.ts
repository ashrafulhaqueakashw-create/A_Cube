import express from 'express';
import { getResults, createResult, updateResult, deleteResult } from '../controllers/examResultController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/', getResults);
router.post('/', authorize('admin'), createResult);
router.put('/:id', authorize('admin'), updateResult);
router.delete('/:id', authorize('admin'), deleteResult);

export default router;
