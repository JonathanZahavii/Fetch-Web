import { Router } from 'express';
import { addPost, editPost, deletePost, getPosts, likePost, upsertPost } from '../controllers/postController';

const router = Router();

router.post('/', upsertPost);
router.put('/edit/:id', editPost);
router.delete('/delete/:id', deletePost);
router.get('/', getPosts);
router.put('/like/:id', likePost);

export default router;
