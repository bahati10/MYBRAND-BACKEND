import { BlogschemaValidate } from "../models/blog.model.js";
import { blogServices } from "../services/blogs.service.js";
class blogController {
  constructor() {
    //add blog controller
    this.addblog = async (req, res) => {
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
      } else {
        const blog = await blogServices.createBlog(value);
        res.status(201).json({ message: "Blog Added successfully: ", blog });
      }
    };
    this.addComment = async (req, res) => {
      const id = req.params.id;
      const { content } = req.body;
      if (
        req.userData &&
        typeof req.userData === "object" &&
        "username" in req.userData
      ) {
        const { username } = req.userData;
        try {
          const updatedBlog = await blogServices.addComment(
            id,
            { content },
            username
          );
          res.json({
            message: "Comment added successfully",
            blog: updatedBlog,
          });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Error adding comment", error: error.message });
        }
      } else {
        res.status(401).json({ message: "Invalid user data" });
      }
    };
    //get all blogs
    this.getBlogs = async (req, res) => {
      const blogs = await blogServices.getBlogs();
      res.json({ message: "Blogs retrieved successfully : ", blogs });
    };
    //get a single blog
    this.getABlog = async (req, res) => {
      //get id from the parameter
      const id = req.params.id;
      const blog = await blogServices.getBlog(id);
      res.json({ message: "Blog Retrieved successfully", blog });
    };
    //update blog
    this.updateBlog = async (req, res) => {
      const id = req.params.id;
      const blog = await blogServices.updateBlog(id, req.body);
      res.json({ message: "Blog update successfully", blog });
    };
    //delete a blog
    this.deleteBlog = async (req, res) => {
      const id = req.params.id;
      await blogServices.deleteBlog(id);
      res.json({ message: "Blog with deleted successuly" });
    };
  }
}
//export class
export const BlogController = new blogController();
