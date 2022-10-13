import { Router } from "express";
import { getUserData, getUsersRanking } from "../controllers/users.controllers.js";
import { tokenIsValid } from "../middlewares/auth.middlewares.js";
import { getUserUrls } from "../middlewares/urls.middlewares.js";
import { checkUserById } from "../middlewares/users.middlewares.js";


const router = Router()

router.get('/users/me', tokenIsValid, checkUserById, getUserUrls, getUserData)
router.get('/ranking', getUsersRanking)


export default router