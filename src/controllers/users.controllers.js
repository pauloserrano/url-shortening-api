import connection from "../database/postgres.js"
import { TABLES } from "../enums/tables.js"
import { FIELDS } from "../enums/fields.js"
import { STATUS } from "../enums/status.js"


const getUserData = (req, res) => {
    const { user, urls } = res.locals

    res.send({
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


export { getUserData }