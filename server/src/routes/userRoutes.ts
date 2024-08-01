import { login, refreshToken, signUp, googleLogin } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/refreshToken/:refreshToken', refreshToken);
router.post('/googleLogin', googleLogin);

export default router;
