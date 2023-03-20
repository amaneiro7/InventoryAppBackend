'use strict';

const { CATEGORY_TABLE } = require('../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('model', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: CATEGORY_TABLE,
        key: 'id'
      },
      defaultValue: 5,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('model', 'categoryId')
  }
};
