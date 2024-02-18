import { Request, Response } from "express";
import { login } from "../services/loginService"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWTUser } from "../types/authentication";

export const loginUser = async (req: Request, res: Response) => {
    let { username, password } = req.body;
    console.log(req.body);
    let user = await login(username);
    if (!user) {
        return res.status(400).send("No user like this exists in our databse.");
    }
    const result = await bcrypt.compare(password, user.password);
    if (result == false) {
        return res.status(403).send("Wrong password.");
    }


    let token;
    try {
        //Creating jwt token
        token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            } as JWTUser,
            "secretkeyappearshere",
            { expiresIn: "1h" }
        );
    } catch (err) {
        console.log(err);
        const error =
            new Error("Error! Something went wrong.");
    }

    return res
        .status(200)
        .json({
            success: true,
            data: {
                userId: user.id,
                username: user.username,
                role: user.role,
                token: token,
            },
        });
}
