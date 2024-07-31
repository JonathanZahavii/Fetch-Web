import { Router } from 'express';
import { upsertPost, deletePost, getPosts, likePost } from '../controllers/postController';

const router = Router();

/**
 * @swagger
 * /api/posts/upsert:
 *   post:
 *     summary: Upsert a post
 *     description: Create a new post or update an existing one.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *               caption:
 *                 type: string
 *               image:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               user:
 *                 type: string
 *               comments:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                     content:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     user:
 *                       type: object
 *                       properties:
 *                         uuid:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         photoURL:
 *                           type: string
 *               likes:
 *                 type: integer
 *               location:
 *                 type: string
 *               petName:
 *                 type: string
 *               when:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Post created or updated successfully
 *       400:
 *         description: Invalid input
 */
router.post('/upsert', upsertPost);
/**
 * @swagger
 * /api/posts/delete/{id}:
 *   delete:
 *     summary: Delete a post
 *     description: Remove a post by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete('/delete/:id', deletePost);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts.
 *     responses:
 *       200:
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   caption:
 *                     type: string
 *                   image:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: string
 *                   comments:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         uuid:
 *                           type: string
 *                         content:
 *                           type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         user:
 *                           type: object
 *                           properties:
 *                             uuid:
 *                               type: string
 *                             name:
 *                               type: string
 *                             email:
 *                               type: string
 *                             photoURL:
 *                               type: string
 *                   likes:
 *                     type: integer
 *                   location:
 *                     type: string
 *                   petName:
 *                     type: string
 *                   when:
 *                     type: string
 *                     format: date-time
 */
router.get('/', getPosts);

/**
 * @swagger
 * /api/posts/like/{id}:
 *   put:
 *     summary: Like a post
 *     description: Increment the like count for a post by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the post to like
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post liked successfully
 *       404:
 *         description: Post not found
 */
router.put('/like/:id', likePost);

export default router;
