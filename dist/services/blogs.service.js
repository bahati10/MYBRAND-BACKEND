var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//import module
import { Blog } from "../models/blog.model.js";
export class blogService {
    static createBlog(value) {
        throw new Error('Method not implemented.');
    }
    //create a blog
    createBlog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBlog = yield Blog.create(data);
                return newBlog;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get all blogs
    getBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield Blog.find({});
                return blogs;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //get a single blog
    getBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog.findById({ _id: id });
                if (!blog) {
                    return 'blog not available';
                }
                return blog;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addComment(blogId, commentData, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog.findById(blogId);
                if (!blog) {
                    throw new Error("Blog not found");
                }
                // Add the firstname to the comment data
                commentData.firstName = firstName;
                blog.comments.push(commentData);
                const updatedBlog = yield blog.save();
                return updatedBlog;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    likeBlog(blogId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog.findById(blogId);
                if (!blog) {
                    throw new Error('Blog not found');
                }
                if (blog.likes.includes(userId)) {
                    throw new Error('You already liked this blog');
                }
                blog.likes.push(userId);
                const updatedBlog = yield blog.save();
                return updatedBlog;
            }
            catch (error) {
                console.error('Error liking blog:', error);
                throw new Error('Failed to like blog');
            }
        });
    }
    //update a blog
    updateBlog(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogz = yield Blog.findByIdAndUpdate({ _id: id }, data, { new: true });
                if (!blogz) {
                    return "blog not available";
                }
                return blogz;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //delete a blog by using the find by id and delete 
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield Blog.findByIdAndDelete(id);
                if (!blog) {
                    return 'blog not available';
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
//export the class
export const blogServices = new blogService();
