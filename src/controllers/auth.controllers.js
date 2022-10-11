import connection from "../database/postgres.js"
import { TABLES } from "../enums/tables.js"

const getUsers = async (req, res) => {
    const data = await connection.query(`SELECT * FROM ${TABLES.USERS}`)
    res.send(data)
}


export { getUsers }