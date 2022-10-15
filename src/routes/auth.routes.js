import { Router } from "express"
import * as auth from "../controllers/auth.controllers.js"
import { checkUserByEmail, validateSignIn, validateSignUp } from "../middlewares/auth.middlewares.js"

const router = Router()

router.post('/signin', validateSignIn, checkUserByEmail, auth.signIn)
router.post('/signup', validateSignUp, checkUserByEmail, auth.signUp)


export default router