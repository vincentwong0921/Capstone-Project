'use strict';

const { OrderDetail } = require('../models')

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await OrderDetail.bulkCreate([
      {
        order_id: 1,
        inventory_id: 1,
        quantity: 1
      },
      {
        order_id: 1,
        inventory_id: 5,
        quantity: 1
      },
      {
        order_id: 2,
        inventory_id: 2,
        quantity: 1
      },
      {
        order_id: 3,
        inventory_id: 3,
        quantity: 1
      },
      {
        order_id: 4,
        inventory_id: 4,
        quantity: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'OrderDetails';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      order_id: { [Op.in]: ["1","2","3","4"] }
    }, {});
  }
};
