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

        res.status(STATUS.CREATED).send({ shortUrl })
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


const getUrl = (req, res) => {
    const { url: { id, shortUrl, url }} = res.locals
    res.send({ id, shortUrl, url })
}


const openUrl = (req, res) => {
    const { id, url } = res.locals.shortUrl
    
    try {
        connection.query(`
            UPDATE ${TABLES.URLS} SET ${URLS.VISIT_COUNT} = ${URLS.VISIT_COUNT} + 1
            WHERE ${URLS.ID}=$1;
        `, [id])
        
        res.redirect(url)
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


const deleteUrl = (req, res) => {
    const { userId: sessionId } = res.locals.session
    const { userId } = res.locals.url

    if (sessionId !== userId){
        res.sendStatus(STATUS.UNAUTHORIZED)
        return
    }

    try {
        connection.query(`
            DELETE FROM ${TABLES.URLS} WHERE ${URLS.ID}=$1;
        `, [req.params.id])

        res.sendStatus(STATUS.NO_CONTENT)
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


export { createUrl, getUrl, openUrl, deleteUrl }