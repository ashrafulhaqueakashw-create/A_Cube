import express from 'express';
import { getAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createAnnouncementSchema, updateAnnouncementSchema } from '../validators/announcementValidators.js';

const router = express.Router();

router.use(protect);

router.get('/', getAnnouncements); // Students and admin
router.post('/', authorize('admin'), validate(createAnnouncementSchema), createAnnouncement);
router.put('/:id', authorize('admin'), validate(updateAnnouncementSchema), updateAnnouncement);
router.patch('/:id', authorize('admin'), validate(updateAnnouncementSchema), updateAnnouncement);
router.delete('/:id', authorize('admin'), deleteAnnouncement);

export default router;
