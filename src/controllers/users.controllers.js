import connection from "../database/postgres.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const { USERS, URLS } = FIELDS

const getUserData = (req, res) => {
    const { user, urls } = res.locals

    res.status(STATUS.OK).send({
        id: user.id,
        name: user.name,
        visitCount: urls.reduce((acc, curr) => acc += curr.visitCount, 0),
        shortenedUrls: urls.map(({ id, shortUrl, url, visitCount }) => ({
            id,
            shortUrl,
            url,
            visitCount
        }))
    })
}


const getUsersRanking = async (req, res) => {
    try {
        const { rows: urls } = await connection.query(`
            SELECT 
                ${TABLES.USERS}.${USERS.ID}, 
                ${TABLES.USERS}.${USERS.NAME}, 
                COUNT(${TABLES.URLS}.${URLS.SHORT_URL}) AS "linksCount", 
                SUM(${TABLES.URLS}.${URLS.VISIT_COUNT}) AS "visitCount" 
            FROM ${TABLES.URLS}
            JOIN ${TABLES.USERS} ON ${TABLES.URLS}.${URLS.USER_ID} = ${TABLES.USERS}.${USERS.ID}
            GROUP BY ${TABLES.USERS}.${USERS.ID}
            ORDER BY "visitCount" DESC
            LIMIT 10;
        `)

        res.status(STATUS.OK).send(urls)
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


export { getUserData, getUsersRanking }