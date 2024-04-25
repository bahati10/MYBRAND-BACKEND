import { SubscribeController } from '../controllers/subscribe.controller.js';
import express from 'express';
export const subscribersRouter = express.Router();
subscribersRouter.post("/subscribe", SubscribeController.createSubscribers);
