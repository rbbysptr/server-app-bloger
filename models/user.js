'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post,{ foreignKey: 'AuthorId' });
    }
    static async isAdminEmail(email) {
      const user = await User.findOne({ where: { email } });
      return user && user.role === 'admin';
    }
  }
  User.init({
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'email already exists'
      },
      validate: {
        notEmpty: {
          msg: 'email is required'
        },
        notNull: {
          msg: 'email is required'
        },
        isEmail: {
          args:true,
          msg: 'email invalid format'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
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
      allowNull: false,
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'address is required'
        },
        notNull: {
          msg: 'address is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(value) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(value.password, salt);
        value.password = hash
      }
    }
  });
  return User;
};