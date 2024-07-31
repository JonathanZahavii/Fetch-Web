import { signUp } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/signup', signUp);

export default router;
