"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedBlogs = exports.shareBlog = exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const createBlog = async (title, content, category, authorId) => {
    try {
        // First, check if the user exists
        console.log('Looking up user with ID:', authorId);
        const user = await prismaClient_1.default.user.findUnique({
            where: { id: authorId },
        });
        console.log('User lookup result:', user);
        if (!user) {
            throw new Error('User not found');
        }
        // If the user exists, create the blog
        return await prismaClient_1.default.blog.create({
            data: {
                title,
                content,
                category,
                authorId,
            },
        });
    }
    catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};
exports.createBlog = createBlog;
const getBlogs = () => {
    return prismaClient_1.default.blog.findMany({
        include: { author: { select: { name: true } } },
    });
};
exports.getBlogs = getBlogs;
const getBlogById = (id) => {
    return prismaClient_1.default.blog.findUnique({
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
exports.getBlogById = getBlogById;
const updateBlog = (id, title, content, category, authorId) => {
    return prismaClient_1.default.blog.update({
        where: { id },
        data: { title, content, category, authorId },
    });
};
exports.updateBlog = updateBlog;
const deleteBlog = (id, authorId) => {
    return prismaClient_1.default.blog.delete({
        where: { id, authorId },
    });
};
exports.deleteBlog = deleteBlog;
const shareBlog = (blogId, userId, permission, authorId) => {
    return prismaClient_1.default.sharedBlog.create({
        data: { blogId, userId, permission },
    });
};
exports.shareBlog = shareBlog;
const getSharedBlogs = async (userId) => {
    try {
        console.log(`Attempting to fetch shared blogs for user: ${userId}`);
        const sharedBlogs = await prismaClient_1.default.sharedBlog.findMany({
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
    }
    catch (error) {
        console.error(`Error fetching shared blogs for user ${userId}:`, error);
        throw new Error(`Failed to fetch shared blogs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
exports.getSharedBlogs = getSharedBlogs;
//# sourceMappingURL=blogService.js.map