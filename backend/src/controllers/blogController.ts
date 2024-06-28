import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  omit: {
    user: {
      password: true
    }
  }
})

interface AuthRequest extends Request {
  user?: { id: number };
}

export const createBlog = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const authorId = req.user?.id;

  if (!authorId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    console.log('Attempting to create blog with:', { title, content, authorId });
    const blog = await prisma.blog.create({
      data: { title, content, authorId },
    });
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ 
      error: 'Error creating blog', 
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        author: {
          omit: {
            email: true // Omit email locally, in addition to the globally omitted password
          }
        },
      },
    });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ 
      error: 'Error fetching blogs', 
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blog' });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const authorId = (req as AuthRequest).user?.id;

  try {
    console.log('Attempting to update blog with:', { title, content, authorId });
    const updatedBlog = await prisma.blog.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ 
      error: 'Error updating blog', 
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log('Attempting to delete blog with id:', { id });
    await prisma.blog.delete({
      where: { id: Number(id) },
    });
    res.status(204).send().json('Blog deleted successfully');
    console.log('Blog deleted successfully');
  } catch (error) {
    res.status(500).json({ error: 'Error deleting blog' });
  }
};