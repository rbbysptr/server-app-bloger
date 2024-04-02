'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'email is required'
          },
          notNull: {
            msg: 'email is required'
          }
        }
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'password is required'
          },
          notNull: {
            msg: 'password is required'
          },
          len: {
            args: [5],
            msg: 'password must be at least 5 characters long'
          }
        }
      },
      role: {
        allowNull:false,
        type: Sequelize.STRING,
        defaultValue: 'staff',
        validate: {
          notEmpty: {
            msg: 'role is required'
          },
          notNull: {
            msg: 'role is required'
          }
        }
      },
      phoneNumber: {
        allowNull:false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'phoneNumber is required'
          },
          notNull: {
            msg: 'phoneNumber is required'
          }
        }
      },
      address: {
        allowNull:false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'address is required'
          },
          notNull: {
            msg: 'address is required'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};