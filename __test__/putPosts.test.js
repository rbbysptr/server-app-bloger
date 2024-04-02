const request = require("supertest");
const app = require("../app");
const hash = require("../helpers/bcryptjs");
const { signToken, verifyToken } = require("../helpers/jwt");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
let access_token;
let acces_token_staff;
describe("put /posts/:id", function () {
    describe("success", () => {
        test("berhasil mengupdate  data entitas utama", async () => {
            let respons = await request(app)
                .put(`/posts/${verifyToken(access_token).id}`)
                .set("Authorization", "Bearer " + access_token)
                .send({
                    title: "yuhuuuuu",
                    content: "menyala abangkuh",
                    imgUrl: "ini gambar ?",
                    CategoryId: 1,
                });

            expect(respons.status).toBe(200);
            expect(respons.body).toHaveProperty("id", expect.any(Number));
            expect(respons.body).toHaveProperty("title", expect.any(String));
        });
    });
    describe("failed", () => {
        test("Gagal menjalankan fitur karena belum login", async () => {
            let respons = await request(app).put(
                `/posts/${verifyToken(access_token).id}`
            );
            // .set("Authorization", "Bearer " + acces_token);
            console.log(respons.body);
            expect(respons.status).toBe(401);
            expect(respons.body).toHaveProperty("message", "Unauthenticated");
        });
        test("Gagal menjalankan fitur karena token tidak valid", async () => {
            let respons = await request(app)
                .put(`/posts/${verifyToken(access_token).id}`)
                .set("Authorization", "Bearer" + access_token);
            console.log(respons.body);
            expect(respons.status).toBe(401);
            expect(respons.body).toHaveProperty("message", "Unauthenticated");
        });
        test("gagal karena id entity yang dikirim tidak terdapat di database", async () => {
            let respons = await request(app)
                .put(`/posts/${3}`)
                .set("Authorization", "Bearer " + access_token);
            // console.log(respons.body);
            expect(respons.status).toBe(404);
            expect(respons.body).toHaveProperty("message", "Data not found");
        });
        test("gagal menjalankan fitur ketika Staff mengolah data entity", async () => {

            let respons = await request(app)
                .put(`/posts/${verifyToken(access_token).id}`)
                .set("Authorization", "Bearer " + acces_token_staff);
            // console.log(respons.body);
            expect(respons.status).toBe(403);
            expect(respons.body).toHaveProperty("message", "Forbidden");
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

