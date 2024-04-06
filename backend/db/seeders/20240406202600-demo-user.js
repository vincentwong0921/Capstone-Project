"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        first_name: 'Admin',
        last_name: 'User',
        phone: '1234567890',
        email: 'admin@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        role: 'Admin'
      },
      {
        first_name: 'Demo',
        last_name:'lition',
        phone: '2234567890',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password2'),
        role: 'Customer'
      },
      {
        first_name: 'Fake',
        last_name:'User',
        phone: '2234567891',
        email: 'user2@user.io',
        hashedPassword: bcrypt.hashSync('password3'),
        role: 'Customer'
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['admin@user.io', 'demo@user.io', 'user2@user.io'] }
    }, {});
  },
};
