import request from "supertest";
import { app } from "../index";

jest.mock('../database/configure')

describe('#getClient', () => {
    let jwt_token: string;

    beforeAll(async () => {
        const login = { username: "test@tech.com", password: "secret" }
        const response = await request(app).post("/api/login").send(login).expect(200)
        jwt_token = response.body.data.token;
    });

    it("should fetch technologies", async () => {
        console.log(jwt_token)
        const response = await request(app).get("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(200)
        expect(response.body).toEqual([])
    });
});