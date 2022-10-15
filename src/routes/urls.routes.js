import { Router } from "express"
import { createUrl, getUrl, openUrl, deleteUrl } from "../controllers/urls.controllers.js"
import { tokenIsValid } from "../middlewares/auth.middlewares.js"
import { validateUrl, getShortUrlById, validateShortUrl } from "../middlewares/urls.middlewares.js"


const router = Router()

router.post('/urls/shorten', tokenIsValid, validateUrl, createUrl)
router.get('/urls/:id', getShortUrlById, getUrl)
router.get('/urls/open/:shortUrl', validateShortUrl, openUrl)
router.delete('/urls/:id', tokenIsValid, getShortUrlById, deleteUrl)


export default router