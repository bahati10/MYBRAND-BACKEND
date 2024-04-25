import { adminLoginMiddleware } from '../middleware/adminAuth.middleware.js';
import { SubscribeController } from '../controllers/subscribe.controller.js';
import express from 'express'

export const subscribersRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subscribers
 *   description: Subscribers management
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
 *     Subscriber:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the subscriber
 */

// CREATE A SUB
subscribersRouter.post("/subscribe", SubscribeController.createSubscribers)

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     summary: Subscribe to the Newsletter
 *     description: Add your Email
 *     tags: [Subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscriber'
 *     responses:
 *       '201':
 *         description: Subscription successful! Check your email for a welcome newsletter.
 *       '400':
 *         description: Bad request. Invalid input data.
 *       '500':
 *         description: Error creating subscription
 */

// GET SUBS
subscribersRouter.get("/subscribers", adminLoginMiddleware,SubscribeController.getSubs)

/**
 * @swagger
 * /api/subscribers:
 *   get:
 *     summary: Get all subs
 *     description: Retrieve all subs.
 *     tags: [Subscribers]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Subs retrieved successfully.
 *       '500':
 *         description: Internal Server Error.
 */
// GET SUB BY ID
subscribersRouter.get("/subscribers/:id", adminLoginMiddleware, SubscribeController.getSub)

/**
 * @swagger
 * /api/subscribers/{id}:
 *   get:
 *     summary: Get a sub by ID
 *     description: Retrieve a sub by its ID.
 *     tags: [Subscribers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Sub ID
 *     responses:
 *       '200':
 *         description: Sub retrieved successfully.
 *       '404':
 *         description: Sub not found.
 *       '500':
 *         description: Internal Server Error.
 */

// DELETE SUB
subscribersRouter.delete("/subscribers/delete/:id", adminLoginMiddleware, SubscribeController.deleteSub)

/**
 * @swagger
 * /api/subscribers/delete/{id}:
 *   delete:
 *     summary: Delete sub by ID
 *     description: Delete a sub by their ID (protected route, requires authentication token)
 *     tags: [Subscribers]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sub to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Sub deleted successfully
 *       '400':
 *         description: Bad request, invalid sub ID format
 *       '401':
 *         description: Unauthorized, token missing or invalid
 *       '404':
 *         description: Sub not found
 *       '500':
 *         description: Internal server error
 */