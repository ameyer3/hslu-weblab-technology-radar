import request from "supertest";
import { app } from "../index";

jest.mock('../database/configure')

describe('not logged in', () => {
    let jwt_token: string;


    it("should not fetch any technologies", async () => {
        const response = await request(app).get("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });
    it("should not fetch upublished technologies", async () => {
        const response = await request(app).get("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });

    it("should not create a new technology", async () => {
        const response = await request(app).post("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });
    it("should not update a  technology", async () => {
        const response = await request(app).put("/api/technologies")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });
    it("should not publish a  technology", async () => {
        const response = await request(app).put("/api/technologies/publish")
            .set("Authorization", `Bearer ${jwt_token}`)
            .expect(403)
    });
});