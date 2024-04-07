'use strict';

const { CartItem } = require('../models')

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await CartItem.bulkCreate([
      {
        cart_id: 1,
        inventory_id: 4,
        quantity: 1
      },
      {
        cart_id: 1,
        inventory_id: 5,
        quantity: 1
      },
      {
        cart_id: 1,
        inventory_id: 6,
        quantity: 1
      },
      {
        cart_id: 2,
        inventory_id: 1,
        quantity: 1
      },
      {
        cart_id: 2,
        inventory_id: 2,
        quantity: 1
      },
      {
        cart_id: 2,
        inventory_id: 3,
        quantity: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CartItems';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      cart_id: { [Op.in]: ["1","2"] }
    }, {});
  }
};
