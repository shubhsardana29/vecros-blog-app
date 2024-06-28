"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient({
    omit: {
        user: {
            password: true
        }
    }
});
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, content } = req.body;
    const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!authorId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }
    try {
        console.log('Attempting to create blog with:', { title, content, authorId });
        const blog = yield prisma.blog.create({
            data: { title, content, authorId },
        });
        res.status(201).json(blog);
    }
    catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).json({
            error: 'Error creating blog',
            details: error instanceof Error ? error.message : String(error)
        });
    }
});
exports.createBlog = createBlog;
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield prisma.blog.findMany({
            include: {
                author: {
                    omit: {
                        email: true // Omit email locally, in addition to the globally omitted password
                    }
                },
            },
        });
        res.json(blogs);
    }
    catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({
            error: 'Error fetching blogs',
            details: error instanceof Error ? error.message : String(error)
        });
    }
});
exports.getBlogs = getBlogs;
const getBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const blog = yield prisma.blog.findUnique({
            where: { id: Number(id) },
            include: { author: true },
        });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
});
exports.getBlogById = getBlogById;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.params;
    const { title, content } = req.body;
    const authorId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    try {
        console.log('Attempting to update blog with:', { title, content, authorId });
        const updatedBlog = yield prisma.blog.update({
            where: { id: Number(id) },
            data: { title, content },
        });
        res.json(updatedBlog);
    }
    catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({
            error: 'Error updating blog',
            details: error instanceof Error ? error.message : String(error)
        });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log('Attempting to delete blog with id:', { id });
        yield prisma.blog.delete({
            where: { id: Number(id) },
        });
        res.status(204).send().json('Blog deleted successfully');
        console.log('Blog deleted successfully');
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting blog' });
    }
});
exports.deleteBlog = deleteBlog;
