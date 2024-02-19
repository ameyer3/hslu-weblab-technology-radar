import { Pool } from "pg"
import { Technology } from "../types/technology";

export const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'technologyradar',
    password: 'password',
    port: 5432,
})

export const getAllTechnologies = async (published: boolean | null) => {
    if (published !== null) {
        const results = await pool.query(`SELECT * FROM technology WHERE published = ${published}`);
        return results.rows
    }
    const results = await pool.query("SELECT * FROM technology");
    return results.rows
}

export const createNewTechnology = async (newTechnology: Technology) => {
    const { name, category, ring, description, creationDate, author, published } = newTechnology;
    pool.query("INSERT INTO technology (name, category, ring, description, creationDate, author, published) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [name, category, ring, description, creationDate, author, published], (error, results) => {
            if (error) {
                throw error
            }
            return newTechnology;
        })

}

export const updateTechnology = async (updatedTechnology: any, techId: number) => {
    // TODO Historisierung mit extra tabelle? darin sind author, datum, techId, alte begruendung wieso alter ring
    const { name, category, ring, description, creationDate, author, published } = updatedTechnology;
    pool.query("UPDATE technology SET name = $1, category = $2, ring = $3, description = $4, creationDate = $5, author = $6, published = $7 WHERE id = $8",
        [name, category, ring, description, creationDate, author, published, techId], (error, results) => {
            if (error) {
                throw error
            }


        })
    return techId;

}
