import { pool } from "./configure"

export const existingUser = async (email: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE username='${email}'`);
    return result.rows[0];
}
