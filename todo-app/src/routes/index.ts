import path from 'path';
import { Router } from 'express';
import { ROUTES } from '../utils/tokens';

const router = Router();

router.get(ROUTES.BASE_PATHNAME, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', 'html', 'index.html'));
});

export default router;
