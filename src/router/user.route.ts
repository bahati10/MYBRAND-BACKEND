import express from 'express'
import { UserController } from '../controllers/user.controller.js'
import { userLoginMiddleware } from '../middleware/userlogin.middleware.js'




/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties: 
 *         names:
 *           type: string
 *           description: URL of the blog image
 *         username:
 *           type: string
 *           description: Title of the blog
 *         email:
 *           type: string
 *           description: Subtitle of the blog
 *         password:
 *           type: string
 *           description: Subtitle of the blog
*/



export const usersRouter = express.Router()

//register a user


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Sign Up
 *     description: Register.
 *     responses:
 *       '201':
 *         description: Blog Added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */


usersRouter.post("/register", UserController.adduser)

//login a user
usersRouter.post("/login", UserController.loginUser)

//get all users
usersRouter.get("/getusers", userLoginMiddleware,UserController.getUsers)

// get single user
usersRouter.get("/getusers/:id", userLoginMiddleware, UserController.getAUser)

//update user
usersRouter.put("/updateuser/:id", userLoginMiddleware, UserController.updateUser)

//delete a user
usersRouter.delete("/deleteuser/:id", userLoginMiddleware, UserController.deleteUser)
