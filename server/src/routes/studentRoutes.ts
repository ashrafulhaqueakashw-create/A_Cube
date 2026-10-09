import express from 'express';
import { getProfile, updateProfile, changePassword, getDashboardStats } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { updateProfileSchema, changePasswordSchema } from '../validators/studentValidators.js';

const router = express.Router();

router.use(protect);
router.use(authorize('student', 'admin'));

router.get('/profile', getProfile);
router.put('/profile', validate(updateProfileSchema), updateProfile);
router.put('/change-password', validate(changePasswordSchema), changePassword);
router.get('/dashboard', getDashboardStats);

export default router;
