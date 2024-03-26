import express from 'express'
import { UserController } from '../controllers/user.controller.js'
import { userLoginMiddleware } from '../middleware/userlogin.middleware.js'


export const usersRouter = express.Router()

//register a user
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
