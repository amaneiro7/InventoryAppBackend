'use strict';

const { BRAND_TABLE } = require('../models/brand.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('category', 'brand_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 1,
      references: {
        model: BRAND_TABLE,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('category', 'brand_id');
  },
};
