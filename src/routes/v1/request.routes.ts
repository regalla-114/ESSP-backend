import { Router } from 'express';
import { RequestController } from '../../controllers/request.controller.js';
import { authenticate, authorize } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createServiceRequestSchema,
  updateRequestStatusSchema,
} from '../../validations/request.validation.js';

const router = Router();

// Protect all request routes with authentication
router.use(authenticate);

// Employee routes
router.post('/', validate(createServiceRequestSchema), RequestController.createRequest);
router.get('/my-requests', RequestController.getMyRequests);

// Manager / Admin routes
router.get('/', authorize('MANAGER', 'ADMIN'), RequestController.getAllRequests);
router.patch(
  '/:id/status',
  authorize('MANAGER', 'ADMIN'),
  validate(updateRequestStatusSchema),
  RequestController.updateStatus
);

export default router;
