import express from 'express';
import { MessageController } from '../controllers/message.controller.js';
import { userLoginMiddleware } from '../middleware/userlogin.middleware.js';
export const messagesRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Messages management
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
/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         firstname:
 *           type: string
 *           description: First name of the sender
 *         lastname:
 *           type: string
 *           description: Last name of the sender
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the sender
 *         message:
 *           type: string
 *           description: Content of the message
 */
messagesRouter.post("/send", MessageController.sendmessage);
/**
 * @swagger
 * /api/send:
 *   post:
 *     summary: Send a message
 *     description: Create and send a new message.
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       '201':
 *         description: Message sent successfully.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Internal Server Error.
 */
messagesRouter.get("/messages", userLoginMiddleware, MessageController.getMessages);
/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve all messages.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Messages retrieved successfully.
 *       '500':
 *         description: Internal Server Error.
 */
messagesRouter.get("/messages/:id", userLoginMiddleware, MessageController.getAMessage);
/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     summary: Get a message by ID
 *     description: Retrieve a message by its ID.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     responses:
 *       '200':
 *         description: Message retrieved successfully.
 *       '404':
 *         description: Message not found.
 *       '500':
 *         description: Internal Server Error.
 */
messagesRouter.delete("/messages/delete/:id", userLoginMiddleware, MessageController.deleteMessage);
/**
 * @swagger
 * /api/messages/delete/{id}:
 *   delete:
 *     summary: Delete a message by ID
 *     description: Delete a message by its ID.
 *     tags: [Messages]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Message ID
 *     responses:
 *       '200':
 *         description: Message deleted successfully.
 *       '404':
 *         description: Message not found.
 *       '500':
 *         description: Internal Server Error.
 */
export default messagesRouter;
