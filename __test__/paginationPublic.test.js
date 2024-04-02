const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const hash = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

describe("get /pub/posts", function () {
    describe("success", () => {
        test("pagination", async () => {
            const respons = await request(app).get("/pub/posts?page=2");
            console.log(respons.body);
            expect(respons.status).toBe(200);
            expect(respons.body).toHaveProperty("total");
            expect(respons.body).toHaveProperty("size", 10);
            expect(respons.body).toHaveProperty("data", expect.any(Array));
            expect(respons.body.data).toHaveLength(10);
        });
    });
});

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

    let dataStaff = [
        {
            id: 2,
            email: "user@gmail.com",
            password: hash("user123"),
            role: "staff",
            phoneNumber: "087776666",
            address: "Indonesia",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];
    await queryInterface.bulkInsert("Users", data, {});
    await queryInterface.bulkInsert("Users", dataStaff, {});
    acces_token_staff = signToken({
        id: dataStaff[0].id,
        role: dataStaff[0].role,
    });
    access_token = signToken({ id: data[0].id, role: data[0].role });
});

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
});
