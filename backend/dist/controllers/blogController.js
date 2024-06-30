"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSharedBlogs = exports.shareBlog = exports.deleteBlog = exports.updateBlog = exports.getBlogById = exports.getBlogs = exports.createBlog = void 0;
const blogService = __importStar(require("../services/blogService"));
const createBlog = async (req, res) => {
    var _a;
    try {
        const { title, content, category } = req.body;
        const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log('Attempting to create blog with authorId:', authorId);
        if (!authorId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const blog = await blogService.createBlog(title, content, category, authorId);
        res.status(201).json(blog);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.createBlog = createBlog;
const getBlogs = async (req, res) => {
    try {
        const blogs = await blogService.getBlogs();
        res.json(blogs);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.getBlogs = getBlogs;
const getBlogById = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error in getBlogById:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.getBlogById = getBlogById;
const updateBlog = async (req, res) => {
    var _a;
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;
        const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!authorId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const blog = await blogService.updateBlog(parseInt(id), title, content, category, authorId);
        res.json(blog);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    var _a;
    try {
        const { id } = req.params;
        const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!authorId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await blogService.deleteBlog(parseInt(id), authorId);
        res.json({ message: 'Blog deleted successfully' });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.deleteBlog = deleteBlog;
const shareBlog = async (req, res) => {
    var _a;
    try {
        const { blogId, userId, permission } = req.body;
        const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!authorId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const sharedBlog = await blogService.shareBlog(blogId, userId, permission, authorId);
        res.status(201).json(sharedBlog);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.shareBlog = shareBlog;
const getSharedBlogs = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
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
    }
    catch (error) {
        console.error('Error in getSharedBlogs:', error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unexpected error occurred' });
        }
    }
};
exports.getSharedBlogs = getSharedBlogs;
//# sourceMappingURL=blogController.js.map