import express from 'express'
import { db } from './config/db.config.js'
import dotenv from "dotenv";
import { usersRouter } from './router/user.route.js';
import { blogsRouter } from './router/blog.route.js';
import { messagesRouter } from './router/messages.route.js';


dotenv.config();

const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use("/api", usersRouter, messagesRouter, blogsRouter)

//db connection then server connection
db.then(() => {
    app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
})