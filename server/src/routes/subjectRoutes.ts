import express from 'express';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../controllers/subjectController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getSubjects); // Public or protected based on use case, here we can let anyone see subjects or just students
// Wait, prompt says: "subjectRoutes.ts - GET / (public), POST / (admin), PUT /:id (admin), DELETE /:id (admin)"

router.post('/', protect, authorize('admin'), createSubject);
router.put('/:id', protect, authorize('admin'), updateSubject);
router.delete('/:id', protect, authorize('admin'), deleteSubject);

export default router;
