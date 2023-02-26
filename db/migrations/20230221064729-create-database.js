'use strict';

const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { ITEM_TABLE, ItemSchema } = require('../models/item.model');
const { BRAND_TABLE, BrandSchema } = require('../models/brand.model');
const { MODEL_TABLE, ModelSchema } = require('../models/model.model');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(BRAND_TABLE, BrandSchema);
    await queryInterface.createTable(MODEL_TABLE, ModelSchema);
    await queryInterface.createTable(ITEM_TABLE, ItemSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ITEM_TABLE);
    await queryInterface.dropTable(MODEL_TABLE);
    await queryInterface.dropTable(BRAND_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
