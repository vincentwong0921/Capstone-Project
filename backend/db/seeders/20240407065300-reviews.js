'use strict';

const { Review } = require("../models")
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        user_id: 2,
        review: 'Overnight Shipping was worth it!',
        stars: 5
      },
      {
        user_id: 3,
        review: 'Received a Cracked Screen Device.',
        stars: 2
      },
      {
        user_id: 3,
        review: 'RMA without any issue.',
        stars: 3
      },
      {
        user_id: 2,
        review: 'Absolutely Awesome Phone!',
        stars: 5
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      user_id: { [Op.in]: ["2","3"] }
    }, {});
  }
};
