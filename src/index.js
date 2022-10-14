import dotenv from "dotenv"
dotenv.config()

import express, { json } from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import urlsRoutes from "./routes/urls.routes.js"
import usersRoutes from "./routes/users.routes.js"


const PORT = process.env.PORT
const app = express()
app.use(cors(), json())
app.use(authRoutes, urlsRoutes, usersRoutes)

app.listen(PORT, () => `Magic happens on ${PORT}`)