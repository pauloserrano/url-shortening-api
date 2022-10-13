import { Router } from "express"
import * as auth from "../controllers/auth.controllers.js"
import { checkUserByEmail, passwordIsValid, validateSignIn, validateSignUp } from "../middlewares/auth.middlewares.js"

const router = Router()

router.post('/signin', validateSignIn, checkUserByEmail, passwordIsValid, auth.signIn)
router.post('/signup', validateSignUp, checkUserByEmail, auth.signUp)


export default router