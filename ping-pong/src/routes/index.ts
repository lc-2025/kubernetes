import { getPingPong, getPings } from '../controllers/pingPong';
import { Router } from 'express';
import { ROUTES } from '../utils/tokens';

const { API } = ROUTES;
const router = Router();

router.get(API.PING_PONG, getPingPong);
router.get(API.PINGS, getPings);

export default router;
