import { Router } from 'express';
import { ROUTES } from '../utils/tokens';

const router = Router();

router.get(ROUTES.BASE_PATHNAME, (req, res) => {
  res.sendStatus(200);
});

export default router;
