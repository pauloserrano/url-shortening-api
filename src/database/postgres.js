import dotenv from "dotenv"
dotenv.config()

import pg from "pg"

const { Pool } = pg
const { DATABASE_URL } = process.env

const connection = new Pool({
    connectionString: DATABASE_URL
})


export default connection