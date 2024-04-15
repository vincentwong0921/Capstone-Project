'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.hasOne(
        models.CartItem,
        {foreignKey: 'inventory_id'}
      ),
      Inventory.hasOne(
        models.OrderDetail,
        {foreignKey: 'inventory_id'}
      )
    }
  }
  Inventory.init(
    {
      categories: {
        type: DataTypes.STRING,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carrier: {
        type: DataTypes.STRING,
      },
      storage: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false
      }
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};
