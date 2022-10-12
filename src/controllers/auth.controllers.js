import connection from "../database/postgres.js"
import { nanoid } from "nanoid"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { SESSIONS } = FIELDS

const signIn = (req, res) => {
    const { user } = res.locals

    try {
        connection.query(`
            INSERT INTO ${TABLES.SESSIONS} (${SESSIONS.USER_ID}, ${SESSIONS.TOKEN}) VALUES ($1, $2);
        `, [user.id, nanoid()])
        
    } catch (error) {
        res.status(STATUS.BAD_REQUEST).send(error)
    }
}


export { signIn }