import { Router } from 'express';
import { addPost, editPost, deletePost, getPosts, likePost } from '../controllers/postController';

const router = Router();

router.post('/add', addPost);
router.put('/edit/:id', editPost);
router.delete('/delete/:id', deletePost);
router.get('/', getPosts);
router.put('/like/:id', likePost);

export default router;
