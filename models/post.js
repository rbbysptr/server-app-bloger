'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'AuthorId' });
      Post.belongsTo(models.Category, { foreignKey: 'CategoryId' });
    }
  }
  Post.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING,
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
      allowNull: false,
      type: DataTypes.TEXT,
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
      allowNull: false,
      type: DataTypes.TEXT,
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
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "id"
      }
    },
    AuthorId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key:"id"
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};