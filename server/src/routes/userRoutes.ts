import { login, refreshToken, signUp } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/refreshToken/:refreshToken', refreshToken);

export default router;
