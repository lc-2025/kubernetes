import { getTodoRecords, setTodos } from '../controllers/todo';
import loggingMiddleware from '../middlewares/logging';
import { PAGE, ROUTES } from '../utils/tokens';
import { Router } from 'express';

const { API, BASE_PATHNAME } = ROUTES;
const router = Router();

router.get(BASE_PATHNAME!, (req, res) => {
  // Required by GKE to pass health check
  res.sendStatus(200);
});
router.get(`${BASE_PATHNAME}home`, (req, res) => {
  res.render(PAGE.INDEX);
});
router.get(API.TODO!, getTodoRecords);
router.post(API.TODO!, loggingMiddleware, setTodos);

export default router;
