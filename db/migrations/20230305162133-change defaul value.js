'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn('category', 'brand_id', {
defaultValue: null,
    });
  },

  async down(queryInterface) {
    await queryInterface.changeColumn('category', 'brand_id', {
      defaultValue: 1
    });
  },
};

