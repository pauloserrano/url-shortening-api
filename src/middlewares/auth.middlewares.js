import connection from "../database/postgres.js"
import bcrypt from "bcrypt"
import { signUpSchema } from "../schemas/auth.schemas.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { USERS } = FIELDS

const validateSignIn = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const { rows: [ user ] } = await connection.query(`
            SELECT * FROM ${TABLES.USERS} WHERE ${USERS.EMAIL}=$1;
        `, [email])
    
        if (!user){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return

        } else {
            res.locals.user = user
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return
        }
    
        next()
        
    } catch (error) {
        res.status(STATUS.BAD_REQUEST).send(error)
    }
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

    try {
        const { rows: [ user ] } = await connection.query(`
            SELECT * FROM ${TABLES.USERS} WHERE ${USERS.EMAIL}=$1;
        `, [email])
        
        if (user){
            res.sendStatus(STATUS.CONFLICT)
            return
        } 
    
        next()
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


export { validateSignIn, validateSignUp }