import express from 'express'
import { userLoginMiddleware } from '../middleware/userlogin.middleware.js'
import { BlogController } from '../controllers/blog.controller.js'


export const blogsRouter = express.Router()

//add a blog
blogsRouter.post("/addblog", BlogController.addblog)

//get all blogs
blogsRouter.get("/blog" , BlogController.getBlogs)

//get single blog
blogsRouter.get("/blog/:id", BlogController.getABlog)

//update a blog
blogsRouter.put("/updateblog/:id", userLoginMiddleware, BlogController.updateBlog)

//delete a blog
blogsRouter.delete("/deleteblog/:id", userLoginMiddleware, BlogController.deleteBlog)