import { Router } from 'express';
import { ROUTES } from '../utils/tokens';
import { getStatus } from '../controllers/status';

const { BASE_PATHNAME } = ROUTES;
const router = Router();

router.get(BASE_PATHNAME, getStatus);

export default router;
