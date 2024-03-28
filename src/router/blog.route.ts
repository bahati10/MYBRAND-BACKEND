import express from 'express'
import { userLoginMiddleware } from '../middleware/userlogin.middleware.js'
import { BlogController } from '../controllers/blog.controller.js'


export const blogsRouter = express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           description: URL of the blog image
 *         title:
 *           type: string
 *           description: Title of the blog
 *         subtitle:
 *           type: string
 *           description: Subtitle of the blog
 *         author:
 *           type: string
 *           description: >
 *             Author of the blog. Default value is "Bahati Yves".
 *             You can change the default author in the blog creation process.
 *         content:
 *           type: string
 *           description: Content of the blog
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the blog
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User who made the comment
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *           description: Array of comments on the blog
 */





/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs.
 *     responses:
 *       '200':
 *         description: A list of blogs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */



//add a blog
blogsRouter.post("/addblog", userLoginMiddleware, BlogController.addblog)

// Add comment to a blog
blogsRouter.post("/blog/:id/comment", userLoginMiddleware, BlogController.addComment);

// Like to a blog
blogsRouter.post("/blog/:id/like", userLoginMiddleware, BlogController.likeBlog);

//get all blogs
blogsRouter.get("/blog" , BlogController.getBlogs)

//get single blog

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get single blog
 *     description: Retrieve a single blog.
 *     parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: numeric ID required
 *             schema:
 *             type: integer
 *     responses:
 *       '200':
 *         description: A single blog.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */


blogsRouter.get("/blog/:id", BlogController.getABlog)

//update a blog
blogsRouter.put("/updateblog/:id", userLoginMiddleware, BlogController.updateBlog)

//delete a blog
blogsRouter.delete("/deleteblog/:id", userLoginMiddleware, BlogController.deleteBlog)
