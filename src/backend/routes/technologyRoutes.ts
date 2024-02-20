import { NextFunction, Request, Response, Router } from "express";
import { getAllTechnologies, createNewTechnology, updateTechnology, updatePublishTechnology } from "../controllers/technologyController";
import jwt from "jsonwebtoken"
import { JWTUser } from "../types/authentication";

declare module "express-serve-static-core" {
    export interface Request {
        user: JWTUser;
    }
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, "secretkeyappearshere" as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user
        console.log("Valid user, continue: ", req.user)

        next()
    })
}

const router = Router();

router.get("/", authenticateToken, getAllTechnologies);
router.post("/", authenticateToken, createNewTechnology);
router.put("/", authenticateToken, updateTechnology);
router.put("/publish", authenticateToken, updatePublishTechnology);


export const TechnologyRouter = router;