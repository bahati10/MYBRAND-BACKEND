import express from 'express';
import { userLoginMiddleware } from '../middleware/userlogin.middleware.js';
import { BlogController } from '../controllers/blog.controller.js';
import { adminLoginMiddleware } from '../middleware/adminAuth.middleware.js';
export const blogsRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog management
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
//MODEL
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
 *         content:
 *           type: string
 *           description: Content of the blog
 */
//add a blog
blogsRouter.post("/blog/addblog", adminLoginMiddleware, BlogController.addblog);
/**
 * @swagger
 * /api/blog/addblog:
 *   post:
 *     summary: Add a new blog
 *     description: Add a new blog post.
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '201':
 *         description: Blog added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request. Invalid data format.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '500':
 *         description: Internal Server Error.
 */
// Add comment to a blog
blogsRouter.post("/blog/:id/comment", userLoginMiddleware, BlogController.addComment);
/**
 * @swagger
 * /api/blog/{id}/comment:
 *   post:
 *     summary: Add a comment to a blog
 *     description: Add a comment to an existing blog post.
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the blog post.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the comment.
 *             required:
 *               - content
 *     responses:
 *       '200':
 *         description: Comment added successfully.
 *       '400':
 *         description: Bad request. Invalid data format.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal Server Error.
 */
// Like to a blog
blogsRouter.post("/blog/:id/like", userLoginMiddleware, BlogController.likeBlog);
/**
 * @swagger
 * /api/blog/{id}/like:
 *   post:
 *     summary: Like a blog post
 *     description: Like or unlike a blog post.
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the blog post.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog liked or unliked successfully.
 *       '400':
 *         description: Bad request. Invalid data format.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal Server Error.
 */
//get all blogs
blogsRouter.get("/blog", BlogController.getBlogs);
/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blogs
 *     description: Retrieve a list of all blogs.
 *     tags: [Blog]
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
//get single blog
blogsRouter.get("/blog/:id", BlogController.getABlog);
/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get single blog
 *     description: Retrieve a single blog.
 *     tags: [Blog]
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
//update a blog
blogsRouter.put("/blog/update/:id", adminLoginMiddleware, BlogController.updateBlog);
/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Update a blog
 *     description: Update an existing blog post.
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the blog post.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       '200':
 *         description: Blog updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       '400':
 *         description: Bad request. Invalid data format.
 *       '401':
 *         description: Unauthorized. User not logged in.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal Server Error.
 */
//delete a blog
blogsRouter.delete("/blog/delete/:id", adminLoginMiddleware, BlogController.deleteBlog);
/**
 * @swagger
 * /api/blog/delete/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Delete a blog by its ID.
 *     tags: [Blog]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       '200':
 *         description: Blog deleted successfully.
 *       '404':
 *         description: Blog not found.
 *       '500':
 *         description: Internal Server Error.
 */
