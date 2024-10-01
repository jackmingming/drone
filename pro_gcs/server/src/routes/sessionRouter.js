import { Router } from 'express';

import SessionController from '../Controllers/SessionController.js';

const sessionRouter = Router();

sessionRouter.post('/', SessionController.create);

export default sessionRouter;