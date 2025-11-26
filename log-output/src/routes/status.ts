import { getStatus } from '../controllers/status';
import { Router } from 'express';
import {ROUTES} from '../utils/tokens';

const routerStatus = Router();

routerStatus.get(ROUTES.API.STATUS, getStatus);

export default routerStatus;
