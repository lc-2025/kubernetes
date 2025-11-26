import { getPingPong } from '../controllers/pingPong';
import { Router } from 'express';
import { ROUTES } from '../utils/tokens';

const { API, BASE_PATHNAME } = ROUTES;
const router = Router();

router.get(BASE_PATHNAME, (req, res) => {
  res.sendStatus(200);
});
// API - REST
router.get(API.PING_PONG, getPingPong);


export default router;
