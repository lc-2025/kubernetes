import { getTodoRecords, setTodos, updateTodoRecord } from '../controllers/todo';
import loggingMiddleware from '../middlewares/logging';
import { PAGE, ROUTES } from '../utils/tokens';
import { Router } from 'express';

const { API, BASE_PATHNAME, HEALTH } = ROUTES;
const router = Router();

router.get(HEALTH!, (req, res) => {
  // Required by GKE to pass health check
  res.sendStatus(200);
});
router.get(BASE_PATHNAME!, (req, res) => {
  res.status(200).render(PAGE.INDEX);
});
router.get(API.TODO!, getTodoRecords);
router.post(API.TODO!, loggingMiddleware, setTodos);
router.put(`${API.TODO!}/:id`, loggingMiddleware, updateTodoRecord);

export default router;
