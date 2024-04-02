'use strict';
const hash = require("../helpers/bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        email: "admin@gmail.com",
        password: hash("admin123"),
        role: "admin",
        phoneNumber: "0812345567",
        address: "Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "admin2@gmail.com",
        password: hash("admin1234"),
        role: "admin",
        phoneNumber: "0897654321",
        address: "Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  }
};
