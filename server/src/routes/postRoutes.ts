import { Router } from 'express';
import { upsertPost, deletePost, getPosts, likePost } from '../controllers/postController';

const router = Router();

router.post('/', upsertPost);
router.delete('/delete/:id', deletePost);
router.get('/', getPosts);
router.put('/like/:id', likePost);

export default router;
