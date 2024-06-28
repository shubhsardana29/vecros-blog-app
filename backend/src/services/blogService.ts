import prisma from '../utils/prismaClient';

export const createBlog = async (title: string, content: string, category: string, authorId: number) => {
    try {
        // First, check if the user exists
        console.log('Looking up user with ID:', authorId);
        const user = await prisma.user.findUnique({
          where: { id: authorId },
        });
        console.log('User lookup result:', user);
    
        if (!user) {
          throw new Error('User not found');
        }
    
        // If the user exists, create the blog
        return await prisma.blog.create({
          data: {
            title,
            content,
            category,
            authorId,
          },
        });
      } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
      }
};

export const getBlogs = () => {
  return prisma.blog.findMany({
    include: { author: { select: { name: true } } },
  });
};

export const getBlogById = (id: number) => {
  return prisma.blog.findUnique({
    where: {
      id: id
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  });
};

export const updateBlog = (id: number, title: string, content: string, category: string, authorId: number) => {
  return prisma.blog.update({
    where: { id },
    data: { title, content, category, authorId },
  });
};

export const deleteBlog = (id: number, authorId: number) => {
  return prisma.blog.delete({
    where: { id, authorId },
  });
};

export const shareBlog = (blogId: number, userId: number, permission: string, authorId: number) => {
  return prisma.sharedBlog.create({
    data: { blogId, userId, permission },
  });
};

export const getSharedBlogs = async (userId: number) => {
  try {
    console.log(`Attempting to fetch shared blogs for user: ${userId}`);
    const sharedBlogs = await prisma.sharedBlog.findMany({
      where: { userId },
      include: {
        blog: {
          include: {
            author: {
              select: {
                name: true
              }
            }
          }
        }
      }
    });

    console.log(`Retrieved ${sharedBlogs.length} shared blogs for user: ${userId}`);
    return sharedBlogs;
  } catch (error) {
    console.error(`Error fetching shared blogs for user ${userId}:`, error);
    throw new Error(`Failed to fetch shared blogs: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};