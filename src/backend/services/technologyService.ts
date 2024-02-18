import { getAllTechnologies, createNewTechnology, updateTechnology } from "../database/configure";
import { Technology } from "../types/technology";

export const fetchAllTechnologies = async (published: boolean | null) => {
    const allTechnologies = await getAllTechnologies(published);
    return allTechnologies;
}

export const addNewTechnology = async (newTechnology: Technology) => {
    let createdTechnology = await createNewTechnology(newTechnology);
    return createdTechnology;
}

export const putTechnology = async (updatedTechnology: Technology, techId: number) => {
    let id = await updateTechnology(updatedTechnology, techId);
    return id;
}