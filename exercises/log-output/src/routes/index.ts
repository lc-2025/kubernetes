import { Router } from 'express';
import routerStatus from './status';
import routerStorage from './storage';
import { ROUTES } from '../utils/constants';

const { API, BASE_PATHNAME } = ROUTES;
const router = Router();

/**
 * Home
 * Verifies that the server is running
 * just as best-practice
 */
router.get(BASE_PATHNAME, (req, res) => {
  res.sendStatus(200);
});
// API - REST
router.use(API.BASE_PATHNAME, routerStatus);
router.use(API.BASE_PATHNAME, routerStorage);

export default router;
