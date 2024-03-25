import express from 'express';
import { UserController } from '../controllers/register.controller.js';
UserController;
export const usersRouter = express.Router();
//register a user
usersRouter.post("/register", UserController.adduser);
//login a user
usersRouter.post("/login", UserController.loginUser);
//get all users
usersRouter.get("/getusers", UserController.getUsers);
// get single user
usersRouter.get("/getusers/:id", UserController.getAUser);
//update user
usersRouter.put("/updateuser/:id", UserController.updateUser);
//delete a user
usersRouter.delete("/deleteuser/:id", UserController.deleteUser);
