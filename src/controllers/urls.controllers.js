import connection from "../database/postgres.js";
import { nanoid } from "nanoid";
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"

const { URLS } = FIELDS

const createUrl = async (req, res) => {
    const { url } = req.body
    const { session } = res.locals
    const shortUrl = nanoid(8)
    
    try {
        connection.query(`
            INSERT INTO ${TABLES.URLS} (${URLS.USER_ID}, ${URLS.SHORT_URL}, ${URLS.URL}) VALUES ($1, $2, $3);
        `, [session.userId, shortUrl, url])

        res.sendStatus(STATUS.CREATED)
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


const getUrl = (req, res) => {
    const { url: { id, shortUrl, url }} = res.locals
    res.send({ id, shortUrl, url })
}


export { createUrl, getUrl }