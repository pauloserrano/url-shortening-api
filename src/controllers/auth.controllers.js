import connection from "../database/postgres.js"
import bcrypt from "bcrypt"
import { nanoid } from "nanoid"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { USERS, SESSIONS } = FIELDS

const signIn = (req, res) => {
    const { user } = res.locals
    const token = nanoid()

    try {
        connection.query(`
            INSERT INTO ${TABLES.SESSIONS} (${SESSIONS.USER_ID}, ${SESSIONS.TOKEN}) VALUES ($1, $2);
        `, [user.id, token])
        res.status(STATUS.OK).send({ token })
        
    } catch (error) {
        res.status(STATUS.BAD_REQUEST).send(error)
    }
}


const signUp = async (req, res) => {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, 10)

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