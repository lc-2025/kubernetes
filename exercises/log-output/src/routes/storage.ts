import { getStorage } from '../controllers/storage';
import { Router } from 'express';
import {ROUTES} from '../utils/constants';

const routerStorage = Router();

routerStorage.get(ROUTES.API.STORAGE, getStorage);

export default routerStorage;
