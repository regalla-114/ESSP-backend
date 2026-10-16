import { Router } from 'express';
import { UserController } from '../../controllers/user.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { updateUserProfileSchema, userIdParamSchema } from '../../validations/user.validation.js';

const router = Router();

// Protect all user routes with authentication
router.use(authenticate);

// Profile management
router.patch('/profile', validate(updateUserProfileSchema), UserController.updateProfile);

// Admin / Manager routes
router.get('/', authorize('ADMIN', 'MANAGER'), UserController.getAllUsers);
router.get('/:id', authorize('ADMIN', 'MANAGER'), validate(userIdParamSchema), UserController.getUserById);

export default router;
