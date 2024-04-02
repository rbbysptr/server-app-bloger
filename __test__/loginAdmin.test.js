const request = require("supertest");
const app = require("../app");
const hash = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let access_token;

// Data admin untuk testing
const adminData = {
    email: "admin@gmail.com",
    password: hash("admin123"),
    role: "admin",
    phoneNumber: "0812345567",
    address: "Indonesia",
};

describe("post /login", function () {
    describe("success", () => {
        test("berhasil login dan mengirimkan access_token", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: adminData.email, password: adminData.password });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("access_token", expect.any(String));
            access_token = response.body.access_token;
        });
    });
    describe("failed", () => {
        test("Email tidak diberikan / tidak diinput", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: "", password: adminData.password });
            expect(response.status).toBe(400);
        });

        test("Password tidak diberikan / tidak diinput", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: adminData.email, password: "" });
            expect(response.status).toBe(400);
        });

        test("Email diberikan invalid / tidak terdaftar", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: "HEY_TAYO", password: adminData.password });
            expect(response.status).toBe(401);
        });

        test("Password diberikan salah / tidak match", async () => {
            const response = await request(app)
                .post("/users/login")
                .send({ email: adminData.email, password: "HEY_TAYO" });
            expect(response.status).toBe(401);
        });
    });
});

beforeAll(async () => {
    await queryInterface.bulkInsert(
        "Users",
        [
            {
                email: adminData.email,
                password: hash(adminData.password),
                role: adminData.role,
                phoneNumber: adminData.phoneNumber,
                address: adminData.address,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ],
    );
    access_token = signToken({ id: 1 });
});

afterAll(async () => {
    await queryInterface.bulkDelete("Users", null, {
        restartIdentity: true,
        cascade: true,
        truncate: true,
    });
});