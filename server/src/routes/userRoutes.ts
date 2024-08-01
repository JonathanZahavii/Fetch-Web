import { Router } from 'express';
import { googleLogin, login, logout, refreshToken, signUp, updateUser } from '../controllers/userController';
import { authanticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/signup', signUp);
router.post('/login', login);
router.post('/refreshToken/:refreshToken', refreshToken);
router.post('/googleLogin', googleLogin);
router.post('/logout', authanticate, logout);
router.put('/user', authanticate, updateUser);

export default router;
