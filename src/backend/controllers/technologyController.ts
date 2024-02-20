import { Request, Response } from "express";
import { fetchAllTechnologies, addNewTechnology, putTechnology, publishTechnology } from "../services/technologyService";
import { Technology } from "../types/technology";

export const getAllTechnologies = async (req: Request, res: Response) => {
    let published = (<unknown>req.query["published"] ?? null) as boolean | null;
    if (req.user.role == "user") {
        published = true;
    }
    const allTechnologies = await fetchAllTechnologies(published);
    res.send(allTechnologies);
}


export const createNewTechnology = async (req: Request, res: Response) => {
    if (req.user.role == "user") {
        return res.status(403).send("Unauthorized");
    }
    const { body } = req;
    if (!body.name || !body.category || !body.ring || !body.description) {

    }
    // check that category and ring are part of the 4 options
    // create author
    const newTechnology: Technology = {
        "name": body.name,
        "category": body.category,
        "ring": body.ring,
        "ringdescription": body.ringdescription,
        "description": body.description,
        "creationDate": new Date(),
        "creationAuthor": req.user.userId,
        "updateAuthor": req.user.userId,
        "published": false,

    }
    console.log(newTechnology);
    const createdTechnology = await addNewTechnology(newTechnology);
    res.status(201).send(createdTechnology);
}

export const updateTechnology = async (req: Request, res: Response) => {
    if (req.user.role == "user") {
        return res.status(403).send("Unauthorized");
    }
    const { body } = req;
    if (!body.id || !body.name || !body.category || !body.ring || !body.description) {


    }
    const updatedTechnology: Technology = {
        "name": body.name,
        "category": body.category,
        "ring": body.ring,
        "ringdescription": body.ringdescription,
        "description": body.description,
        "updateAuthor": req.user.userId,
    }
    const id = await putTechnology(updatedTechnology, body.id);
    res.status(200).send(updatedTechnology);
}

export const updatePublishTechnology = async (req: Request, res: Response) => {
    if (req.user.role == "user") {
        return res.status(403).send("Unauthorized");
    }
    const { body } = req;
    let published = body.published;
    let publishingDate: Date | undefined = undefined
    if (published) {
        publishingDate = new Date();
    }
    const techId = body.id;
    const updateAuthor = req.user.userId;
    const id = await publishTechnology(published, publishingDate, updateAuthor, techId);
    res.status(200).send({ "id": id });

}