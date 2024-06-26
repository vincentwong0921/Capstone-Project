'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(
        models.Cart,
        {foreignKey: 'cart_id'}
      ),
      CartItem.belongsTo(
        models.Inventory,
        {foreignKey: 'inventory_id'}
        /* added this for render */
      )
    }
  }
  CartItem.init({
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inventory_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};
