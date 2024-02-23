import { Pool } from "pg"

export const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'technologyradar',
    password: 'password',
    port: 5432,
})