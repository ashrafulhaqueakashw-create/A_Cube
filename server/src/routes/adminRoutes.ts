import express from 'express';
import {
  getDashboardStats, getStudents, getStudentById, updateStudent,
  approveStudent, suspendStudent, deleteStudent, resetStudentPassword
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/students', getStudents);
router.get('/students/:id', getStudentById);
router.put('/students/:id', updateStudent);
router.put('/students/:id/approve', approveStudent);
router.post('/students/:id/approve', approveStudent);
router.put('/students/:id/suspend', suspendStudent);
router.post('/students/:id/suspend', suspendStudent);
router.delete('/students/:id', deleteStudent);
router.put('/students/:id/reset-password', resetStudentPassword);
router.post('/students/:id/reset-password', resetStudentPassword);

export default router;
