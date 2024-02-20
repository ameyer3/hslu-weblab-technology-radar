import { getAllTechnologies, createNewTechnology, updateTechnology, updatePublishTechnology } from "../database/configure";
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

export const publishTechnology = async (published: boolean, publishingDate: Date | undefined, updateAuthor: number, techId: number) => {
    let id = await updatePublishTechnology(published, publishingDate, updateAuthor, techId)
    return id;;
}