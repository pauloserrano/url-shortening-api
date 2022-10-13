import dotenv from "dotenv"
dotenv.config()

import express, { json } from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import urlsRoutes from "./routes/urls.routes.js"


const PORT = process.env.PORT || 5000
const app = express()
app.use(cors(), json())
app.use(authRoutes, urlsRoutes)

app.listen(PORT, () => `Magic happens on ${PORT}`)