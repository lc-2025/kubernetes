import { Router } from 'express';
import routerHealth from './health';
import { ROUTES } from '../utils/constants';

const router = Router();

/**
 * Root endpoint
 * Verifies that the server is running as best-practice
 */
router.get(ROUTES.BASE_PATHNAME, (req, res) => res.sendStatus(200));
// Health routes
router.use('/', routerHealth);

export default router;
