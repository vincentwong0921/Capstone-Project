'use strict';
const { Model } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(
        models.Review,
        {foreignKey: 'user_id'}
      ),
      User.hasOne(
        models.Cart,
        {foreignKey: 'user_id'}
      )
      // User.hasMany(
      //   models.Order,
      //   {foreignKey: 'user_id'}
      // )
    }
  }
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [10, 10]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      role: {
        type: DataTypes.STRING
      }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
