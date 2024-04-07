import { Blog, BlogschemaValidate } from '../models/blog.model.js';
import { blogServices } from '../services/blogs.service.js';
class blogController {
    //add blog controller
    addblog = async (req, res) => {
        //data to be saved in database
        const data = {
            image: req.body.image,
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
        };
        const { error, value } = BlogschemaValidate.validate(data);
        if (error) {
            res.status(400).json({ error: error.details[0].message });
        }
        else {
            const blog = await blogServices.createBlog(value);
            res.status(201).json({ message: "Blog Added successfully: ", blog });
        }
    };
    addComment = async (req, res) => {
        const id = req.params.id;
        const { content } = req.body;
        const firstName = req.userData?.firstname;
        if (firstName && typeof firstName === 'string') {
            try {
                const updatedBlog = await blogServices.addComment(id, { user: firstName, content }, firstName);
                res.json({ message: "Comment added successfully", blog: updatedBlog });
            }
            catch (error) {
                res.status(500).json({ message: "Error adding comment", error: error.message });
            }
        }
        else {
            res.status(401).json({ message: 'Invalid user data' });
        }
    };
    // Like a blog
    likeBlog = async (req, res) => {
        const id = req.params.id;
        const firstName = req.userData?.firstname;
        if (!firstName) {
            return res.status(401).json({ message: 'User not available' });
        }
        try {
            const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            if (firstName && typeof firstName === 'string' && !blog.likes.includes(firstName)) {
                blog.likes.push(firstName);
                await blog.save();
                return res.status(200).json({ message: 'Blog liked successfully', blog });
            }
            else {
                const userIndex = blog.likes.indexOf(firstName);
                if (userIndex !== -1) {
                    blog.likes.splice(userIndex, 1); // Remove the like
                    await blog.save();
                    return res.status(200).json({ message: 'Blog like removed successfully', blog });
                }
                // return res.status(400).json({ message: 'You already liked this blog or user ID is invalid' });
            }
        }
        catch (error) {
            console.error('Error liking blog:', error);
            return res.status(500).json({ message: 'Error liking blog' });
        }
    };
    //get all blogs
    getBlogs = async (req, res) => {
        const blogs = await blogServices.getBlogs();
        res.json({ message: "Blogs retrieved successfully : ", blogs });
    };
    //get a single blog
    getABlog = async (req, res) => {
        //get id from the parameter
        const id = req.params.id;
        const blog = await blogServices.getBlog(id);
        res.json({ message: "Blog Retrieved successfully", blog });
    };
    //update blog
    updateBlog = async (req, res) => {
        const id = req.params.id;
        const blog = await blogServices.updateBlog(id, req.body);
        res.json({ message: "Blog updated successfully", blog });
    };
    //delete a blog
    deleteBlog = async (req, res) => {
        const id = req.params.id;
        await blogServices.deleteBlog(id);
        res.json({ message: 'Blog Deleted successfully' });
    };
}
//export class
export const BlogController = new blogController();
