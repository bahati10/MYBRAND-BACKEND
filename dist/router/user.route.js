import express from "express";
import { UserController } from "../controllers/user.controller.js";
import { userLoginMiddleware } from "../middleware/userlogin.middleware.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: Firstname for login
 *         lastname:
 *           type: string
 *           description: Lastname for login
 *         email:
 *           type: string
 *           description: Email address of the user
 *         password:
 *           type: string
 *           description: Password for login
 */
export const usersRouter = express.Router();
//register a user
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
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
usersRouter.post("/register", UserController.adduser);
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Sign Up
 *     description: Register a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
//login a user
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login as a user
 *     description: Login with email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       '400':
 *         description: Bad request, check your input data
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */
usersRouter.post("/login", UserController.loginUser);
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login as a user
 *     description: Login with email and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       '400':
 *         description: Bad request, check your input data
 *       '401':
 *         description: Unauthorized, invalid credentials
 *       '500':
 *         description: Internal server error
 */
//get all users
usersRouter.get("/users", userLoginMiddleware, UserController.getUsers);
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all registered users
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized, token missing or invalid
 *       '500':
 *         description: Internal server error
 */
// get single user
usersRouter.get("/users/:id", userLoginMiddleware, UserController.getAUser);
/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     description: Retrieve a user by their ID (protected route, requires authentication token)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request, invalid user ID format
 *       '401':
 *         description: Unauthorized, token missing or invalid
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
//update user
usersRouter.put(
  "/user/updateuser/:id",
  userLoginMiddleware,
  UserController.updateUser
);
/**
 * @swagger
 * /api/updateuser/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user details by their ID (protected route, requires authentication token)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: User object that needs to be updated
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request, invalid user ID format or missing/invalid data
 *       '401':
 *         description: Unauthorized, token missing or invalid
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
//delete a user
usersRouter.delete(
  "/user/delete/:id",
  userLoginMiddleware,
  UserController.deleteUser
);
/**
 * @swagger
 * /api/delete/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID (protected route, requires authentication token)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad request, invalid user ID format
 *       '401':
 *         description: Unauthorized, token missing or invalid
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
