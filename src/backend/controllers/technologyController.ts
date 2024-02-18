import { Request, Response } from "express";
import { fetchAllTechnologies, addNewTechnology, putTechnology } from "../services/technologyService";
import { Technology } from "../types/technology";

export const getAllTechnologies = async (req: Request, res: Response) => {
    const published = (req.query["published"] ?? null) as boolean | null;
    const allTechnologies = await fetchAllTechnologies(published);
    res.send(allTechnologies);
}


export const createNewTechnology = async (req: Request, res: Response) => {
    console.log(req);
    const { body } = req;
    if (!body.name || !body.category || !body.ring || !body.description) {

    }
    // check that category and ring are part of the 4 options
    // create author
    const newTechnology: Technology = {
        "name": body.name,
        "category": body.category,
        "ring": body.ring,
        "description": body.description,
        "creationDate": new Date(),
        "author": "TODO",
        "published": body.published,

    }
    console.log(newTechnology);
    const createdTechnology = await addNewTechnology(newTechnology);
    res.status(201).send(createdTechnology);
}

export const updateTechnology = async (req: Request, res: Response) => {
    const { body } = req;
    if (!body.id || !body.name || !body.category || !body.ring || !body.description) {

    }
    const updatedTechnology: Technology = {
        "name": body.name,
        "category": body.category,
        "ring": body.ring,
        "description": body.description,
        "creationDate": new Date(),
        "author": "TODO",
        "published": body.published,

    }
    const id = await putTechnology(updatedTechnology, body.id);
    res.status(200).send(`User modified with ID ${id}`);
}
