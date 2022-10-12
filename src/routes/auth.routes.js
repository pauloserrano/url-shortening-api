import { Router } from "express"
import * as auth from "../controllers/auth.controllers.js"
import { validateSignIn, validateSignUp } from "../middlewares/auth.middlewares.js"

const router = Router()

router.post('/signin', validateSignIn, auth.signIn)
router.post('/signup', validateSignUp, auth.signUp)


export default router