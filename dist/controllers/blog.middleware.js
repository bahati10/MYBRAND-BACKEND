import { BlogschemaValidate } from '../models/blog.model.js';
import { blogServices } from '../services/blogs.service.js';
class blogController {
    constructor() {
        //add blog controller
        this.addblog = async (req, res) => {
            const data = {
                image: req.body.image,
                title: req.body.title,
                subtitle: req.body.subtitle,
                content: req.body.content,
            };
            const { error, value } = BlogschemaValidate.validate(data);
            if (error) {
                return res.status(400).json({ error: error.message });
            }
            try {
                return res.status(201).json({ message: 'Blog created successfully' });
            }
            catch (error) {
                console.error('Error creating blog:', error);
                return res.status(500).json({ message: 'Failed to create blog' });
            }
        };
        //get all blogs
        this.getBlogs = async (req, res) => {
            const blogs = await blogServices.getBlogs();
            res.json({ message: blogs });
        };
        //get a single blog
        this.getABlog = async (req, res) => {
            const id = req.params.id;
            const blog = await blogServices.getBlog(id);
            res.json({ message: `Blog with id ${id} retrieved`, blog });
        };
        //update blog
        this.updateBlog = async (req, res) => {
            const id = req.params.id;
            const blog = await blogServices.updateBlog(id, req.body);
            res.json({ msg: "Blog updated successfully", blog });
        };
        //delete a blog
        this.deleteBlog = async (req, res) => {
            const id = req.params.id;
            await blogServices.deleteBlog(id);
            res.json({ msg: 'Blog deleted successfully' });
        };
    }
}
//export class
export const BlogController = new blogController();
