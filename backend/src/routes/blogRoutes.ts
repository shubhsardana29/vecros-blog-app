import express from 'express';
import * as blogController from '../controllers/blogController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();


// Shared blogs route
router.get('/shared', authenticateToken, blogController.getSharedBlogs);

// Public routes
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

// Protected routes
router.post('/', authenticateToken, blogController.createBlog);
router.put('/:id', authenticateToken, blogController.updateBlog);
router.delete('/:id', authenticateToken, blogController.deleteBlog);


// Share blog route
router.post('/share', authenticateToken, blogController.shareBlog);

export default router;