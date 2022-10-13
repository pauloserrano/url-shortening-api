import { Router } from "express"
import { createUrl, getUrl } from "../controllers/urls.controllers.js"
import { tokenIsValid } from "../middlewares/auth.middlewares.js"
import { validateUrl, validateShortUrl } from "../middlewares/urls.middlewares.js"


const router = Router()

router.post('/urls/shorten', validateUrl, tokenIsValid, createUrl)
router.get('/urls/:id', validateShortUrl, getUrl)


export default router