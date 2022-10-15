import connection from "../database/postgres.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { USERS, SESSIONS } = FIELDS

const signIn = async (req, res) => {
    const { user } = res.locals
    if (!user){
        res.sendStatus(STATUS.UNAUTHORIZED)
        return
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword){
        res.sendStatus(STATUS.UNAUTHORIZED)
        return
    }
    
    const token = jwt.sign(
        { sub: user.id }, 
        process.env.TOKEN_SECRET, 
        { expiresIn: 1 }
    )
    
    try {
        const { rows : [ previousSession ]} = await connection.query(`
            SELECT * FROM ${TABLES.SESSIONS} WHERE ${SESSIONS.USER_ID}=$1;
        `, [user.id])

        if (!previousSession){
            connection.query(`
                INSERT INTO ${TABLES.SESSIONS} (${SESSIONS.USER_ID}, ${SESSIONS.TOKEN}) VALUES ($1, $2);
            `, [user.id, token])
        
        } else {
            connection.query(`
                UPDATE ${TABLES.SESSIONS} SET ${SESSIONS.TOKEN}=$1 WHERE ${SESSIONS.USER_ID}=$2;
            `, [token, user.id])
        }
        
        res.status(STATUS.OK).send({ token })

    } catch (error) {
        res.status(STATUS.BAD_REQUEST).send(error)
    }
}


const signUp = async (req, res) => {
    const { user } = res.locals
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)

    if (user){
        res.sendStatus(STATUS.CONFLICT)
        return
    }

    try {
        connection.query(`
            INSERT INTO ${TABLES.USERS} (${USERS.NAME}, ${USERS.EMAIL}, ${USERS.PASSWORD}) VALUES ($1, $2, $3);
        `, [name, email, hash])
        res.sendStatus(STATUS.CREATED)
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


export { signIn, signUp }