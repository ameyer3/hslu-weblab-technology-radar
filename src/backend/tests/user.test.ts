import request from "supertest";
import { app } from "../index";

jest.mock('../database/configure')

describe('getPublishedTechnologies', () => {
    let jwt_token: string;

    beforeAll(async () => {
        const login = { username: "normal@tech.com", password: "secret" }
        const response = await request(app).post("/api/login").send(login).expect(200)
        jwt_token = response.body.data.token;
    });

    it("should fetch all published technologies", async () => {
        console.log(jwt_token)
        const response = await request(app).get("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(200)
        expect(response.body.length).toEqual(1)
    });
    it("should not fetch upublished technologies", async () => {
        console.log(jwt_token)
        const response = await request(app).get("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(200)
        expect(response.body[0].name == "Kubernetes").toBeFalsy()
    });

    it("should not create a new technology", async () => {
        console.log(jwt_token)
        const response = await request(app).post("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });
    it("should not update a  technology", async () => {
        console.log(jwt_token)
        const response = await request(app).put("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });
    it("should not publish a  technology", async () => {
        console.log(jwt_token)
        const response = await request(app).put("/api/technologies/publish")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });
});