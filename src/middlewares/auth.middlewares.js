import connection from "../database/postgres.js"
import jwt from "jsonwebtoken"
import { signUpSchema, signInSchema } from "../schemas/auth.schemas.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { USERS, SESSIONS } = FIELDS

const validateSignIn = async (req, res, next) => {
    const { email, password } = req.body

    const validSignIn = signInSchema.validate(
        { email, password }, 
        { abortEarly: false }
    )
    
    if (validSignIn.error){
        res.status(STATUS.UNPROCESSABLE_ENTITY).send(validSignIn.error.details.map(error => error.message))
        return
    }

    next()
}


const validateSignUp = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body

    const validSignUp = signUpSchema.validate(
        { name, email, password, confirmPassword }, 
        { abortEarly: false }
    )
    
    if (validSignUp.error){
        res.status(STATUS.UNPROCESSABLE_ENTITY).send(validSignUp.error.details.map(error => error.message))
        return
    }

    next()
}


const checkUserByEmail = async (req, res, next) => {
    const { email } = req.body

    try {
        const { rows: [ user ] } = await connection.query(`
            SELECT * FROM ${TABLES.USERS} WHERE ${USERS.EMAIL}=$1;
        `, [email])
    
        if (user){ 
            res.locals.user = user 
        }

        next()
        
    } catch (error) {
        res.status(STATUS.BAD_REQUEST).send(error)
    }
}


const tokenIsValid = async (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '')

    try {
        jwt.verify(token, process.env.TOKEN_SECRET)
        
        const { rows: [ session ] } = await connection.query(`
            SELECT * FROM ${TABLES.SESSIONS} WHERE ${SESSIONS.TOKEN}=$1
        `, [token])
        
        if (!session){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return
        }

        res.locals.session = session
        next()
        
    } catch (error) {
        connection.query(`
            DELETE FROM ${TABLES.SESSIONS} WHERE ${SESSIONS.TOKEN}=$1;
        `, [token])
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


export { validateSignIn, validateSignUp, checkUserByEmail, tokenIsValid }