import { Router } from "express"
import { createUrl, getUrl, openUrl, deleteUrl } from "../controllers/urls.controllers.js"
import { tokenIsValid } from "../middlewares/auth.middlewares.js"
import { validateUrl, validateShortUrlById, validateShortUrl } from "../middlewares/urls.middlewares.js"


const router = Router()

router.post('/urls/shorten', validateUrl, tokenIsValid, createUrl)
router.get('/urls/:id', validateShortUrlById, getUrl)
router.get('/urls/open/:shortUrl', validateShortUrl, openUrl)
router.delete('/urls/:id', tokenIsValid, validateShortUrlById, deleteUrl)


export default router