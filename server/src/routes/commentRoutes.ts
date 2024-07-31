import { Router } from 'express';
import { addComment } from '../controllers/commentController';

const router = Router();

router.post('/add', addComment);

export default router;