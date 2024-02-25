import { Technology, History } from "../types/technology";
import { pool } from "./configure";


export const getAllTechnologies = async (published: boolean | null) => {
    if (published !== null) {
        const results = await pool.query(`SELECT * FROM technology WHERE published = ${published}`);
        return results.rows
    }
    const results = await pool.query("SELECT * FROM technology");
    return results.rows
}

export const createNewTechnology = async (newTechnology: Technology) => {
    const { name, category, ring, ringdescription, description, creationDate, creationAuthor, updateAuthor, published } = newTechnology;
    pool.query("INSERT INTO technology (name, category, ring, ringdescription, description, creationDate, creationAuthor, updateAuthor, published) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [name, category, ring, ringdescription, description, creationDate, creationAuthor, updateAuthor, published], (error, results) => {
            if (error) {
                throw error
            }
        })
    return newTechnology;


}

export const updateTechnology = async (updatedTechnology: any, techId: number) => {
    const { name, category, ring, ringdescription, description, updateAuthor } = updatedTechnology;
    pool.query("UPDATE technology SET name = $1, category = $2, ring = $3, ringdescription = $4, description = $5, updateAuthor = $6 WHERE id = $7",
        [name, category, ring, ringdescription, description, updateAuthor, techId], (error, results) => {
            if (error) {
                throw error
            }


        })
    return techId;
}

export const updatePublishTechnology = async (published: boolean, publishingDate: Date | undefined, updateAuthor: number, techId: number) => {
    pool.query("UPDATE technology SET published = $1, publishingDate = $2, updateAuthor = $3 WHERE id = $4",
        [published, publishingDate, updateAuthor, techId], (error, results) => {
            if (error) {
                throw error
            }


        })
    return techId;
}

export const getTechnologyDetails = async (id: number) => {
    const results = await pool.query(`SELECT * FROM technology WHERE id = ${id}`);
    return results.rows[0]
}

export const addTechHistory = async (history: History) => {
    const { technologyId, name, category, ring, ringdescription, description, updateDate, updateAuthor, published, publishingDate } = history;
    pool.query("INSERT INTO history (technologyId, name, category, ring, ringdescription, description, updateDate, updateAuthor, published, publishingDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
        [technologyId, name, category, ring, ringdescription, description, updateDate, updateAuthor, published, publishingDate], (error, results) => {
            if (error) {
                throw error
            }
        })
}
