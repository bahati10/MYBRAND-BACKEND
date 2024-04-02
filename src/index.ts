import express from 'express'
import { db } from './config/db.config.js'
import dotenv from "dotenv";
import { usersRouter } from './router/user.route.js';
import { blogsRouter } from './router/blog.route.js';
import { messagesRouter } from './router/messages.route.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './swagger.js';


dotenv.config();

export const app = express()
const port = process.env.PORT

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json())
app.use(express.urlencoded({extended: true}))



//routes
app.use("/api", usersRouter, messagesRouter, blogsRouter)
db.then(() => {
    app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
    
})