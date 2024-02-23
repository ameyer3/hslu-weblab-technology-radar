import { Request, Response } from "express";
import { fetchAllTechnologies, addNewTechnology, putTechnology, publishTechnology, getCurrentTechnology, addHistory } from "../services/technologyService";
import { Technology, History } from "../types/technology";

export const getAllTechnologies = async (req: Request, res: Response) => {
    let published = (<unknown>req.query["published"] ?? null) as boolean | null;
    if (req.user.role == "user") {
        published = true;
    }
    const allTechnologies = await fetchAllTechnologies(published);
    res.send(allTechnologies);
}

const rings = ["Assess", "Trial", "Adopt", "Hold"];
const categories = ["Techniques", "Tools", "Platforms", "Languages & Frameworks"];

export const createNewTechnology = async (req: Request, res: Response) => {
    if (req.user.role == "user") {
        return res.status(403).send("Unauthorized");
    }
    const { body } = req;
    if (!body.name || !body.category || !body.description) {
        return res.status(400).send("Missing values");
    }
    if (!categories.includes(body.category)) {
        return res.status(400).send("Value for category is not valid");

    }
    if (body.ring && !rings.includes(body.ring)) {
        return res.status(400).send("Value for ring is not valid");

    }
    if (body.category)
        if (body.ring && !body.ringdescription) {
            return res.status(400).send("If you define a ring, you also need to define a ring description");

        }
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
    if (!body.name || !body.category || !body.description) {
        return res.status(400).send("Missing values");
    }
    if (!categories.includes(body.category)) {
        return res.status(400).send("Value for category is not valid");

    }
    if (body.ring && !rings.includes(body.ring)) {
        return res.status(400).send("Value for ring is not valid");

    }
    if (body.ring && !body.ringdescription) {
        return res.status(400).send("If you define a ring, you also need to define a ring description");

    }

    const updatedTechnology: Technology = {
        "name": body.name,
        "category": body.category,
        "ring": body.ring,
        "ringdescription": body.ringdescription,
        "description": body.description,
        "updateAuthor": req.user.userId,
    }
    await updateHistory(body.id, req.user.userId);
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
    await updateHistory(techId, req.user.userId);
    const id = await publishTechnology(published, publishingDate, updateAuthor, techId);
    res.status(200).send({ "id": id });

}

export const updateHistory = async (id: number, userId: number) => {
    let tech = await getCurrentTechnology(id);
    console.log(tech);
    const history: History = {
        "technologyId": id,
        "name": tech.name,
        "category": tech.category,
        "ring": tech.ring,
        "ringdescription": tech.ringdescription,
        "description": tech.description,
        "published": tech.published,
        "publishingDate": tech.publishingdate,
        "updateDate": new Date(),
        "updateAuthor": userId,
    }
    await addHistory(history);
}