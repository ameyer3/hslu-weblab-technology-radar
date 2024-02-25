import request from "supertest";
import { app } from "../index";

jest.mock('../database/configure')

describe('/api/technologies', () => {
    let jwt_token: string;

    beforeAll(async () => {
        const login = { username: "cto@tech.com", password: "secret" }
        const response = await request(app).post("/api/login").send(login).expect(200)
        jwt_token = response.body.data.token;
    });

    it("should fetch all technologies", async () => {
        const response = await request(app).get("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(200)
        expect(response.body.length).toEqual(3)
    });

    it("should create new technologies", async () => {
        const technology = { name: "testTech", category: "Techniques", description: "testDesc" }
        const response = await request(app).post("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .send(technology)
            .expect(201)
        expect(response.body.name).toEqual("testTech")
        expect(response.body.ring).toEqual(undefined)
        expect(response.body.creationAuthor).toEqual(1)
        expect(response.body.published).toEqual(false)
        expect(response.body.publishingDate).toEqual(undefined)


    });
    it("should not create incomplete new technologies", async () => {
        const technology = { name: "testTech", description: "testDesc" }
        const response = await request(app).post("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .send(technology)
            .expect(400)
    });
    it("should not create incomplete new technologies where ring is defined but ringdescription is not", async () => {
        const technology = { name: "testTech", category: "Tools", description: "testDesc", ring: "Trial" }
        const response = await request(app).post("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .send(technology)
            .expect(400)
    });

    it("should update technologies", async () => {
        const technology = {
            id: 3,
            name: "testTech",
            category: "Tools",
            description: "testDesc",
            ring: "Adopt",
            ringdescription: "Seems pretty good",
            creationAuthor: 1,
            published: false,
        }
        const response = await request(app).put("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .send(technology)
            .expect(200)
        expect(response.body.name).toEqual("testTech")
        expect(response.body.ring).toEqual("Adopt")
        expect(response.body.ringdescription).toEqual("Seems pretty good")
        expect(response.body.category).toEqual("Tools")
        expect(response.body.description).toEqual("testDesc")
        expect(response.body.updateAuthor).toEqual(1)
    });
    it("should publish technologies", async () => {
        const technology = {
            id: 3,
            published: true,
        }
        const response = await request(app).put("/api/technologies/publish")
            .set("Authorization", `Bearer ${jwt_token}`)
            .send(technology)
            .expect(200)
        expect(response.body.id).toEqual(3)
    });

});