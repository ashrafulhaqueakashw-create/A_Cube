import express from 'express';
import {
  register, login, adminLogin, logout, refreshToken, forgotPassword, resetPassword, getMe
} from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import {
  registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema
} from '../validators/authValidators.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/admin/login', authLimiter, validate(loginSchema), adminLogin);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', authLimiter, validate(resetPasswordSchema), resetPassword);
router.get('/me', protect, getMe);

export default router;
