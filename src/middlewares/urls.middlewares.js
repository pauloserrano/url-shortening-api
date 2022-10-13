import connection from "../database/postgres.js"
import urlSchema from "../schemas/urls.schemas.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { URLS } = FIELDS

const validateUrl = (req, res, next) => {
    const { url } = req.body
    const validUrl = urlSchema.validate({ url })
    
    if (validUrl.error){
        res.status(STATUS.UNPROCESSABLE_ENTITY).send(validUrl.error.details.map(error => error.message))
        return
    }

    next()
}


const validateShortUrlById = async (req, res, next) => {
    const { id } = req.params
    
    try {
        const { rows: [ url ] } = await connection.query(`
            SELECT * FROM ${TABLES.URLS} WHERE ${URLS.ID}=$1;
        `, [id])

        if (!url){
            res.sendStatus(STATUS.NOT_FOUND)
            return
        } 

        res.locals.url = url
        next()

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


const validateShortUrl = async (req, res, next) => {
    const { shortUrl } = req.params
    
    try {
        const { rows: [ url ] } = await connection.query(`
            SELECT * FROM ${TABLES.URLS} WHERE ${URLS.SHORT_URL}=$1;
        `, [shortUrl])

        if (!url){
            res.sendStatus(STATUS.NOT_FOUND)
            return
        } 
        
        res.locals.shortUrl = url
        next()

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


const getUserUrls = async (req, res, next) => {
    const { userId } = res.locals.session

    try {
        const { rows: urls } = await connection.query(`
            SELECT * FROM ${TABLES.URLS} WHERE ${URLS.USER_ID}=$1;
        `, [userId])

        res.locals.urls = urls
        next()
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


export { validateUrl, validateShortUrlById, validateShortUrl, getUserUrls }