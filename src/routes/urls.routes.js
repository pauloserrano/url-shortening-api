import { Router } from "express"
import { createUrl } from "../controllers/urls.controllers.js"
import { tokenIsValid } from "../middlewares/auth.middlewares.js"
import { validateUrl } from "../middlewares/urls.middlewares.js"


const router = Router()

router.post('/urls/shorten', validateUrl, tokenIsValid, createUrl)


export default router