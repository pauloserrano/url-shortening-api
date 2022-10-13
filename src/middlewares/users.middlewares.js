import connection from "../database/postgres.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { USERS } = FIELDS

const checkUserById = async (req, res, next) => {
    const { userId } = res.locals.session

    try {
        const { rows: [ user ] } = await connection.query(`
            SELECT * FROM ${TABLES.USERS} WHERE ${USERS.ID}=$1;
        `, [userId])
    
        if (user){ 
            res.locals.user = user 
        }

        next()
        
    } catch (error) {
        res.status(STATUS.BAD_REQUEST).send(error)
    }
}


export { checkUserById }