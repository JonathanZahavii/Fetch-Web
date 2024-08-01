import { Router } from 'express';
import { googleLogin, login, logout, refreshToken, signUp } from '../controllers/userController';
import { authanticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/refreshToken/:refreshToken', refreshToken);
router.post('/googleLogin', googleLogin);
router.post('/logout', authanticate, logout);

export default router;
