import express from 'express';
import { db } from './config/db.config.js';
import dotenv from "dotenv";
import { usersRouter } from './router/user.route.js';
import { blogsRouter } from './router/blog.route.js';
import { messagesRouter } from './router/messages.route.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger.js';
import cors from 'cors';
dotenv.config();
export const app = express();
const port = process.env.PORT;
// app.use(cors({
//   origin: ["https://mybrand-backend-2-hey7.onrender.com", "http://127.0.0.1:5500"]
// }));
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true
}));
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use("/api", usersRouter, messagesRouter, blogsRouter);
db.then(() => {
    app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
});
