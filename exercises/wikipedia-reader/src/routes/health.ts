import { Router } from 'express';
import { getHealth, getReady } from '../controllers/health';
import { ROUTES } from '../utils/constants';

const routerHealth = Router();

/**
 * Health check
 * Verifies that the server is running
 */
routerHealth.get(ROUTES.HEALTH, getHealth);
routerHealth.get(ROUTES.READY, getReady);

export default routerHealth;
