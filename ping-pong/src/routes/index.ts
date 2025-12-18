import { getPingPong, getPings } from '../controllers/pingPong';
import { Router } from 'express';
import { ROUTES } from '../utils/tokens';

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
router.get(API.PING_PONG, getPingPong);
router.get(API.PINGS, getPings);

export default router;
