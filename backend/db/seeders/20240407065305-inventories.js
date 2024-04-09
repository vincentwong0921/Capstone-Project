"use strict";

const { Inventory } = require('../models')

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Inventory.bulkCreate(
      [
        {
          categories: "Phones",
          brand: "Apple",
          model: "iPhone 14 Pro",
          carrier: "GSM Unlocked",
          storage: "128GB",
          color: "Purple",
          condition: "Brand New Open Box",
          price: 799.99,
          image_url:
            "https://images.unsplash.com/photo-1663499827419-726641d53ef7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Apple",
          model: "iPhone 14",
          carrier: "GSM Unlocked",
          storage: "128GB",
          color: "white",
          condition: "Like New",
          price: 599.99,
          image_url:
            "https://images.unsplash.com/photo-1694570149728-b1011c2a772b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Apple",
          model: "iPhone 11 Pro",
          carrier: "GSM Unlocked",
          storage: "256GB",
          color: "Space Grey",
          condition: "Excellent +",
          price: 459.99,
          image_url:
            "https://images.unsplash.com/photo-1569350691771-34ce8273f865?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Apple",
          model: "iPhone 12 mini",
          carrier: "GSM Unlocked",
          storage: "128GB",
          color: "White",
          condition: "Like New",
          price: 429.99,
          image_url:
            "https://images.unsplash.com/photo-1616410072514-e92114cf1a88?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Samsung",
          model: "Galaxy S21 Plus",
          carrier: "AT&T",
          storage: "256GB",
          color: "Purple",
          condition: "Like New",
          price: 259.99,
          image_url:
            "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Samsung",
          model: "Galaxy S21 Ultra 5G",
          carrier: "T-Mobile",
          storage: "512GB",
          color: "Black",
          condition: "Brand New Open Box",
          price: 359.99,
          image_url:
            "https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Samsung",
          model: "Galaxy S24 Ultra",
          carrier: "GSM Unlocked",
          storage: "512GB",
          color: "Titanium Yellow",
          condition: "Excellent",
          price: 899.99,
          image_url:
            "https://images.unsplash.com/photo-1705530292519-ec81f2ace70d?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Samsung",
          model: "Galaxy S22 Ultra 5G",
          carrier: "Sprint",
          storage: "256GB",
          color: "Burgundy",
          condition: "Excellent +",
          price: 599.99,
          image_url:
            "https://images.unsplash.com/photo-1644501618169-bab16b6e6efb?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          categories: "Phones",
          brand: "Apple",
          model: "iPhone XS",
          carrier: "GSM Unlocked",
          storage: "128",
          color: "Silver",
          condition: "Good",
          price: "229.99",
          image_url: "https://images.unsplash.com/photo-1537589376225-5405c60a5bd8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Inventories";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
        brand: { [Op.in]: ["Apple", "Samsung"] },
      }, {});
  },
};
