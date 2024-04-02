'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: {
            msg: 'title is require'
          },
          notNull: {
            msg: 'title is require'
          }
        }
      },
      content: {
        allowNull:false,
        type: Sequelize.TEXT,
        validate: {
          notEmpty: {
            msg: 'content is require'
          },
          notNull: {
            msg: 'content is require'
          }
        }
      },
      imgUrl: {
        allowNull:false,
        type: Sequelize.TEXT,
        validate: {
          notEmpty: {
            msg: 'imgUrl is require'
          },
          notNull: {
            msg: 'imgUrl is require'
          }
        }
      },
      CategoryId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        }
      },
      AuthorId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
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
    await queryInterface.dropTable('Posts');
  }
};