import express from 'express'
import { db } from './config/db.config.js'
import dotenv from "dotenv";
import { usersRouter } from './router/register.route.js';


dotenv.config();

const app = express()
const port = process.env.PORT

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use("/api", usersRouter)

//db connection then server connection
db.then(() => {
    app.listen(port, () => console.log(`Server started at http://localhost:${port}`))
})