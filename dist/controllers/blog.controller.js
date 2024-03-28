var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Blog, BlogschemaValidate } from '../models/blog.model.js';
import { blogServices } from '../services/blogs.service.js';
class blogController {
    constructor() {
        //add blog controller
        this.addblog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //data to be saved in database
            const data = {
                image: req.body.image,
                title: req.body.title,
                subtitle: req.body.subtitle,
                content: req.body.content,
            };
            const { error, value } = BlogschemaValidate.validate(data);
            if (error) {
                res.json({ message: error });
            }
            else {
                const blog = yield blogServices.createBlog(value);
                res.status(201).json({ message: "Blog Added successfully: ", blog });
            }
        });
        this.addComment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = req.params.id;
            const { content } = req.body;
            const userName = (_a = req.userData) === null || _a === void 0 ? void 0 : _a.username;
            if (userName && typeof userName === 'string') {
                try {
                    const updatedBlog = yield blogServices.addComment(id, { user: userName, content }, userName);
                    res.json({ message: "Comment added successfully", blog: updatedBlog });
                }
                catch (error) {
                    res.status(500).json({ message: "Error adding comment", error: error.message });
                }
            }
            else {
                res.status(401).json({ message: 'Invalid user data' });
            }
        });
        // Like a blog
        this.likeBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const id = req.params.id;
            const userName = (_b = req.userData) === null || _b === void 0 ? void 0 : _b.username;
            if (!userName) {
                return res.status(401).json({ message: 'User not available' });
            }
            try {
                const blog = yield Blog.findById(id);
                if (!blog) {
                    return res.status(404).json({ message: 'Blog not found' });
                }
                if (userName && typeof userName === 'string' && !blog.likes.includes(userName)) {
                    blog.likes.push(userName);
                    yield blog.save();
                    return res.status(200).json({ message: 'Blog liked successfully', blog });
                }
                else {
                    const userIndex = blog.likes.indexOf(userName);
                    if (userIndex !== -1) {
                        blog.likes.splice(userIndex, 1); // Remove the like
                        yield blog.save();
                        return res.status(200).json({ message: 'Blog like removed successfully', blog });
                    }
                    // return res.status(400).json({ message: 'You already liked this blog or user ID is invalid' });
                }
            }
            catch (error) {
                console.error('Error liking blog:', error);
                return res.status(500).json({ message: 'Error liking blog' });
            }
        });
        //get all blogs
        this.getBlogs = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blogServices.getBlogs();
            res.json({ message: "Blogs retrieved successfully : ", blogs });
        });
        //get a single blog
        this.getABlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //get id from the parameter
            const id = req.params.id;
            const blog = yield blogServices.getBlog(id);
            res.json({ message: "Blog Retrieved successfully", blog });
        });
        //update blog
        this.updateBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const blog = yield blogServices.updateBlog(id, req.body);
            res.json({ message: "Blog updated successfully", blog });
        });
        //delete a blog
        this.deleteBlog = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield blogServices.deleteBlog(id);
            res.json({ message: 'Blog Deleted successfully' });
        });
    }
}
//export class
export const BlogController = new blogController();
