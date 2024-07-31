import { login, signUp } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;
