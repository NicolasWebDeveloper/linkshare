import { Router } from 'express';

import * as viewController from '../controllers/viewController.mjs';
import * as authController from '../controllers/authController.mjs';

const router = Router();

router.get('/register', viewController.renderRegister);
router.get('/login', viewController.renderLogin);

router.get('/:slug', authController.isLoggedIn, viewController.renderLinks);

export default router;
