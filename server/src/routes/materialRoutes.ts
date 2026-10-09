import express from 'express';
import {
  getMaterials, getMaterialById, createMaterial, updateMaterial,
  deleteMaterial, downloadMaterial, getMaterialsBySubject
} from '../controllers/materialController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createMaterialSchema, updateMaterialSchema, materialQuerySchema } from '../validators/materialValidators.js';
import { upload } from '../middleware/upload.js';
import { uploadLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.get('/', validate(materialQuerySchema), getMaterials);
router.get('/subject/:slug', getMaterialsBySubject);
router.get('/:id', getMaterialById);
router.get('/:id/download', downloadMaterial);

// Admin only routes
router.use(authorize('admin'));
router.post('/', uploadLimiter, upload.single('file'), validate(createMaterialSchema), createMaterial);
router.put('/:id', uploadLimiter, upload.single('file'), validate(updateMaterialSchema), updateMaterial);
router.delete('/:id', deleteMaterial);

export default router;
