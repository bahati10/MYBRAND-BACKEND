import { MessageController } from "../controllers/message.controller.js";
import express from 'express';
export const messagesRouter = express.Router();
//send a message
messagesRouter.post("/send", MessageController.sendmessage);
//get messages
messagesRouter.get("/messages", MessageController.getMessages);
//get a message
messagesRouter.get("/messages/:id", MessageController.getAMessage);
//delete a message
messagesRouter.post("/delete/:id", MessageController.deleteMessage);
