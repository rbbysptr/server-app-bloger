const request = require("supertest");
const app = require("../app");
const hash = require("../helpers/bcryptjs");
const { signToken, verifyToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
let access_token;

let postNew = {
    title: "testinggg",
    content: "testing1",
    imgUrl: "testing1",
    CategoryId: 1,
    AuthorId: 1,
};

describe("post /posts", function () {
    describe("success", () => {
        test("berhasil membuat entitas utama", async () => {
            let respons = await request(app)
                .post("/posts")
                .send(postNew)
                .set("Authorization", "Bearer " + access_token);
            expect(respons.status).toBe(201);
            expect(respons.body).toHaveProperty("title", expect.any(String));
            expect(respons.body).toHaveProperty("content", expect.any(String));
            expect(respons.body).toHaveProperty("imgUrl", expect.any(String));
            expect(respons.body).toHaveProperty("CategoryId", expect.any(Number));
            expect(respons.body).toHaveProperty("AuthorId", expect.any(Number));
        });
    });
    describe("failed", () => {
        describe("Gagal menjalankan fitur karena belum login", () => {
            test("should return status 401 when not logged in", async () => {
                const response = await request(app)
                    .post("/posts")
                    .send(postNew);
                expect(response.status).toBe(401);
            });
        });

        describe("failed", () => {
            test("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
                const response = await request(app)
                    .post("/posts")
                    .send(postNew)
                    .set("Authorization", "Bearer invalid_token");
                expect(response.status).toBe(401);
            });
        });

        describe("failed", () => {
            test("Gagal ketika request body tidak sesuai(validation required", async () => {
                const invalidPost = {};
                const response = await request(app)
                    .post("/posts")
                    .send(invalidPost)
                    .set("Authorization", "Bearer " + access_token);
                expect(response.status).toBe(400);
            });
        });
    })
})
beforeAll(async () => {
    let data = [
        {
            id: 1,
            email: "admin@gmail.com",
            password: hash("admin123"),
            role: "admin",
            phoneNumber: "0812345567",
            address: "Indonesia",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    access_token = signToken({ id: data[0].id, role: data[0].role });
    await queryInterface.bulkInsert("Users", data, {});
});

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
});

