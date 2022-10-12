import { Router } from "express"
import * as auth from "../controllers/auth.controllers.js"

const router = Router()

router.post('/signup', auth.signIn)


export default router