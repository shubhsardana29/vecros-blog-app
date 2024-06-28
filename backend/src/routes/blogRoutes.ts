import express from 'express';
import { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } from '../controllers/blogController';
import { auth } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', auth, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

export default router;