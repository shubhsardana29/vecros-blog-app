import { Request, Response } from 'express';
import * as blogService from '../services/blogService';
import { JwtPayload } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: JwtPayload & { userId: number };
}

export const createBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const authorId = req.user?.userId;
    console.log('Attempting to create blog with authorId:', authorId);
    if (!authorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const blog = await blogService.createBlog(title, content, category, authorId);
    res.status(201).json(blog);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await blogService.getBlogs();
    res.json(blogs);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid blog ID' });
    }

    const blog = await blogService.getBlogById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error in getBlogById:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const updateBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const authorId = req.user?.userId;
    if (!authorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const blog = await blogService.updateBlog(parseInt(id), title, content, category, authorId);
    res.json(blog);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }
};


export const deleteBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const authorId = req.user?.userId;
    if (!authorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await blogService.deleteBlog(parseInt(id), authorId);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const shareBlog = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { blogId, userId, permission } = req.body;
    const authorId = req.user?.userId;
    if (!authorId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const sharedBlog = await blogService.shareBlog(blogId, userId, permission, authorId);
    res.status(201).json(sharedBlog);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const getSharedBlogs = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    console.log(`Fetching shared blogs for user: ${userId}`);
    const sharedBlogs = await blogService.getSharedBlogs(userId);
    
    if (sharedBlogs.length === 0) {
      console.log(`No shared blogs found for user: ${userId}`);
      return res.status(204).send(); // No Content
    }
    
    console.log(`Successfully retrieved ${sharedBlogs.length} shared blogs for user: ${userId}`);
    res.json(sharedBlogs);
  } catch (error) {
    console.error('Error in getSharedBlogs:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
