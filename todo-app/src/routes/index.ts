import { getTodo, setTodo } from '../controllers/todo';
import { PAGE, ROUTES } from '../utils/tokens';
import { Router } from 'express';

const { API, BASE_PATHNAME } = ROUTES;
const router = Router();

router.get(BASE_PATHNAME, (req, res) => {
  res.render(PAGE.INDEX);
});
router.get(API.TODO, getTodo);
router.post(API.TODO, setTodo)

export default router;
