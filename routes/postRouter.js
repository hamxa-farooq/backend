import express from 'express';
import { getPosts, addPost, updatePost, deletePost } from '../contollers/post.controller.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/add', addPost);
router.put('/:id/update', updatePost);
router.delete('/:id/delete', deletePost);

export default router;
